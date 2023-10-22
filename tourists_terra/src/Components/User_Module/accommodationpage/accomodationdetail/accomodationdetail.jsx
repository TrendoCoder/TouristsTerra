import React from "react";
import "./accomodationdetail.css";
import NavBar from "../../homepage/navbar/navBar";
import MenuBar from "../../homepage/menubar/menuBar";
const AccomodationDetail = () => {
  return (
    <div>
      <NavBar />
      <MenuBar />
      <div id="acc-detail-container">
        <div id="acc-detail-wrapper">
          <h1>Grand Hotel</h1>
        </div>
      </div>
    </div>
  );
};

export default AccomodationDetail;
