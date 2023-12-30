import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom';
import NavBar from '../../homepage/navbar/navBar';
import MenuBar from '../../homepage/menubar/menuBar';
import Footer from '../../accommodationpage/footer/footer';
import BackgroundImage from "../../../../images/maldives3.jpg";


const history = createBrowserHistory();

const ExploreHomepage = () => {
  const [cityName, setCityName] = useState('');

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  console.log("cityName is: ", cityName);

  const searchCity = async () => {
    // try {
    //   // Assuming you have a route named '/destinations/:cityName' in your App component
    //   history.push("/citydetails");
    // } catch (error) {
    //   console.error(error);
    // }
   
    
  };

  return (
    <div>
      <NavBar />
      <MenuBar />
      <br /><br />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="bg-gray-300 max-h-screen rounded-xl font-sans text-center">
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
              <form onSubmit={
                ()=>{ try {
                  // Assuming you have a route named '/citydetails/:cityName' in your application
                  // const cityName = "desiredCityName"; // Replace this with the actual city name or retrieve it dynamically
                  history.push(`/citydetails/${cityName}`);
                } catch (error) {
                  console.error(error);
                }}
              } className="text-center">
                <div className="flex items-center justify-center mb-8">
                  <p className="text-xl font-semibold mr-5 text-[#0e212b]">
                    I want to visit near
                  </p>
                  <input
                    type="text"
                    placeholder="City"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    value={cityName}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="ml-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold shadow-md"
                    o
                    nClick={searchCity}
                  >
                    Search City!
                  </button>
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
