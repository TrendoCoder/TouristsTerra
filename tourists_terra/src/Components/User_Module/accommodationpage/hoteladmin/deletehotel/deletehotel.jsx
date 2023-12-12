import React, { useState } from 'react'
import "./deletehotel.css"
import axios from 'axios';
const DeleteHotel = ({hotel,onClose}) => {

    const handleDeletePost = async () => {
      try {
    
        if (!hotel._id) {
          console.error("Hotel ID is undefined or null");
          return;
        }
        await axios.delete(`http://localhost:3001/api/hotels/${hotel._id}`);
        alert("Deleted successfully");
        window.location.reload();
      } catch (err) {
        alert(err);
      }
    };
  return (
    <div id="del-preview-hotel">
      <div id="del-preview-hotel-big-container">
        <div id="del-hotel-wrapper">
          <span>Are you sure you want to delete this Hotel Permanently?</span>
          <div>
            <button
              id="del-post-wrapper-sec-two-btn1"
              onClick={handleDeletePost}
            >
              Yes
            </button>
            <button
              onClick={() => {
                onClose();
              }}
              id="del-post-wrapper-sec-two-btn2"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteHotel