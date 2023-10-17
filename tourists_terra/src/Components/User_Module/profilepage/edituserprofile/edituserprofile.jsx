import React, { useState } from "react";
import "./edituserprofile.css";
import axios from "axios";
import { Link } from "react-router-dom";
import uploadImage from "../../../../images/gallery.png";
import coverImage from "../../../../images/cover.png";
const EditUserProfile = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [userCoverPicture, setUserCoverPicture] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  function onSubmit(data){
    axios.post();
  }

  return (
    <div id="editUserProfile-container">

<Link to="/"><h2>Tourist's Terra</h2></Link>
      
      <div id="editUserProfile-mini-container">
        <form action="method" id="editUserProfile-form">
          <div id="editUserProfile-container">
            <div id="editUserProfile-top-container">
              <div id="editUserProfile-image">
                <h3 style={{color:"#0E4157"}}>Profile Image</h3>
                <div id="editUserProfile-image-div">
                  <div id="editUserProfile-image-div-div">
                    <img src={uploadImage} alt="" />
                  </div>
                  <br />
                  <div id="editUserProfile-image-div-div-file">
                    <input 
                    type="file" 
                    name="" 
                    id=""   
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="editUserProfile-image">
              <h3 style={{color:"#0E4157"}}>Cover Image</h3>
              <div id="editUserProfile-image-div">
                <div id="editUserProfile-cover-image-div-div">
                  <img src={coverImage} alt="" />
                </div>
                <br />
                <div id="editUserProfile-image-div-div-file">
                  <input type="file" name="" id="" />
                </div>
              </div>
            </div>
            <div id="editUserProfile-bottom-container">
              <h3 style={{color:"#0E4157"}}>Personal Info.</h3>
              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Your name<sup>*</sup>:
                  </label>
                  <input
                   type="text"
                    name="" 
                    id=""
                    placeholder="Enter your Name"
                    onChange={(e)=>{
                      setUserName(e.target.value);
                    }}  

                    />
                </div>
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Your email<sup>*</sup>:
                  </label>
                  <input
                   type="email"
                    name=""
                     id=""
                     placeholder="Enter your Email"
                     onChange={(e)=>{
                      setEmail(e.target.value);
                    }}  
                      />
                </div>
              </div>
              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Password<sup>*</sup>:
                  </label>
                  <input 
                  type="password" 
                  name="" 
                  id=""
                  placeholder="Enter your Password"
                  readOnly />
                </div>
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Contact<sup>*</sup>:
                  </label>
                  <input
                   type="number" 
                   name="" 
                   id=""
                   placeholder="Contact Number"
                   onChange={(e)=>{
                      setContact(e.target.value);
                    }}   />
                </div>
              </div>
             
              
              <div id="editUserProfile-main-inputs">
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    City<sup>*</sup>:
                  </label>
                  <input 
                  type="text"
                   name="" 
                   id=""
                   placeholder="Enter city"
                   onChange={(e)=>{
                      setCity(e.target.value);
                    }}   />
                </div>
                <div id="editUserProfile-inputs">
                  <label htmlFor="">
                    Country<sup>*</sup>:
                  </label>
                  <input 
                  type="text" 
                  name="" 
                  id="" 
                  value=""
                  placeholder="Enter country"
                  onChange={(e)=>{
                      setContact(e.target.value);
                    }}  
                   />
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
                  id="radio-btns-gender" 
                  value="" 
                  onChange={(e)=>{
                      setGender(e.target.value);
                    }}   />

                  <label>Male</label>

                  <input 
                  type="radio" 
                  name="gender" 
                  id="radio-btns-gender" 
                  value="" 
                  onChange={(e)=>{
                      setGender(e.target.value);
                    }}/>
                  <label>Female</label>

                  <input 
                  type="radio" 
                  name="gender" 
                  id="radio-btns-gender" 
                  onChange={(e)=>{
                      setGender(e.target.value);
                    }} />
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
                    onChange={(e)=>{
                      setAbout(e.target.value);
                    }}  
                  ></textarea>
                </div>
              </div>
              <div id="editUserProfile-main-inputs">
                <div id="save-changes-btn">
                  <button onChange={onSubmit}>Save Changes</button>
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
