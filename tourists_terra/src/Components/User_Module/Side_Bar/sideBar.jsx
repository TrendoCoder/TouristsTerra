import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
const sideBar = () => {
  return (
    <div>
      <div id="big-container">
        <div>
          <i class="fa-solid fa-rss"></i>
          <Link to="/">FEED</Link>
        </div>
        <div>
          <i class="fa-solid fa-rss"></i>
          <Link to="/">FEED</Link>
        </div>
        <div>
          <i class="fa-solid fa-rss"></i>
          <Link to="/">FEED</Link>
        </div>
        <div>
          <i class="fa-solid fa-rss"></i>
          <Link to="/">FEED</Link>
        </div>
        <div>
          <i class="fa-solid fa-rss"></i>
          <Link to="/">FEED</Link>
        </div>
      </div>
    </div>
  );
};

export default sideBar;
