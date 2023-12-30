const _=require('lodash')
const ObjectId = require('mongoose').Types.ObjectId;
const cloudinary = require('cloudinary').v2;
const {User} = require("../../models/userlogin/user")
const axios = require("axios")

exports.getAllPlaceData = async (req, res) => {

    const cityName = req.params.cityName;
    console.log(cityName)
  
    const apiKey = 'AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM';
  
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist attractions in ${cityName}&key=${apiKey}`);
      console.log(response.data)
      res.json(response.data);
      
    } catch (error) {
      console.error('Error fetching places data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getPlaceDetails = async (req, res) => {
    const placeId = req.params.placeId;
    const apiKey = 'AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM';
  
    try {
      // Make a request to Google Maps Places API to fetch details based on placeId
      const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
      const response = await axios.get(googleMapsApiUrl);
  
      // Return the details to the client
      res.json(response.data.result);
    } catch (error) {
      console.error('Error fetching place details:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  