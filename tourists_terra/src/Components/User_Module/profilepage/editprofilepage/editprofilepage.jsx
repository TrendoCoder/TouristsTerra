import React, { useEffect, useState } from "react";
import "./editprofilepage.css";
import pic from "../../../../images/ad1.jpg";
import { Navigate } from "react-router-dom";
import axios from "axios";
const EditProfilePage = () => {
  const [userProfileImage, setUserProfileImage] = useState();
  const [userName, setuserName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [about, setAbout] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();

  const handleUserProfileImage = (e) => {
    setUserProfileImage(e.target.files[0]);
  };
  const handleSetUserName = (e) => {
    setuserName(e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSetContact = (e) => {
    setContact(e.target.value);
  };
  const handleSetAbout = (e) => {
    setAbout(e.target.value);
  };
  const handleSetCity = (e) => {
    setCity(e.target.value);
  };
  const handleSetCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users/editprofile",
        {
          userProfileImage: userProfileImage,
          about: about,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        alert("Successfully Save Changes");
        Navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="edit-profile-main-container">
      <div id="edit-profile-container">
        <h2>Tourist's Terra</h2>

        <div id="u-profile-image">
          <img src={userProfileImage} alt="Profile Image" />
          <input
            type="file"
            name="userProfileImage"
            id="profileImage"
            accept="image/*"
            value={userProfileImage}
            onChange={handleUserProfileImage}
          />
          <label htmlFor="profileImage">Upload Image</label>
        </div>

        <form action="/user" method="POST" id="edit-profile-form">
          <div id="input-group">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="userName" />
          </div>

          <div id="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleSetEmail}
            />
          </div>

          <div id="input-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="number"
              id="contact"
              name="contact"
              value={contact}
              onChange={handleSetContact}
            />
          </div>

          <div id="input-group">
            <label htmlFor="about">About:</label>
            <input
              type="text"
              id="about"
              name="about"
              value={about}
              onChange={handleSetAbout}
            />
          </div>

          <div id="input-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleSetCity}
            />
          </div>

          <div id="input-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={handleSetCountry}
            />
          </div>

          <button id="save-btn" onClick={handleSubmit}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
