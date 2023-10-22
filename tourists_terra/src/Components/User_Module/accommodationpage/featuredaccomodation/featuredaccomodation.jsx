import React from 'react'
import "./featuredaccomodation.css"
import pic from "../../../../images/h_ad1.jfif";
const FeaturedAccomodation = () => {
  return (
    <div id="featured-acc" >
    <div id="featured-acc-item">
        <img src={pic} alt="" />
        <div id="featured-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div id="featured-acc-item">
        <img src={pic} alt="" />
        <div id="featured-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div id="featured-acc-item">
        <img src={pic} alt="" />
        <div id="featured-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    </div>
  )
}

export default FeaturedAccomodation