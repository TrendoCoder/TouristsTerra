import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signUpPage.css";
import LoginImg from "../../../images/login-img.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else {
      const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!regex.test(email)) {
        errors.email = "This is not a valid email format";
      }
    }

    if (!userName) {
      errors.userName = "Username is required";
    }

    console.log(contact.length)
    if (!contact || contact.length !== 12) {
      errors.contact = "Enter Valid Contact";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!checkPolicy) {
      errors.checkPolicy = "Please accept the Terms And Policies";
    }

    return errors;
  };

  const handleContactChange = (e) => {
    const formattedContact = e.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, 11)
      .replace(/(\d{4})(\d{0,7})(\d{0,4})/, "$1-$2$3");

    setContact(formattedContact);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const getPasswordStrength = () => {
    const length = password.length;

    if (length < 6) {
      return "Weak";
    } else if (length < 10) {
      return "Normal";
    } else {
      return "Excellent";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldErrors = validate();

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsAdmin(true);
    axios
      .post("http://localhost:3001/api/auth/register", {
        email,
        userName,
        contact,
        password,
        isAdmin,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          alert("Successfully Account Created");
          navigate("/login-user");
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setErrors({ userName: "Username already exists" });
        }else  if (err.response.status === 900) {
          setErrors({ email: "Email already exists" });
        } else {
          // Other errors
          alert(err.message);
        }
      });
  };

  return (
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
              You can <Link to="/login-user">Login Here</Link>
            </span>
          </div>
          <div id="image">
            <div>
              <img src={LoginImg} alt="" />
            </div>
          </div>
          <div id="signup-form-container">
            <div id="signup-form">
              <form>
                <h3>Sign Up</h3>
                <div id="signup-input-div">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                {errors.email && (
                  <span className="error-message-signup">{errors.email}</span>
                )}
                <div id="signup-input-div">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Create User Name"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    style={{ textTransform: "capitalize" }}
                  />
                </div>
                {errors.userName && (
                  <span className="error-message-signup">
                    {errors.userName}
                  </span>
                )}
                <div id="signup-input-div">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    onChange={handleContactChange}
                    value={contact}
                  />
                </div>
                {errors.contact && (
                  <span className="error-message-signup">{errors.contact}</span>
                )}
                <div id="signup-input-div">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </div>
                {errors.password && (
                  <span className="error-message-signup">
                    {errors.password}
                  </span>
                )}
                <div id="signup-input-div">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-message-signup">
                    {errors.confirmPassword}
                  </span>
                )}
                <div id="password-strength">
                  Password Strength: {getPasswordStrength()}
                </div>
                <div id="signup-check-terms">
                  <input
                    type="checkbox"
                    onChange={() => setCheckPolicy(!checkPolicy)}
                    checked={checkPolicy}
                  />
                  <span>
                    I accept the <Link to="/">Terms And Policies</Link> and{" "}
                    <Link to="/">Privacy Policies</Link>
                  </span>
                  {errors.checkPolicy && (
                    <span className="error-message-signup">
                      {errors.checkPolicy}
                    </span>
                  )}
                </div>
                <button id="signup-button" type="submit" onClick={handleSubmit}>
                  Sign Up
                </button>
                <span style={{ textAlign: "center" }}>
                  <Link to="/login-user">Already have an account?</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
