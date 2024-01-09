import React from 'react'
import './transportadbaneer.css'
import h_ad1 from '../../../../images/h_ad1.jfif'
import { Link } from 'react-router-dom'
const TransportAdBaneer = () => {
  return (
    <div id='big-container-transport-ad'>
    <div id='main-container-transport-ad'>
    <Link to="/">
        <img  src={h_ad1} alt=""/>
    </Link>
    </div>
   <div>
   </div>
    </div>
  )
}

export default TransportAdBaneer