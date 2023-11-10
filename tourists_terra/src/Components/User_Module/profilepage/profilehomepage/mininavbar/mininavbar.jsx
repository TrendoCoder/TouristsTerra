import React, { useState } from 'react'
import './mininavbar.css'
import { Link } from 'react-router-dom'
import FeedSection from "../../../homepage/feedsection/feedSection"
import FriendListCard from '../friendlistcard/friendlistcard'
const MiniNavBar = () => {

    const [active, isActive] = useState(0);
  return (
    <div id="main-mini-nav-container">
    <div id='mini-nav-container'>
    <div id="mini-nav-opt" className='div-active' onClick={()=>{isActive(0)}}>
        <Link to="/" id='active1'>Feed</Link>
    </div>
    <div id="mini-nav-opt">
        <Link to="/">Friends</Link>
    </div>
    <div id="mini-nav-opt">
        <Link to="/">Photos</Link>
    </div>
    <div id="mini-nav-opt">
        <Link to="/">Reels</Link>
    </div>
    <div id="mini-nav-opt">
        <Link to="/">About</Link>
    </div>
    </div>
    <div id="mini-nav-opt-rendering">
        <FeedSection/>
    </div>
    </div>
  )
}

export default MiniNavBar