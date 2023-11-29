import React from "react";
import "./userchatpage.css";
import NavBar from "../../homepage/navbar/navBar";
import Conversation from "../conversation/conversation";
import UserMessage from "../usermessage/usermessage";
import ChatOnline from "../chatonline/chatonline";

const UserChatPage = () => {
  return (
    <div>
      <NavBar />
      <div id="u-chat-container">
        <div id="u-chat-menu">
          <div id="u-chat-menu-wrapper">
            <div id="u-chat-menu-input">
              <input type="text" placeholder="Search for friend" />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>
        </div>
        <div id="u-chat-box">
          <div id="u-chat-box-wrapper">
          <div id="u-chat-box-top">
          <UserMessage />
            <UserMessage own={true} />
            <UserMessage />
            <UserMessage />
            <UserMessage own={true} />
            <UserMessage />
            <UserMessage />
            <UserMessage own={true} />
            <UserMessage />
            <UserMessage />
            <UserMessage own={true} />
            <UserMessage />
          </div>
          <div id="u-chat-box-bottom">
          <textarea id="u-msg-input" cols="30" rows="1" placeholder="Enter your message....."></textarea>
          <button id="u-msg-send-btn">Send</button>
          </div>
          </div>
        </div>
        <div id="u-chat-online">
          <div id="u-chat-online-wrapper">
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatPage;
