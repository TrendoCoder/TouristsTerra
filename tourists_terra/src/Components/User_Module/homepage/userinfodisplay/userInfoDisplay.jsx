import React, { useContext } from "react";
import "./userInfoDisplay.css";
import pic from "../../../../images/profile.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/authcontext";
const UserInfoDisplay = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div id="big-container-userInfo">
      <div id="profile-pic">
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
      <div id="profile-name">
        <h4>{user.userName}</h4>
      </div>
      <div id="profile-bio">
        <span>
          {user.about}
        </span>
      </div>
      <div id="user-f-detail">
        <div>
          <span>{user.followers.length}</span>
          <br />
          <span>Followers</span>
        </div>
        <div>
          <span>{user.following.length}</span>
          <br />
          <span>Followings</span>
        </div>
      </div>
      <div id="edit-profilee">
        <Link to={`/profile-page/${user._id}`}>
          <i class="fa-solid fa-pen"></i> Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
