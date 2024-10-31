const express = require("express");
const {
  getTasks,
  getSingleTask,
  postTask,
  patchTask,
  deleteTask,
} = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getSingleTask);
router.post("/", postTask);
router.patch("/:id", patchTask);
router.delete("/:id", deleteTask);

module.exports = router;
