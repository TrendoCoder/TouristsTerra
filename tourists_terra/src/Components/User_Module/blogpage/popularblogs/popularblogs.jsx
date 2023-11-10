import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../homepage/navbar/navBar';
import BlogMenu from '../blogmenu/blogmenu';
import useFetch from '../../../../Hooks/usefetch';
import Footer from '../../accommodationpage/footer/footer';

const PopularBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All'
  const categories = [
    'All',
    'Hotel',
    'Restaurant',
    'Attraction Points',
    'Food',
    'Self Blog',
    'Others',
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when selecting a category.
  };

  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/bloguser/blogs`
  );

  const blogs = data || []; // Use fetched data or an empty array as a fallback

  // Filter the blogs based on the selected category
  const filteredBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredBlogs.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

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

  // You can implement the like functionality here
  const handleLike = (blogId) => {
    // Add your like logic here
    console.log(`Liked blog with ID: ${blogId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <NavBar />
      <BlogMenu />

      <div className="inline-flex rounded-md shadow-sm m-6">
        {categories.map((item) => (
          <button
            key={item?._id}
            className={`px-4 py-2 text-sm font-medium text-white hover:scale-105 duration-200 bg-[#2f5869ee] rounded mx-4 hover:shadow-md ${
              selectedCategory === item ? 'bg-[#0d2833]' : ''
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <h1 className="text-center mt-5 font-bold text-lg text-[#182f3a] bg-gradient-to-r from-[#13252e] to-[#182f3a] text-transparent bg-clip-text tracking-wide leading-relaxed shadow-lg">
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
                <img
                  className="w-full h-[220px]  rounded-t-lg"
                  src={item.imageURL}
                  alt={item.title}
                />
              </Link>
              <div className="px-6 py-4">
                <Link to={`/single-post/${item?._id}`}>
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                </Link>
                <p className="text-gray-700 text-base">
                  {item.description.length > 90
                    ? `${item.description.substring(0, 90)}...`
                    : item.description}
                </p>
                <div className="mut-auto flex items-center justify-between mt-4">
                  <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-center bg-[#478ca986] hover:bg-[#2c536e] text-[#102129] shadow-md rounded-lg hover:text-white duration-150 curs focus:ring-4 focus:outline-none focus:ring-[#478ba9] dark:hover-bg-green-700 dark:focus:ring-green-800">
                    <Link to={`/single-post/${item?._id}`}>Read more</Link>
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </div>
                  <span className="inline-block bg-[#0f4157] rounded-full px-3 py-1 text-sm font-semibold text-white mb-2">
                    {item.category}
                  </span>
                  <button
                    className="ml-2 p-1 text-sm text-gray-700 hover:text-red-500"
                    onClick={() => handleLike(item._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a1 1 0 0 1-.53-.15l-7-4a1 1 0 0 1 0-1.7l7-4a1 1 0 0 1 1.06 0l7 4a1 1 0 0 1 0 1.7l-7 4A1 1 0 0 1 10 18zm-7-5.86L10 12l7 4.14V6.86l-7-4.14L3 6.86v5.28z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <br></br>
      <div className="flex justify-center mt-4">{renderPageNumbers}</div>
      <br></br>
      <Footer />
    </div>
  );
};

export default PopularBlogs;
