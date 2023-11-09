import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sideBar";
import UploadSection from "../uploadsection/uploadSection";
import FeedSection from "../feedsection/feedSection";
import RightBar from "../rightbar/rightBar";
import "./landingPage.css";
import MenuBar from "../menubar/menuBar";
import NavBar from "../navbar/navBar";
import axios from "axios";
const LandingPage = ({userName}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = userName? await axios.get(
          "http://localhost:3001/api/post/profile/"+userName
        ) :await axios.get(
          "http://localhost:3001/api/post/timeline/654b3352327c3f2b71778cfd"
        );
        console.log(res);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [userName]);
  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div
        id="menu-container"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "10000" }}
      >
        <MenuBar />
      </div>
      <div id="full-container" style={{ marginTop: "100px" }}>
        <div id="big-container-landing">
          <div id="sideBar-landing">
            <Sidebar  />
          </div>
          <div id="feed-section-landing">
            <div>
              <UploadSection />
            </div>
            <div>
              {posts.map((p) => (
                <FeedSection key={p._id} posts={p} />
              ))}
            </div>
          </div>
          <div id="rightBar-landing">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
