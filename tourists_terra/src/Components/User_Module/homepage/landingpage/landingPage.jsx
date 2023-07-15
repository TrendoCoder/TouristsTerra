import React from "react";
import Sidebar from "../sidebar/sideBar";
import UploadSection from "../uploadsection/uploadSection";
import FeedSection from "../feedsection/feedSection";
import RightBar from "../rightbar/rightBar";
import "./landingPage.css";
import MenuBar from "../menubar/menuBar";
const LandingPage = () => {
  return (<>

    <div id="menu-container" style={{position:"fixed",top:"0",left:"0",zIndex:'10000'}} >
        <MenuBar/>
      </div>
    <div id="full-container" style={{marginTop:"100px"}}>
      <div id="big-container-landing" >
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
    </>
  );
};

export default LandingPage;
