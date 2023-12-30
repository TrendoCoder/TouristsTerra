import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../homepage/navbar/navBar';
import MenuBar from '../../homepage/menubar/menuBar';
import Footer from '../../accommodationpage/footer/footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PlaceDetails = () => {
  const { placeId } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const placesApiUrl = `http://localhost:3001/api/explore/places/details/${placeId}`;
        const response = await axios.get(placesApiUrl);
        console.log('API Response:', response.data);
        setPlaceDetails(response?.data);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  return (
    <div>
      <NavBar />
      <MenuBar />
      <br /><br /><br />

      {placeDetails && (
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4 inline-block border-b-2 border-gray-300 pb-2">{placeDetails.name}</h2>

          <div className="mb-4">
            <p className="text-gray-600 font-bold">Address:</p>
            <p className="text-gray-700">{placeDetails.formatted_address}</p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 font-bold">Average Rating:</p>
            <p className="text-gray-700">{placeDetails.rating}</p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 font-bold">Total Ratings:</p>
            <p className="text-gray-700">{placeDetails.user_ratings_total}</p>
          </div>

          {/* Display more details about the place */}
          {placeDetails.opening_hours && (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 inline-block border-b-2 border-gray-300 pb-2">Opening Hours:</h3>
              <p>{placeDetails.opening_hours.weekday_text.join('\n')}</p>
            </div>
          )}

          {/* Display carousel for images */}
          {placeDetails.photos && placeDetails.photos.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2 inline-block border-b-2 border-gray-300 pb-2">Images:</h3>
              <Carousel 
                showArrows={true} 
                showThumbs={false} 
                dynamicHeight={true} 
                showStatus={false} // Hide status bar
                useKeyboardArrows={true} // Enable arrow key navigation
                emulateTouch={true} // Enable swipe on desktop
                renderTopRightControls={({ currentSlide, totalSlides }) => (
                  <div className="absolute top-0 right-0 m-4 text-white">
                    {currentSlide + 1} / {totalSlides}
                  </div>
                )}
              >
                {placeDetails.photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=AIzaSyBAL2P8VPod87pnn5STC2V7uqWe8WxaZCM`}
                      alt={placeDetails.name}
                      className="rounded-md object-cover w-full h-auto"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PlaceDetails;
