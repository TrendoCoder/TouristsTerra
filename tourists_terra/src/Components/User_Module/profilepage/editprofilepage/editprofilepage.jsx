// import React, { useState } from "react";
// import "./editprofilepage.css";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";

// const EditProfilePage = () => {
//   const [userProfileImage, setUserProfileImage] = useState();
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [about, setAbout] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const fieldErrors = {};

//     if (!userName) fieldErrors.userName = "Username is required";
//     if (!email) fieldErrors.email = "Email is required";
//     if (!contact) fieldErrors.contact = "Contact is required";
//     if (!about) fieldErrors.about = "About is required";
//     if (!city) fieldErrors.city = "City is required";
//     if (!country) fieldErrors.country = "Country is required";

//     setErrors(fieldErrors);

//     if (Object.keys(fieldErrors).length > 0) {
//       return;
//     }

//     axios
//       .post("http://localhost:3001/api/users/editprofile", {
//         userProfileImage: userProfileImage,
//         about: about,
//       })
//       .then((res) => {
//         localStorage.setItem("token", JSON.stringify(res.data.token));
//         alert("Successfully Save Changes");
//         Navigate("/profile-page");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div id="edit-profile-main-container">
//       <div id="edit-profile-container">
//         <h3 id="edit-profile-container-heading">
//           <Link to="/">Tourist's </Link>
//         </h3>

//         <div id="u-profile-image">
//           <img src={userProfileImage} alt="Profile Image" />
//           <input
//             type="file"
//             name="userProfileImage"
//             id="profileImage"
//             accept="image/*"
//             value={userProfileImage}
//             onChange={(e) => setUserProfileImage(e.target.files[0])}
//           />
//           <label htmlFor="profileImage">Upload Image</label>
//         </div>

//         <form id="edit-profile-form">
//           <div id="input-group">
//             <label htmlFor="name">Your Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="userName"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             {errors.userName && (
//               <p className="error-message">{errors.userName}</p>
//             )}
//           </div>

//           <div id="input-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>

//           <div id="input-group">
//             <label htmlFor="contact">Contact:</label>
//             <input
//               type="number"
//               id="contact"
//               name="contact"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//             {errors.contact && (
//               <p className="error-message">{errors.contact}</p>
//             )}
//           </div>

//           <div id="input-group">
//             <label htmlFor="about">About:</label>
//             <input
//               type="text"
//               id="about"
//               name="about"
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//             />
//             {errors.about && <p className="error-message">{errors.about}</p>}
//           </div>

//           <div id="input-group">
//             <label htmlFor="city">City:</label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />
//             {errors.city && <p className="error-message">{errors.city}</p>}
//           </div>

//           <div id="input-group">
//             <label htmlFor="country">Country:</label>
//             <input
//               type="text"
//               id="country"
//               name="country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//             />
//             {errors.country && (
//               <p className="error-message">{errors.country}</p>
//             )}
//           </div>

//           <button id="save-btn" onClick={handleSubmit}>
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;
