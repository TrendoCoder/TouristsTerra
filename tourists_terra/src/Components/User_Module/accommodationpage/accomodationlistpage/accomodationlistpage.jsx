import React, { useState } from "react";
import "./accomodationlistpage.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchedAccomodationItems from "../searchedaccomodationitems/searchedaccomodationitems";
import NavBar from "../../homepage/navbar/navBar";
import MenuBar from "../../homepage/menubar/menuBar";
import useFetch from "../../../../Hooks/usefetch";

const AccomodationListPage = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const {data, loading, error, reFetch} = useFetch(`http://localhost:3001/api/hotels/?city=${destination}`)
  return (
    <>
    <NavBar/>
    <MenuBar/>
 <div id="alp-container">
      <div id="atp-wrapper">
        <div id="atp-search">
          <h1>Search</h1>
          <div id="isItem">
            <label>Destination</label>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div id="isItem">
            <label>
              Check-in Date
              </label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}{" "}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  minDate={new Date()}
                  ranges={date}
                  style={{ color: "black" }}
                />
              )}
          </div>
          <div id="isItem">
            <label>Options</label>
            <div id="isOptionItem">
                <span>Min Price <small>per night</small></span>
                <input type="number" id="isOptionItem-input" />
            </div>
            <div id="isOptionItem">
                <span>Max Price <small>per night</small></span>
                <input type="number" id="isOptionItem-input" />
            </div>
            <div id="isOptionItem">
                <span>Adult</span>
                <input type="number" id="isOptionItem-input"
                min={1}
                placeholder={options.adult} />
            </div>
            <div id="isOptionItem">
                <span>Children</span>
                <input type="number" id="isOptionItem-input"
                min={0}
                 placeholder={options.children} />
            </div>
            <div id="isOptionItem">
                <span>Room</span>
                <input type="number" id="isOptionItem-input"
                min={1}
                 placeholder={options.room} />
            </div>
          </div>
          <button id="alp-search-btn">Search</button>
        </div>
        <div id="atp-result">
        {
          loading?"Loading please wait":<>
          {
            data.map(item =>{
              <SearchedAccomodationItems item={item} key={item._id}/>
            })
          }
          
          </>
        }
           
        </div>
      </div>
    </div>
    </>
   
  );
};

export default AccomodationListPage;
