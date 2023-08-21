import React, { useEffect, useState } from "react";
import "./loginUser.css";
import LoginImg from "../../../images/login-img.jpg";
const LoginUser = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    const user = e.target.value;
    setEmail(user);
  };
  const handlePassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
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
              You can <a href="/sign-up">Register Here</a>
            </span>
          </div>
          <div id="image">
            <div>
              <img src={LoginImg} alt="" />
            </div>
          </div>
          <div id="login-form-container">
            <div id="login-form">
              <form action="">
                <h3>Login</h3>
                <div id="input-div">
                  <i class="fa-solid fa-user"></i>
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter Email"
                    onChange={handleEmail}
                    value={email}
                  />
                </div>
                <br />
                <div id="input-div">
                  <i class="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    onChange={handlePassword}
                    value={password}
                  />
                </div>
                <br />
                <a href="">Forgot Password?</a>
                <br />
                <button id="login-button">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
