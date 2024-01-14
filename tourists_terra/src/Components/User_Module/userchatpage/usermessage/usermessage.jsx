import React, { useEffect, useState } from 'react';
import './usermessage.css';
import { format } from 'timeago.js';
import axios from 'axios';

const UserMessage = ({ message, own, user }) => {
  const [conversation, setConversation] = useState(null);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const conversationData = await getConversation();
        setConversation(conversationData);
        await getSender();
        await getReceiver();
        setLoading(true);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchData();
  }, [user._id, message.sender]);

  const getConversation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user-conversation/${user._id}`
      );
      return res.data; // Ensure that the response is the expected data structure
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getSender = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user/?userId=${message.sender}`
      );
      setSender(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getReceiver = async () => {
    // try {
    //   const otherUserId = conversation?.members?.find((member) => member !== user._id);
    //   if (otherUserId) {
    //     const res = await axios.get(`http://localhost:3001/api/user/?userId=${otherUserId}`);
    //     setReceiver(res.data);
    //   } else {
    //     console.log('No other user found in the conversation.');
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  console.log(receiver);

  return (
    <div className={own ? 'u-msg-container own' : 'u-msg-container'}>
  
     <div className="u-msg-top-container">
          {loading ? (
            <>
            {own ? (
              sender?.userProfilePicture ? (
                <img
                  src={
                    sender?.userProfilePicture
                      ? `${PF}/profilePicture/${sender.userProfilePicture}`
                      : `${PF}/profileUpload.png`
                  }
                  alt={`${PF}/profileUpload.png`}
                  crossOrigin="anonymous"
                />
              ) : (
                <img
                  src={`${PF}/profileUpload.png`}
                  alt={`${PF}/profileUpload.png`}
                  crossOrigin="anonymous"
                />
              )
            ) : (
              <img
                src={`${PF}/profileUpload.png`}
                alt={`${PF}/profileUpload.png`}
                crossOrigin="anonymous"
              />
            )}        </>
      ) : (
        <img
                src={`${PF}/profileUpload.png`}
                alt={`${PF}/profileUpload.png`}
                crossOrigin="anonymous"
              />
      )}

            {
              <p className="msg-container">{message.text}</p>}
          </div>

          <div className="u-msg-bottom-container">
            <span>{format(message.createdAt)}</span>
          </div>

    </div>
  );
};

export default UserMessage;
