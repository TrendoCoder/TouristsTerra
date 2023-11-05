var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");

var productRouter = require("./src/routes/api/shopapi/product");
var categoryRouter = require("./src/routes/api/shopapi/category");
var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/api/users");
var postsRouter = require("./src/routes/api/posts");
var hotelRouter = require("./src/routes/api/hotelapi/hotels");
var authRouter = require("./src/routes/api/userloginapi/auth");
var userRouter = require("./src/routes/api/userloginapi/user");

dotenv.config();

// var config = require("config");
var cors = require("cors");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/post", postsRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/", indexRouter);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose
  .connect(
    "mongodb+srv://tourist-terra:7dtd1nISHV6sNcvg@cluster0.cnvxp3w.mongodb.net/tourist_terra",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDb"))
  .catch((error) => console.log(error.message));
module.exports = app;
