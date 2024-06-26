import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NavBar from '../../homepage/navbar/navBar';
import BlogMenu from '../blogmenu/blogmenu';
import Footer from '../../accommodationpage/footer/footer';
import useFetch from '../../../../Hooks/usefetch';

const RecentBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [
    'All',
    'Hotel',
    'Restaurant',
    'Attraction Points',
    'Food',
    'Self Blog',
    'Others',
  ];
  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/bloguser/recentBlogs`
  );

  if (loading) {
    // Loading UI or message here
  }

  if (error) {
    // Handle the error, for example:
    return <div>Error: {error.message}</div>;
  }

  const blogPosts = Array.isArray(data) ? data : [];

  const sortedBlogPosts = blogPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredBlogPosts =
    selectedCategory !== 'All'
      ? sortedBlogPosts.filter((item) => item?.category === selectedCategory)
      : sortedBlogPosts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredBlogPosts.length / postsPerPage); i++) {
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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <NavBar />
      <BlogMenu />

      <div className="inline-flex rounded-md shadow-sm m-6">
        {categories.map((item) => (
          <button
            key={item}
            className={`px-4 py-2 text-sm font-medium text-white hover:scale-105 duration-200 bg-[#2f5869ee] rounded mx-4 hover:shadow-md ${
              selectedCategory === item ? 'bg-[#0d2833]' : ''
            }`}
            onClick={() => setSelectedCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <h1 className="text-center mt-5 font-bold text-2xl text-[#182f3a] bg-gradient-to-r from-[#13252e] to-[#182f3a] text-transparent bg-clip-text tracking-wide leading-relaxed shadow-lg">
        Recent Blogs
      </h1>

      {filteredBlogPosts.length === 0 && selectedCategory !== 'All' ? (
        <div className="text-center col-span-12 mt-10">
          <p className="font-semibold text-lg text-[#182f3a]">
            No blog posts available for the selected category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-10 mx-10">
          {currentPosts.map((item) => (
            <div
              key={item?._id}
              className="flex flex-col justify-between max-w-sm md:max-w-md rounded shadow-lg"
            >
              <Link to={`/single-post/${item?._id}`} className="h-1/2">
                <img
                  className="w-full h-[220px] rounded-t-lg"
                  src={item.imageURL}
                  alt={item.title}
                />
              </Link>
              <div className="px-4 py-5">
                <Link to={`/single-post/${item?._id}`}>
                  <div className="font-bold text-xl mb-2">{item.title}</div>
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
                <div className="mt-3 mb-2 text-sm text-gray-800">
                  {moment(item.date).fromNow()}{' '}
                  {/* 'postedTime' field in the 'item' */}
                </div>
              </div>

              <div>
                <div className="flex items-end justify-around mb-9">
                  <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-center bg-[#478ca9b4] hover.bg-[#2c536e] text-[#102129] shadow-md rounded-lg hover:text-white duration-150 curs focus:ring-4 focus:outline-none focus:ring-[#478ba9] dark:hover-bg-green-700">
                    <Link to={`/single-post/${item?._id}`}>Read more</Link>
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
                  <span className=" bg-[#0f4157] rounded-full px-3 py-1 text-sm font-semibold text-white">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">{renderPageNumbers}</div>
      <br />
      <Footer />
    </div>
  );
};

export default RecentBlogs;
