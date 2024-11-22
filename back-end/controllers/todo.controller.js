const db = require("../models");

const todo = db.todos;

const adminfunc = async(req,res)=>{
  try {
    let userId = req.query.userId;
    console.log(userId);
    let allTasks = await todo.findAll();
    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
}
const getTasks = async (req, res) => {
  try {
    let userId = req.query.userId;
    console.log(userId);
    let allTasks = await todo.findAll({
      where: { userId },
    });
    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
  //   res.status(200).json("Get todo is called");
};
const getSingleTask = async (req, res) => {
  try {
    let { id } = req.params;
    let singelTask = await todo.findOne({ where: { id } });
    res.status(200).json(singelTask);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
const postTask = async (req, res) => {
  try {
    let { task, status, deadline, userId } = req.body;
    let todos = await todo.create({ task, status, deadline, userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
  // res.status(200).json('post todo is called')
};
const patchTask = async (req, res) => {
  try {
    let { id } = req.params;
    let updateTask = await todo.update(req.body, { where: { id } });
    updateTask = await todo.findOne({ where: { id } });
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
  // res.status(200).json("patch todo is called");
};
const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;
    let deleteTask = await todo.destroy({ where: { id } });
    res.status(200).json("task deleted successfully");
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
  // res.status(200).json("delete todo is called");
};

module.exports = { getTasks, getSingleTask, postTask, patchTask, deleteTask , adminfunc };
