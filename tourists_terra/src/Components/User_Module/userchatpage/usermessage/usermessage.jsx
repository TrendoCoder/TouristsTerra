import React from 'react'
import './usermessage.css'
import pic from "../../../../images/profile.jpeg"
import { format } from "timeago.js";
const UserMessage = ({message, own}) => {
  return (
    <div className={own?"u-msg-container own":'u-msg-container'}>
    <div className="u-msg-top-container">
    <img src={pic} alt="" />
    <p className="msg-container">{message.text}</p>
    </div>
    <div className="u-msg-bottom-container">
    <span>{format(message.createdAt)}</span>
        </div>
    </div>
  )
}

export default UserMessage
{/* <img src={user.userProfilePicture?PF+`/${user.userProfilePicture}`:PF+"/profileUpload.png"} alt="ProfilePic" crossOrigin='anonymous' /> */}