const express = require("express");
const { updateUser, deleteUser, getUser, getAllUser } = require("../../../controllers/userlogin/user");
const { verifyToken } = require("../../../utils/verifytoken");


const router = express.Router();

router.get("/checkAuthentication", verifyToken,(req,res,next)=>{
    res.send("Hello user, you are logged in");
});
router.get("/checkAuthentication/:id",(req,res,next)=>{
    res.send("Hello user, you are logged in and you can delete your account");
})

// Update
router.put("/:id", updateUser);

// Delete
router.delete("/:id", deleteUser);

// Get
router.get("/:id", getUser);

// Get All
router.get("/", getAllUser);

module.exports = router;
