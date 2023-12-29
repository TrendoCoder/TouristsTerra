import React, { useContext, useEffect, useState } from "react";
import "./hoteladmindashboard.css";
import axios from "axios";
import useFetch from "../../../../../Hooks/usefetch";
import { AuthContext } from "../../../../../Context/authcontext";
const HotelAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState(null);
  const { data, loading } = useFetch(
    `http://localhost:3001/api/hotels/?userId=${user._id}`
  );
  useEffect(() => {
    const getRooms = async () => {
      try {
        const rooms = await axios.get(
          `http://localhost:3001/api/rooms/?hotelId=${data}`
        );
        setRooms(rooms.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, [0]);
  // Filter available rooms
  const availableRooms = rooms?.filter((room) => room.availabilty);
  return (
    <div id="HotelAdminDashboard-main-container">
      {loading ? (
        "..."
      ) : (
        <>
          <div id="HotelAdminDashboard-main-container-sec-one">
            <div id="HotelAdminDashboard-main-container-sec-one-divs">
              <i class="fa-solid fa-hotel "></i>
              <h2>Number Of Hotels</h2>
              <h3>{data.length}</h3>
            </div>
            {rooms && (
              <div id="HotelAdminDashboard-main-container-sec-one-divs">
                <i class="fa-solid fa-bed "></i>
                <h2>Number Of Rooms</h2>
                <h3>{rooms.length}</h3>
              </div>
            )}
          </div>
          <div id="HotelAdminDashboard-main-container-sec-two">
            <div id="HotelAdminDashboard-main-container-sec-one-divs">
              <i class="fa-solid fa-bed"></i>
              <h2>Available Rooms</h2>{availableRooms?
              <h3>{availableRooms.length || 0}</h3>:"..."}
            </div>
            <div id="HotelAdminDashboard-main-container-sec-one-divs">
              <i class="fa-solid fa-bed"></i>
              <h2>Unavailable Rooms</h2>
              <h3>{rooms?.length - (availableRooms?.length || 0)}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HotelAdminDashboard;
