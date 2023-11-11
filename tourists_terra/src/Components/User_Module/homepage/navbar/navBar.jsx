import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <center>
        <div id="big-Container">
          <div id="small-Container">
            <div id="logo-section">
              <h3>Tourists Terra</h3>
            </div>
            <div id="search-section">
              <input type="text" placeholder="Search" />
              <div id="search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div id="small-menu">
              <Link to="/">
                <i class="fa-solid fa-house" id="small-menu-icon"></i>
              </Link>
              <Link to="/">
                <i class="fa-solid fa-message" id="small-menu-icon"></i>
              </Link>
              <Link to="/">
                <i class="fa-solid fa-bell" id="small-menu-icon"></i>
              </Link>
              <Link to="/sign-up">
                <i class="fa-solid fa-user-tie" id="small-menu-icon"></i>
              </Link>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default NavBar;
