import React from 'react'
import "./profilepage.css"
import ProfileInfo from '../profileinfo/profileinfo'
import NavBar from '../../../homepage/navbar/navBar'
import ProfileSideBar from '../profilesidebar/profilesidebar'
import ProfileFeed from '../profilefeed/profilefeed'
const ProfilePage = () => {
  return (
    <div>
    <NavBar/>
    <br />
    <ProfileInfo/>
    <div id='mainn-container'>
    <div id='profilesidebar-div'>
        <ProfileSideBar/>
    </div>
    <div id="profile-main-div">
        <ProfileFeed/>
    </div>
    </div> 
    </div>
  )
}

export default ProfilePage