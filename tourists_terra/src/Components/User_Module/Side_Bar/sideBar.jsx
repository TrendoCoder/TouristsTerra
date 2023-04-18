import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <i className="fas fa-rss"></i>
        <Link className="sidebar-link" to="/">
          Feed
        </Link>
      </div>
      <div className="sidebar-item">
        <i class="fa-solid fa-user"></i>
        <Link className="sidebar-link" to="/">
          Profile
        </Link>
      </div>
      <div className="sidebar-item">
      <i class="fa-solid fa-video"></i>
      <Link  className="sidebar-link" to="/">
          Watch Reels
        </Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-car"></i>
        <Link className="sidebar-link" to="/">
          Transport
        </Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-hotel"></i>
        <Link className="sidebar-link" to="/">
          Accommodation
        </Link>
      </div>
      <div className="sidebar-item">
        <i class="fa-brands fa-wpexplorer"></i>
        <Link className="sidebar-link" to="/">
          Explore
        </Link>
      </div>
      <div className="sidebar-item">
        <i class="fa-solid fa-eject"></i>
        <Link className="sidebar-link" to="/">
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
