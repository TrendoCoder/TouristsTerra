import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import useFetch from "../../../../Hooks/usefetch";
import moment from "moment";
import { AuthContext } from "../../../../Context/authcontext";

function SinglePost() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]); // State to hold comments
  const { id } = useParams();
  const {user} =  useContext(AuthContext)


  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/bloguser/blog/${id}`
  );

  useEffect(() => {
    // Load comments when the component mounts
    if (data && data.comments) {
      setComments(data.comments);
    }
  }, [data]);

  const handleLike = (like) => {
    const likeStatus = like ? "true" : "false";
    fetch(`http://localhost:3001/api/bloguser/${id}/like/${likeStatus}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLiked(!liked);
        } else {
          // Handle the case where the like/unlike was not successful
        }
      })
      .catch((error) => {
        // Handle any network errors
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value;

    fetch(`http://localhost:3001/api/bloguser/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: commentText,
        userId: user._id, // You might need to get the user ID dynamically
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "This blog has been commented") {
          // Update the comments state with the new comment
          setComments([...comments, { comment: commentText, author: user._id }]);
        }
      })
      .catch((error) => {
        // Handle any network errors
      });
  };

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
            <a href="#_" className="block transition ease-out transform">
              <img
                className="object-cover w-full shadow-sm h-full"
                src={data.imageURL}
                alt={data.title}
              />
            </a>
            <br />
            <br />
            <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
              <div>
                <p className="mt-2 p-8">{data.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-start mt-4 mb-4">
              <a
                href="#"
                className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500 mr-4"
              >
                {data.category}
              </a>
            </div>
            <div className="mt-2">
              <div className="flex justify-start items-center mt-2">
                <p
                  className={`text-m font-boldr rounded-full py-7 px-7 ${liked ? "text-red-500" : "text-gray-500"
                    } cursor-pointer`}
                  onClick={() => handleLike(!liked)}
                >
                  {liked ? "❤️ Liked" : "🤍 Like"} {data.likes}
                </p>
                <div className="flex justify-start items-center gap-x-2">
                  <p className="text-m text-gray-600 font-bold ml-1">
                    Posted:{" "}
                  </p>
                  <p className="text-m text-gray-600 font-bold mr-02">
                    {moment(data.date).fromNow()}{" "}
                  </p>
                </div>
              </div>
              <div className="font-light text-gray-600">
                <a
                  href="#"
                  className="flex items-center mt-6 mb-6"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/71964085?v=4"
                    alt="avatar"
                    className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                  />
                  <h1 className="font-bold text-gray-700 hover:underline">
                    By James Amos
                  </h1>
                </a>
              </div>
            </div>
          </div>

          {/* Form for comments */}
          <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
            <div className="w-full mt-16 md:mt-0 ">
              <form
                onSubmit={handleCommentSubmit} // Use onSubmit instead of onClick for form submission
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
                  value="Submit comment"
                  name="submit"
                  className=" text-white px-4 py-3 bg-[#0f4157]  rounded-lg"
                />
              </form>
            </div>
          </div>

          {/* Comments */}
          <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay px-0 mx-auto sm:px-12 xl:px-5">
            <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
              All comments on this post
            </p>
            {comments.map((comment, index) => (
              <div
                key={index}
                className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3"
              >
                <a
                  href="#"
                  className="flex items-center mt-6 mb-6 mr-6"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/71964085?v=4"
                    alt="avatar"
                    className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                  />
                </a>
                <div>
                  <h3 className="text-lg font-bold text-blue-800 sm:text-xl md:text-2xl">
                    By {user.userName}
                  </h3>
                  <p className="text-sm font-bold text-gray-300">August 22, 2021</p>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    {comment.comment}
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
