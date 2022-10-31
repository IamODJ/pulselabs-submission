const express = require("express");
const router = express.Router();
const {createDiscussion} = require("../controllers/discussion/create");
const {deleteDiscussion} = require("../controllers/discussion/delete");
const {updateDiscussion} = require("../controllers/discussion/update");
const {searchTags} = require("../controllers/discussion/searchTags");
const {searchText} = require("../controllers/discussion/searchText");
const {searchTime} = require("../controllers/discussion/searchTime");

router.post("/create", createDiscussion);
router.put("/update", updateDiscussion);
router.delete("/delete",deleteDiscussion);
router.post("/search/tags",searchTags);
router.post("/search/text",searchText);
router.post("/search/time",searchTime);

module.exports = router;