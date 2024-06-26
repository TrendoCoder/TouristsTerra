import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../homepage/navbar/navBar';
import BlogMenu from '../blogmenu/blogmenu';
import Footer from '../../accommodationpage/footer/footer';
import axios from 'axios';
import moment from 'moment';

const PopularBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const categories = [
    'All',
    'Hotel',
    'Restaurant',
    'Attraction Points',
    'Food',
    'Self Blog',
    'Others',
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/bloguser/blogs'
        );
        const fetchedBlogs = response.data || [];
        setBlogs(fetchedBlogs);
        console.log(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleLike = async (blogId) => {
    try {
      await axios.put(`http://localhost:3001/api/bloguser/${blogId}/like`);
      setIsLiked(!isLiked);

      // Fetch the updated blogs after liking to get the latest data
      const response = await axios.get('http://localhost:3001/api/bloguser/blogs');
      const updatedBlogs = response.data || [];
      setBlogs(updatedBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBlogs = selectedCategory === 'All' ? blogs : blogs.filter(blog => blog.category === selectedCategory);

  // Sorting the blogs based on the number of likes
  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes.length - a.likes.length);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(sortedBlogs.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`bg-[#8b91945e] hover:bg-gray-600 text-[#0c1d25] font-semibold hover:text-white py-2 px-4 border border-[#155875c4] hover:border-transparent rounded mx-2 ${currentPage === number ? 'bg-gray-500' : ''}`}
    >
      {number}
    </button>
  ));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <NavBar />
      <BlogMenu />

      <div className="inline-flex rounded-md shadow-sm m-6">
        {categories.map((item) => (
          <button
            key={item}
            className={`px-4 py-2 text-sm font-medium text-white hover:scale-105 duration-200 bg-[#2f5869ee] rounded mx-4 hover:shadow-md ${selectedCategory === item ? 'bg-[#0d2833]' : ''}`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <h1 className="text-center mt-5 font-bold text-2xl text-[#182f3a] bg-gradient-to-r from-[#13252e] to-[#182f3a] text-transparent bg-clip-text tracking-wide leading-relaxed shadow-lg">
        Popular Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10 mx-10">
        {currentPosts.length === 0 ? (
          <div className="text-center col-span-12">
            <p className="mt-10 text-center font-semibold text-lg text-[#1a2b35]">
              No blog posts available for the selected category.
            </p>
          </div>
        ) : (
          currentPosts.map((item, index) => (
            <div
              key={item?._id}
              className="max-w-sm md:max-w-md bg-white rounded overflow-hidden shadow-lg"
            >
              <Link to={`/single-post/${item?._id}`}>
                <img className="w-full h-[220px] rounded-t-lg" src={item.imageURL} alt={item.title} />
              </Link>
              <div className="px-4 py-4">
                <Link to={`/single-post/${item?._id}`}>
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-500 text-sm mb-2">
                    Posted: {moment(item.date).format('MMMM D, YYYY')}
                  </p>
                </Link>
                <div
                  className="text-gray-700 text-base overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                  }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="mut-auto flex items-center justify-between mt-4">
                  <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-center bg-[#478ca986] hover:bg-[#2c536e] text-[#102129] shadow-md rounded-lg hover:text-white duration-150 curs focus:ring-4 focus:outline-none focus:ring-[#478ba9] dark:hover-bg-green-700 dark:focus:ring-green-800">
                    <Link to={`/single-post/${item?._id}`}>Read more</Link>
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span
                      className="inline-flex items-center px-1 py-1 text-sm font-medium text-center text-[#102129] shadow-md rounded-lg focus:ring-4 focus:outline-none"
                      onClick={() => handleLike(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 26"
                        stroke="currentColor"
                        className={`w-5 h-4 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 21.35l-1.45-1.32C5.4 14.36 2 11.47 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 2.97-3.4 5.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-[#102129]">
                      {item.likes.length} {item.likes.length === 1 ? 'like' : 'likes'}
                    </span>
                  </div>
                  <span className="inline-block bg-[#0f4157] rounded-full px-3 py-1 text-sm font-semibold text-white mb-2">{item.category}</span>
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
      <br />

      <Footer />
    </div>
  );
};

export default PopularBlogs;
