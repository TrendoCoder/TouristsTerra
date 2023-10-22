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

  const handleUpdateBlog = () => {
    // Update the selected blog content
    if (selectedBlog) {
      const updatedBlogs = userBlogs.map((blog) =>
        blog === selectedBlog ? { ...blog, title: selectedBlog.title, content: selectedBlog.content } : blog
      );
      setUserBlogs(updatedBlogs);
      setSelectedBlog(null);
    }
  };

  const handleDeleteBlog = (blog) => {
    // Delete the selected blog
    const updatedBlogs = userBlogs.filter((item) => item !== blog);
    setUserBlogs(updatedBlogs);
  };

  return (
    <div>
      <NavBar/>
      <BlogMenu />
      <div className="my-8 mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">My Blogs</h1>
        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border border-gray-300 rounded w-full"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            rows="4"
            className="p-2 border border-gray-300 rounded w-full"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          />
          <button
            onClick={handleCreateBlog}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Create Blog
          </button>
        </div>
        {userBlogs.length === 0 ? (
          <p className="text-xl text-gray-500">No blogs</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={() => handleDeleteBlog(blog)}
                onUpdate={() => setSelectedBlog(blog)}
              />
            ))}
          </div>
        )}
        {selectedBlog && (
          <div className="my-4 space-y-2">
            <input
              type="text"
              placeholder="Title"
              className="p-2 border border-gray-300 rounded w-full"
              value={selectedBlog.title}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              rows="4"
              className="p-2 border border-gray-300 rounded w-full"
              value={selectedBlog.content}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
            />
            <button
              onClick={handleUpdateBlog}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Update Blog
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const BlogCard = ({ blog, onDelete, onUpdate }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-700">{blog.content}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default MyBlogs;
