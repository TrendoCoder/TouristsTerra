const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  followAUser,
  unFollowUser,
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
router.put("/:id", updateUser);

// Delete
router.delete("/:id", deleteUser);

// Get
router.get("/:id", getUser);

// Get All
router.get("/", getAllUsers);

router.put("/:id/follow", followAUser);

router.put("/:id/unfollow", unFollowUser);

module.exports = router;
