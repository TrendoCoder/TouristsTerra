import React from "react";
import "./uploadSection.css";
import pic from "../../../../images/profile.jpeg";
const UploadSection = () => {
  return (
    <div id="big-container-upload">
      <div id="up-img">
        <div>
          <img src={pic} alt="" />
        </div>
        <div id="express-somthing">
          <form action="">
            <input placeholder="Express Your Thoughts?"></input>
            <hr id="hr1" />
            <div id="upload-button">
              <div>
                <button>
                  <i class="fa-solid fa-image"></i> Photo
                </button>
              </div>
              <div>
                <button>
                  <i class="fa-solid fa-video"></i> Video
                </button>
              </div>
              <div>
                <button>
                  <i class="fa-solid fa-tag"></i> Tag
                </button>
              </div>

              <div>
                <button>Share</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
