var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let otpGenerator = require("otp-generator");
const { Admin } = require("../../../models/admin/adminLogin/auth");
const { createError } = require("../../../utils/error");

const getAdminByEmail = async (req, res, next) => {
  try {
    const { email } = req.params; 
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }
    const { password, ...adminDetails } = admin._doc;
    res.status(200).json(adminDetails);
  } catch (err) {
    next(err);
  }
};

module.exports.getAdminByEmail = getAdminByEmail;

const updateAdmin = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { newPassword, ...otherUpdates } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }
    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      admin.password = hash;
    }
    for (const key in otherUpdates) {
      if (Object.hasOwnProperty.call(otherUpdates, key)) {
        admin[key] = otherUpdates[key];
      }
    }
    await admin.save();
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports.updateAdmin = updateAdmin;

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = new Admin({
      email: req.body.email,
      password: hash,
    });
    await newAdmin.save();
    res.status(200).send("Admin has been created ");
  } catch (err) {
    next(err);
  }
};
module.exports.register = register;

const existAdmin = async (req, res, next) => {
  try {
    const { email } = req.query;
    const existingEmail = await Admin.findOne({ email: email });
    if (existingEmail) {
      return res.status(200).send("Existig");
    }
    return res.status(900).send("Invalid user");
  } catch (err) {
    next(err);
  }
};
module.exports.existAdmin = existAdmin;

const login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
    });
    if (!admin) {
      return next(createError(404, "Admin not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or Email!"));
    }
    const token = jwt.sign(
      { id: admin._id },
      "jwtPrivateKey"
    );
    const { password, ...otherDetails } = admin._doc;
    res.status(200).json({ token, ...otherDetails });
  } catch (err) {
    next(err);
  }
};
module.exports.login = login;

//otp generator
const generateOtp = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabet: false,
    upperCaseAlphabet: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
};

module.exports.generateOtp = generateOtp;

//verifyOtp
const verifyOtp = async (req, res) => {
  console.log("orignal: " + req.app.locals.OTP);
  const { code } = req.query;
  console.log("code:" + code);
  if (req.app.locals.OTP === code) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(200).send({ msg: "Verify Successfully" });
  } else {
    return res.status(400).send({ error: "Invalid OTP" });
  }
};
module.exports.verifyOtp = verifyOtp;

//create Reset Session
const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "Access" });
  }
  return res.status(400).send({ msg: "Session Expried" });
};
module.exports.createResetSession = createResetSession;

//resetPassword
const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session Expired" });
    const { _id, password } = req.body;
    try {
      Admin.findOne({ _id })
        .then((admin) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              Admin.updateOne(
                { _id: admin._id },
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  return res.status(201).send({ msg: "Record Updated" });
                }
              );
            })
            .catch((e) => {
              return res
                .status(500)
                .send({ error: "Enable to hashed Password" });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Admin Not Found" });
        });
    } catch (err) {
      return res.status(500).send({ err });
    }
  } catch (err) {
    return res.status(401).send({ err });
  }
};
module.exports.resetPassword = resetPassword;
