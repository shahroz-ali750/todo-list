import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, setStorage } from "../util/storage";
import { Link } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = useState({});
  let myToken = getStorage(process.env.REACT_APP_LOCAL_KEY + "usertoken")

  let navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/user/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
              authorization:`Bearer ${myToken}`

       },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => {
        setStorage(process.env.REACT_APP_LOCAL_KEY + "usertoken", res.data);
        console.log(res.data)
        // localStorage.setItem("usertoken", JSON.stringify(res.data));
        // alert("user login successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-md-5">
        <div className="col-12 col-md-8 justify-content-center">
          <div className="card bg-dark p-5">
            <h1 className="text-white text-center">Login Form</h1>
            <form
              onSubmit={(e) => {
                handlelogin(e);
              }}
              className="my-md-3">
              <input
                type="email"
                className="form-control my-2"
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
              />
              <input
                type="password"
                className="form-control my-2"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
              <button className="btn btn-success w-100">Login</button>
            </form>
            <Link to ="/register"></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
