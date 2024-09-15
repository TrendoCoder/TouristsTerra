import React, { useEffect, useState } from "react";
import "./accommodationhome.css";
import MenuBar from "../../homepage/menubar/menuBar";
import Footer from "../footer/footer";
import NavBar from "../../homepage/navbar/navBar";
import AccomodationSearchSection from "../accomodationsearchsection/accomodationsearchsection";
import FeaturedAccomodation from "../featuredaccomodation/featuredaccomodation";
import PropertyList from "../propertylist/propertylist";
import axios from "axios";
import Slider from "react-slick";
import h_ad1 from "../../../../images/h_ad1.jfif";
import { useNavigate } from "react-router-dom";
import ListOfHotels from "../listofhotels/listofhotels";
import ListOfRooms from "../listofrooms/listofrooms";

const AccommodationHome = () => {
  const [loading, setLoading] = useState(true);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [visibleHotels, setVisibleHotels] = useState(3);
  const [visibleRooms, setVisibleRooms] = useState(3);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    getHotels();
    getRooms();
    getFeaturedHotels();
  }, []);

  const getHotels = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/hotels/");
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/rooms/");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFeaturedHotels = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/hotels/?featured=true"
      );
      setFeaturedHotels(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: function (i) {
      return <div id="custom-dot" />;
    },
  };

  const handleLoadMore = () => {
    setVisibleHotels((prevVisibleHotels) => prevVisibleHotels + 3);
  };
const handleLoadMoreRoom = () =>{
  setVisibleRooms((prevVisibleRooms) => prevVisibleRooms + 3);

}
  return (
    <>
      <NavBar />
      <div id="accomo-ad-big-container">
        <div id="accomo-ad-container">
          <div id="big-container-accomo-ad">
            {loading ? (
              <Slider {...settings}>
                {featuredHotels.map((hotel) => (
                  <>
                    <div key={hotel.id}>
                      <img
                        id="crousal-img"
                        src={
                          hotel.photos
                            ? `${PF}/hotelimgs/${hotel.photos}`
                            : `${PF}/profileUpload.png`
                        }
                        alt={`${PF}/profileUpload.png`}
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div id="opacity-ad"></div>
                    <span
                      id="opacity-ad1"
                      onClick={() => {
                        navigate(`/accomodation-detail/${hotel._id}`);
                      }}
                    >
                      {hotel.title}
                    </span>
                  </>
                ))}
              </Slider>
            ) : (
              <img src={h_ad1} alt="" />
            )}
          </div>
          <div id="opacity-ad"></div>
        </div>

        <div id="menu-acc">
          <MenuBar />
        </div>
        <br />
        <br />
        <AccomodationSearchSection />
        <div id="main-container-accomo">
        <h2>Popular cities</h2>
          <FeaturedAccomodation />
          <h2>Browse by Property Type</h2>
          <PropertyList />
        </div>
        <div id="main-container-hotel">
          <h2>Hotels</h2>
          {loading
            ? hotels.slice(0, visibleHotels).map((hotel) => (
                <ListOfHotels key={hotel._id} item={hotel} />
              ))
            : ""}
          {visibleHotels < hotels.length && (
            <div id="load-more-hotels">

            <button onClick={handleLoadMore} >Load More</button>
            </div>
          )}
        </div>

        <div id="main-container-hotel">
          <h2>Rooms</h2>
          {loading
            ? rooms.slice(0, visibleRooms).map((room) => (
                <ListOfRooms key={room._id} item={room} />
              ))
            : ""}
          {visibleRooms < rooms.length && (
            <div id="load-more-hotels">
            <button onClick={handleLoadMoreRoom} >Load More</button>
            </div>
          )}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AccommodationHome;
