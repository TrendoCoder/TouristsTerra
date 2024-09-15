import React, { useState } from "react";
import "./reserveaccomodation.css";
import useFetch from "../../../../Hooks/usefetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReserveAccomodation = ({ setOpen, hotelId }) => {
  const [selectRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/hotels/rooms/${hotelId}`
  );

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectRooms, value]
        : selectRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:3001/api/rooms/availability/${roomId}`,
            { date: [] } // Empty date array or remove the date property
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/booking-accomodation-form");
    } catch (err) {
      alert(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    return (
      <div id="acc-reserve">
        <div id="acc-reserve-container">
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => setOpen(false)}
          ></i>
          <span>Select your room</span>
          {data.map((item) => (
            <div id="reserve-item" key={item._id}>
              <div id="reserve-item-info">
                <div id="reserve-item-title">{item.title}</div>
                <div id="reserve-item-desc">{item.roomDescription}</div>
                <div id="reserve-item-desc">City: {item.city}</div>
                <div id="reserve-max-people">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div id="reserve-max-people">
                  Wifi Available: <b>{item.isWifi ? "Yes" : "No"}</b>
                </div>
                <div id="reserve-acc-price">
                  <b>Price per night:</b> {item.pricePerNight}Rs
                </div>
                <div id="selected-rooms"></div>
              </div>
            </div>
          ))}
          <button id="r-btn"> For Reservation Contact us.</button>
        </div>
      </div>
    );
  }

  return <div>No room data available</div>;
};

export default ReserveAccomodation;
