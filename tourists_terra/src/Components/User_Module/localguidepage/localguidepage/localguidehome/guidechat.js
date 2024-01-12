import React, { useContext } from "react";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import NavBar from "../../homepage/navbar/navBar";
import { AuthContext } from "../../../../Context/authcontext";

const Chat = () => {
  const APP_ID = "2B2D4C14-D238-4AFA-B777-4DB2AF876964";
  const profile = JSON.parse(window.localStorage.getItem("user"));
  const USER_ID = profile._id;
  const { user } = useContext(AuthContext);
  console.log(user._id);
  return (
    <div>
      <NavBar />
      <div style={{ height: "calc(100vh - 70px)", marginTop: "70px" }}>
        <SendbirdApp
          // colorSet={{
          //   "--sendbird-light-primary-500": "#0F41570",
          //   "--sendbird-light-primary-400": "#0F41570",
          //   "--sendbird-light-primary-300": "#0F41570",
          //   "--sendbird-light-primary-200": "#0F41570",
          //   "--sendbird-light-primary-100": "#FF7F7F",
          //   "--sendbird-dark-primary-500": "#0F41570",
          //   "--sendbird-dark-primary-400": "#0F41570",
          //   "--sendbird-dark-primary-300": "#0F41570",
          //   "--sendbird-dark-primary-200": "#0F41570",
          //   "--sendbird-dark-primary-100": "#0F41570",
          // }}
          // theme={'dark'}
          appId={APP_ID}
          nickname={user.userName}
          userId={user._id}
        />
      </div>
    </div>
  );
};

export default Chat;
