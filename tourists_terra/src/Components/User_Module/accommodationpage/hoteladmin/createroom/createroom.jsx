import React, { useContext, useEffect, useState } from "react";
import "./createroom.css";
import axios from "axios";
import { AuthContext } from "../../../../../Context/authcontext";

const CreateRoom = ({ hotels }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [hotel, setHotel] = useState(null);
  const [hotelId, setHotelId] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [numOfBeds, setNumOfBeds] = useState(1);
  const [numOfAdults, setNumOfAdults] = useState(1);
  const [roomNum, setRoomNum] = useState("");
  const [pricePerNight, setPricePerNight] = useState(0);
  const [isWifi, setIsWifi] = useState("false");
  const [isLaundary, setIsLaundary] = useState("false");
  const [isParking, setIsParking] = useState("false");
  const [furnished, setFurnished] = useState(true);
  const [extraFeatures, setExtraFeatures] = useState("");
  const [hotelNameError, setHotelNameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [pricePerNightError, setPricePerNightError] = useState("");
  const [numOfBedsError, setNumOfBedsError] = useState("");
  const [numOfAdultsError, setNumOfAdultsError] = useState("");
  const [roomNumError, setRoomNumError] = useState("");
  const [roomDescriptionError, setRoomDescriptionError] = useState("");
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [imageClicked, setImageClicked] = useState(false);

  const validateFields = () => {
    let isValid = true;

    if (!hotelName) {
      setHotelNameError("Please Select Hotel Name.");
      isValid = false;
    } else {
      setHotelNameError("");
    }

    if (!title) {
      setTitleError("Please enter the title.");
      isValid = false;
    } else {
      setTitleError("");
    }
    if (!roomDescription) {
      setRoomDescriptionError("Please enter the hotel description.");
      isValid = false;
    } else {
      setRoomDescriptionError("");
    }

    if (!pricePerNight) {
      setPricePerNightError("Please enter the cheapest price.");
      isValid = false;
    } else {
      setPricePerNightError("");
    }
    if (!numOfBeds) {
      setNumOfBedsError("Please enter the cheapest price.");
      isValid = false;
    } else {
      setNumOfBedsError("");
    }
    if (!numOfAdults) {
      setNumOfAdultsError("Please enter the cheapest price.");
      isValid = false;
    } else {
      setNumOfAdultsError("");
    }
    if (!roomNum) {
      setRoomNumError("Please enter the cheapest price.");
      isValid = false;
    } else {
      setRoomNumError("");
    }

    return isValid;
  };
  const handleAddRoomSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields() || !file) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    const newPost = {
      hotelId: hotelId,
      hotelName: hotelName,
      title: title,
      city: city,
      address: address,
      roomDescription: roomDescription,
      roomNumber: roomNum,
      numOfBeds: numOfBeds,
      numOfAdults: numOfAdults,
      pricePerNight: pricePerNight,
      isWifi: isWifi,
      isLaundary: isLaundary,
      isParking: isParking,
      extraFeatures: extraFeatures,
      furnished: furnished,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photos = fileName;
      try {
        await axios.post(
          "http://localhost:3001/api/upload/hotelimgs/roomimgs",
          data
        );
      } catch (err) {
        console.error(err);
        alert("Error found in uploading img");
      }
    }
    try {
      await axios.post(`http://localhost:3001/api/rooms/${hotel._id}`, newPost);
      console.log(newPost);
      alert("Successfully Posted Your Rooms");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Wait and try again");
    }
  };

  const getSelectedHotel = async (selectedHotel) => {
    try {
      const res = await axios.get(
       ` http://localhost:3001/api/hotels/?name=${selectedHotel}`
      );
      const updatedHotel = res.data;
      if (updatedHotel.length > 0) {
        setHotel(updatedHotel[0]);
        setHotelId(updatedHotel[0]._id || "");
        setHotelName(updatedHotel[0].name || "");
        setCity(updatedHotel[0].city || "");
        setAddress(updatedHotel[0].address || "");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div id="h-admin-add-hotel-container">
        <div id="h-admin-add-hotel-container-ls">
          <img
            src={
              file
                ? imageClicked
                  ? URL.createObjectURL(file)
                  : PF + "/profileUpload.png"
                : PF + "/profileUpload.png"
            }
            alt={PF + "/profileUpload.png"}
            crossOrigin="anonymous"
            onClick={() => {
              file && setImageClicked(true);
              document.getElementById("file").click();
            }}
          />

          <input
            type="file"
            id="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImageClicked(true);
            }}
            accept=".png,.jpeg,.jpg"
            style={{ display: "none" }}
          />
          <div>
            <label>Hotel Description: </label>
            <textarea
              type="text"
              value={roomDescription}
              onChange={(e) => {
                setRoomDescription(e.target.value);
                setRoomDescriptionError("");
              }}
              rows={8}
            />
            <p id="error-message">{roomDescriptionError}</p>
          </div>
        </div>
        <div id="h-admin-add-hotel-container-rs">
          <div id="add-hotel-container-rs-inputs">
            <label>Hotel:</label>
            <select
              onChange={(e) => {
                getSelectedHotel(e.target.value);
                setHotelNameError("");
              }}
            >
              <option>--Select Hotel--</option>
              {hotels.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <p id="error-message">{hotelNameError}</p>
          </div>

          <div id="add-hotel-container-rs-inputs">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
            />
            <p id="error-message">{titleError}</p>
          </div>

          <div id="add-hotel-container-rs-inputs">
            <label>City:</label>
            <input type="text" value={city} readOnly />
          </div>

          <div id="add-hotel-container-rs-inputs">
            <label>Address:</label>
            <input type="text" value={address} readOnly />
          </div>
          <div id="add-hotel-container-rs-numbers">
            <label>Room Number: </label>
            <input
              type="number"
              id="num-inpts"
              value={roomNum}
              onChange={(e) => {
                setRoomNum(e.target.value);
                setRoomNumError("");
              }}
              min={1}
            />
          </div>
          <p id="error-message" style={{ padding: "0px 10px" }}>
            {roomNumError}
          </p>
          <div id="add-hotel-container-rs-numbers">
            <label>Price per night in Rs (inc. tax): </label>
            <input
              type="number"
              id="num-inpts"
              value={pricePerNight}
              onChange={(e) => {
                setPricePerNight(e.target.value);
                setPricePerNightError("");
              }}
              min={1}
            />
          </div>
          <p id="error-message" style={{ padding: "0px 10px" }}>
            {pricePerNightError}
          </p>

          <div id="add-hotel-container-rs-numbers">
            <label>Number of beds: </label>
            <input
              type="number"
              id="num-inpts"
              value={numOfBeds}
              onChange={(e) => {
                setNumOfBeds(e.target.value);
                setNumOfBedsError("");
              }}
              min={1}
            />
          </div>
          <p id="error-message" style={{ padding: "0px 10px" }}>
            {numOfBedsError}
          </p>
          <div id="add-hotel-container-rs-numbers">
            <label>Maximum Number of Adults: </label>
            <input
              type="number"
              id="num-inpts"
              value={numOfAdults}
              onChange={(e) => {
                setNumOfAdults(e.target.value);
                setNumOfAdultsError("");
              }}
              min={1}
            />
          </div>
          <p id="error-message" style={{ padding: "0px 10px" }}>
            {numOfAdultsError}
          </p>
          <div id="add-hotel-container-rs-inputs">
            <label>Wifi: </label>
            <select onChange={(e) => setIsWifi(e.target.value)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div id="add-hotel-container-rs-inputs">
            <label>Laundary: </label>
            <select onChange={(e) => setIsLaundary(e.target.value)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div id="add-hotel-container-rs-inputs">
            <label>Parking: </label>
            <select onChange={(e) => setIsParking(e.target.value)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div id="add-hotel-container-rs-inputs">
            <label>Extra Features?</label>
            <textarea
              type="text"
              value={extraFeatures}
              onChange={(e) => setExtraFeatures(e.target.value)}
              rows={4}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "10px 15px",
              }}
            />
            <p id="error-message">{}</p>
          </div>
          <div id="add-hotel-container-rs-inputs">
            <label>Furnished: </label>
            <select onChange={(e) => setFurnished(e.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div id="add-hotel-container-rs-inputs">
            <button onClick={handleAddRoomSubmit}>Upload Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
