import React from "react";
import "./displaypost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/authcontext";
import ProfilePage from "../../profilepage/profilehomepage/profilepage/profilepage";

const DisplayPost = ({ posts }) => {
  const [likes, setLike] = useState(posts.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(posts.likes.includes(currentUser._id));
  }, [currentUser._id, posts.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/api/user/?userId=${posts.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [posts.userId]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:3001/api/post/" + posts._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div id="main-container-feed">
      <div id="u-info">
        <div id="u-info-detail">
          <Link to={`/profile-page/${user.userName}`}>
            <img
              src={
                user.userProfilePicture
                  ? PF + `/profilePicture/${user.userProfilePicture}`
                  : PF + "/profileUpload.png"
              }
              crossOrigin="anonymous"
              alt={PF + "/profileUpload.png"}
            />
            <h3>{user.userName}</h3>
            <span>{format(posts.createdAt)}</span>
          </Link>
        </div>
        <div id="ellipsis">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      <div id="u-des">
        <span>{posts.desc}</span>
      </div>
      <hr />
      <div id="u-img">
      
        <img
          src={posts.img?PF+`/${posts.img}`:PF+"/profileUpload.png"}
          crossOrigin="anonymous"
          alt=""
        />
      </div>
      <hr />
      <div id="u-likes">
        <div>
          {isLiked ? (
            <i
              class="fa-solid fa-heart"
              style={{ color: "red" }}
              onClick={likeHandler}
            ></i>
          ) : (
            <i className="fa-regular fa-heart" onClick={likeHandler}></i>
          )}{" "}
          <span>{likes}</span>
        </div>
        {/* <div>
          <i className="fa-regular fa-comment"></i> <span></span>
        </div>
        <div>
          <i className="fa-solid fa-share"></i> <span></span>
        </div> */}
      </div>
    </div>
  );
};

export default DisplayPost;
