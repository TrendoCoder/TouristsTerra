import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import NavBar from '../../homepage/navbar/navBar';
import MenuBar from '../../homepage/menubar/menuBar';
import Footer from '../../accommodationpage/footer/footer';
import BackgroundImage from '../../../../images/maldives3.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const history = createBrowserHistory();

const ExploreHomepage = () => {
  const [exploreType, setExploreType] = useState('explore');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleExploreTypeChange = (e) => {
    setExploreType(e.target.value);
  };

  const handleInputChange = (e, cityName) => {
    if (cityName === 'from') {
      setFromCity(e.target.value);
    } else if (cityName === 'to') {
      setToCity(e.target.value);
    }
  };

  const searchCity = async () => {
    try {
      history.push(`/citydetails/${fromCity}`);
    } catch (error) {
      console.error(error);
    }
  };

  const askTouristTerra = async () => {
    try {
      setLoading(false);

      const response = await axios.post('http://localhost:3001/api/explore/travelCities', {
        city1: fromCity,
        city2: toCity,
      });

      // console.log(response.data);

      if (response.status === 200) {
        setLoading(true);
        navigate(`/suggestplaces/${fromCity}/${toCity}`);
      } else {
        console.error('Failed to get suggestions from Tourist Terra');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <MenuBar />
      <br /><br />
      <div style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: 'cover',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className="bg-gray-300 mr-10 max-h-screen rounded-xl font-sans text-center">
          <header className="bg-white shadow-md rounded-xl px-8 py-2 items-center">
            <div className="mb-5 text-center mt-1 rounded-md">
              <h1 className="text-2xl font-semibold text-[#182f3a]">
                Explore City
              </h1>
            </div>
          </header>
          <main className="px-8 py-9">
            <section className="mb-4">
              <h2 className="text-2xl font-bold mb-10 text-center text-[#182f3a]">
                Get Information from Tourist Terra about the Cities:
              </h2>
              <form className="text-center">
                <div className="flex items-center justify-center mb-8">
                  <p className="text-xl font-semibold mr-5 text-[#0e212b]">
                    I want to
                  </p>
                  <select
                    value={exploreType}
                    onChange={handleExploreTypeChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 bg-white text-gray-700"
                  >
                    <option value="explore" className="py-2">Explore</option>
                    <option value="travel" className="py-2">Travel</option>
                  </select>

                  {exploreType === 'explore' && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter City Name"
                        className="border border-gray-300 rounded ml-6 px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={fromCity}
                        onChange={(e) => handleInputChange(e, 'from')}
                      />
                      <button
                        type="submit"
                        className="ml-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold shadow-md"
                        onClick={searchCity}
                      >
                        Explore City!
                      </button>
                    </>
                  )}
                  {exploreType === 'travel' && (
                    <>
                      <p className="text-xl font-semibold ml-4 mr-5 text-[#0e212b]">
                        from
                      </p>
                      <input
                        type="text"
                        placeholder="City"
                        className="border border-gray-300 rounded w-20 px-1 py-2 focus:outline-none focus:border-blue-500"
                        value={fromCity}
                        onChange={(e) => handleInputChange(e, 'from')}
                      />
                      <p className="text-xl font-semibold ml-4 mr-5 text-[#0e212b]">
                        to
                      </p>
                      <input
                        type="text"
                        placeholder="City"
                        className="border border-gray-300 rounded w-20 px-1 py-2 focus:outline-none focus:border-blue-500"
                        value={toCity}
                        onChange={(e) => handleInputChange(e, 'to')}
                      />
                      <button
                        type="button"
                        className="ml-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold shadow-md"
                        onClick={askTouristTerra}
                        disabled={!loading}
                      >
                        {loading ? "Ask Tourist Terra!" : <i className="fa-solid fa-circle-notch fa-spin"></i>}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreHomepage;
