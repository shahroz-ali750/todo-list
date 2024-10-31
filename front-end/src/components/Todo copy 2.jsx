import React, { useEffect, useReducer, useState } from "react";

export default function Todo() {
  // const [todos, setTodos] = useState ([])
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    return timestamp + randomString;
  }
  function reducer(state, action) {
    switch (action.type) {
      case "ADDTODO":
        return [...state, action.payload];
      case "REMOVETODO":
        return state.filter((todo) => todo.id !== action.payload.id);
      case "CHANGESTATUS":
        return state.map((todo) => {
          if (todo.id == action.payload.id) {
            return { ...todo, status: 1 };
          }
          return todo;
        });
    }
  }

  const [todos, dispatch] = useReducer(reducer, []);
  console.log("todos =>", todos);

  const [task, setTask] = useState("");
  const createTask = function (event) {
    event.preventDefault();

    dispatch({
      type: "ADDTODO",
      payload: { id: generateUniqueId(), title: task, status: 0 },
    });
  };

  // useEffect(()=>{
  //   let getTodos = async function(){
  //     let taskResponse = await fetch(`http://localhost:8000/api/v1/todo`)
  //     let taskData = await taskResponse.json()
  //     console.log(taskData)
  //     // setTodo(taskData)
  //     // setLoading(false)
  //   }
  //   getTodos()

  // })

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8">
          <div className="card p-5 rounded rounded-3 bg-light my-3">
            <form onSubmit={(e) => {createTask(e)}}>
              {/* <input type="text" className="form-control my-2" placeholder='Enter text to Search' /> */}
              <input
                type="text"
                className="form-control my-2"
                placeholder="Enter text to Create task"
                onChange={(e) => {
                  setTask(e.target.value);
                }}
              />
              <input
                type="submit"
                className="btn btn-success w-100"
                value={"Create Task"}
              />
            </form>
            <ul className="list-group my-4">
              {todos &&
                todos.map((todo) =>
                  todo.status ? (
                    <li className="list-group-item text-decoration-line-through bg-success">
                      {todo.title}
                      <button
                        className="btn btn-danger float-end"
                        onClick={() => {
                          dispatch({
                            type: "REMOVETODO",
                            payload: { id: todo.id },
                          });
                        }}>
                        Remove
                      </button>
                    </li>
                  ) : (
                    <li className="list-group-item">
                      {todo.title}

                      <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                          dispatch({
                            type: "CHANGESTATUS",
                            payload: { id: todo.id },
                          });
                        }}>
                        Complete
                      </button>
                      <button
                        className="btn btn-danger float-end me-3"
                        onClick={() => {
                          dispatch({
                            type: "REMOVETODO",
                            payload: { id: todo.id },
                          });
                        }}>
                        Remove
                      </button>
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
