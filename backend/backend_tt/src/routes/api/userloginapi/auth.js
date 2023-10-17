const express = require("express");
const { register, login } = require("../../../controllers/userlogin/auth");

let router = express.Router();

router.post("/register", register );

router.post("/loginUser",login);

module.exports = router;