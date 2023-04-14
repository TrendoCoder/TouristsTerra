import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/User_Module/NavBar/navBar";
import LandingPage from "./Components/User_Module/Landing_Page/landingPage";
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
