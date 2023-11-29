import React from 'react'
import './conversation.css'
import pic from "../../../../images/profile.jpeg"
const Conversation = () => {
  return (
    <div id='conversation-container'>
    <img src={pic} alt="" />
    <span>Chaudhary Shamir</span>
    </div>
  )
}

export default Conversation