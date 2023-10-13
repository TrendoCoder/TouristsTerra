const express = require("express");
let router = express.Router();
let Post = require("../../models/posts");
const User = require("../../models/user");
//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      req.status(200).json("This post has been updated");
    } else {
      return res.status(404).json("You can update only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne(post.userId);
      req.status(200).json("This post has been deleted");
    } else {
      return res.status(404).json("You can delete only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.include(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    return res.status(500).json("err");
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
  router.get("/timeline/:userId",async(req,res)=>{
    let postArray = [];
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId:currentUser._id }); 
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return  Post.find({
                    userId : friendId
                });
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err);
    }
  });
//get user's all post
router.get("/profile/:userName", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    const posts = await Post.findOne({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
