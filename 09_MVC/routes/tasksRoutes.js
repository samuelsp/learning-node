const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.get("/add", TaskController.createTask);
router.get("/", TaskController.showTasks);
router.get("/edit/:id", TaskController.updateTask);
router.post("/edit", TaskController.updateTaskSave);
router.post("/add", TaskController.createTaskSave);
router.post("/remove", TaskController.removeTask);
router.post("/updateStatus", TaskController.toggleTaskStatus);

module.exports = router;
