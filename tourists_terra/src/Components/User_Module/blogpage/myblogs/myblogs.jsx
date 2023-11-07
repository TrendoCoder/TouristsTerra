import React, { useEffect, useState } from "react";
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from '../../homepage/navbar/navBar';
import Footer from "../../accommodationpage/footer/footer";

const MyBlogs = ({ userId }) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    // Fetch user blogs here using your API or state management
    // You might use axios or fetch to make an API request
    // Update setUserBlogs with the fetched data
  }, [userId]);

  const handleCreateBlog = () => {
    // Create a new blog and add it to the list of userBlogs
    setUserBlogs([...userBlogs, newBlog]);
    setNewBlog({ title: '', content: '' });
  };

 

  return (
    <div>
      <NavBar/>
      <BlogMenu />
      <div className="my-8 mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">My Blogs</h1>
        <p className="text-xl text-gray-500">No blogs</p>
      </div>
      <Footer />
    </div>
  );
};



export default MyBlogs;
