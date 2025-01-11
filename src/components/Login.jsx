import React, { useState } from "react";
import Login1 from "../assets/login.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credential;
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Response data:", json);

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        alert(json.message || "Invalid credentialsqqq");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img className="login-img" src={Login1} alt="login image" />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={credential.email}
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credential.password}
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link className="nav-link" to="/signup">
              Dont have accout? signup
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
