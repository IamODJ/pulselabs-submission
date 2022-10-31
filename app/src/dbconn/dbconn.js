const Sequelize = require("sequelize");
const discussionModel = require('../models/discussion')
const tagsModel = require('../models/tags')
const tagsdiscussionModel= require("../models/tagsDiscussion")

const { DBHOST,DBNAME,DBUSER,DBPASS } = require("./../config");

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    host: DBHOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
   const Discussion = discussionModel(sequelize, Sequelize)
   const Tags = tagsModel(sequelize, Sequelize)
   const TagsDiscussion= tagsdiscussionModel(sequelize, Sequelize)

   try{
   sequelize.sync()
   .then(() => {
     console.log(`Database connection established`)
   })
  }
  catch(e)
  {
    console.log("Can't connect to the database: ",e);
  }
   

module.exports={Discussion,Tags,TagsDiscussion, sequelize}