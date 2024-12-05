import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todo-usertoken");
    if (token && JSON.parse(token)) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await fetch(`${process.env.REACT_APP_BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        alert("user has been registered");
        navigate("/login");
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center my-md-5">
          <div className="col-12 col-md-8 justify-content-center">
            <div className="card bg-dark p-5">
              <h1 className="text-white text-center">Register Yourself</h1>
              <form
                className="my-md-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}>
                <input
                  type="text"
                  className="form-control my-2"
                  placeholder="Enter Your User Name"
                  onChange={(e) => {
                    setUserData({ ...userData, userName: e.target.value });
                  }}
                />
                <input
                  type="email"
                  className="form-control my-2"
                  placeholder="Enter Your Email Address"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  placeholder="Enter Your Password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
                <input
                  type="submit"
                  className="btn btn-success my-2 w-100"
                  value={"Register"}
                />
              </form>
              <h6 className="text-white">Already have an account?</h6>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
