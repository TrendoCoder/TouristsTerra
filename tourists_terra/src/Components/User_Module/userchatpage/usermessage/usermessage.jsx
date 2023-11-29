import React from 'react'
import './usermessage.css'
import pic from "../../../../images/profile.jpeg"
const UserMessage = ({own}) => {
  return (
    <div className={own?"u-msg-container own":'u-msg-container'}>
    <div className="u-msg-top-container">
    <img src={pic} alt="" />
    <p className="msg-container">Hello this is the new message.. I just want to check that it can move towards next line or not...</p>
    </div>
    <div className="u-msg-bottom-container">
    <span>2 days ago</span>
        </div>
    </div>
  )
}

export default UserMessage