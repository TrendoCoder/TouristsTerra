const jwt = require("jsonwebtoken");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(token, "jwtPrivateKey", (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
module.exports.verifyToken = verifyToken;

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
    return next(createError(403, "You are not Authorized"));
    }
  });
};
module.exports.verifyUser = verifyUser;

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
      return next(createError(403, "You are not Authorized"));
      }
    });
  };
  module.exports.verifyAdmin = verifyAdmin;

  const localVeriables = (req,res,next) => {
    req.app.locals = {
      OTP : null,
      resetSession : false,
    }
    next();
  }
  module.exports.localVeriables = localVeriables;