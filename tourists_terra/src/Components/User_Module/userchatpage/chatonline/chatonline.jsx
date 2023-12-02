import React, { useEffect, useState } from 'react';
import './chatonline.css';
import axios from 'axios';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/user/friends/${currentId}`);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log(onlineFriends);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user-conversation/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='chat-online-container'>
      {loading ? (
        <p>Loading...</p> // Render a loading indicator while data is being fetched
      ) : onlineFriends.length === 0 ?"No friend is online":(
        onlineFriends.map((o) => (
          <div key={o._id} id="chat-friend-online">
            <div id="chat-online-img-container" onClick={() => handleClick(o)}>
              <img
                src={o.userProfilePicture ? `${PF}/profilePicture/${o.userProfilePicture}` : `${PF}/profileUpload.png`}
                alt=""
                crossOrigin='anonymous'
              />
              <div id='chat-online-badge'></div>
            </div>
            <span id="chat-online-name">{o.userName}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatOnline;
