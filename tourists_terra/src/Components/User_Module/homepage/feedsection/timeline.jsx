import React, { useContext, useEffect, useState } from "react";
import "./feedSection.css";
import DisplayPost from "../displaypost/displaypost";
import UploadSection from "../uploadsection/uploadSection";
import axios from "axios";
import { AuthContext } from "../../../../Context/authcontext";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const timelineRes = await axios.get(`http://localhost:3001/api/post/timeline/${user._id}`);
      setPosts(
        timelineRes.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
      );
       
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [user?._id]);

  if (!posts) {
    return <div>No Posts to show....</div>;
  }
  return (
    <div id="big-container-feed">
      <div id="big-container-feed-wrapper">
      <UploadSection />
        {posts.length === 0 ? (
          <div>No Posts to show....</div>
        ) : (
          posts.map((p) => <DisplayPost key={p._id} posts={p} />)
        )}
      </div>
    </div>
  );
};

export default Timeline;