import React, { useRef, useState } from "react";
import "./displaypost.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/authcontext";

const DisplayPost = ({ posts }) => {
  const [likes, setLike] = useState(posts.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [report, setReport] = useState();
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [editedDesc, setEditedDesc] = useState(posts.desc);
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
  const handleEllipsisClick = () => {
    setShowOptions(!showOptions);
  };
  const handleEditSubmit= async (e) => {
    e.preventDefault();
    const updatedPost = {
      desc: editedDesc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedPost.img = fileName;
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }else{
      updatedPost.img = posts.img;
    }
    try {
      await axios.put(`http://localhost:3001/api/post/${posts._id}?userId=${currentUser._id}`, updatedPost);
      alert("Succesfully Edited")
      window.location.reload();
    } catch (err) {
      alert("Some issue is facing try again later....")
    }
  };
  const handleDeletePost = async () => {
    try{
      await axios.delete(`http://localhost:3001/api/post/${posts._id}?userId=${currentUser._id}`);
      alert("Deleted successfully");
      window.location.reload();
    }catch(err){
      alert(err)
    }
    
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
        <div id="ellipsis" onClick={handleEllipsisClick}>
          <div>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
          {showOptions && (
            <div id="post-report-dropdown">
              {currentUser._id !== posts.userId?<><div
                onClick={() => {
                  setOpenReport(true);
                }}
              >
                <span>Report{"  "}</span>
                <i class="fa-solid fa-flag"></i>
              </div></>:<></>
              }
{currentUser._id === posts.userId?
              <><div
                onClick={() => {
                  setOpenEdit(true);
                }}
              >
                <span>Edit{"  "}</span>
                <i class="fa-solid fa-pen"></i>
              </div>

              <div
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                <span>Delete{"  "}</span>
                <i class="fa-solid fa-trash"></i>
              </div></>:<></>}
            </div>
          )}
        </div>
      </div>
      <div id="u-des">
        <span>{posts.desc}</span>
      </div>
      <hr />
      <div id="u-img">
        <img
          src={posts.img ? PF + `/${posts.img}` : PF + "/profileUpload.png"}
          crossOrigin="anonymous"
          alt=""
        />
      </div>
      <hr />
      <div id="u-likes">
        <div>
          {isLiked ? (
            <i
              className="fa-solid fa-heart"
              style={{ color: "red" }}
              onClick={likeHandler}
            ></i>
          ) : (
            <i className="fa-regular fa-heart" onClick={likeHandler}></i>
          )}{" "}
          <span>{likes}</span>
        </div>
      </div>
      {openReport && (
        <div id="Open-report">
          <div id="rep-post-container">
            <div id="rep-post-wrapper">
              <div id="rep-post-wrapper-sec-one">
                <span>Want to submit a report?</span>
                <i
                  class="fa-solid fa-circle-xmark fa-beat"
                  style={{ color: "#ff1900" }}
                  onClick={() => {
                    setOpenReport(false);
                  }}
                ></i>
              </div>
              <hr />
              <div id="rep-post-wrapper-sec-two">
                <label htmlFor="reportInput">
                  Why are you reporting this post?
                </label>
                <textarea
                  id="reportInput"
                  placeholder="Enter your opinions here..."
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  maxLength={250}
                  rows={5}
                />
                <span>You can write up to 250 characters</span>
              </div>

              <div id="rep-post-wrapper-sec-three">
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openEdit && (
        <div id="Open-report">
          <div id="rep-post-container">
            <div id="rep-edit-wrapper">
             
              <div id="rep-edit-wrapper-sec-one">
                <i
                  className="fa-solid fa-circle-xmark fa-beat"
                  style={{ color: "#ff1900" }}
                  onClick={() => {
                    setOpenEdit(false);
                  }}
                ></i>
              </div>
              <h2 style={{fontWeight:"600"}}>Edit Your Post</h2>
              <div id="rep-edit-wrapper-sec-two">
                <label>Post Description:</label>
                <input
                  type="text"
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                />
              </div>
              <div id="rep-edit-wrapper-sec-three">
                <label>Image:</label>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : posts.img
                      ? PF + `/${posts.img}`
                      : PF + "/profileUpload.png"
                  }
                  alt={PF + "/profileUpload.png"}
                  crossOrigin="anonymous"
                />
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div id="rep-edit-wrapper-sec-four">
                <button onClick={handleEditSubmit}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openDelete && (
        <div id="Open-report">
          <div id="rep-post-container">
            <div id="del-post-wrapper">
              <div id="del-post-wrapper-sec-one">
                <i
                  class="fa-solid fa-circle-xmark fa-beat"
                  style={{ color: "#ff1900" }}
                  onClick={() => {
                    setOpenDelete(false);
                  }}
                ></i>
              </div>
              <div id="del-post-wrapper-sec-two">
                <span>Are you sure you want to delete this post?</span>
                <button
                  id="del-post-wrapper-sec-two-btn1"
                  onClick={handleDeletePost}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setOpenDelete(false);
                  }}
                  id="del-post-wrapper-sec-two-btn2"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPost;