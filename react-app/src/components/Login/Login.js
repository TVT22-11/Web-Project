import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Login.css";
import "./SignUp.css";
import { useUser } from "../User/UserContext";

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, isLoggedOut, logout } = useUser();




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
    setLoading(true);
    const userData = {
      username: state.username,
      password: state.password,
    };

    axios
      .post("http://localhost:3001/auth/login", userData)
      .then((response) => {
        console.log(response.status, response.data);
        login();
        setIsLoggedIn(true);


        const token = response.data.jwtToken;
        console.log('Token from server:', token);
    
        // Set the token in sessionStorage
        sessionStorage.setItem('jwtToken', token);
        console.log('Token stored in sessionStorage:', sessionStorage.getItem('jwtToken'));


        setErrorMessages({}); // Clears error messages on successful login


          



      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessages({ server: "Server responded with an error" });
        } else if (error.request) {
          setErrorMessages({ server: "Network error" });
        } else {
          console.log(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

    // Set up timeout for navigation after successful login
    useEffect(() => {
      let timeoutId;
  
      if (isLoggedIn) {
        timeoutId = setTimeout(() => {
          navigate("/");
        }, 3000);
      }
  
      return () => {
        // Clear the timeout if the component unmounts or the user takes an action
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [isLoggedIn, navigate]);



  // JSX code for login form

  const renderLoginForm = (
    <div className="loginform">
      <form onSubmit={handleSubmit} disabled={loading}>
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <div className="button-container">
          <input type="submit" disabled={loading} />
          <label> OR </label>
          <input type="button" value="Register" onClick={handleRegisterClick} />
          {loading && <div className="spinner" />}
        </div>
      </form>
    </div>
  );

  const renderLoggedInState = (
    <div className="loggedIn">
      <div>User is successfully logged in</div>
      {/* Display the username or any other information you want */}
      <div className="Welcome">Welcome, {state.username}!</div>

    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">SIGN IN</div>
        {errorMessages.server && (
          <div className="error-message">{errorMessages.server}</div>
        )}
        {isLoggedIn ? renderLoggedInState : renderLoginForm}
      </div>
    </div>
  );
}

export default Login;
