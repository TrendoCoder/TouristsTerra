const { User } = require("../../models/userlogin/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../../utils/error");
let otpGenerator = require("otp-generator");

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser) {
      return res.status(409).send("Username already exists");
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(900).send("Email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      contact: req.body.contact,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    await newUser.save();
    res.status(200).send("User has been created ");
  } catch (err) {
    next(err);
  }
};

module.exports.register = register;

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or Email!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "jwtPrivateKey"
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
module.exports.login = login;

//otp generator
const generateOtp = async (req,res)=>{
  req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphaber:false, upperCaseAlphabet:false, specialChars:false});
  res.status(201).send({code: req.app.locals.OTP});
}
module.exports.generateOtp = generateOtp;

//verifyOtp
const verifyOtp = async(req,res)=>{
  const {code}= req.query;
  if(parseInt(req.app.locals.OTP)=== parseInt(code)){
    res.app.locals.OTP = null;
    res.app.locals.resetSession = true;
    return res.status(200).send({msg:"Verify Successfully"});
  }else {
    return res.status(400).send({error:"Invalid OTP"});
  }
}
module.exports.verifyOtp = verifyOtp;

//create Reset Session
const createResetSession = async(req,res)=>{
  if(req.app.locals.resetSession){
    req.app.locals.resetSession = false;
    return res.status(201).send({msg: "Access"});
  }
  return res.status(400).send({msg: "Session Expried"});
}
module.exports.createResetSession = createResetSession;

//resetPassword
const resetPassword = async(req, res)=>{
  try{
    if(!req.app.locals.resetSession) return res.status(440).send({error:"Session Expired"});
    const {email, password} = req.body;
    try{
      User.findOne({email})
      .then(user=>{
        bcrypt.hash(password,10)
        .then( hashedPassword => {
          User.updateOne({email: user.userName},{password:hashedPassword}, function(err,data){
            if(err) throw err;
            return res.status(201).send({msg:"Record Updated"});
          })
        })
        .catch(e => {
          return res.status(500).send({error:"Enable to hashed Password"}); 
        })
      })
      .catch(error=>{
        return res.status(404).send({error: "UserName Not Found"})
      })
    }catch(err){
      return res.status(500).send({err})
    }
  }catch(err){
    return res.status(401).send({err})
  }
}
module.exports.resetPassword = resetPassword;

//registed Mail
const registerMail = async(req,res) => {

}
module.exports.registerMail = registerMail;