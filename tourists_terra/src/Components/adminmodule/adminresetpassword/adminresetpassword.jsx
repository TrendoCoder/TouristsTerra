import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const AdminResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const {userId} = useParams();
    const navigate = useNavigate();
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
    const handleClick = async() => {
  
      if (!password) {
        setPasswordError("Enter some unique password.."
        );
        return;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        return;
      }
      setPasswordError("");
      setConfirmPasswordError("");
      const updateUser = {
        _id: userId,
        password:password
      }
      try{
        await axios.put(`http://localhost:3001/api/admin/resetPassword`, updateUser);
        toast.success("Password successfully set!", {
          onClose: () => {
            alert("Suceesfully Updated...");
            navigate("/login-user");
          },
        });
      }
      catch(err){
  toast.error(err+"Some connectivity error occurs..try again later");
      }
    };
    return (
      <div id="reset-user-pass-big-container">
        <div id="reset-user-pass-main-container">
          <div id="reset-user-pass-sub-container">
            <h1>Set Your New Password</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
            />
            <p>{passwordError}</p>
            <span>Password Strength: {getPasswordStrength()} </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
            />
            <p>{confirmPasswordError}</p>
            <button onClick={handleClick}>Set New Password</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  
}

export default AdminResetPassword