import React from "react";
import "./uploadSection.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/authcontext";
import pic from "../../../../images/profile.jpeg";
const UploadSection = () => {
  const { user } = useContext(AuthContext);
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
        await axios.post("http://localhost:3001/api/post", data);
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
          <img id="shareProfileImg" src={pic} alt="" />
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

// import React, { useContext, useState } from "react";
// import "./uploadSection.css";
// import pic from "../../../../images/profile.jpeg";
// import axios from "axios";
// import { AuthContext } from "../../../../Context/authcontext";

// const UploadSection = () => {
//   const [desc, setDesc] = useState("");
//   const [img, setImg] = useState(null);
//   const {user} = useContext(AuthContext);

//   const onUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("desc", desc);
//       formData.append("img", img);

//       const res = await axios.post("http://localhost:3001/api/post", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(res);
//     } catch (error) {
//       console.error("Error uploading:", error);
//     }
//   };

//   return (
//     <div id="big-container-upload">
//       <div id="up-img">
//         <div>
//           <img src={pic} alt="" />
//         </div>
//         <div id="express-somthing">
//           <form>
//             <input
//               placeholder={`Express Your Thoughts + ${user.userName}`}
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//             <hr id="hr1" />
//             <div id="upload-button">
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImg(e.target.files[0])}
//                 />
//               </div>
//               <div>
//                 <button onClick={onUpload}>Share</button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadSection;

// // import React, { useState } from "react";
// // import "./uploadSection.css";
// // import pic from "../../../../images/profile.jpeg";
// // import axios from "axios";

// // const UploadSection = () => {

// //   const [desc, setDesc] = useState();
// //   const [img, setImg] = useState();

// //   function onUpload(){
// //     axios.get("")
// //   }

// //   return (
// //     <div id="big-container-upload">
// //       <div id="up-img">
// //         <div>
// //           <img src={pic} alt="" />
// //         </div>
// //         <div id="express-somthing">
// //           <form action="">
// //             <input placeholder="Express Your Thoughts?"></input>
// //             <hr id="hr1" />
// //             <div id="upload-button">
// //               <div>
// //                 <button>
// //                   <i class="fa-solid fa-image"></i> Photo
// //                 </button>
// //               </div>
// //               <div>
// //                 <button>
// //                   <i class="fa-solid fa-video"></i> Video
// //                 </button>
// //               </div>
// //               <div>
// //                 <button>
// //                   <i class="fa-solid fa-tag"></i> Tag
// //                 </button>
// //               </div>

// //               <div>
// //                 <button onClick={onUpload}>Share</button>
// //               </div>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UploadSection;
