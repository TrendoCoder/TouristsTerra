import React, { useContext, useEffect, useState } from "react";
import "./profilepage.css";
import ProfileInfo from "../profileinfo/profileinfo";
import NavBar from "../../../homepage/navbar/navBar";
import ProfileSideBar from "../profilesidebar/profilesidebar";
import MiniNavBar from "../mininavbar/mininavbar";
import { useParams } from "react-router";
import axios from "axios";

const ProfilePage = () => {
  const { userName } = useParams();
  const [user, setUser] = useState({});
  console.log(userName);

  const fetchUsers = async () => {
    try {
      console.log("Fetching user data...");
      const res = await axios.get(
        `http://localhost:3001/api/user/?userName=${userName}`
      );
      console.log(res.data);
      setUser(res.data);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userName]);

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
          <ProfileSideBar />
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
