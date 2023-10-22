import React, { useState } from 'react';
import NavBar from '../../homepage/navbar/navBar';
import BlogMenu from '../blogmenu/blogmenu';
import blogPosts from './BlogPostData';
import hotel from '../../../../images/foods.jfif';
import Footer from '../../accommodationpage/footer/footer';


const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // You can customize the date format as needed
};

const RecentBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    'hotel',
    'restaurant',
    'attraction points',
    'food',
    'self blog',
    'others',
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
      className={`bg-blue-500 text-white px-3 py-2 mx-1 rounded ${
        currentPage === number ? 'bg-blue-700' : ''
      }`}
    >
      {number}
    </button>
  ));

  return (
    <div>
      <NavBar />
      <BlogMenu />

      <div className="inline-flex rounded-md shadow-sm m-6">
        {categories.map((item) => (
          <button
            key={item}
            className={`px-4 py-2 text-sm font-medium text-white hover:scale-105 duration-200 bg-gray-600 rounded mx-4 hover:shadow-md ${
              selectedCategory === item ? 'bg-blue-700' : ''
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mx-10">
        {currentPosts.length === 0 ? (
          <div className="text-center col-span-12">
            <p className="mt-10 text-center font-semibold text-lg text-black-200 dark:text-gray-400">
              No blog posts available for the selected category.
            </p>
          </div>
        ) : (
          currentPosts.map((item, index) => (
            <div key={item.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="/single-post">
                <img className="rounded-t-lg w-full h-48" src={hotel} alt="" />
              </a>
              <div className="p-5">
                <a href="/single-post">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.description.split(' ').slice(0, 12).join(' ')}{' '}
                  {item.description.split(' ').length > 12 ? '...' : ''}
                </p>
                
                <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-center text-blue-950 shadow-md rounded-lg hover:bg-blue-800 hover:text-white duration-150 curs focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">
                    <a href='/single-post'>Read more</a>
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                </div>
                <div className="mt-auto flex flex-col justify-center"><br/>
                  <div className='flex justify-between'>               
                    <div className="text-s py-2 font-semibold rounded-md disabled ml-2">
                      {item.category}
                    </div>
                    <div className="text-xs py-2 rounded-md disabled ml-2">
                      {formatTimestamp(item.timestamp)}
                    </div>
                  </div>
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

export default RecentBlogs;
