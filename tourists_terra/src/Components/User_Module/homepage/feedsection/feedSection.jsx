import React, { useEffect, useState } from "react";
import "./feedSection.css";
import axios from "axios";

const FeedSection = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [like, setLike] = useState(posts.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/post/timeline/65304089e4728d7e78e251b5"
        );
        console.log(res);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/user/${posts.userId}`
        );
        console.log(res);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div id="big-container-feed">
      {posts.map((post) => (
        <div key={post._id} id="main-container-feed">
          <div id="u-info">
            <div id="u-info-detail">
              <img src={user.profilePicture} alt={post.user.userName} />
              <h3>{user.userName}</h3>
            </div>
            <div id="ellipsis">
              <i id="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <div id="u-des">
            <span>{post.description}</span>
          </div>
          <div id="u-img">
            <img src={post.img} alt="" />
          </div>
          <div id="u-likes">
            <div>
              <i id="fa-regular fa-heart"></i> <span>{post.likes.length}</span>
            </div>
            <div>
              <i id="fa-regular fa-comment"></i>{" "}
              <span>{post.comments.length}</span>
            </div>
            <div>
              <i id="fa-solid fa-share"></i> <span>3</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSection;

// import React, { useEffect, useState } from "react";
// import "./feedSection.css";
// import pic from "../../../../images/profile2.jpeg";
// import pic2 from "../../../../images/nature.jpg";
// import axios from "axios";
// const FeedSection = () => {
//   const [posts, setPosts] = useState([]);
//   const [likes, setLikes] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async()=>{
//       const res = await axios.get("http://localhost:3001/api/post//timeline/:userId");
//       setPosts(res);
//       console.log(res);
//     };
//     fetchPosts();
//   }, []);
//   return (
//     <div id="big-container-feed">
//       <div id="main-container-feed">
//         <div id="u-info">
//           <div id="u-info-detail">
//             <div>
//               <img src={pic} alt="" />
//             </div>
//             <div>
//               <h3>Shamir Hussain</h3>
//             </div>
//           </div>
//           <div id="ellipsis">
//             <i class="fa-solid fa-ellipsis-vertical"></i>
//           </div>
//         </div>
//         <div id="u-des">
//           <span>An amazing tour to NORTHERN Areas</span>
//         </div>
//         <div id="u-img">
//           <img src={pic2} alt="" />
//         </div>
//         <div id="u-likes">
//           <div>
//             <i class="fa-regular fa-heart"></i> <span>100</span>
//           </div>
//           <div>
//             <i class="fa-regular fa-comment"></i> <span>2</span>
//           </div>
//           <div>
//             <i class="fa-solid fa-share"></i> <span>3</span>
//           </div>
//         </div>
//       </div>
//       <div id="main-container-feed">
//         <div id="u-info">
//           <div id="u-info-detail">
//             <div>
//               <img src={pic} alt="" />
//             </div>
//             <div>
//               <h3>Shamir Hussain</h3>
//             </div>
//           </div>
//           <div id="ellipsis">
//             <i class="fa-solid fa-ellipsis-vertical"></i>
//           </div>
//         </div>
//         <div id="u-des">
//           <span>An amazing tour to NORTHERN Areas</span>
//         </div>
//         <div id="u-img">
//           <img src={pic2} alt="" />
//         </div>
//         <div id="u-likes">
//           <div>
//             <i class="fa-regular fa-heart"></i> <span>100</span>
//           </div>
//           <div>
//             <i class="fa-regular fa-comment"></i> <span>2</span>
//           </div>
//           <div>
//             <i class="fa-solid fa-share"></i> <span>3</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedSection;
