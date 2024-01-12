import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Adminforgetpassword = () => {

    const [email, setEmail] = useState(null);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();
    const handleClick = async (e) => {
      e.preventDefault();
      if (!email) {
        setError("Email cannot be empty");
        return;
      }
      try {
        const validateUser = await axios.get(
          `http://localhost:3001/api/auth/existUser?email=${email}`
        );
        if (validateUser.status === 200) {
          const user = await axios.get(
            `http://localhost:3001/api/user/?email=${email}`
          );
          setUserId(user.data);
          setError("");
          await otpGenerated();
        }
      } catch (err) {
        if (err.response && err.response.status === 900) {
          setError("User doesn't exist");
        } else {
          toast.error(err.message);
        }
      }
    };
    const otpGenerated = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/auth/otpGenerator"
        );
        setDisplay(true);
        toast.success("OTP SENT TO YOUR MAIL", {
          position: toast.POSITION.TOP_LEFT,
        });
  
        await axios.post("http://localhost:3001/api/auth/registerMail", {
          userEmail: email,
          text: response.data.code,
          subject: "OTP For Verification",
        });
      } catch (err) {
        alert(err + "Some issue in generating or verifying Otp");
      }
    };
    const handleConfirmOtpBtn = async () => {
      if (enteredOtp) {
        await verifyOtp(enteredOtp);
      } else {
        alert("You did not enter the OTP. Please try again.");
        setDisplay(false);
      }
    };
    const verifyOtp = async (enteredOtp) => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/auth/verifyOtp?code=${enteredOtp}`
        );
        if(res.status === 200) {
          toast.success("Correct Otp");
            navigate(`/reset-user-password/${userId._id}`);
          setDisplay(false);
        } else {
          toast.error("Oops..Wrong Otp");
          setDisplay(false);
        }
      } catch (err) {
        toast.error(err);
      }
    };
    console.log(userId._id);
    return (
      <div id="forget-user-pass-big-container">
        <div id="forget-user-pass-main-container">
          <div id="forget-user-pass-sub-container">
            <h1>Forget Your Password?</h1>
            <h2>For Recovery</h2>
            <span>Enter your email, we'll send you an OTP</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email..."
            />
            <p>{error}</p>
            <button onClick={handleClick}>Send Otp</button>
          </div>
        </div>
        {display && (
          <div id="otp-container">
            <div id="otp-wrapper">
              <label>Enter Otp</label>
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                }}
              />
              <button onClick={handleConfirmOtpBtn}>Confrim Otp</button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    );
              }
export default Adminforgetpassword