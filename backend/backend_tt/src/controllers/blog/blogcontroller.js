const Blog=require('../model/Blog')
const _=require('lodash')
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * get all blogs from database
 */

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

/**
 * get single blog from database
 * @param blog_id
 */

exports.getBlog=async (req, res) => {
  try {
    const blogId=req.params.id
    const blog = await Blog.findById(blogId);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
}

/**
 * Like and Unlike the blog
 * @param id
 */
exports.postLikeBlog=async(req,res)=>{
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

/**
 * Create the new Blog
 */

exports.createBlog=async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.deleteBlog=async (req, res) => {
  try {
    const blogId=req.params.id
    const blog = await Blog.findById(blogId);
    console.log(typeof(blogId),blog)
     if (blog.userId === req.body.userId) {
      await Blog.deleteOne({_id:blogId},err=>{
        if(err) throw err; 
        res.status(200).json("Document deleted successfully");
      });
     
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

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