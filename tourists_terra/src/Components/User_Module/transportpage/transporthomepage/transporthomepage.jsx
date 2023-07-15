import React from "react";
import "./transporthomepage.css";
import MenuBar from "../../homepage/menubar/menuBar";
import TransportFilter from "../transportfilter/transportfilter";
import TransportAdBaneer from "../transportadbaneer/transportadbaneer";
import Footer from "../../accommodationpage/footer/footer";
import TransportList from "../transportlist/transportlist";
import { Link } from "react-router-dom";
const TransportHomePage = () => {
  return (
    <div id="trans-ad-big-container">
      <div id="trans-ad-container">
        <TransportAdBaneer />
        <div id="opacity-ad">
          <Link to="">
            <h1>Wana Transport?</h1>
          </Link>
        </div>
      </div>
      <div id="menu-acc">
        <MenuBar />
      </div>
      <br />
      <br />
      <div id="main-container-trans">
        <div id="container-filter-trans">
          <TransportFilter />
        </div>
        <div id="container-trans-cards">
          <TransportList />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default TransportHomePage;
