import React, { useEffect, useState } from "react";
import "./profilefeed.css";
import axios from "axios";
import pic from "../../../../../images/gallery.png";
import { format } from "timeago.js";
const ProfileFeed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/post/profile/${user.userName}`
        );
        console.log(res);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, [posts.userId]);
console.log(posts);
  const likeHandler = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };
  if (!posts) {
    return <div>Loading...</div>;
  }
  return (
    <div id="big-container-feed">
      <div id="main-container-feed">
        <div id="u-info">
          <div id="u-info-detail">
            <>
              <img src={pic} alt="Profile" />
              <h3>{user.userName}</h3>
              <span>{format()}</span>
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
            <i className="fa-regular fa-heart" onClick={likeHandler}></i>{" "}
            <span>{posts.likes}</span>
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

export default ProfileFeed;
