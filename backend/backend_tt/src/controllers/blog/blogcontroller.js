const Blog=require('../../models/blog/blog')
const _=require('lodash')
const ObjectId = require('mongoose').Types.ObjectId;

//GET all blogs from database

exports.getAllBlogs=async(req,res)=>{
    try {
      const blog = await Blog.find();
      if(_.isEmpty(blog))
      {
        res.status(200).json({message:"There is no data in Database"});
      }
      res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
}


//GET single blog from database @param blog_id

exports.getBlog = async (req, res) => {
  try {
    const blogId=req.params.id
    const blog = await Blog.findById(blogId);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
}


// Like and Unlike the blog @param id

exports.postLikeBlog = async(req,res)=>{
  try {
    const blogId=req.params.id
    const like=req.params.like
    if(like=="true")
    {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      res.status(200).json({message:"like",data:updatedBlog});
    }
    else{
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { likes:-1 } },
        { new: true }
      );
      res.status(200).json({message:"unlike",data:updatedBlog});
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

/**
 * 
 * @param {id} req 
 * @param { comment,userId } body 
 * @returns 
 */
//Comment on post
exports.postCommentBlog=async(req,res)=>{
  try {
    const blog = await Blog.findById(req.params.id);
    console.log(blog)
      await blog.updateOne({
        $push: {
          comments:{
           comment:req.body.comment,
           author:req.body.userId
          }          
        },
      });
      res.status(200).json("This blog has been commented");
  } catch (err) {
    return res.status(500).json(err);
  }
}

//-------- This code will transfer to Admin Pannel -----------

// Create the new Blog

exports.createBlog=async (req, res) => {
    
  // const userId = req.user._id
  
    console.log(req.body)
    const newBlog = new Blog(req.body);
    try {
      const savedBlog = await newBlog.save();
      res.status(200).json(savedBlog);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }



//Delete a Blog

exports.deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      if (blog.userId === req.body.userId) {
        await Blog.deleteOne({ _id: blogId });
        res.status(200).json("Document deleted successfully");
      } else {
        res.status(403).json({ error: "Unauthorized to delete this blog" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


//UPDATE

exports.updateBlog=async(req,res)=>{
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId === req.body.userId) {
      await Blog.updateOne({
        $set: req.body,
      });
      res.status(200).json("This Blog has been updated");
    } else {
      return res.status(404).json("You can update only Blog post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}