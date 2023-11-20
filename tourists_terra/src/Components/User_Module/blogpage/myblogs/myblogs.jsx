import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../homepage/navbar/navBar';
import BlogMenu from '../blogmenu/blogmenu';
import Footer from '../../accommodationpage/footer/footer';
import axios from 'axios';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { AuthContext } from '../../../../Context/authcontext';

const MyBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openMenuBlogId, setOpenMenuBlogId] = useState(null);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/bloguser/blogs/user/${user._id}`
        );
        const fetchedBlogs = response.data || [];
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [user._id]);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(sortedBlogs.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleMenuToggle = (blogId) => {
    setOpenMenuBlogId(openMenuBlogId === blogId ? null : blogId);
  };

  const handleDeleteDialogOpen = (blog) => {
    setSelectedBlog(blog);
  };

  const handleDeleteDialogClose = () => {
    setSelectedBlog(null);
    setOpenMenuBlogId(null);
  };

  const handleDeleteBlog = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/bloguser/${selectedBlog?._id}?userId=${user?._id}`
      );

      const updatedBlogs = blogs.filter(
        (blog) => blog._id !== selectedBlog._id
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleUpdateBlog = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };

  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`bg-[#8b91945e] hover:bg-gray-600 text-[#0c1d25] font-semibold hover:text-white py-2 px-4 border border-[#155875c4] hover:border-transparent rounded mx-2 ${
        currentPage === number ? 'bg-gray-500' : ''
      }`}
    >
      {number}
    </button>
  ));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <NavBar />
      <BlogMenu />

      <Link to={`/add-blog-post`}>
        <button
          id="switch-to-hp-btn"
          className="mt-20 ml-2 px-5 py-2 font-semibold border
          border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white 
          transition duration-300"
        >
          Create a New Blog Here
        </button>
      </Link>

      <h1 className="text-center mt-5 font-bold text-2xl text-[#182f3a] bg-gradient-to-r from-[#13252e] to-[#182f3a] text-transparent bg-clip-text tracking-wide leading-relaxed shadow-lg">
        My All Blogs
      </h1>

      <br />
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
        {currentPosts.length === 0 ? (
          <div className="text-center col-span-12">
            <p className="mt-10 text-center font-semibold text-lg text-[#1a2b35]">
              No blog posts available.
            </p>
          </div>
        ) : (
          currentPosts.map((item) => (
            <div
              key={item?._id}
              className="max-w-[300px] bg-white rounded overflow-hidden shadow-lg mt-0 relative"
            >
              <div className="absolute top-0 right-0 p-2">
                <button className="relative group" onClick={() => handleMenuToggle(item._id)}>
                  <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[30px] h-[30px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                    <div className="flex flex-col justify-between w-[15px] h-[15px] transform transition-all duration-300 origin-center overflow-hidden">
                      <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg]"></div>
                      <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-translate-x-10"></div>
                      <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]"></div>
                    </div>
                  </div>
                  {openMenuBlogId === item._id && (
                    <div className="absolute group-hover:flex flex-col space-y-2 bg-white rounded-md shadow-md p-2 right-8 top-8">
                      <AiOutlineEdit
                        className="cursor-pointer"
                        onClick={() => handleUpdateBlog(item._id)}
                      />
                      <AiOutlineDelete
                        className="cursor-pointer"
                        onClick={() => {
                          handleDeleteDialogOpen(item);
                          setOpenMenuBlogId(null);
                        }}
                      />
                    </div>
                  )}
                </button>
              </div>
              <Link to={`/single-post/${item?._id}`}>
                <img
                  className="w-full h-[220px] rounded-t-lg"
                  src={item.imageURL}
                  alt={item.title}
                />
              </Link>
              <div className="px-6 py-4">
                <Link to={`/single-post/${item?._id}`}>
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-500 text-sm mb-2">
                    Posted: {moment(item.date).format('MMMM D, YYYY')}
                  </p>
                </Link>
                <p className="text-gray-700 text-base">
                  {item.description.length > 90
                    ? `${item.description.substring(0, 90)}...`
                    : item.description}
                </p>
                <div className="mut-auto flex items-center justify-between mt-4">
                  <div className="inline-flex items-center px-2 py-1 text-sm font-medium text-center bg-[#478ca986] hover:bg-[#2c536e] text-[#102129] shadow-md rounded-lg hover:text-white duration-150 curs focus:ring-4 focus:outline-none focus:ring-[#478ba9] dark:hover-bg-green-700 dark:focus:ring-green-800">
                    <Link to={`/single-post/${item?._id}`}>Read more</Link>
                  </div>
                  <span className="inline-block bg-[#0f4157] rounded-full px-3 py-1 text-sm font-semibold text-white mb-2 ml-2">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <br />
      <div className="flex justify-center mt-4">
        {renderPageNumbers}
      </div>

      <Transition show={Boolean(selectedBlog)} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleDeleteDialogClose}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Content>
              <div className="bg-white p-4 rounded-md shadow-md">
                <Dialog.Title>Delete Blog?</Dialog.Title>
                <p>Are you sure you want to delete this blog?</p>
                <Dialog.Actions>
                  <Button onClick={handleDeleteDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteBlog} color="primary" autoFocus={false}>
                    Delete
                  </Button>
                </Dialog.Actions>
              </div>
            </Dialog.Content>
          </div>
        </Dialog>
      </Transition>

      <br />
      <Footer />
    </div>
  );
};

export default MyBlogs;
