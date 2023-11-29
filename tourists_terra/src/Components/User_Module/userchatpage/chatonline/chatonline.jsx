import React from 'react'
import './chatonline.css';
import pic from '../../../../images/profile.jpeg'
const ChatOnline = () => {
  return (
    <div id='chat-online-container'>
    <div id="chat-friend-online">
        <div id="chat-online-img-container">
            <img src={pic} alt="" />
            <div id='chat-online-badge'>
            </div>
        </div>
        <span id="chat-online-name">
            Shamir Hussain
        </span>
    </div>
    </div>
  )
}

export default ChatOnline