import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/User_Module/homepage/landingpage/landingPage";
import About from "./Components/User_Module/about/About";
import AccommodationHome from "./Components/User_Module/accommodationpage/accommodationhome/accommodationhome";
import TransportHomePage from "./Components/User_Module/transportpage/transporthomepage/transporthomepage";
import LocalGuideHome from "./Components/User_Module/localguidepage/localguidehome/localguidehome";
import SignUpPage from "./Components/User_Module/signuppage/signUpPage";
import LoginUser from "./Components/User_Module/loginpage/loginUser";
import ForgetPassword from "./Components/User_Module/loginpage/forgetpassword/forgetpassword";
import ResetPassword from "./Components/User_Module/loginpage/resetpassword/resetPassword";
import BookingTransportForm from "./Components/User_Module/forms/bookingtransportform/bookingtransportform";
import ProfilePage from "./Components/User_Module/profilepage/profilehomepage/profilepage/profilepage";
import BecomeABlogger from "./Components/User_Module/blogpage/becomeablogger/becomeablogger";
import BecomeLocalGuideProvider from "./Components/User_Module/localguidepage/localguidehome/becomeLgProvider";
import AddBlogPost from "./Components/User_Module/blogpage/addblogpost/addblogpost";
import ExploreHomepage from "./Components/User_Module/explorepage/explorehomepage/explorehomepage";
import CityDetails from "./Components/User_Module/explorepage/explorehomepage/citydetails";
import PlaceDetails from "./Components/User_Module/explorepage/explorehomepage/placedetails";
import SuggestPlaces from "./Components/User_Module/explorepage/explorehomepage/suggestplaces";
import EditUserProfile from "./Components/User_Module/profilepage/edituserprofile/edituserprofile";
import ShopHomePage from "./Components/User_Module/shoppage/shophomepage/shophomepage";
import AccomodationListPage from "./Components/User_Module/accommodationpage/accomodationlistpage/accomodationlistpage";
import AccomodationDetail from "./Components/User_Module/accommodationpage/accomodationdetail/accomodationdetail";
import HotelAdminHomePage from "./Components/User_Module/accommodationpage/hoteladmin/hoteladminhomepage/hoteladminhomepage";
import BlogHomePage from "./Components/User_Module/blogpage/bloghomepage/bloghomepage";
import PopularBlogs from "./Components/User_Module/blogpage/popularblogs/popularblogs";
import RecentBlogs from "./Components/User_Module/blogpage/recentblogs/recentblogs";
import MyBlogs from "./Components/User_Module/blogpage/myblogs/myblogs";
import BlogMenu from "./Components/User_Module/blogpage/blogmenu/blogmenu";
import UpdateBlogPost from "./Components/User_Module/blogpage/updateblogpost/updateblogpost";
import SinglePost from "./Components/User_Module/blogpage/singlepost/singlepost";
import GuideDetails from "./Components/User_Module/localguidepage/localguidehome/guidedetail";
import Cart from "./Components/User_Module/shoppage/shophomepage/Cart";
import BecomeHotelProvider from "./Components/User_Module/accommodationpage/becomehotelprovider/becomehotelprovider";
import UserChatPage from "./Components/User_Module/userchatpage/userchatpage/userchatpage";
import AdminHomePage from "./Components/adminmodule/adminhomepage/adminlandingpage/adminhomepage";
import Success from "./Components/User_Module/shoppage/shophomepage/Success";
import ContactUs from "./Components/User_Module/contactus/contactus";
import ProductDetail from "./Components/User_Module/shoppage/shophomepage/ProductDetail";
import TransportDetails from "./Components/User_Module/transportpage/transporthomepage/transportdetailpage";
import BookingHistory from "./Components/User_Module/localguidepage/localguidehome/bookingHistory";
import BookingHistoryTransport from "./Components/User_Module/transportpage/transporthomepage/bookingHistory";
import BecomeShopProvider from "./Components/User_Module/shoppage/shophomepage/becomeShopProvider";
import BecomeTransportProvider from "./Components/User_Module/transportpage/transporthomepage/becomeTransportProvider";
import SuccessLg from "./Components/User_Module/localguidepage/localguidehome/successLg";
import Chat from "./Components/User_Module/localguidepage/localguidehome/guidechat";
import AdminLoginPage from "./Components/adminmodule/adminloginpage/adminLoginPage";
import Adminforgetpassword from "./Components/adminmodule/adminforgetpassword/adminforgetpassword";
import AdminResetPassword from "./Components/adminmodule/adminresetpassword/adminresetpassword";
function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="admin-login" element={<AdminLoginPage />}></Route>
            <Route
              path="admin-forget-password"
              element={<Adminforgetpassword />}
            ></Route>
            <Route path="reset-admin-password/:id" element={<AdminResetPassword/>}></Route>

            <Route path="sign-up" element={<SignUpPage />}></Route>
            <Route path="login-user" element={<LoginUser />}></Route>
            <Route path="forget-password" element={<ForgetPassword />}></Route>
            <Route
              path="reset-user-password/:userId"
              element={<ResetPassword />}
            ></Route>

            <Route path="/" element={<LandingPage />}></Route>
            <Route path="user-chat-page" element={<UserChatPage />}></Route>
            <Route path="accommodation" element={<AccommodationHome />}></Route>
            <Route
              path="accomodation-list"
              element={<AccomodationListPage />}
            ></Route>
            <Route
              path="accomodation-detail/:hotel_id"
              element={<AccomodationDetail />}
            ></Route>
            <Route
              path="become-hotel-provider/:userId"
              element={<BecomeHotelProvider />}
            ></Route>
            <Route
              path="hotel-admin-homepage/:userId"
              element={<HotelAdminHomePage />}
            ></Route>
            <Route path="transport" element={<TransportHomePage />}></Route>
            <Route path="localguide" element={<LocalGuideHome />}></Route>
            <Route
              path="become-local-guide-provider/:userId"
              element={<BecomeLocalGuideProvider />}
            ></Route>
              <Route
              path="become-shop-provider/:userId"
              element={<BecomeShopProvider />}
            ></Route>
              <Route
              path="become-transport-provider/:userId"
              element={<BecomeTransportProvider />}
            ></Route>
            <Route path="/details/:detailsId" element={<GuideDetails />} />
            <Route path="blog-home-page" element={<BlogHomePage />}></Route>
            <Route path="add-blog-post" element={<AddBlogPost />}></Route>
            <Route path="become-a-blogger" element={<BecomeABlogger />}></Route>
            <Route path="popular-blogs" element={<PopularBlogs />}></Route>
            <Route path="recent-blogs" element={<RecentBlogs />}></Route>
            <Route path="my-blogs" element={<MyBlogs />}></Route>
            <Route path="/update-blog/:id" element={<UpdateBlogPost />} />
            <Route path="single-post/:id" element={<SinglePost />} />
            <Route path="blog-menu" element={<BlogMenu />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route
              path="booking-transport-form"
              element={<BookingTransportForm />}
            />
            <Route
              path="profile-page/:username"
              element={<ProfilePage />}
            ></Route>
            <Route
              path="explore-home-page"
              element={<ExploreHomepage />}
            ></Route>

            <Route
              path="citydetails/:cityName"
              element={<CityDetails />}
            ></Route>
            <Route
              path="placedetails/:placeId"
              element={<PlaceDetails />}
            ></Route>
            <Route
            path="suggestplaces/:city1/:city2"
            element={<SuggestPlaces />}
          ></Route>

            <Route
              path="edit-user-profile/:id"
              element={<EditUserProfile />}
            ></Route>
            <Route path="shop-home-page" element={<ShopHomePage />}></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart/:productId" element={<Cart />} />
            <Route path="transport" element={<TransportHomePage />}></Route>
            <Route
              path="/transportDetail/:transportDetailId"
              element={<TransportDetails />}
            ></Route>
            <Route path="/bookinghistory" element={<BookingHistory />}></Route>
            <Route
              path="/bookinghistory-1"
              element={<BookingHistoryTransport />}
            ></Route>
            <Route path="localguide" element={<LocalGuideHome />}></Route>
            <Route path="/details/:detailsId" element={<GuideDetails />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/successlg" element={<SuccessLg />}></Route>
            <Route path="admin-home-page" element={<AdminHomePage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="shop-home-page" element={<ShopHomePage />}></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart/:productId" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
