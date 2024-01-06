import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import useFetch from "../../../../Hooks/usefetch";
import moment from "moment";
import { AuthContext } from "../../../../Context/authcontext";

function SinglePost() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/bloguser/blog/${id}`
  );

  const fetchData = () => {
    fetch(`http://localhost:3001/api/bloguser/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const likes = data.likes ? data.likes.length : 0;
          setLike(likes);
          const storedLikedStatus = localStorage.getItem(`liked-${id}`);
          setLiked(storedLikedStatus === "true");
          setComments(data.comments || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleLike = () => {
    const likeStatus = liked ? "false" : "true";
    fetch(`http://127.0.0.1:3001/api/bloguser/like/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?._id || '',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLiked(!liked);
          setLike(data.payload.blog.likes.length);
          localStorage.setItem(`liked-${id}`, (!liked).toString());
          fetchData();
        } else {
          console.error("Failed to update like status:", data.message);
        }
      })
      .catch((error) => {
        console.error("Network error while updating like status:", error);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value.trim();

    if (!commentText) {
      console.error("Comment cannot be empty");
      return;
    }

    fetch(`http://localhost:3001/api/bloguser/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: commentText,
        userId: user?._id || '',
        name: user?.userName || '',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "This blog has been commented") {
          setComments([...comments, { comment: commentText, author: user?._id, date: moment() }]);
          e.target.elements.comment.value = "";
          setCommentSubmitted(true);
          setTimeout(() => {
            setCommentSubmitted(false);
          }, 3000);
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching blog details:", error);
    return <div>Error loading blog details</div>;
  }

  return (
    <div>
      <NavBar />
      <BlogMenu />
      <br />
      <br />
      <div className="flex justify-center items-center">
        <div>
          <h1 className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black-300 text-center">
            {data.title}
          </h1>
        </div>
      </div>

      <div className="mt-6 bg-gray-50">
        <div className="px-10 py-6 mx-auto">
          <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
            <a href="#_" className=" flex justify-center transition ease-out transform">
              <img
                className="object-contain w-[70%] rounded-md mx-4 shadow-sm "
                src={data.imageURL}
                alt={data.title}
              />
            </a>
            <br />
            <br />
            <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
              <div>
                <p className="mt-2 p-8" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }} />
              </div>
            </div>

            <div className="flex max-w-5xl justify-start px-14 py-6 mx-auto bg-gray-50">
              <div className="flex items-center justify-start mt-9 mb-1 border-t border-gray-400 .border-t-thin { border-width: 1px }">
                <div className="font-light text-gray-600 ">
                  <a
                    href="#"
                    className="flex items-center mt-2 mb-2"
                  >
                    <img
                      src={
                        user.userProfilePicture
                          ? PF + `/profilePicture/${user.userProfilePicture}`
                          : PF + "/profileUpload.png"
                      }
                      alt=""
                      id="profile"
                      crossOrigin="anonymous"
                      className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                    />

                    <h1 className="font-semibold text-gray-700 hover:underline pr-4 border-r border-gray-500">
                      Written by {data?.authorName}
                    </h1>
                  </a>
                </div>
                <div className="flex justify-start font-semibold items-center pr-4 border-r border-gray-500">
                  <p className="text-m text-gray-700 ml-4">
                    Posted : {" "}
                  </p>
                  <p className="text-m text-gray-500 ml-2 mr-03 ">
                    {moment(data.date).fromNow()}{" "}
                  </p>
                </div>

                {/* <div id="u-like" className="flex justify-around ml-4 pr-4 border-r border-gray-500">
                  <i class="fa-regular fa-flag fa-4xs mt-1">
                  </i>
                  <p className="text-m text-gray-700 ml-2 mr-03 ">
                    Report
                  </p>  
  </div> */}

                <div id="u-like" className="flex justify-around ml-4 ">
                  <div>
                    {liked ? (
                      <i
                        className="fas fa-heart text-red-500 cursor-pointer"
                        onClick={handleLike}
                      ></i>
                    ) : (
                      <i className="far fa-heart cursor-pointer" onClick={handleLike}></i>
                    )}{" "}
                    <span>{like}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex max-w-5xl justify-start px-14 py-3 mx-auto bg-gray-50">
              <p className="px-13 py-1 font-bold  text-gray-700 ">
                Category :
              </p>
              <p className="px-4 max-w-[160px] py-1 font-bold bg-red-400 text-white rounded-lg ml-3" >
                {data.category}
              </p>
            </div>
          </div>

          {/* Form for comments */}
          <div className="max-w-4xl py-7 xl:px-8 flex justify-center mx-auto">
            <div className="w-full mt-16 md:mt-0 ">
              <form
                onSubmit={handleCommentSubmit}
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-gray-100 border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
              >
                <h3 className="mb-6 text-2xl font-medium text-center">
                  Write a comment
                </h3>
                <textarea
                  type="text"
                  name="comment"
                  className="w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-300 rounded-lg focus:ring focus:ring-[#0f415783] focus:outline-none"
                  placeholder="Write your comment"
                  rows={5}
                  cols={33}
                  defaultValue={""}
                />
                <input
                  type="text"
                  name="userId"
                  value="5"
                  hidden
                />
                <input
                  type="submit"
                  value="Submit "
                  name="submit"
                  className=" text-white px-4 py-3 bg-[#0f4157] hover:bg-[#0f4157bd] rounded-lg"
                />
                {commentSubmitted && (
                  <p className="text-[#0f4157]  mt-3 font-bold">
                    Comment submitted successfully!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Comments */}
          <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay px-0 mx-auto sm:px-12 xl:px-5">
            <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
              All comments on this post
            </p>
            {comments?.map((comment, index) => (
              <div
                key={index}
                className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3"
              >
                <a
                  href="#"
                  className="flex items-center mt-6 mb-6 mr-6"
                >
                <img
                src={
                  user.userProfilePicture
                    ? PF + `/profilePicture/${user.userProfilePicture}`
                    : PF + "/profileUpload.png"
                }
                alt=""
                id="profile"
                crossOrigin="anonymous"
                className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
              />
                </a>
                <div>
                  <h5 className="text-lg font-bold text-blue-800 sm:text-xs md:text-xl">
                    By {comment?.name}
                  </h5>
                  <p className="text-sm font-semibold text-gray-500">{moment(comment.date).fromNow()}</p>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    {DOMPurify.sanitize(comment.comment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;