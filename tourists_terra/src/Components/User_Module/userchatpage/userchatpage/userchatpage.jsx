import React, { useContext, useEffect, useRef, useState } from "react";
import "./userchatpage.css";
import NavBar from "../../homepage/navbar/navBar";
import Conversation from "../conversation/conversation";
import UserMessage from "../usermessage/usermessage";
import ChatOnline from "../chatonline/chatonline";
import axios from "axios";
import { io } from "socket.io-client";
import { AuthContext } from "../../../../Context/authcontext";
const UserChatPage = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followers.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  console.log(onlineUsers);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/user-conversation/" + user._id
        );
        setConversation((prevConversation) => {
          return res.data;
        });
        setLoading(true);
      } catch (err) {
        alert("There occur some error while uploading chat...try again later");
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/user-message/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:3001/api/user-message/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div id="u-chat-container">
        <div id="u-chat-menu">
          <div id="u-chat-menu-wrapper">
            <div id="u-chat-menu-input">
              <input type="text" placeholder="Search for friend" />
              {loading ? (
                conversation.map((c) => (
                  <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                ))
              ) : (
                <>
                  <p>No Chat is found</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div id="u-chat-box">
          {currentChat ? (
            <div id="u-chat-box-wrapper">
              <div id="u-chat-box-top">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <UserMessage message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div id="u-chat-box-bottom">
                <input
                  id="u-msg-input"
                  placeholder="Enter your message....."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                ></input>
                <button id="u-msg-send-btn" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div id="no-conversation">Open a Conversation to Start a Chat</div>
          )}
        </div>
        <div id="u-chat-online">
          <div id="u-chat-online-wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatPage;
