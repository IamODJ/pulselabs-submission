const dbobj = require("./../../dbconn/dbconn");
const Err = require("./../../errors");
const Discussion = dbobj.Discussion;
const Sequelize = require("sequelize");

exports.searchText  = async (req, res, next) => {
  // precheck
  if (!req.body.hasOwnProperty("searchText")) {
    next({ message: Err.PARAMETER_MISSING });
    return;
  }
  const { searchText } = req.body;
  // precheck complete
  try {
  let queryResult= await Discussion.findAll({ 
    where: {
        where: Sequelize.literal(`MATCH (discussion_text) AGAINST('${searchText}' IN NATURAL LANGUAGE MODE)`),
    } 
  });
    res.status(200).json({
      message: "discussions fetched successfully",
      data: {
        discussions: queryResult
      },
    });
  } catch (err) {
    console.log("Error: ",err);
    next({ message: Err.API_ERROR });

  }
};
