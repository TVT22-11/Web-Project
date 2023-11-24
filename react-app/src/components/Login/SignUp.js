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
    pw: "",
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
      pw: state.pw,
      fname: state.fname,
      lname: state.lname
    };

    axios.post("http://localhost:3001/auth/register", userData)
    .then((response) => {
      console.log(response.status, response.data);
      setIsSubmitted(true);
      // You might want to handle token and redirect here based on response
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
      <div className="form">
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
              name="pw"
              value={state.pw}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>first name </label>
            <input
              className="input-color"
              placeholder="first name"
              type="text"
              name="fname"
              value={state.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>last name </label>
            <input
              className="input-color"
              placeholder="last name"
              type="text"
              name="lname"
              value={state.lname}
              onChange={handleChange}
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
