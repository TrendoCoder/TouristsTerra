import React, { useContext, useEffect, useState } from "react";
import "./feedSection.css";
import DisplayPost from "../displaypost/displaypost";
import UploadSection from "../uploadsection/uploadSection";
import axios from "axios";
import { AuthContext } from "../../../../Context/authcontext";

const FeedSection = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user, loading } = useContext(AuthContext);
  console.log(user._id);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? axios.get("http://localhost:3001/api/post/profile/" + username)
          : await axios.get(
              "http://localhost:3001/api/post/timeline/" + user?._id
            );
        setPosts(res.data);
        console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username, user?._id]);

  if (!posts) {
    return <div>Loading....</div>;
  }

  return (
    <div id="big-container-feed">
      <div id="big-container-feed-wrapper">
        <UploadSection />
        {posts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          posts.map((p) => <DisplayPost key={p._id} posts={p} />)
        )}
      </div>
    </div>
  );
};

export default FeedSection;

// import React, { useContext, useEffect, useState } from "react";
// import "./feedSection.css";
// import DisplayPost from "../displaypost/displaypost";
// import UploadSection from "../uploadsection/uploadSection";
// import axios from "axios";
// import { AuthContext } from "../../../../Context/authcontext";

// const FeedSection = () => {
//   const [posts, setPosts] = useState([]);
//   const { user, loading } = useContext(AuthContext);
//   console.log(user._id);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res =
//           // username
//           //   ? await axios.get(
//           //       "http://localhost:3001/api/post/profile/"+ username
//           //     )
//           //   :
//           await axios.get(
//             `http://localhost:3001/api/post/timeline/${user._id}`
//           );

//           setPosts((prevPosts) => {
//             console.log(prevPosts);
//             return res.data;
//           });

//         console.log(posts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, [posts]);
//   if (!posts) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div id="big-container-feed">
//       <div id="big-container-feed-wrapper">
//         {/* {(!username || username === user.userName) && <UploadSection />
//         } */}
//         {loading ? (
//   <div>Loading....</div>
// ) : (
//   posts.length === 0 ? (
//     <div>No posts found.</div>
//   ) : (
//     <>
//       {posts.map((p) => (
//         <DisplayPost key={p._id} post={p} />
//       ))}
//     </>
//   )
// )}

//       </div>
//     </div>
//   );
// };

// export default FeedSection;

// import React, { useContext, useEffect, useState } from "react";
// import "./feedSection.css";
// import axios from "axios";
// import { format } from "timeago.js";
// import { AuthContext } from "../../../../Context/authcontext";
// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
// const FeedSection = ({ posts }) => {
//   const { user: currentUser } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likes, setLikes] = useState();
//   useEffect(() => {
//     setIsLiked(posts.likes.includes(currentUser._id));
//   }, [currentUser._id, posts.likes]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3001/api/user/?userId=${posts.userId}`
//         );
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     fetchUsers();
//   }, [posts.userId]);

//   console.log(users);
//   const likeHandler = () => {
//     try {
//       axios.put("http://localhost:3001/api/post/" + posts._id + "/like", {
//         userId: currentUser._id,
//       });
//     } catch (err) {}
//     setLikes(isLiked ? likes - 1 : likes + 1);
//     setIsLiked(!isLiked);
//   };

//   return (
//     <div id="big-container-feed">
//       <div id="main-container-feed">
//         <div id="u-info">
//           <div id="u-info-detail">
//             <>
//               <img
//                 src={
//                   users.profilePicture
//                     ? PF + users.profilePicture
//                     : PF + "/profileUpload.png"
//                 }
//                 crossOrigin="anonymous"
//                 alt="Profile"
//               />
//               <h3>{users.userName}</h3>
//               <span>{format(posts.createdAt)}</span>
//             </>
//           </div>
//           <div id="ellipsis">
//             <i className="fa-solid fa-ellipsis-vertical"></i>
//           </div>
//         </div>
//         <div id="u-des">
//           <span>{posts.desc}</span>
//         </div>
//         <div id="u-img">
//           <img
//             src={posts.img ? PF + `/${posts.img}` : PF + "/profileUpload.png"}
//             crossOrigin="anonymous"
//             alt=""
//           />
//         </div>
//         <hr />
//         <div id="u-likes">
//           <div>
//             {isLiked ? (
//               <i
//                 class="fa-solid fa-heart"
//                 style={{ color: "red" }}
//                 onClick={likeHandler}
//               ></i>
//             ) : (
//               <i className="fa-regular fa-heart" onClick={likeHandler}></i>
//             )}{" "}
//             <span>{likes}</span>
//           </div>
//           <div>
//             <i className="fa-regular fa-comment"></i> <span></span>
//           </div>
//           <div>
//             <i className="fa-solid fa-share"></i> <span></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedSection;
