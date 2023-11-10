var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const multer = require("multer");
const cors = require('cors'); 
var productRouter = require("./src/routes/api/shopapi/product");
var categoryRouter = require("./src/routes/api/shopapi/category");
var indexRouter = require("./src/routes/index");
var postsRouter = require("./src/routes/api/userpostapi/posts");
var hotelRouter = require("./src/routes/api/hotelapi/hotels");
var roomRouter = require("./src/routes/api/hotelapi/rooms");
var authRouter = require("./src/routes/api/userloginapi/auth");
var userRouter = require("./src/routes/api/userloginapi/user");
var blogRouter = require("./src/routes/api/blogapi/blogapi");

dotenv.config();

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors({
  origin:"http://localhost:3000"
})); 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", indexRouter);
app.use("/api/post", postsRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/bloguser", blogRouter);
app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

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
