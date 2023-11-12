import React from "react";
import "./accommodationhome.css";
import AccommodationAdSection from "../accomoadsection/accomoadsection";
import MenuBar from "../../homepage/menubar/menuBar";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";
import NavBar from "../../homepage/navbar/navBar";
import AccomodationSearchSection from "../accomodationsearchsection/accomodationsearchsection";
import FeaturedAccomodation from "../featuredaccomodation/featuredaccomodation";
import PropertyList from "../propertylist/propertylist";
const AccommodationHome = () => {
  return (
    <>
      <NavBar />
      <div id="accomo-ad-big-container">
        <div id="accomo-ad-container">
          <AccommodationAdSection />
          <div id="opacity-ad">
            <Link to="">
              <h1>Wana Accommodation?</h1>
            </Link>
          </div>
        </div>

        <div id="menu-acc">
          <MenuBar />
        </div>
        <br />
        <br />
        <AccomodationSearchSection />
        <div id="main-container-accomo">
          <FeaturedAccomodation />
          <h2>Browse by Property Type</h2>
          <PropertyList />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AccommodationHome;
