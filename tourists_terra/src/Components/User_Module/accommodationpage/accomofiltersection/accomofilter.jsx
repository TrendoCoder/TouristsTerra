import React, { useState } from "react";
import "./accomofilter.css";
import { Link } from "react-router-dom";

const AccomoFilter = () => {
  const [rangeValue, setRangeValue] = useState(50);
  const [rating, setRating] = useState(0);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div id="big-container-filter">
      <div className="header">
        <h2>Browse</h2>
      </div>
      <div className="category">
        <Link to="">Hotel Rooms</Link>
      </div>
      <div className="category">
        <Link to="">House Rooms</Link>
      </div>
      <div className="category">
        <Link to="">Resorts</Link>
      </div>
      <div className="filter-section">
        <h3>Filter By Price</h3>
        <div className="range-container">
          <input
            type="range"
            min="0"
            max="70000"
            step="5000"
            value={rangeValue}
            onChange={handleRangeChange}
          />
          <span>Rs{rangeValue}</span>
        </div>
        <button className="filter-button">Filter</button>
      </div>
      <div className="footer">
        <span id="rat">Rating</span>
        <br />
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="star-row">
            {Array.from({ length: 5 }, (_, subIndex) => (
              <span
                key={subIndex}
                className={`star ${subIndex < 5 - index ? "filled" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccomoFilter;
