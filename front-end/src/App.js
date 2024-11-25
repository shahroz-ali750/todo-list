import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Register from "./components/Register";
import Login from "./components/Login";
import Nav from "./components/Nav";
import AdminViews from "./components/AdminViews";
import UnauthorizedUser from "./components/UnauthorizedUser";

function App() {
  const headStyle = {
    textAlign: "center",
  };
  return (
    <div>
      {/* <h1 style={headStyle}>Todo List</h1> */}
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" index element={<Todo />}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin" element={<AdminViews/>}></Route>
          <Route path="/unauthorize" element={<UnauthorizedUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
