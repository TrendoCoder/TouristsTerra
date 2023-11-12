import React, { useContext, useState } from "react";
import "./profileinfo.css";
import img from "./../../../../../images/profile.jpeg";
import { AuthContext } from "../../../../../Context/authcontext";
const ProfileInfo = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div id="p-main-container">
      <div id="p-main-container-lite">
        <img
          src={
            user.userCoverPicture
              ? PF + `/profileCoverPic/${user.userCoverPicture}`
              : PF + "/coverPic.jpg"
          }
          crossOrigin="anonymous"
          alt={PF + "/coverPic.jpg"}
        />
        <div id="p-main-container-lite-opacity">
          <div id="p-alignments">
            <div id="p-img">
              <img
                src={
                  user.userProfilePicture
                    ? PF + `/profilePicture/${user.userProfilePicture}`
                    : PF + "/profileUpload.png"
                }
                crossOrigin="anonymous"
                alt={PF + "/profileUpload.png"}
              />
            </div>
            <div id="p-detail">
              <div id="p-name">
                <span>{user.userName}</span>
              </div>
              <div id="p-loca">
                <div>
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>Lahore, Pakistan</div>
              </div>
              <div id="p-row">
                <div id="p-row-left">
                  <span>Traveller</span>
                </div>
                <div id="p-row-right">
                  <span>Not Verified</span>
                </div>
              </div>
            </div>
            <div id="followers-detail">
              <div id="p-following">
                <h3>{user.following.length}</h3>
                <span>Following</span>
              </div>
              <div id="p-pics">
                <h3>142</h3>
                <span>Photos</span>
              </div>
              <div id="p-followers">
                <h3>{user.followers.length}</h3>
                <span>Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
