import React, { useContext, useState } from "react";
import "./accomodationsearchsection.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../../../Context/searchcontext";

const AccomodationSearchSection = () => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();
  const handleOpenDate = () => {
    setOpenDate(!openDate);
  };
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/accomodation-list", { state: { destination, date, options } });
  };

  return (
    <div>
      <Link to="/become-hotel-provider" style={{ textDecoration: "none" }}>
        <button id="switch-to-hp-btn">Switch to Hotel Provider</button>
      </Link>
      <div id="acc-search-section-container">
        <div id="acc-search-section-item">
          <i class="fa-solid fa-bed" id="acc-search-icons"></i>
          <input
            type="text"
            placeholder="Where are you going?"
            id="acc-search-section-input"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div id="acc-search-section-item">
          <i class="fa-solid fa-calendar-days" id="acc-search-icons"></i>
          <span onClick={handleOpenDate}>{`${format(
            date[0].startDate,
            "MM/dd/yyyy"
          )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
              className="acc-datee"
            />
          )}
        </div>

        <div id="acc-search-section-item">
          <i class="fa-solid fa-person" id="acc-search-icons"></i>
          <span
            onClick={() => setOpenOptions(!openOptions)}
          >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
          {openOptions && (
            <div id="acc-options">
              <div id="acc-options-items">
                <span id="acc-option-text">Adult</span>
                <div id="acc-counter-div">
                  <button
                    id="acc-option-counter"
                    disabled={options.adult <= 1}
                    onClick={() => handleOptions("adult", "d")}
                  >
                    -
                  </button>
                  <span id="acc-option-counter-btn">{options.adult}</span>
                  <button
                    id="acc-option-counter"
                    onClick={() => handleOptions("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div id="acc-options-items">
                <span id="acc-option-text">Children</span>
                <div id="acc-counter-div">
                  <button
                    id="acc-option-counter"
                    disabled={options.children <= 0}
                    onClick={() => handleOptions("children", "d")}
                  >
                    -
                  </button>
                  <span id="acc-option-counter-btn">{options.children}</span>
                  <button
                    id="acc-option-counter"
                    onClick={() => handleOptions("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div id="acc-options-items">
                <span id="acc-option-text">Room</span>
                <div id="acc-counter-div">
                  <button
                    id="acc-option-counter"
                    disabled={options.room <= 0}
                    onClick={() => handleOptions("room", "d")}
                  >
                    -
                  </button>
                  <span id="acc-option-counter-btn">{options.room}</span>
                  <button
                    id="acc-option-counter"
                    onClick={() => handleOptions("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div id="acc-search-section-item">
          <button id="acc-search-section-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccomodationSearchSection;
