import React from "react";
import "./sidebar.css";
import UserInfoDisplay from "../userinfodisplay/userInfoDisplay";
const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="profile-details">
        <UserInfoDisplay />
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
