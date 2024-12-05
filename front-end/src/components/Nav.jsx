import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStorage } from "../util/storage";

export default function Nav() {
  const [userName, setUserName] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const getUserToken = getStorage(
      process.env.REACT_APP_LOCAL_KEY + "usertoken"
    );
    if (!getUserToken) {
      navigate("/login");
      return;
    }
    setUserName(getUserToken.userName);
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    alert("are you sure?");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Todo App
        </Link>
        <div className="container d-flex justify-content-end align-items-center">
          <span className="text-white fs-5 pe-2">{userName}</span>
          <button onClick={logout} className="btn btn-danger">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
