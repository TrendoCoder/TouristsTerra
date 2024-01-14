import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import NavBar from '../../homepage/navbar/navBar';
import MenuBar from '../../homepage/menubar/menuBar';
import Footer from '../../accommodationpage/footer/footer';

const SuggestPlaces = () => {
    return (
      <div>
      <NavBar />
      <MenuBar />
      <br /><br /><br />
        {/* Add content for the Suggest Places page */}
        <h1>Suggested Places Page</h1>
        {/* Add any other content or components for the Suggest Places page */}
        <Footer/>
      </div>
    );
  };
  
  export default SuggestPlaces;
  