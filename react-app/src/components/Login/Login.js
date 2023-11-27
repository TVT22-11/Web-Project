import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Login.css";
import "./SignUp.css";

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [errorMessages, setErrorMessages] = useState({});

  const [state, setState] = useState({
    username: "",
    password: "",
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
    };

    axios
      .post("http://localhost:5432/auth/login", userData)
      .then((response) => {
        console.log(response.status, response.data);
        setIsLoggedIn(true);
       /* navigate("/");*/
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
  };


  const handleRegisterClick = () => {
    // Add any additional logic you need before navigating
    navigate("/signup");
  };

  // JSX code for login form
  const renderLoginForm = (
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
            name="password"
            value={state.password}
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

  const renderLoggedInState = (
    <div>
      <div>User is successfully logged in</div>
      {/* Display the username or any other information you want */}
      <div>Welcome,  {state.username}!</div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">SIGN IN</div>
        {errorMessages.server && <div>{errorMessages.server}</div>}
        {isLoggedIn ? renderLoggedInState : renderLoginForm}
      </div>
    </div>
  );
}

export default Login;
