import React from "react";
import "./profilepage.css";
import ProfileInfo from "../profileinfo/profileinfo";
import NavBar from "../../../homepage/navbar/navBar";
import ProfileSideBar from "../profilesidebar/profilesidebar";
import MiniNavBar from "../mininavbar/mininavbar";
import FeedSection from "../../../homepage/feedsection/feedSection";
import ProfileFeed from "../profilefeed/profilefeed";
const ProfilePage = () => {
  return (
    <div>
      <NavBar />
      <br />
      <ProfileInfo />
      <div id="mainn-container">
        <div id="profilesidebar-div">
          <ProfileSideBar />
        </div>
        <div id="profile-main-div">
        <div id="mini-nav">
        <MiniNavBar/>
        </div>
        <div id="p-feed">
        <FeedSection/>
        </div>
          {/* <ProfileFeed/> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
