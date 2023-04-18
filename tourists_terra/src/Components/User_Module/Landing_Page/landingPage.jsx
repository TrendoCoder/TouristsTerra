import React from "react";
import SideBar from "../Side_Bar/sideBar";
import UploadSection from "../Upload_Section/uploadSection";
import FeedSection from "../Feed_Section/feedSection";
import FeaturedAd from "../Featured_Ads/featuredAd";
import "./landingPage.css";
const landingPage = () => {
  return (
    <div id="big-container">
      <div id="sideBar">
        <SideBar />
      </div>
      <div id="feed-section">
        <UploadSection />
      </div>
      <div id="featured-ad">
        <FeaturedAd />
      </div>
    </div>
  );
};

export default landingPage;
