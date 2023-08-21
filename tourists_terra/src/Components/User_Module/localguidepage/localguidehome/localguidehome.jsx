import React from "react";
import "./localguidehome.css";
import LocalGuideAdSection from "../localguideadsection/localguideadsection";
import MenuBar from "../../homepage/menubar/menuBar";
import LocalGuideFilterSection from "../localguidefiltersection/localguidefiltersection";
import LocalGuideaList from "../localguidealist/localguidealist";
import Footer from "../../accommodationpage/footer/footer";
import { Link } from "react-router-dom";
import NavBar from "../../homepage/navbar/navBar"
const LocalGuideHome = () => {
  return (
   <>
   <NavBar/>
     <div id="localguide-ad-big-container">
      <div id="localguide-ad-container">
        <LocalGuideAdSection />
        <div id="opacity-ad">
          <Link to="">
            <h1>Want to hire Local Guide?</h1>
          </Link>
        </div>
      </div>

      <div id="menu-acc">
        <MenuBar />
      </div>
      <br />
      <br />
      <div id="main-container-localguide">
        <div id="container-filter-localguide">
          <LocalGuideFilterSection />
        </div>
        <div id="container-localguide-cards">
          <LocalGuideaList />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
   </>
  );
};

export default LocalGuideHome;
