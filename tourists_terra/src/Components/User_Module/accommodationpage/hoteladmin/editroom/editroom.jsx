import React, { useState } from "react";
import "./editroom.css";
import axios from "axios";

const EditRoom = ({ room, onClose }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [editedRoom, setEditedRoom] = useState({
    title: room.title,
    photos: room.photos,
    hotelName: room.hotelName,
    roomNumber: room.roomNumber,
    city: room.city,
    address: room.address,
    pricePerNight: room.pricePerNight,
    availabilty: room.availabilty,
    numOfBeds: room.numOfBeds,
    numOfAdults: room.numOfAdults,
    isWifi: room.isWifi,
    isLaundary: room.isLaundary,
    isParking: room.isParking,
    furnished: room.furnished,
    extraFeatures: room.extraFeatures,
    roomDescription: room.roomDescription,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
    title: editedRoom.title,
    hotelName: editedRoom.hotelName,
    roomNumber: editedRoom.roomNumber,
    city: editedRoom.city,
    address: editedRoom.address,
    pricePerNight: editedRoom.pricePerNight,
    availabilty: editedRoom.availabilty,
    numOfBeds: editedRoom.numOfBeds,
    numOfAdults: editedRoom.numOfAdults,
    isWifi:editedRoom.isWifi,
    isLaundary: editedRoom.isLaundary,
    isParking: editedRoom.isParking,
    furnished: editedRoom.furnished,
    extraFeatures: editedRoom.extraFeatures,
    roomDescription: editedRoom.roomDescription,
    };
   if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedPost.photos = fileName;
      try {
        await axios.post(
          "http://localhost:3001/api/upload/hotelimgs/roomimgs",
          data
        );
      } catch (err) {
        console.error(err);
        alert("Error found in uploading img");
      }
    } else {
      updatedPost.photos = editedRoom.photos;
    }
    try {
      await axios.put(
        `http://localhost:3001/api/rooms/${room._id}`,
        updatedPost
      );
      alert("Succesfully Edited");
      window.location.reload();
    } catch (err) {
      alert("Some issue is facing try again later....");
    }
    onClose();
  };

  return (
    <div id="edit-preview-room">
      <div id="edit-preview-room-big-container">
        <div id="edit-preview-close-btn" onClick={onClose}>
          &times;
        </div>
        <div id="edit-room-details">
          <div id="edit-room-details-img">
            {" "}
            <div>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : room.photos
                  ? PF + `/hotelimgs/roomimgs/${room.photos}`
                  : PF + "/profileUpload.png"
              }
              alt={PF + "/profileUpload.png"}
              crossOrigin="anonymous"
            />
            </div>
            <input
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
           
          </div>

          <div id="edit-room-all-details">
            <div>
              <div
                id="edit-room-all-details-row"
                style={{ backgroundColor: "#0F4157" }}
              >
                <p>
                  <strong>Room Title:</strong>
                </p>
                <input
                  type="text"
                  name="title"
                  value={editedRoom.title}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div id="edit-room-all-details-row">
                <p>
                  <strong>Hotel Name:</strong>
                </p>
                <p>{room.hotelName}</p>
              </div>
              <div id="edit-room-all-details-row">
                <p>
                  <strong>Room Number:</strong>
                </p>
                <input
                  type="number"
                  name="roomNumber"
                  value={editedRoom.roomNumber}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div id="edit-room-all-details-row">
                <p>
                  <strong>City:</strong>
                </p>
                <p>{room.city}</p>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Address:</strong>
                </p>
                <p>{room.address}</p>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>
                    Price Per Night in Rs<sub>(incl. tax)</sub>:
                  </strong>
                </p>
                <input
                  type="number"
                  name="pricePerNight"
                  value={editedRoom.pricePerNight}
                  onChange={handleInputChange}
                  min={1}
                ></input>
              </div>
              <div id="edit-room-all-details-row">
                <p>
                  <strong>Availability Status:</strong>{" "}
                </p>
                <select
                  name="availabilty"
                  value={editedRoom.availabilty}
                  onChange={handleInputChange}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Number of Beds: </strong>{" "}
                </p>
                <input
                  type="number"
                  name="numOfBeds"
                  value={editedRoom.numOfBeds}
                  onChange={handleInputChange}
                  min={1}
                ></input>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Number of Adults: </strong>{" "}
                </p>
                <input
                  type="number"
                  name="numOfAdults"
                  value={editedRoom.numOfAdults}
                  onChange={handleInputChange}
                  min={1}
                ></input>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Wifi: </strong>{" "}
                </p>
                <select
                  name="isWifi"
                  value={editedRoom.isWifi}
                  onChange={handleInputChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Laundary: </strong>{" "}
                </p>
                <select
                  name="isLaundary"
                  value={editedRoom.isLaundary}
                  onChange={handleInputChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Parking: </strong>{" "}
                </p>
                <select
                  name="isParking"
                  value={editedRoom.isParking}
                  onChange={handleInputChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div id="edit-room-all-details-row">
                <p>
                  <strong>Furnished: </strong>{" "}
                </p>
                <select
                  name="furnished"
                  value={editedRoom.furnished}
                  onChange={handleInputChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="edit-room-details-extras">
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
            <input
              type="text"
              name="extraFeatures"
              value={editedRoom.extraFeatures}
              onChange={handleInputChange}
            ></input>
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
            <input
              type="text"
              name="roomDescription"
              value={editedRoom.roomDescription}
              onChange={handleInputChange}
            ></input>
          </p>
        </div>
        <div id="edit-room-submit-btn">
          <button onClick={handleEditSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
