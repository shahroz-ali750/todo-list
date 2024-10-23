import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import Todo from './components/Todo';

function App() {
  const headStyle ={
    textAlign: "center",
  }
  return (
 <div>
  <h1 style={headStyle}>Todo List</h1>
 <BrowserRouter>
  <Routes>
    <Route path='/' element={<Todo/>}></Route>
  </Routes>
 </BrowserRouter>
 </div>
  );
}

export default App;
