import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./signUpPage.css";
import LoginImg from "../../../images/login-img.jpg";
import axios from "axios"
const SignUpPage = () => {
  const onChange = () => {};
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [recaptchCompleted, isRecaptchCompleted] = useState("false");

  const handleNameChange = (e) => {
    const userName = e.target.value.slice(0, 30);
    setUserName(userName);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleContactChange = (e) => {
    setContact(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleCheckPolicy = () => {
    setCheckPolicy(!checkPolicy);
  };

  return (
    <>
      <div id="signup-container">
        <div id="signup-container-lite">
          <div id="signup-tile-container">
            <h2>Tourist's Terra</h2>
          </div>
          <div id="signup-main-container">
            <div id="signup-info">
              <h2 id="signup-info-head">Sign Up into</h2>
              <span id="signup-info-title">Tourist's Terra</span>
              <br />
              <span id="already-account">
                If you have a registered account.
                <br />
                You can <a href="/login-user">Login Here</a>
              </span>
            </div>
            <div id="image">
              <div>
                <img src={LoginImg} alt="" />
              </div>
            </div>
            <div id="signup-form-container">
              <div id="signup-form">
                <form action="">
                  <h3>Sign Up </h3>
                  <div id="signup-input-div">
                    <i class="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      id=""
                      placeholder="Enter Email"
                      onChange={handleEmailChange}
                      value={email}
                      required
                    />
                  </div>
                  <div id="signup-input-div">
                    <i class="fa-solid fa-lock"></i>
                    <input
                      type="text"
                      name="name"
                      id=""
                      placeholder="Create User Name"
                      onChange={handleNameChange}
                      value={name}
                    />
                  </div>
                  <div id="signup-input-div">
                    <i class="fa-solid fa-phone"></i>
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="Contact"
                      onChange={handleContactChange}
                      value={contact}
                    />
                  </div>
                  <div id="signup-input-div">
                    <i class="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      value={password}
                    />
                  </div>
                  <div id="signup-input-div">
                    <i class="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Confirm Password"
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                    />
                  </div>
                  <div id="signup-check-terms">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={handleCheckPolicy}
                    />
                    <span>
                      I accept the <Link>Terms And Policies</Link> and{" "}
                      <Link>Privacy Policies</Link>{" "}
                    </span>
                  </div>
                  <button id="signup-button">Sign Up</button>
                  <span style={{ textAlign: "center" }}>
                    <a href="/login-user">Already have an account?</a>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
