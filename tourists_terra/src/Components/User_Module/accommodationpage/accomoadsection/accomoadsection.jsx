import React from 'react'
import "./accomoadsection.css"
import { Link } from 'react-router-dom'
import h_ad1 from "../../../../images/h_ad1.jfif";
import MenuBar from '../../homepage/menubar/menuBar';
const AccommodationAdSection = () => {
  return (
    <div id='big-container-accomo-ad'>
    <div id='main-container-accomo-ad'>
    <Link to="/">
        <img  src={h_ad1} alt=""/>
    </Link>
    </div>
   <div>
   </div>
    </div>
  )
}

export default AccommodationAdSection