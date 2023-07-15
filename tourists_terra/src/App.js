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
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="accommodation" element={<AccommodationHome />}></Route>
            <Route path="transport" element={<TransportHomePage />}></Route>
            <Route path="localguide" element={<LocalGuideHome/>} ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
