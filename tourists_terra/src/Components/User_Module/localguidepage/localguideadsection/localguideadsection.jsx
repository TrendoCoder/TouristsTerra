import React from 'react'
import "./localguideadsection.css"
import { Link } from 'react-router-dom'
import lg_ad1 from "../../../../images/lg_ad1.jfif";
const LocalGuideAdSection = () => {
  return (
    <div id='big-container-localguide-ad'>
    <div id='main-container-localguide-ad'>
    <Link to="/">
        <img  src={lg_ad1} alt=""/>
    </Link>
    </div>
   <div>
   </div>
    </div>
  )
}

export default LocalGuideAdSection