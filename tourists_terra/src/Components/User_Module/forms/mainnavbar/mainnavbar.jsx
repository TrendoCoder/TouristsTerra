import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./mainnavbar.css";
import img from "../../../../images/profile.jpeg";
const MainNavBar = () => {
  const [state, setState] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);

  const handleActiveMenu = (index) =>{
    setActiveMenu(index);
  };
  const showDropdown = () => {
    setState(true);
  };
  const hideDropdown = () => {
    setState(false);
  };

  return (
    <>
    <div id="main-container-nav">
      <div id="main-container-nav-lite">
        <div id="container-title-nav">
          <h3 id="title-nav">Tourist's Terra</h3>
        </div>
        <div id="container-menu">
          <div id="menu-option-container" className={activeMenu===0?"active":null}>
            <Link to="/booking-transport-form" onClick={()=>handleActiveMenu(0)}>
              <h4 id="menu-option">Home</h4>
            </Link>
          </div>
          <div id="menu-option-container" className={activeMenu===1?"active":null}>
            <Link to="/accommodation" onClick={()=>handleActiveMenu(1)}>
              <h4 id="menu-option">Accomodation</h4>
            </Link>
          </div>
          <div id="menu-option-container" className={activeMenu===2?"active":null}>
            <Link to="/transport" onClick={()=>handleActiveMenu(2)} >
              <h4 id="menu-option">Transport</h4>
            </Link>
          </div>
          <div id="menu-option-container"  className={activeMenu===3?"active":null}>
            <Link to="/localguide" onClick={()=>handleActiveMenu(3)}>
              <h4 id="menu-option">Local Guide</h4>
            </Link>
          </div>
          <div
            id="drop-down"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <h4 id="menu-option">
              Show More <i class="fa-solid fa-chevron-down"></i>
            </h4>
            {state ? (
              <ul id="drop-down-list" onMouseEnter={showDropdown}>
                <Link>
                  <li id="list">Shop</li>
                </Link>

                <Link>
                  <li id="list">Blog</li>
                </Link>

                <Link>
                  <li id="list">Explore</li>
                </Link>

                <Link>
                  <li id="list">About</li>
                </Link>
              </ul>
            ) : null}
          </div>

        </div>
        <div id="container-personal">

        <div id="container-personal-menu">
            <Link to="/">
            <i class="fa-solid fa-house fa-lg" style={{marginBottom:"5px"}}>
              </i>
            </Link>
          </div>

        <div id="container-personal-menu">
            <Link to="/">
              <i class="fa-solid fa-message fa-lg">
                <div id="msg"></div>
              </i>
            </Link>
          </div>

          <div id="container-personal-menu">
            <Link to="/">
              <i class="fa-solid fa-bell fa-lg">
                <div id="notification"></div>
              </i>
            </Link>
          </div>

          <div id="container-personal-menu">
            <Link to="/">
              <img src={img} alt="" id="profile" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    </>
  );
};

export default MainNavBar;
