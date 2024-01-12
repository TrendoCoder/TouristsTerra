import React, { useState } from "react";
import "./localguidealist.css";
import localguide1 from "../../../../images/lg_1.jfif";
import localguide2 from "../../../../images/lg_2.jfif";

const LocalGuideaList = () => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div id="localguide-big-container">
      <div id="localguide-main-container">
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
        <div className="localguide-list-styling">
          <div>
            <img src={localguide1} alt="" />
            <div className="guide-info">
              <p>John Doe</p>
              <p>Offering price: Rs5000</p>
            </div>
          </div>
          <div>
            <img src={localguide2} alt="" />
            <div className="guide-info">
              <p>Jane Smith</p>
              <p>Offering price: Rs2700</p>
            </div>
          </div>
          <div>
            <img src={localguide1} alt="" />
            <div className="guide-info">
              <p>Mark Johnson</p>
              <p>Offering price: Rs3600</p>
            </div>
          </div>
        </div>
        <div className="localguide-list-styling">
          <div>
            <img src={localguide1} alt="" />
            <div className="guide-info">
              <p>Emily Davis</p>
              <p>Offering price: Rs5800</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalGuideaList;
