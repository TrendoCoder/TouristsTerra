import React, { useContext, useState } from "react";
import "./reserveaccomodation.css";
import useFetch from "../../../../Hooks/usefetch";
import { SearchContext } from "../../../../Context/searchcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReserveAccomodation = ({ setOpen, hotelId }) => {
  const [selectRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/hotels/rooms/${hotelId}`
  );
  const { date } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date(start.getTime());

    const date = [];
    while (currentDate <= end) {
      date.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return date;
  };

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime)
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectRooms, value]
        : selectRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
        await Promise.all(
        selectRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:3001/api/rooms/availability/${roomId}`,
            { date: allDates }
          ); 
          return res.data;
        })
      );
      setOpen(false);
      navigate("/accommodation");
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
            class="fa-solid fa-circle-xmark"
            onClick={() => setOpen(false)}
          ></i>
          <span>Select your room</span>
          {data.map((item) => (
            <div id="reserve-item" key={item._id}>
              <div id="reserve-item-info">
                <div id="reserve-item-title">{item.title}</div>
                <div id="reserve-item-desc">{item.roomDescription}</div>
                <div id="reserve-max-people">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div id="reserve-acc-price">{item.price}</div>
                <div id="selected-rooms">
                  {item.roomNumber.map((roomNumber) => (
                    <div id="room" key={roomNumber._id}>
                      <label>{roomNumber.number} </label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleClick} id="r-btn">
            {" "}
            Resrve Now
          </button>
        </div>
      </div>
    );
  }
  return <div>No room data available</div>;
};

export default ReserveAccomodation;
