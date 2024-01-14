var createError = require("http-errors");
var express = require("express");
var path = require("path");

const stripe = require("stripe")(
  "sk_test_51OFAzLHNYB7xRUttx13GbXadMp57xuuxhCoDWelr1cNz9DJZdg96PevapuTssYvQ5mIdd34UfCyzZIyyt8CppBDd00R3ViuhYz"
);
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const multer = require("multer");
const cors = require("cors");
var adminRouter = require("./src/routes/api/adminApi/adminLoginApi/auth");
var productRouter = require("./src/routes/api/shopapi/product");
var productRatingRouter = require("./src/routes/api/shopapi/rating");
var categoryRouter = require("./src/routes/api/shopapi/category");
var guideRouter = require("./src/routes/api/localguideapi/details");
var cityRouter = require("./src/routes/api/localguideapi/city");
var transportDetailRouter = require("./src/routes/api/transportapi/transportDetail");
var transportCategoryRouter = require("./src/routes/api/transportapi/transportCategory");
var indexRouter = require("./src/routes/index");
var postsRouter = require("./src/routes/api/userpostapi/posts");
var hotelRouter = require("./src/routes/api/hotelapi/hotels");
var roomRouter = require("./src/routes/api/hotelapi/rooms");
var authRouter = require("./src/routes/api/userloginapi/auth");
var userRouter = require("./src/routes/api/userloginapi/user");
var blogRouter = require("./src/routes/api/blogapi/blogapi");
var exploreRouter = require("./src/routes/api/exploreapi/exploreapi");
var serviceProviderRouter = require("./src/routes/api/serviceproviderapi/serviceproviderapi");
var conversationRouter = require("./src/routes/api/usermessengerapi/conversation");
var messageRouter = require("./src/routes/api/usermessengerapi/message");
var guidelinesRouter = require("./src/routes/api/adminApi/guidelinesandpoliciesapi/guidelines");
var reportRouter = require("./src/routes/api/reportApi/reportApi");
var contactUsRouter = require("./src/routes/api/contactusapi/contactusapi");
const bookingHistoryRoutes = require("./src/routes/api/localguideapi/bookingHistory");
const bookingHistory_1Routes = require("./src/routes/api/transportapi/bookingHistory");
// stripe
const cartRoutes = require("./src/routes/api/shopapi/cartRoutes");
// stripe
const stripeRouter = require("./src/routes/api/stripe/checkoutRoute");
// stripeLG
const stripeLGRouter = require("./src/routes/api/stripeLG/checkoutLGRoute");
dotenv.config();

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// stripe
app.use("/api/stripe", stripeRouter);
// Image storage
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

// Store profile picture
const storageProfilePic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profilePicture");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadProfilePic = multer({ storage: storageProfilePic });
app.post(
  "/api/upload/profilePicture",
  uploadProfilePic.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);
// store Profile Cover Pic
const storageProfileCoverPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profileCoverPic");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadProfileCoverPic = multer({ storage: storageProfileCoverPic });
app.post(
  "/api/upload/profileCoverPic",
  uploadProfileCoverPic.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);

// store id card front Pic
const storageIdCardFrontPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/idcardfrontpic");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadIdCardFrontPic = multer({ storage: storageIdCardFrontPic });
app.post(
  "/api/upload/idcardfrontpic",
  uploadIdCardFrontPic.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);

// store id card front Pic
const storageIdCardBackPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/idcardbackpic");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadIdCardBackPic = multer({ storage: storageIdCardBackPic });
app.post(
  "/api/upload/idcardbackpic",
  uploadIdCardBackPic.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);

// store Hotel Image
const storageHotelImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/hotelimgs");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadHotelImg = multer({ storage: storageHotelImage });
app.post("/api/upload/hotelimgs", uploadHotelImg.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// store Room Image
const storageRoomImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/hotelimgs/roomimgs");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadRoomImg = multer({ storage: storageRoomImage });
app.post(
  "/api/upload/hotelimgs/roomimgs",
  uploadRoomImg.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);
//store paymentScreenShot
const storagePaymentScreenShot = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/paymentScreenShot");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const paymentScreenShot = multer({ storage: storagePaymentScreenShot });
app.post(
  "/api/upload/paymentScreenShot",
  paymentScreenShot.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);
app.use("/", indexRouter);
app.use("/api/post", postsRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product-rating", productRatingRouter);
app.use("/api/product", productRouter);
app.use("/api/transportCategory", transportCategoryRouter);
app.use("/api/transportDetail", transportDetailRouter);
app.use("/api/booking-history", bookingHistoryRoutes);
app.use("/api/booking-history-1", bookingHistory_1Routes);
app.use("/api/cart", cartRoutes);
app.use("/api/city", cityRouter);
app.use("/api/details", guideRouter);
app.use("/api/city", cityRouter);
app.use("/api/details", guideRouter);
app.use("/api/bloguser", blogRouter);
app.use("/api/explore", exploreRouter);
app.use("/api/serviceProvider", serviceProviderRouter);
app.use("/api/user-conversation", conversationRouter);
app.use("/api/user-message", messageRouter);
app.use("/api/report", reportRouter);
app.use("/api/contactus", contactUsRouter);
// stripe
app.use("/api/stripe", stripeRouter);
// LGstripe
app.use("/api/stripe1", stripeLGRouter);
//admin Routers
app.use("/api/admin", adminRouter);
app.use("/api/admin/guidelines-and-policies", guidelinesRouter);
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
