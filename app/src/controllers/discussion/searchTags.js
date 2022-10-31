const dbobj = require("./../../dbconn/dbconn");
const Err = require("./../../errors");
const sqobj = dbobj.sequelize;

exports.searchTags  = async (req, res, next) => {
  // precheck
  if (!req.body.hasOwnProperty("searchTags")) {
    next({ message: Err.PARAMETER_MISSING });
    return;
  }
  const { searchTags } = req.body;
  if (!Array.isArray(searchTags)) {
    next({ message: Err.INCORRECT_TYPE });
    return;
  }
  if(searchTags.length==0)
  {
    next({ message: Err.NOT_ENOUGH_TAGS });
    return;
  }
  if (!searchTags.every((i) => typeof i === "string")) {
    next({ message: Err.INCORRECT_TYPE });
    return;
  }
  let tagString= `"${searchTags[0].toLowerCase()}"`;
  for(var i=1;i<searchTags.length;i++)
  {
      tagString+= `, "${searchTags[i].toLowerCase()}"`;
  }
  // precheck complete
  try {
   
    let queryResult= await sqobj.query(`SELECT * 
    FROM discussions 
   WHERE discussion_id IN
    (
       SELECT discussion_id_fk
       FROM discussion_tags
       WHERE tag_name_fk IN (${tagString})
       GROUP BY discussion_id_fk 
       HAVING COUNT(DISTINCT tag_name_fk) = ${searchTags.length}
    )`);

    res.status(200).json({
      message: "discussion created successfully",
      data: {
        discussions: queryResult[0]
      },
    });
  } catch (err) {
    console.log("Error: ",err);
    next({ message: Err.API_ERROR });
  }
};

