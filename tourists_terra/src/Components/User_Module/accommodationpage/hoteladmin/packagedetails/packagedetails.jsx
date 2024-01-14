import React, { useState } from "react";
import "./packagedetails.css";
import axios from "axios";
const PackageDetails = ({ onClose }) => {
  const [displayPackage, setDisplayPackage] = useState(true);
  const [displayPaymentDetails, setDisplayPaymentDetails] = useState(false);
  const [displayUploadScreenShot, setDisplayUploadScreenShot] = useState(false);
  const [recipt, setrecipt] = useState(null);
  const [imageClicked, setImageClicked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const uploadSS = async () => {
    if (recipt) {
      const data = new FormData();
      const reciptName = Date.now() + recipt.name;
      data.append("name", reciptName);
      data.append("file", recipt);
      try {
        await axios.post(
          "http://localhost:3001/api/upload/paymentScreenShot",
          data
        );
        alert(
          "Your response is Successfully Recieved. Your Ad will run roon after verification"
        );
        setDisplayUploadScreenShot(false);
      } catch (err) {
        console.error(err);
        alert("Error found in uploading img");
      }
    }
  };
  return (
    <>
      {displayPackage && (
        <div id="accomo-pkg-detail-main-container">
          <div id="pkg-close-btn" onClick={onClose}>
            &times;
          </div>
          <div id="accomo-pkg-detail-big-container">
            <h1>Want to reach more users?</h1>
            <span>Currently Available Pacakges</span>
            <div id="accomo-pkg-detail-container">
              <h1>5 day Package</h1>
              <h2>Price: 1000 Rs</h2>
              <h3>Payment Options Available are </h3>
              <div>
                <h2>JazzCash</h2>
                <h2>Bank Transfer</h2>
              </div>
            </div>
            <button
              onClick={() => {
                setDisplayPackage(false);
                setDisplayPaymentDetails(true);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {displayPaymentDetails && (
        <div id="accomo-pkg-detail-main-container">
          <div id="pkg-close-btn" onClick={onClose}>
            &times;
          </div>
          <div id="accomo-pkg-detail-big-container">
            <h1>Payment Methods Available</h1>
            <span>Following are the payment methods</span>
            <div id="accomo-payment-method-container">
              <div id="accomo-payment-method-l-container">
                <h1>
                  <b>Bank Name:</b>HABIB BANK LIMITED
                </h1>
                <h1>
                  <b>Account/Iban:</b> 020908663782918
                </h1>
                <h1>
                  <b>Title: </b>Chaudhary
                </h1>
              </div>
              <div id="accomo-payment-method-r-container">
                <h1>
                  <b>JAZZCASH</b>
                </h1>
                <h1>
                  <b>AccountNum: </b>03056185570
                </h1>
                <h1>
                  <b>Title: </b>Chaudhary
                </h1>
              </div>
            </div>
            <p>
              Note: Pay your featured ads charges and take a screen shot of it
              and send to us. After verification, your ad will be featured for 5
              days.
            </p>
            <div id="accomo-payment-btns">
              <button
                onClick={() => {
                  setDisplayPackage(true);
                  setDisplayPaymentDetails(false);
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setDisplayUploadScreenShot(true);
                  setDisplayPaymentDetails(false);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {displayUploadScreenShot && (
        <div id="accomo-pkg-detail-main-container">
          <div id="pkg-close-btn" onClick={onClose}>
            &times;
          </div>
          <div id="accomo-pkg-detail-big-container">
            <h1>Upload ScreenShot of the recipt.</h1>
            <div id="accomo-payment-method-container">
              <img
                src={
                  recipt
                    ? imageClicked
                      ? URL.createObjectURL(recipt)
                      : PF + "/profileUpload.png"
                    : PF + "/profileUpload.png"
                }
                alt={PF + "/profileUpload.png"}
                crossOrigin="anonymous"
                onClick={() => {
                  recipt && setImageClicked(true);
                  document.getElementById("recipt").click();
                }}
              />

              <input
                type="file"
                id="file"
                onChange={(e) => {
                  setrecipt(e.target.files[0]);
                  setImageClicked(true);
                }}
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
              />
            </div>
            <p>
              Note: Pay your featured ads charges and take a screen shot of it
              and send to us. After verification, your ad will be featured for 5
              days.
            </p>
            <div id="accomo-payment-btns">
              <button
                onClick={() => {
                  setDisplayPaymentDetails(true);
                  setDisplayUploadScreenShot(false);
                }}
              >
                Back
              </button>
              <button onClick={uploadSS}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetails;
