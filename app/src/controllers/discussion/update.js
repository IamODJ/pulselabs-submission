const dbobj = require("./../../dbconn/dbconn");
const Err = require("./../../errors");
const Discussion = dbobj.Discussion;
const Tags = dbobj.Tags;
const TagsDiscussion = dbobj.TagsDiscussion;
const sqobj = dbobj.sequelize;

exports.updateDiscussion = async (req, res, next) => {
  // precheck
  if (
    !req.body.hasOwnProperty("text") ||
    !req.body.hasOwnProperty("tags") ||
    !req.body.hasOwnProperty("discussion_id")
  ) {
    next({ message: Err.PARAMETER_MISSING });
    return;
  }
  const { tags, text, discussion_id } = req.body;

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
  if (!Number.isInteger(discussion_id)) {
    next({ message: Err.INCORRECT_TYPE });
    return;
  }
  // precheck complete

  const txn = await sqobj.transaction();
  try {
    // start transaction (either all tables change or no table changes)
    const dsc = await Discussion.update(
      {
        discussion_text: text,
      },
      {
        where: {discussion_id: discussion_id},
        transaction: txn,
      }
    );
    
    let bulkTags = tags.map((tag) => ({ tag_name: tag.toLowerCase() }));
    await Tags.bulkCreate(bulkTags, {
      updateOnDuplicate: ["tag_name"],
      transaction: txn,
    });

    await TagsDiscussion.destroy({
      where: {
         discussion_id_fk: discussion_id,
       },
       transaction: txn,
   });
    let bulkTagsDiscussions = tags.map((tag) => ({
      discussion_id_fk: discussion_id,
      tag_name_fk: tag.toLowerCase(),
    }));

    await TagsDiscussion.bulkCreate(bulkTagsDiscussions, {
      updateOnDuplicate: ["discussion_id_fk", "tag_name_fk"],
      transaction: txn,
    });
    // We commit the transaction.
    await txn.commit();

    res.status(201).json({
      message: "discussion updated successfully",
      data: {
        discussion_id: dsc.discussion_id,
        text: text,
        tags: tags,
      },
    });
  } catch (err) {
    console.log("Error: ", err);
    await txn.rollback();
    next({ message: Err.API_ERROR });
  }
};
