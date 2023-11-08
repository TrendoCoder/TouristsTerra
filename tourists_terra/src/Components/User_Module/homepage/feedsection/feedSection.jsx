import React, { useEffect, useState } from "react";
import "./feedSection.css";
import axios from "axios";
import pic from "../../../../images/nature.jpg"
const FeedSection = ({ posts }) => {
  console.log(posts);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/user/${posts.userId}`
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, [posts]);
  console.log(users);
  return (
    <div id="big-container-feed">
      <div id="main-container-feed">
        <div id="u-info">
          <div id="u-info-detail">
            <>
              <img src={pic} alt="Profile" />
              <h3>{users.userName}</h3>
            </>
          </div>
          <div id="ellipsis">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div id="u-des">
          <span>{posts.desc}</span>
        </div>
        <div id="u-img">
          <img src={pic} alt="" />
        </div>
        <hr />
        <div id="u-likes">
          <div>
            <i className="fa-regular fa-heart"></i> <span>{posts.likes.length}</span>
          </div>
          <div>
            <i className="fa-regular fa-comment"></i> <span></span>
          </div>
          <div>
            <i className="fa-solid fa-share"></i> <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSection;

