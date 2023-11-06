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

  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/hotels/find/${id}`
  );
  const { date, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
let days = (dayDifference(
    date[0].endDate , date[0].startDate
  ) 
  );
  if(days===0){
    days = 1;
  }
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

  const handleClick = () =>{
    setOpenModel(true);
  }
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
                class="fa-solid fa-circle-xmark"
                id="img-closer"
                onClick={() => setOpen(false)}
              ></i>
              <i
                class="fa-solid fa-circle-arrow-left"
                id="arrows"
                onClick={handleMove("l")}
              ></i>
              <div id="slide-wrapper">
                <img src={pic1} alt="" />
              </div>
              <i
                class="fa-solid fa-circle-arrow-right"
                id="arrows"
                onClick={handleMove("r")}
              ></i>
            </div>
          )}
          <div id="acc-detail-container">
            <div id="acc-detail-wrapper">
              <button id="acc-reserve-now-btn">Reserve or Book Now</button>
              <h1>{data.title}</h1>
              <div id="acc-address">
                <i class="fa-solid fa-location-dot"></i>
                <span>{data.address}</span>
              </div>
              <div id="acc-imgs">
                <div id="acc-imgs-wrapper">
                  <img onClick={handleOpen} src={pic1} alt="" />
                </div>
                <div id="acc-imgs-wrapper">
                  <img src={pic2} alt="" />
                </div>
                <div id="acc-imgs-wrapper">
                  <img src={pic1} alt="" />
                </div>
                <div id="acc-imgs-wrapper">
                  <img src={pic2} alt="" />
                </div>
                <div id="acc-imgs-wrapper">
                  <img src={pic1} alt="" />
                </div>
                <div id="acc-imgs-wrapper">
                  <img src={pic2} alt="" />
                </div>
              </div>
              <div id="acc-details">
                <div id="hotel-detail-text">
                  <h1>Stay in the heart of karkow {data.distance}</h1>
                  <p>{data.hotelDescription}</p>
                </div>
                <div id="hotel-detail-price">
                  <h1>Perfect for a {days}-night stay! </h1>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                    quibusdam maiores aliquid laborum sed quisquam esse, quae
                    sint! Dicta eius quaerat iste dolores quas magni officia
                    fugit illo nesciunt aperiam minima possimus repellendus
                    consectetur laboriosam hic sunt atque voluptatum at labore
                    accusamus, blanditiis, vero exercitationem impedit?
                  </span>
                  <h2>
                    <b>{days * data.cheapestPrice * options.room}$</b> ({days}{" "}
                    nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {
        openModel && <ReserveAccomodation setOpen={setOpenModel} hotelId= {id} />
      }
    </div>
  );
};

export default AccomodationDetail;
