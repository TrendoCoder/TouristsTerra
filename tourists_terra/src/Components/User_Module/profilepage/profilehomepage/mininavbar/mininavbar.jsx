import React, { useState } from 'react'
import './mininavbar.css'
import { Link } from 'react-router-dom'
const MiniNavBar = () => {

    const [active, isActive] = useState('');
  return (
    <div id='mini-nav-container'>
    <div id="mini-nav-opt" className='div-active'>
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
  )
}

export default MiniNavBar