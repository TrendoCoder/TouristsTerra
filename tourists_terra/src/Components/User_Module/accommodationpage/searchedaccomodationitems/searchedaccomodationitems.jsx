import React from 'react'
import "./searchedaccomodationitems.css"
import pic from "../../../../images/h_ad1.jfif"
const SearchedAccomodationItems = ({item}) => {
  return (
    <div id='si-container'>
    <img src={pic} alt="" />
    <div id="si-desc">
    <h1 id='si-title'>Tower Street apppartments</h1>
    <span id="si-distance">500m from center</span>
    <span id='si-taxi-opt'>Free airport texi</span>
    <span id='si-subtitle'>Studio appartment with air conditioned</span>
    <span id='si-feature'>Entire studio + 1 bathroom + 1 full bedroom</span>
    <span id='si-cancle-opt'>Free Cancellation</span>
    <span id='si-cancle-det'>You can cancle, so lock in this great price today.</span>
    </div>
    <div id="si-details">
    <div id="si-rating">
        <span>Excellent</span>
        <button>8.9</button>
    </div>
    <div id="si-detail-text">
        <span id="si-price">45000Rs</span>
        <span id="si-tax-detail">Includes tax</span>
        <button id='si-availability'>See Availability</button>
    </div>
    </div>
    </div>
  )
}

export default SearchedAccomodationItems