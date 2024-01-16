const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const axios = require('axios');

exports.getAllPlaceData = async (req, res) => {
  const cityName = req.params.cityName;
  console.log(cityName);

  const apiKey = 'AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM';

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist attractions in ${cityName}&key=${apiKey}`
    );
    console.log(response.data);
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

// Function to show data between cities using ChatGPT
async function travelCities(city1, city2) {
  try {
    const ChatGPTModule = await import('chatgpt');
    const ChatGPTAPI = ChatGPTModule.ChatGPTAPI;

    if (typeof ChatGPTAPI !== 'function') {
      console.error('ChatGPTAPI is not a constructor:', ChatGPTAPI);
      throw new Error('Invalid ChatGPTAPI constructor');
    }

    const api = new ChatGPTAPI({
      apiKey: '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',
    });

    if (!(api instanceof ChatGPTAPI)) {
      console.error('Failed to create an instance of ChatGPTAPI:', api);
      throw new Error('Failed to create ChatGPTAPI instance');
    }

    const prompt = `i am planning to do a road trip between ${city1} and ${city2}. suggest me some attraction points and activities that i can perform on my way and suggest me what precautions do i have to take. Give me whole result in bullet points `;

    const response = await api.sendMessage(prompt);
    return response;
  } catch (error) {
    console.error('Error in travelCities:', error);
    throw new Error('Failed to get suggestions from ChatGPT.');
  }
}

exports.travelCities = travelCities;




