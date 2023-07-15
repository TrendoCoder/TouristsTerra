import React, { useState } from "react";
import "./accomolist.css";
import hotel from "../../../../images/h_ad1.jfif";

const AccomoList = () => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div id="accomolist-big-container">
      <div id="accomolist-main-container">
        <div className="dropdown-container">
          <label htmlFor="sort-accomo">Sort By:</label>
          <select id="sort-accomo" value={sortBy} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="hotels">Hotels</option>
            <option value="resorts">Resorts</option>
            <option value="local-hotels">Local Hotels</option>
            <option value="local-resorts">Local Resorts</option>
          </select>
        </div>
        <div className="hotel-name-heading">
          <span>Hotel Rooms at Best Price</span>
        </div>
        <div className="hotel-list-styling">
          <div>
            <img src={hotel} alt="" />
            <img src={hotel} alt="" />
            <img src={hotel} alt="" />
          </div>
        </div>
        <div className="hotel-name-heading">
          <span>Hotel Rooms at Best Price</span>
        </div>
        <div className="hotel-list-styling">
          <div>
            <img src={hotel} alt="" />
            <img src={hotel} alt="" />
            <img src={hotel} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccomoList;
