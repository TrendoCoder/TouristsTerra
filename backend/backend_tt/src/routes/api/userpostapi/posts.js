const express = require("express");
let router = express.Router();
const Post = require("../../../models/userpost/posts");
const { User } = require("../../../models/userlogin/user");

// Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.query.userId) {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true } 
      );
      res.status(200).json("This post has been updated");
    } else {
      return res.status(404).json("You can update only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});


// Delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.query.userId) {
      await post.deleteOne({ _id: req.params.id });
      res.status(200).json("This post has been deleted");
    } else {
      return res.status(404).json("You can delete only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
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
    return res.status(500).json(err);
  }
});

// Get a post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user's all posts by username
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ userName: new RegExp(req.params.username, 'i') });

    if (user) {
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
