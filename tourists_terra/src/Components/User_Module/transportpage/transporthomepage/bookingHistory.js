import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import RatingModal_1 from "./ratingModal";
import { AuthContext } from "../../../../Context/authcontext";
import axios from "axios";

const BookingHistoryTransport = () => {
  const [bookingHistory, setBookingHistory] = useState(null);
  const { user } = useContext(AuthContext);
  const [selectedGuideId, setSelectedGuideId] = useState(null);

  const fetchBookingHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/booking-history-1/get-booking-history/${user._id}`
      );
      setBookingHistory(response.data);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookingHistory();
    }
  }, [user]);

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/booking-history-1/delete-booking/${bookingId}`
      );
      fetchBookingHistory();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (transportId) => {
    setIsModalOpen(!isModalOpen);
    setSelectedGuideId(transportId);
    
  };
  
  useEffect(() => {
    if (isModalOpen) {
      document
        .getElementById("main-div")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!bookingHistory) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div id="main-div">
      <Navbar />

      <div className="bg-white mt-8 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="space-y-4">
            <h1 className="flex flex-col items-center mt-8 mb-0 pb-0 text-center text-2xl font-bold text-gray-800 md:text-3xl">
              Booking History
            </h1>
            {bookingHistory.map((booking, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-md shadow-md mb-4 flex items-center"
              >
                <div className="w-1/3 h-56 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={booking.transportId.image}
                    alt={booking.transportId.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <div>
                    <span className="text-xl font-bold text-gray-800">
                      Guide: {booking.transportId.name}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="block text-gray-500">
                      Dates: {new Date(booking.startDate).toLocaleDateString()}{" "}
                      - {new Date(booking.endDate).toLocaleDateString()}
                    </span>
                    <span className="block text-gray-800">
                      Price: Rs. {booking.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex-none ml-4 space-y-2">
                  <button
                    onClick={() => toggleModal(booking.transportId._id)}
                    className="inline-block bg-indigo-500 px-6 py-2 text-sm font-semibold text-white rounded-md transition duration-300 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-700 gap-2"
                    style={{ backgroundColor: "#0F4157" }}
                  >
                    Rate Transport
                  </button>

                  {isModalOpen && (
                    <RatingModal_1
                      toggle={toggleModal}
                      guideId={selectedGuideId}
                      setIsModalOpen={setIsModalOpen}
                      guideName={booking.transportId.name}
                    />
                  )}
                </div>
                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="inline-block bg-red-500 px-6 py-2 text-sm font-semibold text-white rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 active:bg-red-700 ml-2"
                >
                  Delete Booking
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingHistoryTransport;
