const express = require("express");
const { User } = require("../../models/userlogin/user");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports.updateUser = updateUser;

const updateUserPassword = async (req,res, next) => {
  try{
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { password: hashedPassword },
      },
      { new: true } 
    );
    res.status(200).json(user);
    console.log(user);
  }
  catch(err){
    next(err);
  }
}
module.exports.updateUserPassword = updateUserPassword;


const deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
};
module.exports.deleteUser = deleteUser;

const getUser = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.userName;
  const email = req.query.email;

  try {
    const user = userId
      ? await User.findById(userId)
      : username
      ? await User.findOne({ userName: username })
      : await User.findOne({ email: email });

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = getUser;


const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password -updatedAt");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
module.exports.getAllUsers = getAllUsers;

//follow a user
const followAUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.following.includes(req.body.userId)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $push: {
            following: req.params.id,
          },
        });
        return res.status(200).json("User has been Followed");
      } else {
        res.status(403).json("You Already Follow this");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not follow Yourself");
  }
};
module.exports.followAUser = followAUser;

//unfollow a user
const unFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $pull: {
            following: req.params.id,
          },
        });
        res.status(200).json("User has been Unfollowed");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not follow Yourself");
  }
};
module.exports.unFollowUser = unFollowUser;

// get friends
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followers.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, userName, userProfilePicture } = friend;
      friendList.push({ _id, userName, userProfilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getFriends = getFriends;
