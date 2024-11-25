import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../util/storage";

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
  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const getUserToken = getStorage(
      process.env.REACT_APP_LOCAL_KEY + "usertoken"
    );
    if (!getUserToken) {
      navigate("/login");
      return; 
    }
    const adminRoute = ()=>{
      const role = getUserToken.role
      if(role !== "admin"){
        navigate('/unauthorize')
      }
      
    }
    adminRoute()

    let getTasks = async function () {
      let taskResponse = await fetch(`http://localhost:8000/api/v1/todo/admin`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          authorization:`Bearer ${getUserToken.token}`
        }
      });
      let taskData = await taskResponse.json();
      console.log("task response =>", taskData);
      setTodoList(taskData.allTasks);
      setLoading(false);
    };
    getTasks();
  }, []);



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
        <button onClick={logout}>Log Out</button>
        <div className="col-md-12">
          <h2 className="text-center">Todo List</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>User Name</th>
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
                        <td>{data.User?.userName || "Unknown User"}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
