import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios';
const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members.find((m)=>m !== currentUser._id);
    const getUser = async ()=>{
      try{const res = await axios.get("http://localhost:3001/api/user/?userId="+friendId)
      setUser(res.data);
      setLoading(true);
    }catch(err){
        console.log(err);
      }
    };
    getUser();
  },[currentUser,conversation]);
  return (
    <>
    {loading?
    <div id='conversation-container'>
    <img src={user.userProfilePicture ?PF+`/profilePicture/${user.userProfilePicture}`:PF+"/profileUpload.png"} alt={PF+"/profileUpload.png"} crossOrigin='anonymous'/>
    <span>{user.userName}</span>
    </div>:
    <i class="fa-solid fa-circle-notch fa-spin"></i>}
    </>
  )
}

export default Conversation