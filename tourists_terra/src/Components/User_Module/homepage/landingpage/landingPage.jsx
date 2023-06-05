import React from "react";
import Sidebar from "../sidebar/sideBar";
import UploadSection from "../uploadsection/uploadSection";
import FeedSection from "../Feed_Section/feedSection";
import RightBar from "../rightbar/rightBar";
import "./landingPage.css";
import MenuBar from "../menubar/menuBar";
const landingPage = () => {
  return (
    <div id="full-container">
      <div id="menu-container">
        <MenuBar />
      </div>
      <div id="big-container-landing">
        <div id="sideBar-landing">
          <Sidebar />
        </div>
        <div id="feed-section-landing">
          <div>
            <UploadSection />
          </div>
          <div>
            <FeedSection />
          </div>
        </div>
        <div id="rightBar-landing">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default landingPage;
