import React from "react";
import "./uploadSection.css";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/authcontext";


const UploadSection = ({data}) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef(data);
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user?._id,
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
              user?.userProfilePicture
                ? PF + `/profilePicture/${user?.userProfilePicture}`
                : PF + "/profileUpload.png"
            }
            crossOrigin="anonymous"
            alt={PF + "/profileUpload.png"}
          />
          <input
            placeholder={"What's in your mind " + user?.userName + "?"}
            id="shareInput"
            ref={desc}
          />
        </div>
        <hr id="shareHr" />
        {file && (
          <div id="shareImgContainer">
            <img id="shareImg" src={URL.createObjectURL(file)} alt="" />
            <i
              class="fa-solid fa-circle-xmark fa-beat"
              style={{ color: "#ff0505" }}
              id="shareCancelImg"
              onClick={() => setFile(null)}
            ></i>
          </div>
        )}
        <form id="shareBottom" onSubmit={submitHandler}>
          <div id="shareOptions">
            <label htmlFor="file" id="shareOption">
              <i
                class="fa-solid fa-images fa-beat"
                style={{ color: "#ff1100" }}
                id="shareIcon"
              ></i>
              <span id="shareOptionText"> {"   "}Photo</span>

              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {/* Add more icons as needed */}
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
