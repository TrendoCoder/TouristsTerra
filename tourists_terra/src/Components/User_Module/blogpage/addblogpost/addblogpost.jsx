import React, { useRef, useState } from "react";
import "./addblogpost.css";
import BlogMenu from "../blogmenu/blogmenu";
import Footer from "../../accommodationpage/footer/footer";
import JoditEditor from 'jodit-react'
const AddBlogPost = () => {
    const editor = useRef(null);
    const [content,setContent] = useState('');

    const config = {
        placeholder:"Start Typing..."
    }
  return (
    <>
      <BlogMenu />
      <br />
      <div id="add-blog-post-main-container">
        <div id="add-blog-post-lite-container">
          <form action="">
            <div id="add-blog-post-actions">
              <h3>Whats on your mind?</h3>
            </div>

            <div id="add-blog-post-actions">
              <label>Post Title</label>
              <input type="text" placeholder="Enter here" />
            </div>

            <div id="add-blog-post-actions">
              <label>Post Content</label>
              {/* <textarea name="" id="" style={{width:"100%",height:"250px",border:"1px solid darkgray"}}>
              </textarea> */}
              <JoditEditor
              ref={editor}
              value={content}
              tabIndex={4}
            onChange={newContent=>setContent(newContent)}
              />
            </div>

            <div id="add-blog-post-actions">
              <label>Category</label>
              
              <select name="" id="">
                <option value="">Category 1</option>
                <option value="">Category 2</option>
                <option value="">Category 3</option>
                <option value="">Category 4</option>
              </select>
            </div>

            <div id="add-blog-post-actions-btn">
              <div>
              <button id="cr">Create</button>
              </div>
              <div>
              <button id="re">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      <Footer/>
    </>
  );
};

export default AddBlogPost;
