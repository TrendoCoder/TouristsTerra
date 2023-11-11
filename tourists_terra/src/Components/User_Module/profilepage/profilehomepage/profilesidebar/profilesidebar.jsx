import React, { useContext } from 'react'
import './profilesidebar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../../Context/authcontext'
const ProfileSideBar = () => {
    
    const {user}  = useContext(AuthContext);
  return (
    <>
    <div id="leftbar-main-container">
    <div id='leftbar-info-container'>
        <div id="leftbar-options" className='active-opt'>
            <Link to="/">
                Profile
            </Link>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Friends
            </Link>
            <span>940</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Chats
            </Link>
            <span>2</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Followers
            </Link>
                <span>234</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Following
            </Link>
            <span>10</span>
        </div>
        <div id="leftbar-options">
            <Link to={`/edit-user-profile/${user._id}`}>
                Edit Profile
            </Link>
        </div>

    </div>
<br />
<br />
    <div id='leftbar-info-container'>

        <div id="leftbar-options">
            <Link to="/">
                Photos
            </Link>
            <span>10</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Videos
            </Link>
            <span>2</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Trip History
            </Link>
                <span>1</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Upcoming Trips
            </Link>
        </div>
    </div>
    </div>
  
    </>
  )
}

export default ProfileSideBar