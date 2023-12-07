import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import {jwtToken} from './signals';


import "./Login.css";

import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [state, setState] = useState({
    username: "",
    password: "",
    fname: "",
    lname: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: state.username,
      password: state.password,
      fname: state.fname,
      lname: state.lname
    };

    axios.post("http://localhost:5432/auth/register", userData)
    .then((response) => {
      console.log(response.status, response.data);
      setIsSubmitted(true);

    })

      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("Server responded with an error");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  }

   
    const renderForm = (
      <div className="signupform">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input
              className="input-color"
              placeholder="Username"
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
              autoComplete="off"
              required
            />

          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              className="input-color"
              placeholder="Password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="input-container">
            <label>First name </label>
            <input
              className="input-color"
              placeholder="First name"
              type="text"
              name="fname"
              value={state.fname}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="input-container">
            <label>Last name </label>
            <input
              className="input-color"
              placeholder="Last name"
              type="text"
              name="lname"
              value={state.lname}
              onChange={handleChange}
              autoComplete="off"
              required
            />

          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );

    return (
      <div className="app">
        <div className="login-form">
          <div className="title">REGISTER</div>
          {isSubmitted ? <div>User is successfully registered</div> : renderForm}
        </div>
      </div>
    );
  };

export default SignUp;
