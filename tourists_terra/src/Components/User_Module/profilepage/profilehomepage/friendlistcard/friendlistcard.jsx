import React from 'react';
import './friendlistcard.css';
import { Link } from 'react-router-dom';
import pic from '../../../../../images/profile.jpeg';

const FriendListCard = () => {
  return (
    <div id="friend-card-main-container">
      <img src={pic} alt="" />
      <div className="friend-details">
        <Link to="">Name of friend</Link>
      </div>
    </div>
  );
};

export default FriendListCard;
