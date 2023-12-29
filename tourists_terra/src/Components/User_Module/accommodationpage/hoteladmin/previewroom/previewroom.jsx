import React from "react";
import "./previewroom.css";

const PreviewRoom = ({ room, onClose }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div id="preview-room">
      <div id="preview-room-big-container">
        <div id="preview-close-btn" onClick={onClose}>
          &times;
        </div>
        <div id="preview-room-details">
          <div id="preview-room-details-img">
            {" "}
            <img
              src={
                room.photos
                  ? PF + `/hotelimgs/roomimgs/${room.photos}`
                  : PF + "/profileUpload.png"
              }
              alt={PF + "/profileUpload.png"}
              crossOrigin="anonymous"
            />
          </div>

          <div id="preview-room-all-details">
            <div>
              <div
                id="preview-room-all-details-row"
                style={{ backgroundColor: "#0F4157" }}
              >
                <p>
                  <strong>Room Title:</strong>
                </p>
                <p>{room.title}</p>
              </div>
              <div id="preview-room-all-details-row">
                <p>
                  <strong>Hotel Name:</strong>
                </p>
                <p>{room.hotelName}</p>
              </div>
              <div id="preview-room-all-details-row">
                <p>
                  <strong>Room Number:</strong>
                </p>
                <p>{room.roomNumber}</p>
              </div>
              <div id="preview-room-all-details-row">
                <p>
                  <strong>City:</strong>
                </p>
                <p>{room.city}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Address:</strong>
                </p>
                <p>{room.address}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Price Per Night:</strong>
                </p>
                <p>{room.pricePerNight}</p>
              </div>
              <div id="preview-room-all-details-row">
                <p>
                  <strong>Availability Status:</strong>{" "}
                </p>
                <p>{room.availabilty ? "Available" : "Unavailable"}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Number of Beds: </strong>{" "}
                </p>
                <p>{room.numOfBeds}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Number of Adults: </strong>{" "}
                </p>
                <p>{room.numOfAdults}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Wifi: </strong>{" "}
                </p>
                <p>{room.isWifi ? "Yes" : "No"}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Laundary: </strong>{" "}
                </p>
                <p>{room.isLaundary ? "Yes" : "No"}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Parking: </strong>{" "}
                </p>
                <p>{room.isParking ? "Yes" : "No"}</p>
              </div>

              <div id="preview-room-all-details-row">
                <p>
                  <strong>Furnished: </strong>{" "}
                </p>
                <p>{room.furnished ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="preview-room-details-extras">
          <p>
            <strong>Extra Features: </strong>{" "}
          </p>
          <p
            style={{
              border: "2px solid #0F4157",
              padding: "5px 8px",
              borderRadius: "5px",
            }}
          >
            {room.extraFeatures
              ? room.extraFeatures
              : "No Extra Features Available"}
          </p>
          <p>
            <strong>Room Description: </strong>{" "}
          </p>
          <p
            style={{
              border: "2px solid #0F4157",
              padding: "5px 8px",
              borderRadius: "5px",
            }}
          >
            {room.roomDescription
              ? room.roomDescription
              : "No Description available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewRoom;
