const dbobj = require("./../../dbconn/dbconn");
const Err = require("./../../errors");
const Discussion = dbobj.Discussion;

exports.deleteDiscussion  = async (req, res, next) => {
  // precheck
  if (!req.body.hasOwnProperty("discussion_id")) {
    next({ message: Err.PARAMETER_MISSING });
    return;
  }
  const { discussion_id } = req.body;
  if (!Number.isInteger(discussion_id)) {
    next({ message: Err.INCORRECT_TYPE });
    return;
  }

  // precheck complete
  try {
   await Discussion.destroy({
     where: {
        discussion_id: discussion_id,
      },
  });
    res.status(200).json({
      message: "discussion deleted successfully",
    });
  } catch (err) {
    console.log("Error: ",err);
    next({ message: Err.API_ERROR });

  }
};
