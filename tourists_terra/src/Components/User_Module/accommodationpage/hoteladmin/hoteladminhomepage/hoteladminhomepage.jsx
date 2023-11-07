import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./hoteladminhomepage.css";
import useFetch from "../../../../../Hooks/usefetch";
import pic from "../../../../../images/hotel.jpeg";
const HotelAdminHomePage = () => {
  const [clickNumber, setClickNumber] = useState(1);

  const { data, loading } = useFetch("http://localhost:3001/api/hotels/");
  console.log(data);
  return (
    <div id="hotel-admin-main-container">
      <div id="admin-nav">
        <div>
          <h3 id="admin-name">Hi Admin</h3>
        </div>
        <div id="admin-nav-right">
          <Link to="/accommodation">
            <button id="switch-to-au-btn">Switch to User Mode</button>
          </Link>
          <Link to="">
            LogOut <i class="fa-solid fa-right-from-bracket"></i>
          </Link>
        </div>
      </div>
      <div id="hotel-admin-container">
        <div id="h-admin-left-side">
          <div id="dashboard-heading">
            <i class="fa-solid fa-vector-square"></i>
            <h3>Dashboard</h3>
          </div>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(1)}>
              <i class="fa-solid fa-list"></i>
              <h3>List of All Hotels</h3>
            </div>
          </Link>

          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(2)}>
              <i class="fa-solid fa-list"></i>
              <h3>List of All Rooms</h3>
            </div>
          </Link>

          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(3)}>
              <i class="fa-solid fa-hotel"></i>
              <h3>Add New Hotel</h3>
            </div>
          </Link>
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(4)}>
              <i class="fa-solid fa-bed"></i>
              <h3>Add New Room</h3>
            </div>
          </Link>
          <hr />
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(5)}>
              <i class="fa-solid fa-trash"></i>
              <h3>Remove a Hotel</h3>
            </div>
          </Link>
          <Link to="">
            <div id="dashboard-mini-heading" onClick={() => setClickNumber(6)}>
              <i class="fa-solid fa-trash"></i>
              <h3>Remove a Room</h3>
            </div>
          </Link>
        </div>
        <div id="h-admin-right-side">
          {clickNumber === 1 ? (
            <div className="h-admin-right-side-container">
              <h2>List of All Hotels</h2>
              <div id="loah-container">
                {loading ? (
                  "Loading please wait"
                ) : (
                  <>
                    {data &&
                      data.map((item, i) => (
                        <div id="list-all-hotels">
                          <div id="hotel-imgs">
                            <img src={pic} alt="" />
                          </div>
                          <div id="list-hotel-info">
                            <h3>
                              Hotel_Id:{" "}
                              <span className="h3-span">{item._id}</span>
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
            <div className="h-admin-right-side-container">
              <h2>List of All Rooms</h2>
            </div>
          ) : clickNumber === 3 ? (
            <div className="h-admin-right-side-container">
              <h2>Add New Hotel</h2>
            </div>
          ) : clickNumber === 4 ? (
            <div className="h-admin-right-side-container">
              <h2>Add New Room</h2>
            </div>
          ) : clickNumber === 5 ? (
            <div className="h-admin-right-side-container">
              <h2>Remove a Hotel</h2>
            </div>
          ) : clickNumber === 6 ? (
            <div className="h-admin-right-side-container">
              <h2>Remove a Room</h2>
            </div>
          ) : (
            <div className="h-admin-right-side-container">
              <h2>Wait or click again</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelAdminHomePage;
