import React from "react";
import "./previewserviceprovider.css";
import axios from "axios";
const PreviewServiceProvider = ({ serviceProvider, onClose }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const approveServiceProvider = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/serviceProvider/${serviceProvider._id}`,
        { status: "Approved" }
      );
      await axios.put(
        `http://localhost:3001/api/user/${serviceProvider.userId}`,
        {
          isAccomodationAdmin: true,
        }
      );
      alert("Successfully Approved");
      window.location.reload();
    } catch (err) {
      alert(err + "Some issue occur..try again");
    }
  };
  const disApproveServiceProvider = async () => {
    try {
      axios.put(
        `http://localhost:3001/api/serviceProvider/${serviceProvider._id}`,
        { status: "Disapproved" }
      );
      await axios.put(
        `http://localhost:3001/api/user/${serviceProvider.userId}`,
        {
          isAccomodationAdmin: false,
        }
      );
      alert("Successfully Disapproved");
      window.location.reload();
    } catch (err) {
      alert(err + "Some issue occur..try again");
    }
  };
  const suspendServiceProvider = async () => {
    try {
      axios.put(
        `http://localhost:3001/api/serviceProvider/${serviceProvider._id}`,
        { status: "Suspend" }
      );
      await axios.put(
        `http://localhost:3001/api/user/${serviceProvider.userId}`,
        {
          isAccomodationAdmin: false,
        }
      );
      alert("Suspend this user");
      window.location.reload();
    } catch (err) {
      alert(err + "Some issue occur..try again");
    }
  };
  return (
    <div id="preview-sp">
      <div id="preview-sp-big-container">
        <div id="preview-close-btn" onClick={onClose}>
          &times;
        </div>
        <div id="preview-sp-details">
          <div id="preview-sp-details-img">
            {" "}
            <img
              src={
                serviceProvider.idCardFrontImg
                  ? PF + `/idcardfrontpic/${serviceProvider.idCardFrontImg}`
                  : PF + "/profileUpload.png"
              }
              alt={PF + "/profileUpload.png"}
              crossOrigin="anonymous"
            />
            <span>Id card front side</span>
            <img
              src={
                serviceProvider.idCardBackImg
                  ? PF + `/idcardbackpic/${serviceProvider.idCardBackImg}`
                  : PF + "/profileUpload.png"
              }
              alt={PF + "/profileUpload.png"}
              crossOrigin="anonymous"
            />
            <span>Id card Back side</span>
          </div>

          <div id="preview-sp-all-details">
            <div>
              <div
                id="preview-sp-all-details-row"
                style={{ backgroundColor: "#0F4157" }}
              >
                <p>
                  <strong>First Name:</strong>
                </p>
                <p>{serviceProvider.firstName}</p>
              </div>
              <div id="preview-sp-all-details-row">
                <p>
                  <strong>Last Name:</strong>
                </p>
                <p>{serviceProvider.lastName}</p>
              </div>
              <div id="preview-sp-all-details-row">
                <p>
                  <strong>Email:</strong>
                </p>
                <p>{serviceProvider.email}</p>
              </div>
              <div id="preview-sp-all-details-row">
                <p>
                  <strong>Contact:</strong>
                </p>
                <p>{serviceProvider.contact}</p>
              </div>

              <div id="preview-sp-all-details-row">
                <p>
                  <strong>Cnic:</strong>
                </p>
                <p>{serviceProvider.cnic}</p>
              </div>
              <div id="preview-sp-all-details-row">
                <p>
                  <strong>City:</strong>{" "}
                </p>
                <p>{serviceProvider.city}</p>
              </div>
              <div id="preview-sp-all-details-row">
                <p>
                  <strong>Experience:</strong>
                </p>
                <p>{serviceProvider.experience}</p>
              </div>

              <div id="preview-sp-all-details-row">
                <p>
                  <strong>Languages: </strong>{" "}
                </p>
                <p>{serviceProvider.language}</p>
              </div>

              <div id="preview-sp-all-details-row">
              <p>
              <strong>Request For: </strong>{" "}
            </p>
                <p>{serviceProvider.requestFor}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="preview-sp-btns">
          {serviceProvider.status === "Approved" ? (
            <>
              <button onClick={disApproveServiceProvider}>DisApprove</button>
              <button onClick={suspendServiceProvider}>Suspend</button>
            </>
          ) : serviceProvider.status === "Disapproved" ? (
            <>
              <button onClick={suspendServiceProvider}>Suspend</button>
              <button onClick={approveServiceProvider}>Approve</button>
            </>
          ) : serviceProvider.status === "Pending" ? (
            <>
              <button onClick={suspendServiceProvider}>Suspend</button>
              <button onClick={disApproveServiceProvider}>DisApprove</button>
              <button onClick={approveServiceProvider}>Approve</button>
            </>
          ) : serviceProvider.status === "Suspend" ? (
            <>
              <button onClick={disApproveServiceProvider}>DisApprove</button>
              <button onClick={approveServiceProvider}>Approve</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewServiceProvider;
