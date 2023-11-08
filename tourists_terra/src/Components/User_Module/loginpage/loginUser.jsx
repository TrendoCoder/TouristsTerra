import React, { useContext, useEffect, useState } from "react";
import "./loginUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImg from "../../../images/login-img.jpg";
import { AuthContext } from "../../../Context/authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginUser = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(""); 
  };
  const notify = () => toast("Wrong Email or Password");
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    if (!credentials.email || !credentials.password) {
      setError("Email and Password cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/loginUser",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      notify();
    }
    setLoading(false);
  };

  return (
    <div id="login-container">
      <div id="login-container-lite">
        <div id="tile-container">
          <h2>Tourist's Terra</h2>
        </div>
        <div id="login-main-container">
          <div id="login-info">
            <h2 id="login-info-head">Login into</h2>
            <span id="login-info-title">Tourist's Terra</span>
            <br />
            <span id="already-account">
              If you don't have a registered account.
              <br />
              You can{" "}
              <Link to="/sign-up" style={{ color: "#0F4157" }}>
                Register Here
              </Link>
            </span>
          </div>
          <div id="image">
            <div>
              <img src={LoginImg} alt="" />
            </div>
          </div>
          <div id="login-form-container">
            <div id="login-form">
              <form>
                <h3>Login</h3>
                <div id="input-div">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    id="email"
                    required
                  />
                </div>
                <br />
                <div id="input-div">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    id="password"
                    required
                  />
                </div>
                <br />
                {error && <p className="error-message">{error}</p>}
                <Link to="">Forgot Password?</Link>
                <br />
                <button id="login-button" disabled={loading}
                 onClick={handleClick}>
                  {loading ? "Loading...." : "Login"}
                </button>
                
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
