import React, { useContext } from "react";
import Sidebar from "../sidebar/sideBar";
import FeedSection from "../feedsection/feedSection";
import RightBar from "../rightbar/rightBar";
import "./landingPage.css";
import MenuBar from "../menubar/menuBar";
import NavBar from "../navbar/navBar";
import { AuthContext } from "../../../../Context/authcontext";

const LandingPage = () => {
const {user} = useContext(AuthContext)
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
                <FeedSection username={user.userName} />
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

