import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
import Footer from "../../accommodationpage/footer/footer";
import MenuBar from "../../homepage/menubar/menuBar";

const GuideDetails = () => {
  const [details, setDetails] = useState(null);
  const { detailsId } = useParams();
  // console.log(useParams())

  useEffect(() => {
    fetch(`http://localhost:3001/api/details/${detailsId}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [detailsId]);

  if (!details) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  console.log(details);
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
      <br />
      <br />

      <div className="container mx-auto p-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <img
            className="w-full h-64 object-cover"
            src={details.image}
            alt={details.name}
          />
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {details.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              City: {details.city?.name}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Guide's About
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {details.about}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Languages</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {details.languages && details.languages.join(", ")}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Wage</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  ${details.price.toFixed(2)}
                </dd>
              </div>
              {/* Add more product details here as needed */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Available Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {details.status ? "true" : "false"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Rating</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {details.ratings} <span className="text-yellow-400">★</span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Guide Information
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {details.seller &&
                  details.seller.userName &&
                  details.seller.email
                    ? `${details.seller.userName} - ${details.seller.email}`
                    : "N/A"}
                </dd>
              </div>
              {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Stock Availability
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {details.inStock ? "In Stock" : "Out of Stock"}
                </dd>
              </div> */}
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuideDetails;
