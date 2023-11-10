import React, { useContext, useEffect, useState } from "react";
import "./profilepage.css";
import ProfileInfo from "../profileinfo/profileinfo";
import NavBar from "../../../homepage/navbar/navBar";
import ProfileSideBar from "../profilesidebar/profilesidebar";
import MiniNavBar from "../mininavbar/mininavbar";
import UploadSection from "../../../homepage/uploadsection/uploadSection"
import ProfileFeed from "../profilefeed/profilefeed";
import axios from "axios";
import { AuthContext } from "../../../../../Context/authcontext";
const ProfilePage = () => {
  const {user} = useContext(AuthContext);
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/user/?userName=${user.userName}`
        );
        console.log(res);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, []);
  
  return (
    <div>
      <NavBar />
      <br />
      <ProfileInfo user={users}  />
      <div id="mainn-container">
        <div id="profilesidebar-div">
          <ProfileSideBar />
        </div>
        <div id="profile-main-div">
        <div id="mini-nav">
        <MiniNavBar/>
        </div>
        <div id="profile-upload-section">
          <UploadSection/>
        </div>
        <div id="render-profile-data">
        <ProfileFeed user={users} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
