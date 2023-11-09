import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"; 
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from '../../homepage/navbar/navBar';
import Footer from "../../accommodationpage/footer/footer";
import useFetch from "../../../../Hooks/usefetch";
import moment from 'moment';


function SinglePost() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const title = decodeURIComponent(queryParams.get('title'));
  // const description = decodeURIComponent(queryParams.get('description'));
  // const category = decodeURIComponent(queryParams.get('category'));
  
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  // const toggleLike = () => {
  //   const { data, loading, error } = useFetch(
  //     `http://localhost:3001/api/bloguser/${id}/like/true`
  //   );
  //   setLiked(!liked);
  // };
  const handleLike = (like) => {
    const likeStatus = like ? 'true' : 'false';
    // Make a GET request to like/unlike the blog
    fetch(`http://localhost:3001/api/bloguser/${id}/like/${likeStatus}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLiked(liked);
        } else {
          // Handle the case where the like/unlike was not successful
          // You can display an error message or take appropriate action
        }
      })
      .catch((error) => {
        // Handle any network errors
      });
  };
  //data from api request
  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/bloguser/blog/${id}`
  );
console.log(data)
console.log()
  return (
    <div>
    <NavBar />
    <BlogMenu />
    <br></br><br></br>
    {/* component */}
    <div className="flex justify-center items-center"> {/* Center content vertically and horizontally */}
    <div>     
    {/* title of post*/}
      <h1 className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black-300 text-center">{data.title}</h1>
    </div>
  </div>

  <div className="mt-6 bg-gray-50">
    <div className="px-10 py-6 mx-auto">
    {/*author*/}
    <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
    <a href="#_" className="block transition ease-out transform">
      <img className="object-cover w-full shadow-sm h-full" src={data.imageURL} />
    </a>
    <br></br><br></br>
  
    {/*post content*/}
    <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
      {/*Description of blog*/}
      <div><p className="mt-2 p-8">{data.description}</p></div>
    </div>

    {/*post categories*/}
    <div className="flex items-center justify-start mt-4 mb-4">
      <a href="#" className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500 mr-4">{data.category}</a>
      
    </div>
    <div className="mt-2">
      {/*post heading*/}
     
      <div className="flex justify-start items-center mt-2">
      <p className={`text-m font-boldr rounded-full py-7 px-7 ${liked ? 'text-red-500' : 'text-gray-500'} cursor-pointer`} onClick={() => handleLike(!liked)}>
      
      {liked ? '❤️ Liked' : '🤍 Like'} {data.likes}
    </p>
        {/*<p className="text-m text-green-500 font-bold rounded-full py-2 px-2">3000</p>
      <p className="text-m text-gray-400 font-bold">Views</p>*/}

    {/*posted time*/}

    <div className="flex justify-start items-center">
    <p className="text-m text-gray-600 font-bold ml-1">Posted: </p>
    <p className="text-m text-gray-600 font-bold mr-02">{moment(data.date).fromNow()} </p>
    </div>
  </div>
      {/*author avator*/}
      <div className="font-light text-gray-600">
        <a href="#" className="flex items-center mt-6 mb-6"><img src="https://avatars.githubusercontent.com/u/71964085?v=4" alt="avatar" className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
          <h1 className="font-bold text-gray-700 hover:underline">By James Amos</h1>
        </a>
      </div>
</div>
  </div>
  {/*related posts*/}
  <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">Related Posts</h2>
  <div className="flex h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
    <div className="grid grid-cols-12 col-span-12 gap-7">
      <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
        <a href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
          <img className="object-cover w-full shadow-sm h-full" src={data.imageURL} />
        </a>
        <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
          <div className="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
            <span>{data.category}</span>
          </div>
          <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#_">Oauth using facebook with flask,mysql,vuejs and tailwind css</a></h2>
          {/* <p class="mt-2 text-sm text-gray-500">Learn how to authenticate users to your application using facebook.</p> */}
        </div>
      </div>
      <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
        <a href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
          <img className="object-cover w-full shadow-sm h-full" src={data.imageURL} />
        </a>
        <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
          <div className="bg-red-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
            <span>{data.category}</span>
          </div>
          <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#_">Authenticating users with email verification in Django apps</a></h2>
        </div>
      </div>
      <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
        <a href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
          <img className="object-cover w-full shadow-sm h-full" src={data.imageURL} />
        </a>
        <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
          <div className="bg-purple-500 absolute top-0 -mt-3 items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
            <span>{data.category}</span>
          </div>
          <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#_">Creating user registration and authentication system in flask</a></h2>
          {/* <p class="mt-2 text-sm text-gray-500">Learn how to authenticate users to your application using flask and mysql db.</p> */}
        </div>
      </div>
    </div>
  </div>
  
  {/*form form comments*/}
  <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
    <div className="w-full mt-16 md:mt-0 ">
      <form className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-gray-100 border-b-2 border-gray-300 rounded-lg shadow-2xl px-7" method="POST" action={`http://127.0.0.1:3001/api/bloguser/${data._id}/comment`}>
        <h3 className="mb-6 text-2xl font-medium text-center">Write a comment</h3>
        <textarea type="text" name="comment" className="w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-300 rounded-lg focus:ring focus:ring-[#0f415783] focus:outline-none" placeholder="Write your comment" rows={5} cols={33} defaultValue={""} />
        <input type="text" name="userId" value="5"  hidden/>
        <input type="submit" defaultValue="Submit comment" name="submit" className=" text-white px-4 py-3 bg-[#0f4157]  rounded-lg" />
      </form>
    </div>
  </div>

  {/*comments*/}
  <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay px-0 mx-auto sm:px-12 xl:px-5">
    <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
      All comments on this post
    </p>
    {/*comment 1*/}
    <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
      <a href="#" className="flex items-center mt-6 mb-6 mr-6"><img src="https://avatars.githubusercontent.com/u/71964085?v=4" alt="avatar" className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
      </a>
      <div><h3 className="text-lg font-bold text-blue-800 sm:text-xl md:text-2xl">By James Amos</h3>
        <p className="text-sm font-bold text-gray-300">August 22,2021</p>
        <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">{}</p>
      </div>
    </div>
  </div>
</div>
</div>
<Footer/>
      
    </div>
  )
}

export default SinglePost



