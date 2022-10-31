const dbobj = require("./../../dbconn/dbconn");
const Err = require("./../../errors");
const Discussion = dbobj.Discussion;
const Tags = dbobj.Tags;
const TagsDiscussion = dbobj.TagsDiscussion;
const sqobj = dbobj.sequelize;

exports.createDiscussion  = async (req, res, next) => {
  // precheck
  if (!req.body.hasOwnProperty("text") || !req.body.hasOwnProperty("tags")) {
    next({ message: Err.PARAMETER_MISSING });
    return;
  }
  const { tags, text } = req.body;
  if (!Array.isArray(tags)) {
    next({ message: Err.INCORRECT_TYPE });
    return;
  }
  if (text === "") {
    next({ message: Err.TEXT_EMPTY });
    return;
  }
  if (!tags.every((i) => typeof i === "string")) {
    next({ message: Err.INCORRECT_TYPE });
    return;
  }
  // precheck complete
  const txn = await sqobj.transaction();
  try {
    // start transaction (either all tables change or no table changes)
    const dsc = await Discussion.create(
      {
        discussion_text: text,
      },
      { transaction: txn }
    );

    let bulkTags = tags.map((tag) => ({ tag_name: tag.toLowerCase() }));

    await Tags.bulkCreate(bulkTags, {
      updateOnDuplicate: ["tag_name"],
      transaction: txn,
    });

    let bulkTagsDiscussions = tags.map((tag) => ({
      discussion_id_fk: dsc.discussion_id,
      tag_name_fk: tag.toLowerCase(),
    }));

    await TagsDiscussion.bulkCreate(bulkTagsDiscussions, {
      updateOnDuplicate: ["discussion_id_fk", "tag_name_fk"],
      transaction: txn,
    });
    // We commit the transaction.
    await txn.commit();

    res.status(201).json({
      message: "discussion created successfully",
      data: {
        discussion_id: dsc.discussion_id,
        text: text,
        tags: tags,
      },
    });
  } catch (err) {
    console.log("Error: ",err);
    await txn.rollback();
    next({ message: Err.API_ERROR });
  }
};

