import React, { useEffect, useState } from "react";
import "./accomoadsection.css";
import axios from "axios";
import Slider from "react-slick";
import h_ad1 from "../../../../images/h_ad1.jfif";

const AccommodationAdSection = () => {
  const [loading, setLoading] = useState(true);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setLoading(false);
    getFeaturedHotels();
  }, []);

  const getFeaturedHotels = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/hotels/?featured=true");
      setFeaturedHotels(res.data);
      console.log(featuredHotels);
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
      // Customize the dot size here
      return <div id="custom-dot" />;
    },
  };

  return (
    <div id="big-container-accomo-ad">
      {loading ? (
        <Slider {...settings}>
          {featuredHotels.map((hotel) => (
            <>
            <img
              key={hotel.id}
              id="crousal-img"
              src={
                hotel.photos
                  ? PF + `/hotelimgs/${hotel.photos}`
                  : PF + "/profileUpload.png"
              }
              alt={PF + "/profileUpload.png"}
              crossOrigin="anonymous"
            />
            <h1 id="opacity-ad1">Hiiiiiiiiiiiii</h1>
            </>
          ))}
        </Slider>
      ) : (
        <img src={h_ad1} alt="" />
      )}
    </div>
  );
};

export default AccommodationAdSection;
