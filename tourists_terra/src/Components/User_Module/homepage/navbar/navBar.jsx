import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom";

function navBar() {
  return (
    <div>
      <center>
        <div id="big-Container">
          <div id="small-Container">
            <div id="logo-section">
              {/* <img src="" alt="logo" /> */}
              <h3>TouristsTerra</h3>
            </div>
            <div id="search-section">
              <input type="text" placeholder="Search" />
              <div id="search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div id="small-menu">
              <Link to="/">
              <i class="fa-solid fa-house"></i>
              </Link>
              <i class="fa-solid fa-message"></i>
              <i class="fa-solid fa-bell"></i>
              <Link to="/sign-up">
                <i class="fa-solid fa-user-tie"></i>
              </Link>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default navBar;
