import React from 'react'
import './blogmenu.css'
import { Link } from 'react-router-dom'
const BlogMenu = () => {
  return (
    <>
        <div id="blog-menu-container">
        <div id="blog-menu-left-container">
            <div id="blog-menu-opt">
            <Link to="/blog-home-page">Blog Home Page</Link>
            </div>
            <div id="blog-menu-opt"><Link to="/popular-blogs">Popular Blogs</Link></div>
            <div id="blog-menu-opt"><Link to="/recent-blogs">Recent Blogs</Link></div>
            </div>
        <div id="blog-menu-right-container">
        <div id="blog-menu-opt-right"><Link to="/become-a-blogger">Become a Blogger?</Link></div>
        
        </div>
           
        </div>
    </>
  )
}

export default BlogMenu