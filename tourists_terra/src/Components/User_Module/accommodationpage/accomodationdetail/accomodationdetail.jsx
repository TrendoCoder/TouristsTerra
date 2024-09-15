import React, { useContext, useState } from "react";
import "./accomodationdetail.css";
import NavBar from "../../homepage/navbar/navBar";
import MenuBar from "../../homepage/menubar/menuBar";
import pic1 from "../../../../images/nature.jpg";
import pic2 from "../../../../images/hotel.jpeg";
import { useLocation } from "react-router-dom";
import useFetch from "../../../../Hooks/usefetch";
import { SearchContext } from "../../../../Context/searchcontext";
import ReserveAccomodation from "../reserveaccomodation/reserveaccomodation";

const AccomodationDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slider, setSlider] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/hotels/find/${id}`
  );
  const { options } = useContext(SearchContext);

  const handleOpen = () => {
    setSlider(0);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slider === 0 ? 5 : slider - 5;
    } else {
      newSlideNumber = slider === 5 ? 0 : slider + 1;
    }
    // setSlider(newSlideNumber);
  };

  const handleClick = () => {
    setOpenModel(true);
  };

  return (
    <div>
      <NavBar />
      <MenuBar />
      <br />
      <br />
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {open && (
            <div id="open-acc-img-slider">
              <i
                className="fa-solid fa-circle-xmark"
                id="img-closer"
                onClick={() => setOpen(false)}
              ></i>
              <i
                className="fa-solid fa-circle-arrow-left"
                id="arrows"
                onClick={() => handleMove("l")}
              ></i>
              <div id="slide-wrapper">
                <img src={pic1} alt="" />
              </div>
              <i
                className="fa-solid fa-circle-arrow-right"
                id="arrows"
                onClick={() => handleMove("r")}
              ></i>
            </div>
          )}
          <div id="acc-detail-container">
            <div id="acc-detail-wrapper">
              <button id="acc-reserve-now-btn" onClick={handleClick}>
                Reserve or Book Now
              </button>
              <h1>{data.title}</h1>
              <div id="acc-address">
                <i className="fa-solid fa-location-dot"></i>
                <span>{data.address}</span>
              </div>
              <div id="acc-imgs">
                <div id="acc-imgs-wrapper">
                  <img
                    src={
                      data.photos
                        ? PF + `/hotelimgs/${data.photos}`
                        : PF + "/profileUpload.png"
                    }
                    alt={PF + "/profileUpload.png"}
                    crossOrigin="anonymous"
                  />
                </div>
                <div id="acc-imgs-wrapper">
                  <img
                    src={pic2}
                    alt={PF + "/profileUpload.png"}
                    
                  />
                </div>
                <div id="acc-imgs-wrapper">
                  <img
                    src={
                      data.photos
                        ? PF + `/hotelimgs/${data.photos}`
                        : PF + "/profileUpload.png"
                    }
                    alt={PF + "/profileUpload.png"}
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
              <div id="acc-details">
                <div id="hotel-detail-text">
                  <h1>Must Visit Our Hotel{data.distance}</h1>
                  <p>{data.hotelDescription}</p>
                </div>
                <div id="hotel-detail-price">
                  <h1>Perfect for a 1-night stay! </h1>
                  <span>{data.hotelDescription}</span>
                  <h2>
                    <b>{1 * data.cheapestPrice}Rs</b> (1 night)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {openModel && <ReserveAccomodation setOpen={setOpenModel} hotelId={id} />}
    </div>
  );
};

export default AccomodationDetail;
