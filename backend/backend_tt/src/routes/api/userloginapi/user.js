const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  followAUser,
  unFollowUser,
  getFriends,
  updateUserPassword,
  getRandomUsersWithPreference,
} = require("../../../controllers/userlogin/user");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../../../utils/verifytoken");
const router = express.Router();
router.get("/checkAuthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in");
});
router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and you can delete your account");
});
router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello Admin, you are logged in and you can delete all account");
});

// Update
router.put("/:id",updateUser);
//update Password
router.put("/pass/:id",updateUserPassword);
// Delete
router.delete("/delete/:userId", deleteUser);
// Get
router.get("/", getUser);
// Get All
router.get("/all", getAllUsers);
// Get friends
router.get("/friends/:idOfUser", getFriends);
//follow a user
router.put("/:id/follow", followAUser);
// unfollow a user
router.put("/:id/unfollow", unFollowUser);
// get random suggessions
router.get("/randomUsers/:idOfUser/:count?", getRandomUsersWithPreference);
module.exports = router;
