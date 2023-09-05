import React from "react";
import "./userInfoDisplay.css";
import pic from "../../../../images/profile.jpeg";
import { Link, useNavigate } from "react-router-dom";
const UserInfoDisplay = () => {
  return (
    <div id="big-container-userInfo">
      <div id="profile-pic">
      <img src={pic} alt="" />
      </div>
      <div id="profile-name">
        <h4>Shamir Hussain</h4>
      </div>
      <div id="profile-bio">
        <span>A passionate Explorer Traveller, skilled Tracker, and fearless Solo Rider, on a quest to unravel the world's hidden wonders.</span>
      </div>
      <div id="user-f-detail">
        <div>
        <span>1.1m</span>
        <br />
        <span>Followers</span>
        </div>
        <div>
        <span>10</span>
        <br />
        <span>Followings</span>
        </div>
      </div>
      <div id="edit-profilee">
        <Link to="/profile-page">
        <i class="fa-solid fa-pen"></i> Edit Profile 
        </Link>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
