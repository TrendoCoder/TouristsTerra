import React, { useContext, useState, useEffect } from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/authcontext";
import useFetch from "../../../../Hooks/usefetch";
import SearchedUser from "../searcheduser/searcheduser";

function NavBar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [searchUserName, setSearchUserName] = useState("");
  const { data, loading } = useFetch(
    `http://localhost:3001/api/user/all`
  );
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const searchData = data.filter((item) =>
      item.userName.toLowerCase().includes(searchUserName.toLowerCase())
    );
    setFilteredData(searchData);
  }, [data, searchUserName]);

  return (
    <div>
      <center>
        <div id="big-Container">
          <div id="small-Container">
            <div id="logo-section">
              <Link to="/">
                <h3 id="title-nav">Tourist's Terra</h3>
              </Link>
            </div>
            <div id="search-section">
              <div id="search-user-section">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchUserName}
                  onChange={(e) => setSearchUserName(e.target.value)}
                />
                <div id="searched-user-list">
                  {(
                    <>
                      {searchUserName.trim() !== "" && filteredData.length > 0 ? (
                        loading ? (
                    "Fetching User"
                  ) :filteredData.map((item) => (
                    <SearchedUser item={item}/>
                    
                        ))
                      ):searchUserName.trim() === ""?"": (
                        "No results found"
                      )}
                    </>
                  )}
                </div>
              </div>
              <div id="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div id="container-personal">
              <div id="container-personal-menu">
                <Link to="/">
                  <i
                    className="fa-solid fa-house fa-lg"
                    style={{ marginBottom: "5px" }}
                  ></i>
                </Link>
              </div>

              <div id="container-personal-menu">
                <Link to="/user-chat-page">
                  <i className="fa-solid fa-message fa-lg">
                    <div id="msg"></div>
                  </i>
                </Link>
              </div>

              <div id="container-personal-menu">
                <Link to="/">
                  <i className="fa-solid fa-bell fa-lg">
                    <div id="notification"></div>
                  </i>
                </Link>
              </div>

              <div id="container-personal-menu">
                <Link to={`/profile-page/${user.userName}`}>
                  <img
                    src={
                      user.userProfilePicture
                        ? PF + `/profilePicture/${user.userProfilePicture}`
                        : PF + "/profileUpload.png"
                    }
                    alt=""
                    id="profile"
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
