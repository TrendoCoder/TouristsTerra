import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import MenuBar from "../../homepage/menubar/menuBar";
import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
import { loadStripe } from "@stripe/stripe-js";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { AuthContext } from "../../../../Context/authcontext";
import axios from "axios";
const TransportDetails = () => {
  const [details, setDetails] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const { user } = useContext(AuthContext);
  const [days, setDays] = useState(1); // Initialize quantity to 1
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { transportDetailId } = useParams();

  const handleAddToBookingHistory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/booking-history/add-booking",
        {
          userId: user?._id,
          guideId: transportDetailId,
          startDate: dateRange[0].startDate,
          endDate: dateRange[0].endDate,
          price: details.price.toFixed(2) * days,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      return response.data; // Return the response
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error; // Rethrow the error to be caught by the calling function
    }
  };

  console.log("Params", transportDetailId);

  useEffect(() => {
    fetch(`http://localhost:3001/api/transportDetail/${transportDetailId}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [transportDetailId]);

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OFAzLHNYB7xRUtt828R4itFeJaCXKxqwqnzeaJpfhrjXmn3Ptb3dGbFRA6FatC1ClmXEhzwXqmpF4C3PaIOgv4Y002iRHUwKW"
    );

    const body = {
      product: {
        id: details.id, // Assuming your product object has an 'id' property
        name: details.name,
        image: details.image,
        price: details.price,
        days: days,
        // tax: tax,
        // Send the incremented quantity
      },
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/stripe1/create-checkout-session1",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleDateChange = (ranges) => {
    // Update the state with the selected date range
    setDateRange([ranges.selection]);

    // Calculate the number of days between the selected dates
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const daysDifference = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Update the 'days' state with the calculated difference
    setDays(daysDifference);
  };

  if (!details) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const incrementDays = () => {
    setDays(days + 1);
  };

  const decrementDays = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div id="accomo-ad-container">
        <AccommodationAdSection />
        <div id="opacity-ad">
          <Link to="">
            <h1>Wana Shop?</h1>
          </Link>
        </div>
      </div>

      <div id="menu-acc">
        <MenuBar />
      </div>
      <div className="mx-auto mb-20 max-w-screen-xl mt-20 px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Main Image */}
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={details.image}
              alt={details.name}
              className="h-full w-full object-cover object-center"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Product Details */}
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">Name</span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {details.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <div
                className="flex h-7 items-center gap-1 rounded-full  px-2 text-white"
                style={{ backgroundColor: "#0F4157" }}
              >
                <span className="text-sm">{details.ratings}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ backgroundColor: "#0F4157" }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500 transition duration-100">
                {details.ratingCount} ratings
              </span>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                About
              </span>
              <div className="flex flex-wrap gap-2">
                {/* {product.colors?.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-8 w-8 rounded-full border ${color} ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200`}
                  ></button>
                ))} */}

                {details.about}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8 md:mb-10">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                Days
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={decrementDays}
                  className="h-8 w-8 flex items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  -
                </button>
                <span className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800">
                  {days}
                </span>
                <button
                  type="button"
                  onClick={incrementDays}
                  className="h-8 w-8 flex items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  +
                </button>
              </div>

              <div className="mb-8 md:mb-10">
                <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                  Select Dates
                </span>

                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateChange}
                  showSelectionPreview={true}
                />
              </div>
            </div>

            {/* Add size and other details here as needed */}

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  Rs:{details.price.toFixed(2) * days}
                </span>
                {/* Add original price with strike-through if applicable */}
              </div>
              <span className="text-sm text-gray-500">
                incl. VAT plus shipping
              </span>
            </div>

            {/* Add shipping notice and other details as needed */}
            {bookingError && (
              <div className="text-red-500 mt-2">{bookingError}</div>
            )}
            <div className="flex gap-2.5">
              <Link to={`/chat`}>
                <button
                  className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
                  style={{ backgroundColor: "#0F4157" }}
                >
                  chat
                </button>
              </Link>
              {details.inStock ? (
                <button
                  onClick={async () => {
                    setBookingError(null);

                    try {
                      const response = await handleAddToBookingHistory();

                      if (!response.error) {
                        makePayment();
                      } else {
                        setBookingError(
                          response.message || "Error adding to booking history"
                        );
                      }
                    } catch (error) {
                      console.error("Error adding to cart:", error);
                      setBookingError("Already booked on these Dates");
                    }
                  }}
                  className={`inline-block rounded-lg ${
                    bookingError ? "bg-red-500" : "bg-gray-200"
                  } px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 ${
                    bookingError ? "" : "hover:bg-gray-300 focus-visible:ring"
                  } active:text-gray-700 md:text-base`}
                  style={{ backgroundColor: "#0F4157" }}
                  disabled={bookingError ? true : false}
                >
                  {bookingError ? "Booking Error" : "Hire Now"}
                </button>
              ) : (
                <button
                  className="inline-block rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:text-gray-700 md:text-base"
                  disabled
                >
                  Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransportDetails;
