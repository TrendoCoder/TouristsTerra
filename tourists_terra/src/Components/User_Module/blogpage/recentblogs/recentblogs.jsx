import React, { useState } from 'react';
import moment from 'moment';
import NavBar from '../../homepage/navbar/navBar';
import BlogMenu from '../blogmenu/blogmenu';
import blogPosts from './BlogPostData';
import hotel from "../../../../images/foods.jfif";
import Footer from "../../accommodationpage/footer/footer";

const RecentBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    'All', 
    'hotel',
    'restaurant',
    'attraction points',
    'food',
    'self blog',
    'others'
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === 'All' ? null : category);
  };

  const filteredBlogPosts = selectedCategory 
    ? blogPosts.filter((item) => item.category === selectedCategory)
    : blogPosts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredBlogPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`bg-[#8b919483] hover:bg-gray-600 text-[#0c1d25] font-semibold hover:text-white py-2 px-4 border border-[#155875c4] hover:border-transparent rounded mx-2 ${
        currentPage === number ? 'bg-gray-500' : ''
      }`}
    >
      {number}
    </button>
  ));

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900'>
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

      <h1 className="text-center mt-5 font-bold text-lg text-[#182f3a] bg-gradient-to-r from-[#13252e] to-[#182f3a] text-transparent bg-clip-text tracking-wide leading-relaxed shadow-lg">Recent Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-10 mx-10">
        {currentPosts.length === 0 ? (
          <div className="text-center col-span-12">
            <p className="mt-10 text-center font-semibold text-lg text-[#182f3a]">
              No blog posts available for the selected category.
            </p>
          </div>
        ) : (
          currentPosts.map((item, index) => (
            
            <div key={item.id} className="max-w-sm md:max-w-md bg-white rounded overflow-hidden shadow-lg">
              <a href='/single-post'>
                <img className="w-full h-18 md:h-50 rounded-t-lg" src={hotel} alt="Sunset in the mountains" />
              </a>
              <div className="px-6 py-4">
                <a href="/single-post">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                </a>
                <p className="text-gray-700 text-base">
                  {item.description.length > 90
                    ? `${item.description.substring(0, 90)}...`
                    : item.description}
                </p>
              </div>
              <div className="mut-auto flex items-center justify-between mt-4">
                <div className="inline-flex items-center px-3 py-1 ml-5 text-sm font-medium text-center bg-[#478ca9b4] hover.bg-[#2c536e] text-[#102129] shadow-md rounded-lg hover:text-white duration-150 curs focus:ring-4 focus:outline-none focus:ring-[#478ba9] dark.hover-bg-green-700 dark.focus-ring-green-800">
                  <a href='/single-post'>Read more</a>
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </div>
                <span className="inline-block bg-[#0f4157] rounded-full px-3 py-1 text-sm font-semibold text-white mr-3 mb-2">{item.category}</span>
              </div>
              <div className="mt-3 ml-5 mb-6 text-sm  text-gray-800">
                {moment(item.postedTime).fromNow()}   {/* 'postedTime' field in the 'item' */}
              </div>
            </div>
          ))
        )}
      </div>
      <br></br>
      <div className="flex justify-center mt-4">
        {renderPageNumbers}
      </div>
      <br></br>
      <Footer />
    </div>
  );
};

export default RecentBlogs;