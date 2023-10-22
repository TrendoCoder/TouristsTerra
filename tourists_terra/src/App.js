import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Components/User_Module/homepage/landingpage/landingPage";
import AccommodationHome from "./Components/User_Module/accommodationpage/accommodationhome/accommodationhome";
import TransportHomePage from "./Components/User_Module/transportpage/transporthomepage/transporthomepage";
import LocalGuideHome from "./Components/User_Module/localguidepage/localguidehome/localguidehome";
import BlogHomePage from "./Components/User_Module/blogpage/bloghomepage/bloghomepage";
import SignUpPage from "./Components/User_Module/signuppage/signUpPage";
import LoginUser from "./Components/User_Module/loginpage/loginUser";
import BookingTransportForm from "./Components/User_Module/forms/bookingtransportform/bookingtransportform";
import ProfilePage from "./Components/User_Module/profilepage/profilehomepage/profilepage/profilepage";
import EditProfilePage from "./Components/User_Module/profilepage/editprofilepage/editprofilepage";
import BecomeABlogger from "./Components/User_Module/blogpage/becomeablogger/becomeablogger";
import AddBlogPost from "./Components/User_Module/blogpage/addblogpost/addblogpost";
import ExploreHomepage from "./Components/User_Module/explorepage/explorehomepage/explorehomepage";
import EditUserProfile from "./Components/User_Module/profilepage/edituserprofile/edituserprofile";
import ShopHomePage from "./Components/User_Module/shoppage/shophomepage/shophomepage";
import AccomodationListPage from "./Components/User_Module/accommodationpage/accomodationlistpage/accomodationlistpage";
import FeaturedBlogs from "./Components/User_Module/blogpage/featuredblogs/featuredblogs";
import RecentBlogs from "./Components/User_Module/blogpage/recentblogs/recentblogs";
import MyBlogs from "./Components/User_Module/blogpage/myblogs/myblogs";
import SinglePost from "./Components/User_Module/blogpage/singlepost/singlepost";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="accommodation" element={<AccommodationHome />}></Route>
            <Route path="accomodation-list" element={<AccomodationListPage/>}></Route>
            <Route path="transport" element={<TransportHomePage />}></Route>
            <Route path="localguide" element={<LocalGuideHome />}></Route>
            <Route path="blog-home-page" element={<BlogHomePage />}></Route>
            <Route path="add-blog-post" element={<AddBlogPost />}></Route>
            <Route path="become-a-blogger" element={<BecomeABlogger />}></Route>
            <Route path="featured-blogs" element={<FeaturedBlogs/>}></Route>
            <Route path="recent-blogs" element={<RecentBlogs/>}></Route>
            <Route path="my-blogs" element={<MyBlogs/>}> </Route>
            <Route path="single-post" element={<SinglePost/>}> </Route>
            <Route />
            <Route path="sign-up" element={<SignUpPage />}></Route>
            <Route path="login-user" element={<LoginUser />}></Route>
            <Route
              path="booking-transport-form"
              element={<BookingTransportForm />}
            ></Route>
            <Route path="profile-page" element={<ProfilePage />}></Route>
            <Route
              path="edit-profile-page"
              element={<EditProfilePage />}
            ></Route>
            <Route
              path="explore-home-page"
              element={<ExploreHomepage />}
            ></Route>
            <Route
              path="edit-user-profile"
              element={<EditUserProfile />}
            ></Route>
            <Route path="shop-home-page" element={<ShopHomePage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
