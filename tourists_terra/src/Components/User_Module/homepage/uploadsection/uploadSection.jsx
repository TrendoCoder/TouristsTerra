import React from "react";
import "./uploadSection.css";
import { PermMedia, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/authcontext";
import pic from "../../../../images/profile.jpeg";
const UploadSection = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:3001/api/post", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div id="share">
      <div id="shareWrapper">
        <div id="shareTop">
          <img
            id="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/profileUpload.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.userName + "?"}
            id="shareInput"
            ref={desc}
          />
        </div>
        <hr id="shareHr" />
        {file && (
          <div id="shareImgContainer">
            <img id="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel id="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form id="shareBottom" onSubmit={submitHandler}>
          <div id="shareOptions">
            <label htmlFor="file" id="shareOption">
              <PermMedia htmlColor="tomato" id="shareIcon" />
              <span id="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {/* <div id="shareOption">
              <Label htmlColor="blue" id="shareIcon" />
              <span id="shareOptionText">Tag</span>
            </div>
            <div id="shareOption">
              <Room htmlColor="green" id="shareIcon" />
              <span id="shareOptionText">Location</span>
            </div>
            <div id="shareOption">
              <EmojiEmotions htmlColor="goldenrod" id="shareIcon" />
              <span id="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button id="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadSection;
