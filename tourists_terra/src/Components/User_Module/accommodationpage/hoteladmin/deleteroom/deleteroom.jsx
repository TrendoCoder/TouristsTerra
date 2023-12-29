import React, { useEffect, useState } from 'react';
import "./deleteroom.css";
import axios from 'axios';

const DeleteRoom = ({ room, onClose }) => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const getHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/hotels/?name=${room.hotelName}`);
        setHotel(res.data);
      } catch (err) {
        console.log("Some Issue occur: " + err);
      }
    };

    getHotel();
  }, [0]);

  console.log(hotel);

  useEffect(() => {
    console.log(hotel?._id);
  }, [hotel]);
  const handleDeletePost = async () => {
    try {
      const hotelId = hotel && hotel.length > 0 ? hotel[0]._id : null;
  
      if (!hotelId) {
        console.error("Hotel ID is undefined or null");
        return;
      }
  
      await axios.delete(`http://localhost:3001/api/rooms/${room._id}/${hotelId}`);
      alert("Deleted successfully");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };
  

  return (
    <div id="del-preview-room">
      <div id="del-preview-room-big-container">
        <div id="del-room-wrapper">
          <span>Are you sure you want to delete this room?</span>
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
  );
};

export default DeleteRoom;
