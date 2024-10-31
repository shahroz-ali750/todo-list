import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableId, setEditableId] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [editedData, setEditedData] = useState({
    task: "",
    status: "",
    deadline: "",
  });
  useEffect(() => {
    let getTasks = async function () {
      let taskResponse = await fetch(`http://localhost:8000/api/v1/todo`);
      let taskData = await taskResponse.json();
      console.log("task response =>", taskData);
      setTodoList(taskData.allTasks);
      setLoading(false);
    };
    getTasks();
  }, []);

  const resetFormFields = () => {
    setNewTask("");
    setNewStatus("");
    setNewDeadline("");
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      alert("All fields are required.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/v1/todo", {
        task: newTask,
        status: newStatus,
        deadline: new Date(newDeadline).toISOString(),
      });
      setTodoList((prevList) => [...prevList, res.data]);
      resetFormFields();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const toggleEditable = (id) => {
    console.log("id =>", id);
    const taskToEdit = todoList.find((task) => task.id === id);
    if (taskToEdit) {
      setEditableId(id);
      setEditedData({
        task: taskToEdit.task,
        status: taskToEdit.status,
        deadline: new Date(taskToEdit.deadline).toISOString().slice(0, 16),
      });
    } else {
      setEditableId(null);
    }
  };

  const handleEditChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const saveEditedTask = async (id) => {
    if (!editedData.task || !editedData.status || !editedData.deadline) {
      alert("All fields are required.");
      return;
    }
    try {
      const res = await axios.patch(`http://localhost:8000/api/v1/todo/${id}`, {
        ...editedData,
        deadline: new Date(editedData.deadline).toISOString(),
      });
      setTodoList((prevList) =>
        prevList.map((task) => (task.id === id ? res.data : task))
      );
      setEditableId(null);
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todo/${id}`);
      setTodoList((prevList) => prevList.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      timeZone: "Asia/Karachi", // Displays in Pakistan Standard Time (PST)
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7">
          <h2 className="text-center">Todo List</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : todoList.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">
                      No tasks available.
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {todoList &&
                    todoList.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {editableId === data.id ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editedData.task}
                              onChange={(e) =>
                                handleEditChange("task", e.target.value)
                              }
                            />
                          ) : (
                            data.task
                          )}
                        </td>
                        <td>
                          {editableId === data.id ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editedData.status}
                              onChange={(e) =>
                                handleEditChange("status", e.target.value)
                              }
                            />
                          ) : (
                            data.status
                          )}
                        </td>
                        <td>
                          {editableId === data.id ? (
                            <input
                              type="datetime-local"
                              className="form-control"
                              value={editedData.deadline}
                              onChange={(e) =>
                                handleEditChange("deadline", e.target.value)
                              }
                            />
                          ) : (
                            formatDate(data.deadline)
                          )}
                        </td>
                        <td>
                          {editableId === data.id ? (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => saveEditedTask(data.id)}>
                                Save
                              </button>
                              <button
                                className="btn btn-secondary btn-sm ms-1"
                                onClick={() => setEditableId(null)}>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => toggleEditable(data.id)}>
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm ms-1"
                                onClick={() => deleteTask(data.id)}>
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="col-md-5">
          <h2 className="text-center">Add Task</h2>
          <form
            className="bg-light p-4"
            onSubmit={(e) => {
              addTask(e);
            }}>
            <div className="mb-3">
              <label>Task</label>
              <input
                className="form-control"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Status</label>
              <input
                className="form-control"
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Deadline</label>
              <input
                className="form-control"
                type="datetime-local"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
            </div>
            <button className="btn btn-success btn-sm" type="submit">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
