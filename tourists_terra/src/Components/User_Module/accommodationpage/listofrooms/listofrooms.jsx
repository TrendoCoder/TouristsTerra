// ListOfHotels component
import React from "react";
import "./listofrooms.css";
import { Link } from "react-router-dom";

const ListOfRooms = ({ item }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div id="hi-container">
      <img
        id="crousal-img"
        src={
          item.photos
            ? `${PF}/hotelimgs/roomimgs/${item.photos[0]}`
            : `${PF}/profileUpload.png`
        }
        alt={`${PF}/profileUpload.png`}
        crossOrigin="anonymous"
      />
      <div id="hi-desc">
        <h1 id="hi-title">{item.title}</h1>
        <span id="hi-subtitle">Hotel Name: {item.hotelName}</span>
        <span id="hi-taxi-opt">{item.city}</span>
        <span id="hi-subtitle">{item.address}</span>
        <span id="hi-distance">{item.contact}</span>
        <span id="hi-distance">No. of Beds: {item.numOfBeds}</span>
        <span id="hi-distance">No. of Adults: {item.numOfAdults}</span>
        {/* <span id="hi-feature">{item.roomDescription}</span> */}
        {/* <span id="hi-cancle-opt">Total Rooms: {item.rooms.length}</span> */}
      </div>
      <div id="hi-details">
        <div id="hi-detail-text">
          <span id="hi-price">{item.pricePerNight}Rs/night</span>
          <span id="hi-tax-detail">Includes tax</span>
          <Link
            to={`/accomodation-detail/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <button id="hi-availability">Contact us for Reservation</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListOfRooms;
