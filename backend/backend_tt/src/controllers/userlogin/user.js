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

const updateUserPassword = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};
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
  console.log("hello")
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
      if (!currentUser.following.includes(req.body.id)) {
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
    const user = await User.findById(req.params.idOfUser);

    const followers = await Promise.all(
      user.followers.map(async (followerId) => {
        try {
          const follower = await User.findById(followerId);
          return follower || {}; // Return an empty object if follower is null
        } catch (error) {
          console.error(`Error in followerId ${followerId}:`, error);
          throw error; // Rethrow the error
        }
      })
    );

    const following = await Promise.all(
      user.following.map(async (followingId) => {
        try {
          const followingUser = await User.findById(followingId);
          return followingUser || {}; // Return an empty object if followingUser is null
        } catch (error) {
          console.error(`Error in followingId ${followingId}:`, error);
          throw error; // Rethrow the error
        }
      })
    );

    const friends = [...followers, ...following];

    const uniqueUsersMap = new Map();

    friends.forEach((friend) => {
      if (friend && friend._id) {
        const { _id, userName, userProfilePicture } = friend;
        uniqueUsersMap.set(friend._id.toString(), {
          _id,
          userName,
          userProfilePicture,
        });
      }
    });

    const uniqueFriendList = Array.from(uniqueUsersMap.values());

    res.status(200).json(uniqueFriendList);
  } catch (err) {
    console.error("Error in getFriends:", err);
    res.status(500).json(err);
  }
};

module.exports.getFriends = getFriends;

//Get friends suggesstion
const getRandomUsersWithPreference = async (req, res) => {
  try {
    const userId = req.params.idOfUser;
    const count = req.params.count || 15;

    // Get the user's friends
    const user = await User.findById(userId);
    const userFriends = user.following;

    // Get friends of friends
    const friendsOfFriends = await User.aggregate([
      { $match: { _id: { $nin: [userId, ...userFriends] } } }, // Exclude the user and their friends
      { $sample: { size: count * 2 } }, // Get a larger random set to have more options
    ]);

    // Exclude the current user and their friends from the filtered set
    const filteredFriendsOfFriends = friendsOfFriends.filter(
      (friend) =>
        !userFriends.includes(friend._id.toString()) &&
        friend._id.toString() !== userId
    );

    // Sample the final random users from the filtered list
    const randomUsers = filteredFriendsOfFriends.slice(0, count);

    // Exclude sensitive fields
    const sanitizedRandomUsers = randomUsers.map((user) => ({
      _id: user._id,
      userName: user.userName,
      userProfilePicture: user.userProfilePicture,
    }));

    res.status(200).json(sanitizedRandomUsers);
  } catch (err) {
    console.error("Error in getRandomUsersWithPreference:", err);
    res.status(500).json(err);
  }
};

module.exports.getRandomUsersWithPreference = getRandomUsersWithPreference;
