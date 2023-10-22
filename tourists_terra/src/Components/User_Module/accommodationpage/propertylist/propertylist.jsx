import React from 'react'
import "./propertylist.css"
import pic from "../../../../images/ad1.jpg";
const PropertyList = () => {
  return (
<div id="p-list-acc" >
    <div id="p-list-acc-item">
        <img src={pic} alt="" />
        <div id="p-list-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div id="p-list-acc-item">
        <img src={pic} alt="" />
        <div id="p-list-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div id="p-list-acc-item">
        <img src={pic} alt="" />
        <div id="p-list-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div id="p-list-acc-item">
        <img src={pic} alt="" />
        <div id="p-list-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div id="p-list-acc-item">
        <img src={pic} alt="" />
        <div id="p-list-acc-tile">
            <h1>Dublin</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    </div>
  )
}

export default PropertyList