import React from "react";
import "./menuBar.css";
import { Link } from "react-router-dom";
const MenuBar = () => {
  return (
    <div id="main-cotainer">
      <div id="container">
        <div id="ind-div">
          <Link to="/">
            <h4>Home</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Accommodation</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Transport</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Explore</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Local Guide</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Shop</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Blogs</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Insurance</h4>
          </Link>
        </div>
        <div id="ind-div">
          <Link to="/">
            <h4>Visa</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
