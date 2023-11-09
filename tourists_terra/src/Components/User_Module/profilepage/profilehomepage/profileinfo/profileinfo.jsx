import React, { useState } from 'react'
import "./profileinfo.css"
import img from "./../../../../../images/profile.jpeg"
const ProfileInfo = ({user}) => {
  return (
    <div id='p-main-container'>
    <div id="p-main-container-lite">
      <div id="p-main-container-lite-opacity">
      <div id="p-alignments">
        <div id="p-img">
          <img src={img} alt="" />
        </div>
        <div id="p-detail">
          <div id="p-name">
            <span>{user.userName}</span>
          </div>
          <div id="p-loca">
            <div>
            <i class="fa-solid fa-location-dot"></i>
            </div>
            <div>
              Lahore, Pakistan
            </div>
          </div>
          <div id="p-row">
            <div id='p-row-left'>
            <span>Traveller</span>
            </div>
            <div id='p-row-right'>
            <span>{user.contact}</span>
            </div>
          </div>
          </div>
          <div id="followers-detail">
            <div id="p-following">
              <h3>142</h3>
              <span>Following</span>
            </div>
            <div id="p-pics">
              <h3>142</h3>
              <span>Photos</span>
            </div>
            <div id="p-followers">
              <h3>546</h3>
              <span>Followers</span>
            </div>
          </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default ProfileInfo