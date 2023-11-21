import React, { useContext } from 'react'
import './profilesidebar.css'
import { Link,useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../../Context/authcontext'
const ProfileSideBar = ({user}) => {
    
    const {user:currentUser, dispatch}  = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT"});
        navigate("/login-user");
    }
  return (
    <>
    <div id="leftbar-main-container">
   {user._id === currentUser._id?<></>:
   <><div>
        <button>Follow</button>
    </div>
    <div>
        <button>UnFollow</button>
    </div></>}
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
            <span>{user.followers.length}</span>
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
                <span>{user.followers.length}</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Following
            </Link>
            <span>{user.following.length}</span>
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
        {/* <div id="leftbar-options">
            <Link to="/">
                Videos
            </Link>
            <span>2</span>
        </div> */}
        {/* <div id="leftbar-options">
            <Link to="/">
                Trip History
            </Link>
                <span>1</span>
        </div>
        <div id="leftbar-options">
            <Link to="/">
                Upcoming Trips
            </Link>
        </div> */}
        <div id='leftbar-options' onClick={logout}>
        <Link>
                LogOut
            </Link>
        </div>
    </div>
    </div>
  
    </>
  )
}

export default ProfileSideBar