import React from 'react'
import "./searchedaccomodationitems.css"
import pic from "../../../../images/h_ad1.jfif"
import { Link } from 'react-router-dom'
const SearchedAccomodationItems = ({item}) => {

  return (
    <div id='si-container'>
    <img src={item.photos[0]} alt="" />
    <div id="si-desc">
    <h1 id='si-title'>{item.title}</h1>
    <span id="si-distance">{item.distance} from center</span>
    <span id='si-taxi-opt'>{item.city}</span>
    <span id='si-subtitle'>{item.name}</span>
    <span id='si-feature'>{item.hotelDescription}</span>
    <span id='si-cancle-opt'>Free Cancellation</span>
    <span id='si-cancle-det'>You can cancle, so lock in this great price today.</span>
    </div>
    <div id="si-details">
    <div id="si-rating">
        <span>Excellent</span>
        <button>8.9</button>
    </div>
    <div id="si-detail-text">
        <span id="si-price">{item.cheapestPrice}Rs</span>
        <span id="si-tax-detail">Includes tax</span>
        <Link to={`/accomodation-detail/${item._id}`} style={{textDecoration:"none"}}>
        <button id='si-availability'>See Availability</button>
        </Link>
        
    </div>
    </div>
    </div>
  )
}

export default SearchedAccomodationItems