// ListOfHotels component
import React from "react";
import "./listofhotels.css";
import { Link } from "react-router-dom";

const ListOfHotels = ({ item }) => {
    
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div id="hi-container">
      <img
        src={
          item.photos
            ? `${PF}/hotelimgs/${item.photos[0]}`
            : `${PF}/profileUpload.png`
        }
        alt={`${PF}/profileUpload.png`}
        crossOrigin="anonymous"
      />
      <div id="hi-desc">
        <h1 id="hi-title">{item.title}</h1>
        <span id="hi-subtitle">Type: {item.type}</span>
        <span id="hi-subtitle">{item.name}</span>
        <span id="hi-taxi-opt">{item.city}</span>
        <span id="hi-distance">{item.contact}</span>  
        <span id="hi-feature">{item.hotelDescription}</span>
        <span id="hi-cancle-opt">Total Rooms: {item.rooms ? item.rooms.length : 0}</span>
      </div>
      <div id="hi-details">
        <div id="hi-detail-text">
          <span id="hi-price">{item.cheapestPrice}Rs</span>
          <span id="hi-tax-detail">Includes tax</span>
          <Link
            to={`/accomodation-detail/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <button id="hi-availability">See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListOfHotels;
