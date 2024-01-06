import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import NavBar from '../../homepage/navbar/navBar';
import MenuBar from '../../homepage/menubar/menuBar';
import Footer from '../../accommodationpage/footer/footer';

const containerStyle = {
  width: '100%',
  height: '250px',
  borderRadius: '15px',
};

const CityDetails = () => {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState(null);
  const [placesData, setPlacesData] = useState([]);
  const [map, setMap] = useState(null);

  const latitude = cityData?.geometry?.location?.lat;
  const longitude = cityData?.geometry?.location?.lng;

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: latitude,
      lng: longitude,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, [latitude, longitude]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // Fetch city details
        const cityDetailsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM`;
        const response = await axios.get(cityDetailsUrl);
        setCityData(response?.data.results[0]);

        // Fetch tourist attraction points using Places API
        const placesApiUrl = `http://localhost:3001/api/explore/places/${cityName}`;
        const placesResponse = await axios.get(placesApiUrl);

        // Sort placesData based on ratings in descending order
        const sortedPlaces = placesResponse?.data.results
          .filter((place) => place.photos && place.photos.length > 0) // Filter places with pictures
          .sort((a, b) => b.rating - a.rating); // Sort by ratings in descending order

        setPlacesData(sortedPlaces);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [cityName]);

  return (
    <div>
      <NavBar />
      <MenuBar />
      <div className="container mx-auto p-4">
        <div>
          <br />
          <h1 className="text-center mt-9 font-bold text-2xl text-[#182f3a] bg-gradient-to-r from-[#13252e] to-[#182f3a] text-transparent bg-clip-text tracking-wide leading-relaxed shadow-sm">
            Explore City
          </h1>
          <br />
          <h1 className="text-3xl text-[#182f3a] font-bold mb-4 inline-block border-b-2 border-gray-300 pb-2">
            Tourist Attractions in {cityData?.address_components?.[0]?.long_name || cityName}
          </h1>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {placesData.map((place) => (
              <Link key={place.place_id} to={`/placedetails/${place.place_id}`}>
                <div className="bg-gray-100 p-4 rounded-md shadow-md cursor-pointer">
                  <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                  <p className="text-gray-700">
                    <span className="font-bold">Address:</span> {place.formatted_address}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Average Rating:</span> {place.rating}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Total Ratings:</span> {place.user_ratings_total}
                  </p>

                  {place.photos && place.photos.length > 0 && (
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0]?.photo_reference}&key=AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM`}
                      alt={place.name}
                      className="mt-4 rounded-md h-60 w-full object-cover"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <br />

        <div>
          {cityData && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-t-2 border-gray-300 pt-7">{cityData.formatted_address}</h2>
              <LoadScript googleMapsApiKey="AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: latitude,
                    lng: longitude,
                  }}
                  zoom={8}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  <Marker
                    position={{
                      lat: latitude,
                      lng: longitude,
                    }}
                    title={cityData.formatted_address}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CityDetails;
