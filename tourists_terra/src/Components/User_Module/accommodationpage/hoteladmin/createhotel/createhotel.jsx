import React, { useContext, useState } from "react";
import "./createhotel.css";
import axios from "axios";
import { AuthContext } from "../../../../../Context/authcontext";
import PackageDetails from "../packagedetails/packagedetails";

const CreateHotel = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Hotel");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState(null);
  const [nameError, setNameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hotelDescriptionError, setHotelDescriptionError] = useState("");
  const [cheapestPriceError, setCheapestPriceError] = useState();
  const [imageClicked, setImageClicked] = useState(false);
  const [showPackage, setShowPackage] = useState(false);
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

    if (!cheapestPrice) {
      setCheapestPriceError("Please enter the cheapest price.");
      isValid = false;
    } else {
      setCheapestPriceError("");
    }

    return isValid;
  };

  const handleAddHotelSubmit = async (e) => {
    e.preventDefault();
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
      featured: featured,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photos = fileName;
      try {
        await axios.post("http://localhost:3001/api/upload/hotelimgs", data);
      } catch (err) {
        console.error(err);
        alert("Error found in uploading img");
      }
    }
    try {
      await axios.post("http://localhost:3001/api/hotels/", newPost);
      console.log(newPost);
      alert("Successfully Posted Your Hotel");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Wait and try again");
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
              value={hotelDescription}
              onChange={(e) => setHotelDescription(e.target.value)}
              rows={8}    
            />
            <p id="error-message">{hotelDescriptionError}</p>
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
              <option value="Apartment">Apartment</option>
              <option value="Resort">Resort</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          <div id="add-hotel-container-rs-numbers">
            <label>Cheapest Price in Rs: </label>
            <input
              type="number"
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
            <select value={featured} onChange={(e) => setFeatured(e.target.value)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          {
            featured && (
              <PackageDetails onClose={() => 
              {
                setShowPackage(false);
                setFeatured(false)
              }
              }
              />
            )
          }
          <div id="add-hotel-container-rs-inputs">
            <button onClick={handleAddHotelSubmit}>Upload Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateHotel;
