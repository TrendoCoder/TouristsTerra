import axios from "axios";
import "./edithotel.css";
import React, { useState } from "react";

const EditHotel = ({ hotel, onClose }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [editedHotel, setEditedHotel] = useState({
    title: hotel.title,
    name: hotel.name,
    type: hotel.type,
    city: hotel.city,
    address: hotel.address,
    hotelDescription: hotel.hotelDescription,
    cheapestPrice: hotel.cheapestPrice,
    photos: hotel.photos,
    featured: hotel.featured,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHotel((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title: editedHotel.title,
      name: editedHotel.name,
      type: editedHotel.type,
      city: editedHotel.city,
      address: editedHotel.address,
      hotelDescription: editedHotel.hotelDescription,
      cheapestPrice: editedHotel.cheapestPrice,
      featured: editedHotel.featured,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedPost.photos = fileName;
      try {
        await axios.post(
          "http://localhost:3001/api/upload/hotelimgs",
          data
        );
      } catch (err) {
        console.error(err);
        alert("Error found in uploading img");
      }
    } else {
      updatedPost.photos = editedHotel.photos;
    }
    try {
      await axios.put(
        `http://localhost:3001/api/hotels/${hotel._id}`,
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
    <div id="edit-preview-hotel">
      <div id="edit-preview-hotel-big-container">
        <div id="edit-preview-close-btn" onClick={onClose}>
          &times;
        </div>
        <div id="edit-hotel-details">
          <div id="edit-hotel-details-img">
            {" "}
            <div>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : hotel.photos
                    ? PF + `/hotelimgs/${hotel.photos}`
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

          <div id="edit-hotel-all-details">
            <div>
              <div
                id="edit-hotel-all-details-row"
                style={{ backgroundColor: "#0F4157" }}
              >
                <p>
                  <strong>Hotel Name:</strong>
                </p>
                <input
                  type="text"
                  name="name"
                  value={editedHotel.name}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div id="edit-hotel-all-details-row">
                <p>
                  <strong>Title:</strong>
                </p>
                <input
                  type="text"
                  name="title"
                  value={editedHotel.title}
                  onChange={handleInputChange}
                ></input>
              </div>

              <div id="edit-hotel-all-details-row">
                <p>
                  <strong>City:</strong>
                </p>
                <input
                  type="text"
                  name="city"
                  value={editedHotel.city}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div id="edit-hotel-all-details-row">
                <p>
                  <strong>Address:</strong>
                </p>
                <input
                  type="text"
                  name="address"
                  value={editedHotel.address}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div id="edit-hotel-all-details-row">
                <p>
                  <strong>Cheapest Price:</strong>
                </p>
                <input
                  type="text"
                  name="cheapestPrice"
                  value={editedHotel.cheapestPrice}
                  onChange={handleInputChange}
                ></input>
              </div>

              <div id="edit-hotel-all-details-row">
                <p>
                  <strong>Featured: </strong>{" "}
                </p>
                <select
                  name="featured"
                  value={editedHotel.featured}
                  onChange={handleInputChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="edit-hotel-details-extras">
          <p>
            <strong>Hotel Description: </strong>{" "}
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
              name="hotelDescription"
              value={editedHotel.hotelDescription}
              onChange={handleInputChange}
            ></input>
          </p>
        </div>
        <div id="edit-hotel-submit-btn">
          <button onClick={handleEditSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
