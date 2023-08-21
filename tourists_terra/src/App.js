import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/User_Module/homepage/navbar/navBar";
import LandingPage from "./Components/User_Module/homepage/landingpage/landingPage";
import AccommodationHome from "./Components/User_Module/accommodationpage/accommodationhome/accommodationhome";
import TransportHomePage from "./Components/User_Module/transportpage/transporthomepage/transporthomepage";
import LocalGuideHome from "./Components/User_Module/localguidepage/localguidehome/localguidehome";
import SignUpPage from "./Components/User_Module/signuppage/signUpPage";
import LoginUser from "./Components/User_Module/loginpage/loginUser";
import BookingTransportForm from "./Components/User_Module/forms/bookingtransportform/bookingtransportform";
function App() {
  return (
    <div>
      <Router>

        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="accommodation" element={<AccommodationHome />}></Route>
            <Route path="transport" element={<TransportHomePage />}></Route>
            <Route path="localguide" element={<LocalGuideHome/>} ></Route>
            <Route path="sign-up" element={<SignUpPage/>}></Route>
            <Route path="login-user" element={<LoginUser/>}></Route>
            <Route path="booking-transport-form" element={<BookingTransportForm/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
