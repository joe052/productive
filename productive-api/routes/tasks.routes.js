const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controllers");

/** */
router.route("/").get(tasksController.getTasks).post(tasksController.postTask);
// .patch()
// .delete();

module.exports = router;
