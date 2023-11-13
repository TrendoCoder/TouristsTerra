import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./hoteladminhomepage.css";
import useFetch from "../../../../../Hooks/usefetch";
import pic from "../../../../../images/hotel.jpeg";
import axios from "axios";
import { AuthContext } from "../../../../../Context/authcontext";

const HotelAdminHomePage = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [featured, setFeatured] = useState(false);
  const [clickNumber, setClickNumber] = useState(1);
  const [file, setFile] = useState(null);
  const [nameError, setNameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hotelDescriptionError, setHotelDescriptionError] = useState("");
  const [roomsError, setRoomsError] = useState("");
  const [cheapestPriceError, setCheapestPriceError] = useState("");

  const { data, loading } = useFetch("http://localhost:3001/api/hotels/");

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const validateFields = () => {
    let isValid = true;

    if (!name) {
      setNameError("Please enter the hotel name.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!title) {
      setTitleError("Please enter the title.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!city) {
      setCityError("Please enter the city.");
      isValid = false;
    } else {
      setCityError("");
    }

    if (!address) {
      setAddressError("Please enter the address.");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!hotelDescription) {
      setHotelDescriptionError("Please enter the hotel description.");
      isValid = false;
    } else {
      setHotelDescriptionError("");
    }

    if (!rooms) {
      setRoomsError("Please enter the number of rooms.");
      isValid = false;
    } else {
      setRoomsError("");
    }

    if (!cheapestPrice) {
      setCheapestPriceError("Please enter the cheapest price.");
      isValid = false;
    } else {
      setCheapestPriceError("");
    }

    return isValid;
  };

  const handleAddHotelSubmit = async () => {
    if (!validateFields() || !file) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const newPost = {
      userId: user._id,
      name: name,
      title: title,
      city: city,
      address: address,
      type: type,
      hotelDescription: hotelDescription,
      cheapestPrice: cheapestPrice,
      totalRooms: rooms,
      featured: featured,
    };

    const formData = new FormData();
    const fileName = Date.now() + file.name;
    formData.append("name", fileName);
    formData.append("file", file);
    newPost.photos = fileName;

    try {
      await axios.post("http://localhost:3001/api/upload/hotelimgs", formData);
    } catch (err) {
      console.error(err);
      alert("Error found in uploading img");
    }

    try {
      await axios.post("http://localhost:3001/api/hotels/", newPost);
      console.log(newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Wait and try again");
    }
  };

  return (
    <div id="hotel-admin-main-container">
      <div id="admin-nav">
        <div>
          <h3 id="admin-name">Hi {user.userName}</h3>
        </div>
        <div id="admin-nav-right">
          <Link to="/accommodation">
            <button id="switch-to-au-btn">Switch to User Mode</button>
          </Link>
          <Link to="">
            LogOut <i className="fa-solid fa-right-from-bracket"></i>
          </Link>
        </div>
      </div>
      <div id="hotel-admin-container">
        <div id="h-admin-left-side">
          <div id="dashboard-heading">
            <i className="fa-solid fa-vector-square"></i>
            <h3>Dashboard</h3>
          </div>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(1)}>
              <i className="fa-solid fa-list"></i>
              <h3>List of All Hotels</h3>
            </div>
          </Link>

          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(2)}>
              <i className="fa-solid fa-list"></i>
              <h3>List of All Rooms</h3>
            </div>
          </Link>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(3)}>
              <i className="fa-solid fa-hotel"></i>
              <h3>Add New Hotel</h3>
            </div>
          </Link>
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(4)}>
              <i className="fa-solid fa-bed"></i>
              <h3>Add New Room</h3>
            </div>
          </Link>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(5)}>
              <i className="fa-solid fa-trash"></i>
              <h3>Remove a Hotel</h3>
            </div>
          </Link>
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(6)}>
              <i className="fa-solid fa-trash"></i>
              <h3>Remove a Room</h3>
            </div>
          </Link>
        </div>
        <div id="h-admin-right-side">
          {clickNumber === 1 ? (
            <div id="h-admin-right-side-container">
              <h2>List of All Hotels</h2>
              <div id="loah-container">
                {loading ? (
                  "Loading please wait"
                ) : (
                  <>
                    {data &&
                      data.map((item, i) => (
                        <div id="list-all-hotels" key={i}>
                          <div id="hotel-imgs">
                            <img src={pic} alt="" />
                          </div>
                          <div id="list-hotel-info">
                            <h3>
                              Hotel_Id: <span id="h3-span">{item._id}</span>
                            </h3>
                            <h3>
                              Title: <span>{item.title}</span>
                            </h3>
                            <h3>
                              Name: <span>{item.name}</span>
                            </h3>
                            <h3>
                              Type: <span>{item.type}</span>
                            </h3>
                            <h3>
                              City: <span>{item.city}</span>
                            </h3>
                            <h3>
                              Rooms: <span>{item.rooms.length}</span>
                            </h3>
                            <h3>
                              Address: <span>{item.address}</span>
                            </h3>
                            <h3>
                              Price: <span>{item.cheapestPrice}</span>
                            </h3>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          ) : clickNumber === 2 ? (
            <div id="h-admin-right-side-container">
              <h2>List of All Rooms</h2>
            </div>
          ) : clickNumber === 3 ? (
            <div id="h-admin-right-side-container">
              <h2>Add New Hotel</h2>
              <div id="h-admin-add-hotel-container">
                <div id="h-admin-add-hotel-container-ls">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : PF + "/profileUpload.png"
                    }
                    alt={PF + "/profileUpload.png"}
                    crossOrigin="anonymous"
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept=".png,.jpeg,.jpg"
                    style={{ display: "none" }}
                  />
                  <div>
                    <label>Hotel Description: </label>
                    <textarea
                      type="text"
                      value={hotelDescription}
                      onChange={(e) => setHotelDescription(e.target.value)}
                    />
                    <p id="error-message">
                      {!hotelDescription &&
                        "Please enter the hotel description."}
                    </p>
                  </div>
                </div>
                <div id="h-admin-add-hotel-container-rs">
                  <div id="add-hotel-container-rs-inputs">
                    <label>Hotel Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p id="error-message">{nameError}</p>
                  </div>

                  <div id="add-hotel-container-rs-inputs">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <p id="error-message">{titleError}</p>
                  </div>

                  <div id="add-hotel-container-rs-inputs">
                    <label>City:</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <p id="error-message">{cityError}</p>
                  </div>

                  <div id="add-hotel-container-rs-inputs">
                    <label>Address:</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p id="error-message">{addressError}</p>
                  </div>

                  <div id="add-hotel-container-rs-inputs">
                    <label>Type:</label>
                    <select onChange={(e) => setType(e.target.value)}>
                      <option value="Hotel">Hotel</option>
                      <option value="Local Hotel">Local Hotel</option>
                      <option value="Appartment">Appartment</option>
                      <option value="Resort">Resort</option>
                      <option value="Villa">Villa</option>
                    </select>
                  </div>

                  <div id="add-hotel-container-rs-numbers">
                    <label>Number of Rooms: </label>
                    <input
                      type="number"
                      name=""
                      id="num-inpts"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                    />
                  </div>
                  <p id="error-message" style={{ padding: "0px 15px" }}>
                    {roomsError}
                  </p>
                  <div id="add-hotel-container-rs-numbers">
                    <label>Cheapest Price in Rs: </label>
                    <input
                      type="number"
                      name=""
                      id="num-inpts"
                      value={cheapestPrice}
                      onChange={(e) => setCheapestPrice(e.target.value)}
                    />
                  </div>
                  <p id="error-message" style={{ padding: "0px 15px" }}>
                    {cheapestPriceError}
                  </p>

                  <div id="add-hotel-container-rs-inputs">
                    <label>Featured:</label>
                    <select onChange={(e) => setFeatured(e.target.value)}>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>

                  <div id="add-hotel-container-rs-inputs">
                    <button onClick={handleAddHotelSubmit}>Upload Post</button>
                  </div>
                </div>
              </div>
            </div>
          ) : clickNumber === 4 ? (
            <div id="h-admin-right-side-container">
              <h2>Add New Room</h2>
            </div>
          ) : clickNumber === 5 ? (
            <div id="h-admin-right-side-container">
              <h2>Remove a Hotel</h2>
            </div>
          ) : clickNumber === 6 ? (
            <div id="h-admin-right-side-container">
              <h2>Remove a Room</h2>
            </div>
          ) : (
            <div id="h-admin-right-side-container">
              <h2>Wait or click again</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelAdminHomePage;
