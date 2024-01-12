import React, { useState } from "react";
import "./transportlist.css";
import hotel from "../../../../images/h_ad1.jfif";
import { Link } from "react-router-dom";
const TransportList = () => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div id="transpolist-big-container">
      <div id="transpolist-main-container">
        <div className="dropdown-container">
          <label htmlFor="sort-accomo">Sort By:</label>
          <select id="sort-transpo" value={sortBy} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="hotels">Hotels</option>
            <option value="resorts">Resorts</option>
            <option value="local-hotels">Local Hotels</option>
            <option value="local-resorts">Local Resorts</option>
          </select>
        </div>
        <div className="transpo-name-heading">
          <span>Hotel Rooms at Best Price</span>
        </div>
        <div className="transpo-list-styling">
          <div>
            <img src={hotel} alt="" />
            <img src={hotel} alt="" />
            <img src={hotel} alt="" />
          </div>
        </div>
        <div className="transpo-name-heading">
          <span>Hotel Rooms at Best Price</span>
        </div>
        <div className="transpo-list-styling">
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

export default TransportList;
