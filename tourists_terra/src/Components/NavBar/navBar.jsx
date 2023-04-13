import React from "react";
import "./navBar.css";
function navBar() {
  return (
    <div>
      <div id="big-Container">
        <div id="small-Container">
          <div id="logo-section">
            <img src="" alt="logo" />
            <h3>TouristsTerra</h3>
          </div>
          <div id="search-section">
            <input type="text" />
          </div>
          <div id="small-menu">
          <i class="fa-solid fa-house"></i>
          <i class="fa-sharp fa-solid fa-message-middle"></i>
          <i class="fa-solid fa-bell"></i>
          <i class="fa-solid fa-user-tie"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navBar;
