import React, { useContext, useEffect, useState } from "react";
import "./profilesidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../Context/authcontext";
import axios from "axios";

const ProfileSideBar = ({ user }) => {
  const { user: currentUser, dispatch, setUser } = useContext(AuthContext);
  const [followedUser, setFollowedUser] = useState();
  const [followingUser, setFollowingUser] = useState();
  const [friends, setFriends] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
    getFriends();
  },[])
  const getFriends = async()=>{
    try{
      const res = await axios.get(`http://localhost:3001/api/user/friends/${user._id}`);
    setFriends(res.data);
    setLoading(true);
    }
    catch(err){
      console.log(err);
    }
  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login-user");
  };

  useEffect(() => {
    const fetchFollowCounts = async () => {
      try {
        await setFollowedUser(user.followers.length);
        await setFollowingUser(user.following.length);
      } catch (error) {
        console.error("Error fetching follow counts:", error);
      }
    };

    fetchFollowCounts();
  }, [user._id]);

  const followUser = async () => {
    try {
      if (!currentUser.following.includes(user._id)) {
        await axios.put(`http://localhost:3001/api/user/${user._id}/follow`, {
          userId: currentUser._id,
        });

        // Update local storage after follow operation
        setUser({ ...currentUser, following: [...currentUser.following, user._id] });
        window.location.reload();
      } else {
        console.log("You Already Follow this user");
      }
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const unFollowUser = async () => {
    try {
      if (currentUser.following.includes(user._id)) {
        await axios.put(`http://localhost:3001/api/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
  
        // Update local storage after unfollow operation
        setUser({
          ...currentUser,
          following: currentUser.following.filter((id) => id !== user._id),
        });
        window.location.reload();
      } else {
        console.log("You are not following this user");
      }
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };
  
  return (
    <>
      <div id="leftbar-main-container">
        {user._id === currentUser._id ? (
          <></>
        ) : (
          <>
            {currentUser.following.includes(user._id) ? (
              <div>
                <button id="follow-user-btn" onClick={unFollowUser}>
                  UnFollow
                </button>
              </div>
            ) : (
              <div>
                <button id="follow-user-btn" onClick={followUser}>
                  Follow
                </button>
              </div>
            )}
          </>
        )}
        <div id="leftbar-info-container">
          <div id="leftbar-options" className="active-opt">
            <Link to="/">Profile</Link>
          </div>
          <div id="leftbar-options">
            <Link to="#">Friends</Link>
            <span>{loading?friends?friends.length:"":""}</span>
          </div>
          <div id="leftbar-options">
            <Link to="/user-chat-page">Chats</Link>
            
          </div>
          <div id="leftbar-options">
            <Link to="/">Followers</Link>
            <span>{followedUser ? `${followedUser}` : "-"}</span>
          </div>
          <div id="leftbar-options">
            <Link to="/">Following</Link>
            <span>{followingUser ? `${followingUser}` : "-"}</span>
          </div>
          <div id="leftbar-options">
            <Link to={`/edit-user-profile/${user._id}`}>Edit Profile</Link>
          </div>
        </div>
        <br />
        <br />
        <div id="leftbar-info-container">
          {/* <div id="leftbar-options">
           
          </div> */}
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
          <div id="leftbar-options" onClick={logout}>
            <Link>LogOut</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;
