const express = require('express');
let router = express.Router();
let {User ,validateUser} = require("../../models/user");

const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/signup",async(req,res) =>{
    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(400).send("Already exist User");

    user = new User();
    user.email = req.body.email;
    user.userName = req.body.userName;
    user.contact = req.body.contact;
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    await user.save();
});

module.exports = router;
