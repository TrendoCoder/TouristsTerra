import React, { useContext, useState } from "react";
import "./edituserprofile.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import uploadImage from "../../../../images/gallery.png";
import { AuthContext } from "../../../../Context/authcontext";

const EditUserProfile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, loading, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [userName, setUserName] = useState(user.userName);
  const [contact, setContact] = useState(user.contact);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [userCoverPicture, setUserCoverPicture] = useState(null);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = {};
    if (!userName) fieldErrors.userName = "Username is required";
    if (!contact) fieldErrors.contact = "Contact is required";
    if (!city) fieldErrors.city = "City is required";
    if (!country) fieldErrors.country = "Country is required";
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      return;
    }
    const updateUser = {
      contact: contact,
      city: city,
      country: country,
      gender: gender,
      about: about,
    };
    if (userProfilePicture) {
      const data = new FormData();
      const fileName = Date.now() + userProfilePicture.name;
      data.append("name", fileName);
      data.append("file", userProfilePicture);
      updateUser.userProfilePicture = fileName;

      try {
        await axios.post(
          "http://localhost:3001/api/upload/profilePicture",
          data
        );
      } catch (err) {
        alert("Issue in Profile Picture");
      }
    } else {
      updateUser.userProfilePicture = user.userProfilePicture;
    }

    if (userCoverPicture) {
      const dataNew = new FormData();
      const fileName = Date.now() + userCoverPicture.name;
      dataNew.append("name", fileName);
      dataNew.append("file", userCoverPicture);
      updateUser.userCoverPicture = fileName;

      try {
        await axios.post(
          "http://localhost:3001/api/upload/profileCoverPic",
          dataNew
        );
      } catch (err) {
        alert("Issue in Cover Picture");
      }
    } else {
      updateUser.userCoverPicture = user.userCoverPicture;
    }

    try {
      await axios.put(`http://localhost:3001/api/user/${user._id}`, updateUser);

      const response = await axios.get(
        `http://localhost:3001/api/user/?userId=${user._id}`
      );
      console.log(response);
      const updatedUser = response.data;
      setUser(updatedUser);
      alert("Successfully updated");
      navigate(`/profile-page/${user.userName}`);
    } catch (err) {
      alert("There is an issue occur.. Try again");
    }
  };

  const handleProfilePictureChange = (e) => {
    setUserProfilePicture(e.target.files[0]);
  };

  const handleCoverPictureChange = (e) => {
    setUserCoverPicture(e.target.files[0]);
  };

  return (
    <div id="editUserProfile-container">
      <div id="edit-user-nav">
        <Link to="/">
          <h2>Tourist's Terra</h2>
        </Link>
        <Link to="/login-user">
          <span>
            Logout <i className="fa-solid fa-right-from-bracket"></i>
          </span>
        </Link>
      </div>

      <div id="editUserProfile-mini-container">
        <form id="editUserProfile-form">
          <div id="editUserProfile-container">
            <div id="editUserProfile-top-container">
              <div id="editUserProfile-image">
                <h3
                  style={{
                    color: "#0E4157",
                    fontWeight: "650",
                    fontSize: "18px",
                  }}
                >
                  Profile Image
                </h3>
                <div id="editUserProfile-image-div">
                  <div id="editUserProfile-image-div-div">
                    <img
                      src={
                        userProfilePicture
                          ? URL.createObjectURL(userProfilePicture)
                          : user.userProfilePicture
                          ? PF + `/profilePicture/${user.userProfilePicture}`
                          : PF + "/profileUpload.png"
                      }
                      crossOrigin="anonymous"
                      alt={uploadImage}
                    />
                  </div>
                  <br />
                  <div id="editUserProfile-image-div-div-file">
                    <input
                      type="file"
                      name=""
                      id=""
                      accept=".png,.jpeg,.jpg"
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="editUserProfile-image">
              <h3
                style={{
                  color: "#0E4157",
                  fontWeight: "650",
                  fontSize: "18px",
                }}
              >
                Cover Image
              </h3>
              <div id="editUserProfile-image-div">
                <div id="editUserProfile-cover-image-div-div">
                  <img
                    src={
                      userCoverPicture
                        ? URL.createObjectURL(userCoverPicture)
                        : user.userCoverPicture
                        ? PF + `/profileCoverPic/${user.userCoverPicture}`
                        : PF + "/profileCoverPic/coverPic.jpg"
                    }
                    crossOrigin="anonymous"
                    alt={uploadImage}
                  />
                </div>
                <br />

                <div id="editUserProfile-image-div-div-file">
                  <input
                    type="file"
                    name=""
                    id=""
                    accept=".png,.jpeg,.jpg"
                    onChange={handleCoverPictureChange}
                  />
                </div>
              </div>
            </div>
            <div id="editUserProfile-bottom-container">
              <h3
                style={{
                  color: "#0E4157",
                  fontWeight: "650",
                  fontSize: "18px",
                }}
              >
                Personal Info.
              </h3>
              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Your name<sup>*</sup>:
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={userName}
                    placeholder="Enter your Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    readOnly
                  />
                  {errors.userName && (
                    <p className="error-message">{errors.userName}</p>
                  )}
                </div>

                <div id="editUserProfile-inputs">
                  <label>
                    Contact<sup>*</sup>:
                  </label>

                  <input
                    type="number"
                    placeholder="0310-0000001"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    City<sup>*</sup>:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    value={city}
                  />
                  {errors.city && (
                    <p className="error-message">{errors.city}</p>
                  )}
                </div>
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Country<sup>*</sup>:
                  </label>
                  <input
                    type="text"
                    value={country}
                    placeholder="Enter country"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                  {errors.country && (
                    <p className="error-message">{errors.country}</p>
                  )}
                </div>
              </div>
              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs-radio">
                  <label htmlFor="">
                    Gender<sup>*</sup>:
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label>Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label>Female</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label>Others</label>
                </div>
              </div>
              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs">
                  <label htmlFor="" style={{ width: "13%" }}>
                    About:
                  </label>
                  <textarea
                    name=""
                    id="textarea-edit"
                    placeholder="You can write maximum 150 characters"
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                    maxLength={150}
                  ></textarea>
                </div>
                {errors.about && (
                  <p className="error-message">{errors.about}</p>
                )}
              </div>
              <div id="editUserProfile-main-inputs">
                <div id="save-changes-btn">
                  <button onClick={onSubmit}>
                    {loading ? "Loading..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
