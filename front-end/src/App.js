import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Register from "./components/Register";
import Login from "./components/Login";
import Nav from "./components/Nav";
import AdminViews from "./components/AdminViews";
import UnauthorizedUser from "./components/UnauthorizedUser";

function App() {
  return (
    <BrowserRouter>
     <MainApp />
    </BrowserRouter>
  )

  function MainApp() {
    const location = useLocation();
  
    return (
      <div>
        {location.pathname !== "/login"  && location.pathname == "/" && <Nav />}
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminViews />} />
          <Route path="/unauthorize" element={<UnauthorizedUser />} />
        </Routes>
      </div>
    );
  }
}

export default App;
