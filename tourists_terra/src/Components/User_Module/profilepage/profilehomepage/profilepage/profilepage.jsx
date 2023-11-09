import React, { useEffect, useState } from "react";
import "./profilepage.css";
import ProfileInfo from "../profileinfo/profileinfo";
import NavBar from "../../../homepage/navbar/navBar";
import ProfileSideBar from "../profilesidebar/profilesidebar";
import MiniNavBar from "../mininavbar/mininavbar";
import FeedSection from "../../../homepage/feedsection/feedSection";
import ProfileFeed from "../profilefeed/profilefeed";
import axios from "axios";
const ProfilePage = () => {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/user/?userName=Sha"
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
        <div id="render-profile-data">
        <ProfileFeed user={users} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
{/* <div id="p-feed">
<FeedSection/>
</div> */}
  {/* <ProfileFeed/> */}