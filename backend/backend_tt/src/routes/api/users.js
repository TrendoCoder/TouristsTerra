// const express = require("express");
// let router = express.Router();
// let { User, validateUser } = require("../../models/user");

// const _ = require("lodash");
// const jwt = require("jsonwebtoken");
// const config = require("config");
// const bcrypt = require("bcryptjs");
// const { valid } = require("joi");
// const multer = require("multer");
// let Storage = multer.diskStorage({
//   destination: "public/images/",
//   filename: (req, file, cb) => {
//     cb(null, Data.now(file.originalname));
//     //  cb(null, file.originalname)
//   },
// });

// let upload = multer({
//   storage: Storage,
// });

// router.post("/signup", async (req, res) => {
//   let user = await User.findOne({ email: req.body.email });

//   if (user) return res.status(400).send("Already exist User");

//   user = new User();
//   user.email = req.body.email;
//   user.userName = req.body.userName;
//   user.contact = req.body.contact;
//   user.password = req.body.password;
//   user.confirmPassword = req.body.confirmPassword;

//   await user.generateHashedPassword();
//   await user.save();

//   // let token = jwt.sign({
//   //   _id: user._id,
//   //   email: email,
//   //   userName: userName,
//   // });

//   let dataToReturn = {
//     email: user.email,
//     userName: user.userName,
//     contact: user.contact,
//     password: user.password,
//     confirmPassword: user.confirmPassword,
//   };
//   return res.send(dataToReturn);
// });

// router.post("/login", async (req, res) => {
//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("user not exist");

//   let isValid = await bcrypt.compare(req.body.password, user.password);
//   if (!isValid) {
//     return res.status(401).send("Invalid Password");
//   }
//   let token = jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//     },
//     config.get("jwtPrivateKey")
//   );
//   res.send(token);
// });

// router.post(
//   "/eidtprofile",
//   upload.single("userProfileImg"),
//   async (req, res) => {
//     let user = new User();
//     user.name = req.body.name;
//     user.about = req.body.about;
//     user.userProfileImg = req.file.filename;
//     await user.save();

//     let dataToReturn = {
//       about: user.about,
//       userProfileImg: user.userProfileImg,
//     };
//     return res.send(dataToReturn);
//   }
// );

// // router.post("/register", (req,res)=>{
// //   const user = new User();
// // });

// //update a user
// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     if (req.body.password) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//       } catch (err) {
//         return res.send(500).json(err);
//       }
//     }
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       });
//       res.status(200).json("Account has been updated successfully");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("You can update only your Account");
//   }
// });

// // delete a user
// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("Account has been deleted");
//     } catch (err) {
//       return res.status(500).json("err");
//     }
//   } else {
//     return res.status(403).json("You can delete only your account");
//   }
// });

// //get a user
// router.get("/", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     //To skip some of the properties not showing to us
//     const { password, updatedAt, ...others } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// //follow a user
// router.put("/:id/follow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await findById(req.params.id);
//       const currentUser = await findById(req.body.userId);
//       if (!user.following.include(req.body.userId)) {
//         await user.updateOne({
//           $push: { followings: req.body.userId },
//         });
//         await currentUser.updateOne({
//           $push: {
//             followers: req.params.id,
//           },
//         });
//         return res.status(200).json("User has been Followed");
//       } else {
//         res.status(403).json("You Already Follow this");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You can not follow Yourself");
//   }
// });
// //unfollow a user
// router.put("/:id/unfollow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await findById(req.params.id);
//       const currentUser = await findById(req.body.userId);
//       if (user.following.include(req.body.userId)) {
//         await user.updateOne({
//           $pull: { followings: req.body.userId },
//         });
//         await currentUser.updateOne({
//           $pull: {
//             followers: req.params.id,
//           },
//         });
//         res.status(200).json("User has been Unfollowed");
//       } else {
//         res.status(403).json("You dont follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You can not follow Yourself");
//   }
// });
// module.exports = router;
