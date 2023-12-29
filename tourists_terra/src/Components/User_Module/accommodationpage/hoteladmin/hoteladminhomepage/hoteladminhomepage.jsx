import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./hoteladminhomepage.css";
import useFetch from "../../../../../Hooks/usefetch";
import { AuthContext } from "../../../../../Context/authcontext";
import CreateHotel from "../createhotel/createhotel";
import CreateRoom from "../createroom/createroom";
import ListOfRooms from "../listofrooms/listofrooms";
import ListOfHotels from "../listofhotels/listofhotels";
import HotelAdminDashboard from "../hoteladmindashboard/hoteladmindashboard";
const HotelAdminHomePage = () => {
  const { user } = useContext(AuthContext);
  const [clickNumber, setClickNumber] = useState(0);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const { data, loading } = useFetch(
    `http://localhost:3001/api/hotels/?userId=${user._id}`
  );
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login-user");
  };
  return (
    <div id="hotel-admin-main-container">
      <div id="admin-nav">
        <div>
          <h3 id="admin-name">Hi {user.userName}</h3>
        </div>
        <div id="admin-nav-right">
          <Link to="/accommodation">
            <button id="switch-to-au-btn">Switch to User Mode</button>
          </Link>
          <div onClick={logout}>
            LogOut <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
      </div>
      <div id="hotel-admin-container">
        <div id="h-admin-left-side">
          <div id="dashboard-heading" onClick={() => setClickNumber(0)}>
            <i className="fa-solid fa-vector-square"></i>
            <h3>Dashboard</h3>
          </div>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(1)}>
              <i className="fa-solid fa-list"></i>
              <h3>List of All Hotels</h3>
            </div>
          </Link>

          <div id="dashboard-mini-heading" onClick={() => setClickNumber(2)}>
            <i className="fa-solid fa-list"></i>
            <h3>List of All Rooms</h3>
          </div>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(3)}>
              <i className="fa-solid fa-hotel"></i>
              <h3>Add New Hotel</h3>
            </div>
          </Link>
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(4)}>
              <i className="fa-solid fa-bed"></i>
              <h3>Add New Room</h3>
            </div>
          </Link>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(5)}>
              <i className="fa-solid fa-trash"></i>
              <h3>Remove a Hotel</h3>
            </div>
          </Link>
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(6)}>
              <i className="fa-solid fa-trash"></i>
              <h3>Remove a Room</h3>
            </div>
          </Link>
        </div>
        <div id="h-admin-right-side">
          {clickNumber === 0 ? (
            <div id="h-admin-right-side-container" style={{backgroundColor:"#0F4157"}}>
              <h2>DashBoard</h2>
              <HotelAdminDashboard />
            </div>
          ) : clickNumber === 1 ? (
            <div id="h-admin-right-side-container">
              <h2>List of All Hotels</h2>
              {loading ? (
                "Loading please wait"
              ) : (
                <ListOfHotels />
              )}
            </div>
          ) : clickNumber === 2 ? (
            <div id="h-admin-right-side-container">
              <h2>List of All Rooms</h2>
              <ListOfRooms />
            </div>
          ) : clickNumber === 3 ? (
            <div id="h-admin-right-side-container">
              <h2>Add New Hotel</h2>
              <CreateHotel />
            </div>
          ) : clickNumber === 4 ? (
            <div id="h-admin-right-side-container">
              <h2>Add New Room</h2>
              <CreateRoom hotels={data} />
            </div>
          ) : clickNumber === 5 ? (
            <div id="h-admin-right-side-container">
              <h2>Remove a Hotel</h2>
            </div>
          ) : clickNumber === 6 ? (
            <div id="h-admin-right-side-container">
              <h2>Remove a Room</h2>
            </div>
          ) : (
            <div id="h-admin-right-side-container">
              <h2>Wait or click again</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelAdminHomePage;
