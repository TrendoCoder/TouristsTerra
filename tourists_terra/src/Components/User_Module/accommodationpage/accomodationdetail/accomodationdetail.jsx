import React, { useState } from "react";
import "./accomodationdetail.css";
import NavBar from "../../homepage/navbar/navBar";
import MenuBar from "../../homepage/menubar/menuBar";
import pic1 from "../../../../images/nature.jpg";
import pic2 from "../../../../images/hotel.jpeg";
const AccomodationDetail = () => {
  const [slider, setSlider] = useState(0);
  const [open, setOpen] = useState(false);

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
  return (
    <div>
      <NavBar />
      <MenuBar />
      <br />
      <br />
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
          <h1>Grand Hotel</h1>
          <div id="acc-address">
            <i class="fa-solid fa-location-dot"></i>
            <span>Elton is stay over 125</span>
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
              <h1>Stay in the heart of karkow</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                nulla itaque temporibus dignissimos? Aliquam, facilis ratione!
                Sequi consequatur mollitia soluta eum odit nobis iusto suscipit
                cumque minus quisquam dicta, et nemo ratione labore, quo
                tempore, repellendus doloribus ut illum magni beatae aut placeat
                aliquid. Illum harum quod nesciunt nulla odio deleniti minima
                explicabo? Iste repudiandae itaque voluptates, nesciunt cum
                laboriosam consequuntur quae libero similique suscipit hic
                pariatur, placeat mollitia a quos deleniti est aperiam non
                recusandae nam eveniet ipsam dolorem, nulla molestias. Dolorum
                ipsum aliquid quis repellat aut eveniet optio facilis maxime
                dolorem quibusdam, assumenda autem unde voluptates maiores quos
                nulla sunt qui quae rem tempora! Culpa nemo dolores molestiae
                veritatis exercitationem rem, deserunt inventore omnis alias
                adipisci consequuntur ratione necessitatibus! Ea recusandae et
                minus corrupti veritatis temporibus quos, magni nobis, fugit
                maiores, maxime qui alias sint modi dolores impedit eveniet in
                vero magnam officia natus numquam cupiditate? Doloremque
                suscipit rem obcaecati, iusto id saepe earum aut incidunt beatae
                tempore fugiat laborum fuga natus aperiam ullam minima quia
                deleniti culpa dolorum? Quis eius ratione, debitis sunt tempora
                consequatur laborum dicta omnis magni sed incidunt tempore
                corrupti aliquam. Esse aperiam sequi numquam itaque nisi facilis
                dolore soluta, quaerat in, dolorem amet.
              </p>
            </div>
            <div id="hotel-detail-price">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                quibusdam maiores aliquid laborum sed quisquam esse, quae sint!
                Dicta eius quaerat iste dolores quas magni officia fugit illo
                nesciunt aperiam minima possimus repellendus consectetur
                laboriosam hic sunt atque voluptatum at labore accusamus,
                blanditiis, vero exercitationem impedit?
              </span>
              <h2>
                <b>945$</b> (9 nights)
              </h2>
              <button>Reserve or Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccomodationDetail;
