import React, {useState } from 'react'
import './mininavbar.css'
import { Link } from 'react-router-dom'
import FeedSection from "../../../homepage/feedsection/feedSection"
import FriendListCard from '../friendlistcard/friendlistcard'

const MiniNavBar = ({username}) => {
    const [active, isActive] = useState(0);
  return (
    <div id="main-mini-nav-container">
    <div id='mini-nav-container'>
    <div id="mini-nav-opt" className={active===0?'div-active':"" }onClick={()=>{isActive(0)}}>
        <Link to="" >Feed</Link>
    </div>
    {/* <div id="mini-nav-opt" className={active===1?'div-active':"" } onClick={()=>{isActive(1)}}>
        <Link to="">Friends</Link>
    </div>
    <div id="mini-nav-opt" className={active===2?'div-active':"" } onClick={()=>{isActive(2)}}>
        <Link to="">Photos</Link>
    </div>
    <div id="mini-nav-opt"className={active===3?'div-active':"" } onClick={()=>{isActive(3)}}>
        <Link to="">Reels</Link>
    </div>
    <div id="mini-nav-opt" className={active===4?'div-active':"" } onClick={()=>{isActive(4)}}>
        <Link to="">About</Link>
    </div> */}
    </div>
    {active===0?(
    <div id="mini-nav-opt-rendering" >
        <FeedSection username={username}/>
    </div>)
    :active===1?(
        <div id='friend-list-container'>
        <div id='friend-list-mini-container'>
        <FriendListCard/>
        </div>
        <div id='friend-list-mini-container'>
        <FriendListCard/>
        </div>
        <div id='friend-list-mini-container'>
        <FriendListCard/>
        </div>
        <div id='friend-list-mini-container'>
        <FriendListCard/>
        </div>
        </div>
    )
    :active===2?(
        <div>
            
        </div>
    ) :active===3?(
        <div>
            
        </div>
    ) :active===4?(
        <div>
            
        </div>
    ):(<div>
        <h1>Refresh the page</h1>
    </div>)
    }
    </div>
  )
}

export default MiniNavBar