import React from "react";
import "./feedSection.css";
import pic from "../images/profile2.jpeg";
import pic2 from "../images/nature.jpg";
const FeedSection = () => {
  return (
    <div id="big-container-feed">
      <div id="main-container-feed">
        <div id="u-info">
          <div id="u-info-detail">
            <div>
              <img src={pic} alt="" />
            </div>
            <div>
              <h3>Shamir Hussain</h3>
            </div>
          </div>
          <div id="ellipsis">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div id="u-des">
          <span>An amazing tour to NORTHERN Areas</span>
        </div>
        <div id="u-img">
          <img src={pic2} alt="" />
        </div>
        <div id="u-likes">
          <div>
            <i class="fa-regular fa-heart"></i> <span>100</span>
          </div>
          <div>
            <i class="fa-regular fa-comment"></i> <span>2</span>
          </div>
          <div>
            <i class="fa-solid fa-share"></i> <span>3</span>
          </div>
        </div>
      </div>
      <div id="main-container-feed">
        <div id="u-info">
          <div id="u-info-detail">
            <div>
              <img src={pic} alt="" />
            </div>
            <div>
              <h3>Shamir Hussain</h3>
            </div>
          </div>
          <div id="ellipsis">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div id="u-des">
          <span>An amazing tour to NORTHERN Areas</span>
        </div>
        <div id="u-img">
          <img src={pic2} alt="" />
        </div>
        <div id="u-likes">
          <div>
            <i class="fa-regular fa-heart"></i> <span>100</span>
          </div>
          <div>
            <i class="fa-regular fa-comment"></i> <span>2</span>
          </div>
          <div>
            <i class="fa-solid fa-share"></i> <span>3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSection;
