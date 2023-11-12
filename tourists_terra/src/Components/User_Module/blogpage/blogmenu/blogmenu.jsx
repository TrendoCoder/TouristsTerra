import React,{useContext} from 'react'
import './blogmenu.css'
import { AuthContext } from "../../../../Context/authcontext";
import { Link } from 'react-router-dom'

const BlogMenu = () => {
  const { user } = useContext(AuthContext);
  console.log(user.isBlogAdmin)
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
        {
          
          user.isBlogAdmin
          ? <div id="blog-menu-opt-right"><Link to="/my-blogs">My Blogs</Link></div>
          : <div id="blog-menu-opt-right"><Link to="/become-a-blogger">Become a Blogger?</Link></div>
        }
       
        
        </div>
           
        </div>
    </>
  )
}

export default BlogMenu