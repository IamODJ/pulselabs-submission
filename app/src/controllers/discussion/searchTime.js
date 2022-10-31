const dbobj = require("./../../dbconn/dbconn");
const Err = require("./../../errors");
const { Op } = require('sequelize');
const Discussion = dbobj.Discussion;

Date.prototype.isValid = function () {
  return this.getTime() === this.getTime(); // NaN not equal to NaN 
};  

exports.searchTime  = async (req, res, next) => {
  // precheck
  if (!req.body.hasOwnProperty("startTime") || !req.body.hasOwnProperty("endTime")) {
    next({ message: Err.PARAMETER_MISSING });
    return;
  }
  const { startTime, endTime } = req.body;

  var startObj= new Date(startTime);
  var endObj= new Date(endTime);

  if(!startObj.isValid() || !endObj.isValid())
  {
    next({ message: Err.TIMESTAMP_ERROR });
    return;
  }
  // precheck complete
  try {
  let queryResult= await Discussion.findAll({ 
    where: {
      createdAt: {
        [Op.between]: [startObj, endObj]
      }
    } 
  });
    res.status(200).json({
      message: "discussion fetched successfully",
      data: {
        discussions: queryResult
      },
    });
  } catch (err) {
    console.log("Error: ",err);
    next({ message: Err.API_ERROR });

  }
};
