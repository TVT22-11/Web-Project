import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Login.css";
import "./SignUp.css";

function Login() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [state, setState] = useState({
    username: "",
    pw: "",
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
    };

    axios
      .post("http://localhost:3001/auth/register", userData)
      .then((response) => {
        console.log(response.status, response.data.token);
        // You might want to handle token and redirect here based on response
      });
  };

  const handleRegisterClick = () => {
    // Add any additional logic you need before navigating
    navigate("/signup");
  };

  // React States
  const [errorMessages, setErrorMessages] = useState({});


  // JSX code for login form
  const renderForm = (
    <div className="loginform">
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
        <div className="button-container">
          <input type="submit" />
          <label> OR </label>
          <input type="button" value="Register" onClick={handleRegisterClick} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">SIGN IN</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
