const Blog=require('../../models/blog/blog')
const _=require('lodash')
const ObjectId = require('mongoose').Types.ObjectId;
const cloudinary = require('cloudinary').v2;
const {User} = require("../../models/userlogin/user")
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

//Get all blogs from database on a UserId
// exports.getBlogsByUserId = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Find the user based on the provided userId
//     const user = await User.findOne({ userId });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//       console.log(data)
//     }
//     // Find all blogs associated with the user
//     const blogs = await Blog.find({ user: user._id });
//     res.status(200).json(blogs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
exports.getBlogsByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blogs = await Blog.find({ userId: user._id });
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//POST new blog to database


// Like and Unlike the blog @param id
exports.likeDislikeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const userId = req.body.userId;

    if (!blog.likes.includes(userId)) {
      // If the user has not liked the post, add their ID to the likes array
      await blog.updateOne({ $push: { likes: userId } });
    } else {
      // If the user has already liked the post, remove their ID from the likes array
      await blog.updateOne({ $pull: { likes: userId } });
    }

    // Fetch the updated blog after the like/dislike operation
    const updatedBlog = await Blog.findById(req.params.id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: blog.likes.includes(userId) ? 'Post has been disliked' : 'Post has been liked',
      payload: { blog: updatedBlog },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};


// exports.postLikeBlog = async(req,res)=>{
//   try {
//     const blogId=req.params.id
//     const like=req.params.like
//     if(like=="true")
//     {
//       const updatedBlog = await Blog.findByIdAndUpdate(
//         blogId,
//         { $inc: { likes: 1 } },
//         { new: true }
//       );
//       res.status(200).json({message:"like",data:updatedBlog});
//     }
//     else{
//       const updatedBlog = await Blog.findByIdAndUpdate(
//         blogId,
//         { $inc: { likes:-1 } },
//         { new: true }
//       );
//       res.status(200).json({message:"unlike",data:updatedBlog});
//     }
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// }

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
    console.log(newBlog);
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


exports.getRecentBlogs=async(req,res)=>{
  const now = new Date();
  console.log("now date",now)
  now.setUTCHours(0, 0, 0, 0);
  const updatedDate= now.toISOString();
  console.log(updatedDate)
  let data= await Blog.find({date:{$gt:updatedDate}})
  console.log(data)
  if(!_.isEmpty(data))
  {
    res.status(200).json(data)
  }
  else
  {
    res.status(200).json("No recent Blog found")
  }
}