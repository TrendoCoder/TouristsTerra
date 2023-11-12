import React ,{useContext}from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/authcontext";

function NavBar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
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
            <Link to={`/profile-page/${user.userName}`}>
              <img src={ user.userProfilePicture
                  ? PF + `/profilePicture/${user.userProfilePicture}`
                  : PF + "/profileUpload.png"} alt="" id="profile" 
                    crossOrigin="anonymous"
                  />
            </Link>
          </div>
        </div>

          </div>
        </div>
      </center>
    </div>
  );
}

export default NavBar;
