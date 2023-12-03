import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./hoteladminhomepage.css";
import useFetch from "../../../../../Hooks/usefetch";
import { AuthContext } from "../../../../../Context/authcontext";
import CreateHotel from "../createhotel/createhotel";
const HotelAdminHomePage = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [clickNumber, setClickNumber] = useState(1);
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading } = useFetch("http://localhost:3001/api/hotels/");
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT"});
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
          <div id="dashboard-heading">
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
          {clickNumber === 1 ? (
            <div id="h-admin-right-side-container">
              <h2>List of All Hotels</h2>
              <div id="loah-container">
                {loading ? (
                  "Loading please wait"
                ) : (
                  <>
                    {data &&
                      data.map((item, i) => (
                        <div id="list-all-hotels" key={i}>
                          <div id="hotel-imgs">
                            <img
                              src={item.photos ? (PF + `/hotelimgs/${item.photos}`): (PF+"/profileUpload.png")}
                              alt={PF+"/profileUpload.png"}
                              crossOrigin="anonymous"
                            />
                          </div>
                          <div id="list-hotel-info">
                            <h3>
                              Hotel_Id: <span id="h3-span">{item._id}</span>
                            </h3>
                            <h3>
                              Title: <span>{item.title}</span>
                            </h3>
                            <h3>
                              Name: <span>{item.name}</span>
                            </h3>
                            <h3>
                              Type: <span>{item.type}</span>
                            </h3>
                            <h3>
                              City: <span>{item.city}</span>
                            </h3>
                            <h3>
                              Rooms: <span>{item.rooms.length}</span>
                            </h3>
                            <h3>
                              Address: <span>{item.address}</span>
                            </h3>
                            <h3>
                              Price: <span>{item.cheapestPrice}</span>
                            </h3>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          ) : clickNumber === 2 ? (
            <div id="h-admin-right-side-container">
              <h2>List of All Rooms</h2>
            </div>
          ) : clickNumber === 3 ? (
            <div id="h-admin-right-side-container">
              <h2>Add New Hotel</h2>
              <CreateHotel/>
            </div>
          ) : clickNumber === 4 ? (
            <div id="h-admin-right-side-container">
              <h2>Add New Room</h2>
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
