import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { AuthContext } from "../../../../Context/authcontext"; // Import AuthContext
const RatingModal = (props) => {
  const { productId, setIsModalOpen, productName } = props;
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the payload object
    const payload = {
      quantity: rating,
      userId: user?._id, // Ensure you have user ID available here or pass it accordingly
    };
    console.log(user?._id);
    try {
      // Make Axios POST request
      const response = await axios.post(
        `http://localhost:3001/api/product-rating/${productId}`,
        payload
      );
      console.log("Rating submitted: ", response.data);
      setIsModalOpen(false);

      // Redirect or close modal as needed
      // window.location.href = "http://localhost:3002/products";
    } catch (error) {
      console.error("Error submitting rating: ", error);
    }
  };

  const handleStarClick = (starRating) => {
    setRating(starRating === rating ? 0 : starRating);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Rating for Guide {productName}
            </h3>

            <div className="mt-2 px-7 py-3">
              <form onSubmit={handleSubmit}>
                {/* Rating label on a new line */}
                <div className="mb-4 text-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                </div>

                {/* Add the star rating section on a new line */}
                <div className="mb-4 flex justify-center items-center">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <svg
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className={`h-8 w-8 shrink-0 fill-${
                          index <= rating ? "amber-400" : "gray-300"
                        }`}
                        viewBox="0 0 256 256"
                      >
                        <svg
                          key={index}
                          onClick={() => handleStarClick(index)}
                          className={`h-8 w-8 shrink-0 fill-${
                            index <= rating ? "#0F4157" : "gray-300"
                          }`}
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill={index <= rating ? "#0F4157" : "none"}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2 z"></path>
                        </svg>
                      </svg>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{ backgroundColor: "#0F4157" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingModal;
