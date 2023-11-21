import React,{useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/User_Module/homepage/landingpage/landingPage";
import AccommodationHome from "./Components/User_Module/accommodationpage/accommodationhome/accommodationhome";
import TransportHomePage from "./Components/User_Module/transportpage/transporthomepage/transporthomepage";
import LocalGuideHome from "./Components/User_Module/localguidepage/localguidehome/localguidehome";
import SignUpPage from "./Components/User_Module/signuppage/signUpPage";
import LoginUser from "./Components/User_Module/loginpage/loginUser";
import BookingTransportForm from "./Components/User_Module/forms/bookingtransportform/bookingtransportform";
import ProfilePage from "./Components/User_Module/profilepage/profilehomepage/profilepage/profilepage";
import BecomeABlogger from "./Components/User_Module/blogpage/becomeablogger/becomeablogger";
import AddBlogPost from "./Components/User_Module/blogpage/addblogpost/addblogpost";
import ExploreHomepage from "./Components/User_Module/explorepage/explorehomepage/explorehomepage";
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
import ProductDetail from "./Components/User_Module/shoppage/shophomepage/ProductDetail";
import GuideDetails from "./Components/User_Module/localguidepage/localguidehome/guidedetail";
import BecomeHotelProvider from "./Components/User_Module/accommodationpage/becomehotelprovider/becomehotelprovider";

import AdminHomePage from "./Components/adminmodule/adminhomepage/adminhomepage";
import { AuthContext } from "./Context/authcontext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
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
            <Route path="/details/:detailsId" element={<GuideDetails />} />
            <Route path="blog-home-page" element={<BlogHomePage />}></Route>
            <Route path="add-blog-post" element={<AddBlogPost />}></Route>
            <Route path="become-a-blogger" element={<BecomeABlogger />}></Route>
            <Route path="popular-blogs" element={<PopularBlogs />}></Route>
            <Route path="recent-blogs" element={<RecentBlogs />}></Route>
            <Route path="my-blogs" element={<MyBlogs />}></Route>
            <Route path="/update-blog/:id" element={<UpdateBlogPost />} />
            {/*<Route path="my-blogs/:id" element={<MyBlogs />}></Route>*/}
            <Route path="single-post/:id" element={<SinglePost />}> </Route>
            <Route path="blog-menu" element={<BlogMenu />}></Route>

            <Route path="sign-up" element={<SignUpPage />}></Route>
            <Route path="login-user" element={<LoginUser />}></Route>
            <Route
              path="booking-transport-form"
              element={<BookingTransportForm />}
            ></Route>
            <Route
              path="profile-page/:userName"
              element={<ProfilePage />}
            ></Route>
            {/* <Route
              path="edit-profile-page"
              element={<EditProfilePage />}
            ></Route> */}
            <Route
              path="explore-home-page"
              element={<ExploreHomepage />}
            ></Route>
            <Route
              path="edit-user-profile/:id"
              element={<EditUserProfile />}
            ></Route>
            <Route path="shop-home-page" element={<ShopHomePage />}></Route>
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="admin-home-page" element={<AdminHomePage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
