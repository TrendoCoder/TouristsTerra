import React, { useState } from "react";
import "./uploadSection.css";
import pic from "../../../../images/profile.jpeg";
import axios from "axios";

const UploadSection = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);

  const onUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("desc", desc);
      formData.append("img", img);

      const res = await axios.post("http://localhost:3001/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div id="big-container-upload">
      <div id="up-img">
        <div>
          <img src={pic} alt="" />
        </div>
        <div id="express-somthing">
          <form>
            <input
              placeholder="Express Your Thoughts"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <hr id="hr1" />
            <div id="upload-button">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
              <div>
                <button onClick={onUpload}>Share</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;

// import React, { useState } from "react";
// import "./uploadSection.css";
// import pic from "../../../../images/profile.jpeg";
// import axios from "axios";

// const UploadSection = () => {

//   const [desc, setDesc] = useState();
//   const [img, setImg] = useState();

//   function onUpload(){
//     axios.get("")
//   }

//   return (
//     <div id="big-container-upload">
//       <div id="up-img">
//         <div>
//           <img src={pic} alt="" />
//         </div>
//         <div id="express-somthing">
//           <form action="">
//             <input placeholder="Express Your Thoughts?"></input>
//             <hr id="hr1" />
//             <div id="upload-button">
//               <div>
//                 <button>
//                   <i class="fa-solid fa-image"></i> Photo
//                 </button>
//               </div>
//               <div>
//                 <button>
//                   <i class="fa-solid fa-video"></i> Video
//                 </button>
//               </div>
//               <div>
//                 <button>
//                   <i class="fa-solid fa-tag"></i> Tag
//                 </button>
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
