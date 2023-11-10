import React, { useContext, useEffect, useState } from "react";
import "./feedSection.css";
import axios from "axios";
import pic from "../../../../images/nature.jpg";
import { format } from "timeago.js";
import { AuthContext } from "../../../../Context/authcontext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const FeedSection = ({ posts }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState(posts.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const [img, setImg] = useState("");
  useEffect(() => {
    setIsLiked(posts.likes.includes(currentUser._id));
  }, [currentUser._id, posts.likes]);
  const imageUrl = 'http://localhost:3001/images/your-image.jpg';
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/user/?userId=${posts.userId}`
        );
        const imge = axios.get(
          "http://localhost:3001/images/1699593630963gallery.png"
        );
        setImg(imge);
        console.log(img);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, [posts.userId]);

  console.log(users);
  const likeHandler = () => {
    try {
      axios.put("http://localhost:3001/api/post/" + posts._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div id="big-container-feed">
      <div id="main-container-feed">
        <div id="u-info">
          <div id="u-info-detail">
            <>
              <img
                src={ users.profilePicture ? PF+users.profilePicture: PF+"/profileUpload.png"}
                crossOrigin="anonymous"
                alt="Profile"
              />
              <h3>{users.userName}</h3>
              <span>{format(posts.createdAt)}</span>
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
          <img
            src={
              posts.img
                ? PF+`/${posts.img}`
                : PF+"/profileUpload.png"
            }
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
