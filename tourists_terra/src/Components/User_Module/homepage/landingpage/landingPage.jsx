import React from "react";
import Sidebar from "../sidebar/sideBar";
import RightBar from "../rightbar/rightBar";
import "./landingPage.css";
import MenuBar from "../menubar/menuBar";
import NavBar from "../navbar/navBar";
import Timeline from "../feedsection/timeline";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div
        id="menu-container"
        style={{ position: "fixed", top: "0px", left: "0" }}
      >
        <MenuBar />
      </div>
      <div id="full-container" style={{ marginTop: "100px" }}>
        <div id="big-container-landing">
          <div id="sideBar-landing">
            <Sidebar />
          </div>
          <div id="feed-section-landing">
            <div id="uploading-section">
                <Timeline />
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

