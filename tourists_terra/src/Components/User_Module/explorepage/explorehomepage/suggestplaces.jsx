import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCar } from 'react-icons/fa';
import BackgroundImage from '../../../../images/road.jpg';
import NavBar from '../../homepage/navbar/navBar';
import MenuBar from '../../homepage/menubar/menuBar';
import Footer from '../../accommodationpage/footer/footer';

const SuggestPlaces = () => {
  const { city1, city2 } = useParams();
  const [suggestedPlaces, setSuggestedPlaces] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/explore/travelCities', {
          city1: city1,
          city2: city2,
        });

        const placesArray = JSON.parse(response.data);

        setSuggestedPlaces(response.data);
        setLoading(true);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching suggested places:', error);
      }
    };

    fetchData();
  }, [city1, city2]);

  // Function to convert the string with bullet points to an array
  const convertToBulletPointsArray = (text) => {
    // Replace escaped newlines with HTML line breaks
    const formattedText = text.replace(/\\n/g, '<br />');

    // Match all bullet points using a regular expression
    const regex = /\d+\.\s[^\d]+/g;
    const matches = formattedText.match(regex);

    // Return the matches as an array
    return matches || [];
  };

  return (
    <div >
      <NavBar />
      <MenuBar />
      <br /><br />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: 'cover',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          minHeight:"60vh",
          maxheight: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <br /><br /><br /><br />
        <div className="container mt-10 bg-[#000000c2] text-white p-4 rounded-md mb-10">
          <h1 className="text-3xl font-bold mb-4 inline-block border-b-2 border-gray-400 pb-2">
            <FaCar className="mr-2" /> Suggestions for Road Trip between {city1} and {city2}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {loading ? (
              <div>
                {convertToBulletPointsArray(suggestedPlaces).map((place, index) => (
                  <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: place }} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuggestPlaces;
