import React, {  useEffect, useState } from "react";
import "./profilepage.css";
import ProfileInfo from "../profileinfo/profileinfo";
import NavBar from "../../../homepage/navbar/navBar";
import ProfileSideBar from "../profilesidebar/profilesidebar";
import MiniNavBar from "../mininavbar/mininavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  console.log(username);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user/?userName=${username}`
      );
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [username]);

  return (
    <div>
      <NavBar />
      <br />
      {Object.keys(user).length === 0 ? (
        <div>Kindly wait a bit</div>
      ) : (
        <ProfileInfo user={user} />
      )}
      <div id="mainn-container">
        <div id="profilesidebar-div">
          <ProfileSideBar user={user} />
        </div>
        <div id="profile-main-div">
          <div id="mini-nav">
            <MiniNavBar username={user.userName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
