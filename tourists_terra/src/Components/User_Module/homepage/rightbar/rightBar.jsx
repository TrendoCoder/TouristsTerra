import React, { useContext, useEffect, useState } from "react";
import "./rightBar.css";
import FeaturedAd from "../featuredad/featuredAd";
import { AuthContext } from "../../../../Context/authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RightBar = () => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
    randomSuggestions();
    setLoading(true);
  }, []);

  const randomSuggestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user/randomUsers/${user._id}/15`
      );
      setSuggestedUsers(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div id="rightbar">
      <div id="f-ads">
        <FeaturedAd />
      </div>
      <div id="friend">
        <h1>People You May Know</h1>
       <div>
         {loading
          ? suggestedUsers.map((item) => (
              <div id="friend-list" key={item._id}>
                <div>
                  <img
                    src={
                      item.userProfilePicture
                        ? PF + `/profilePicture/${item.userProfilePicture}`
                        : PF + "/profileUpload.png"
                    }
                    crossOrigin="anonymous"
                    alt={PF + "/profileUpload.png"}
                  />{" "}
                </div>
                <div>
                  <span onClick={()=>{
                    navigate(`/profile-page/${item.userName}`);
                  }}>{item.userName}{" "}
              {item.isVerifiedUser ? (
                <>
                  <i
                    class="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>
                </>
              ) : (
                " "
              )}</span>
                </div>
              </div>
            ))
          : ""}
       </div>
      </div>
    </div>
  );
};

export default RightBar;
