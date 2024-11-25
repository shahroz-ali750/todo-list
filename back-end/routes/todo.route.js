const express = require("express");
const {
  getTasks,
  getSingleTask,
  postTask,
  patchTask,
  deleteTask,
  adminfunc,
} = require("../controllers/todo.controller");
const checkRoleMiddleware = require("../middleware/checkRole.middleware");

const router = express.Router();

router.get("/", getTasks);
router.get("/admin",checkRoleMiddleware , adminfunc);
router.get("/:id", getSingleTask);
router.post("/", postTask);
router.patch("/:id", patchTask);
router.delete("/:id", deleteTask);


module.exports = router;
