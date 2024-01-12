import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./shophomepage.css";
import AccommodationAdSection from "../../../accommodationpage/accomoadsection/accomoadsection";
import Footer from "../../../accommodationpage/footer/footer";
import MenuBar from "../../../homepage/menubar/menuBar";
import GuideModal from "./guidemodal";

// Helper function to group products by category name
const groupByCity = (details) => {
  return details.reduce((acc, detail) => {
    const key = detail.city?.name || "Other";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(detail);
    return acc;
  }, {});
};

const LocalGuideHomePage = () => {
  const [details, setDetails] = useState([]);
  const [temp, setTemp] = useState([]);
  const [groupedDetails, setGroupedDetails] = useState({});

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = () => {
    fetch("http://localhost:3001/api/details")
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setGroupedDetails(groupByCity(data));
        setTemp(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const [filter, setFilter] = useState({
    quantity: [],
    price: { from: "", to: 10000 },
    rating: [],
  });

  const handleQuantityChange = (size) => {
    setFilter((prevFilter) => {
      let newQuantity;

      if (prevFilter.quantity.includes(size)) {
        // If the selected size is already set, clear the selection
        newQuantity = [];
      } else {
        // Set the quantity to an array with the selected size
        newQuantity = [size];
      }

      // Log the change
      console.log(
        `Size ${size} is now ${
          newQuantity.includes(size) ? "selected" : "unselected"
        }.`
      );

      // Return the updated filter object
      return {
        ...prevFilter,
        quantity: newQuantity,
      };
    });
  };

  const handlePriceChange = (field, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      price: {
        ...prevFilter.price,
        [field]: Number(value),
      },
    }));
  };

  const handleRatingChange = (selectedRating) => {
    setFilter((prevFilter) => {
      const numericRating = parseInt(selectedRating, 10);

      const newRatings = prevFilter.rating.includes(numericRating)
        ? prevFilter.rating.filter((rating) => rating !== numericRating)
        : [...prevFilter.rating, numericRating];

      console.log(
        `Rating ${numericRating} is now ${
          newRatings.includes(numericRating) ? "selected" : "unselected"
        }.`
      );

      return {
        ...prevFilter,
        rating: newRatings,
      };
    });
  };

  useEffect(() => {
    let filteredDetails = temp;

    // Quantity filter logic
    if (filter.quantity.includes("Available")) {
      filteredDetails = filteredDetails.filter((detail) => detail.quantity > 0);
    }

    if (filter.quantity.includes("UnAvailable")) {
      filteredDetails = filteredDetails.filter(
        (detail) => detail.quantity === 0
      );
    }

    // Price filter logic
    filteredDetails = filteredDetails.filter((detail) => {
      const detailPrice = detail.price.toFixed(2);
      return detailPrice >= filter.price.from && detailPrice <= filter.price.to;
    });

    if (filter.rating.length > 0) {
      filteredDetails = filteredDetails.filter((detail) => {
        const detailRating = parseInt(detail.ratings, 10); // Convert to number
        return filter.rating.includes(detailRating);
      });
    }

    console.log("Filtered Details:", filteredDetails);

    setDetails(filteredDetails);
    setGroupedDetails(groupByCity(filteredDetails));
  }, [filter]);

  const handleResetPrice = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      price: {
        from: 0,
        to: 10000,
      },
    }));
  };

  const resetFilters = () => {
    setFilter({
      quantity: new Set(),
      price: { from: 0, to: 10000 },
      rating: new Set(),
    });
  };

  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (search.length > 1) {
      const filteredDetails = details.filter((detail) => {
        return detail.name.toLowerCase().includes(search);
      });
      console.log("search.length");
      setDetails(filteredDetails);
      setGroupedDetails(groupByCity(filteredDetails));
    } else {
      setDetails(temp);
      setGroupedDetails(groupByCity(temp));
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
  if (!details) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          <center>
            <div id="big-Container">
              <div id="small-Container">
                <div id="logo-section">
                  {/* <img src="" alt="logo" /> */}
                  <h3>Tourists Terra</h3>
                </div>
                <div id="search-section">
                  <input
                    onChange={searchHandler}
                    value={search}
                    type="text"
                    placeholder="Search"
                  />
                  <div id="search-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
                <div id="small-menu">
                  <Link
                    to="/"
                    style={{ marginRight: "15px", color: "#0F4157" }}
                  >
                    <i class="fa-solid fa-house" id="small-menu-icon"></i>
                  </Link>
                  <Link
                    to="/"
                    style={{ marginRight: "15px", color: "#0F4157" }}
                  >
                    <i class="fa-solid fa-message" id="small-menu-icon"></i>
                  </Link>
                  <Link
                    to="/"
                    style={{ marginRight: "15px", color: "#0F4157" }}
                  >
                    <i class="fa-solid fa-bell" id="small-menu-icon"></i>
                  </Link>
                  <Link
                    to="/sign-up"
                    style={{ marginRight: "15px", color: "#0F4157" }}
                  >
                    <i class="fa-solid fa-user-tie" id="small-menu-icon"></i>
                  </Link>
                </div>
              </div>
            </div>
          </center>
        </div>
        I
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
        <div>
          <section>
            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div class="mt-8 block lg:hidden">
                <button class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                  <span class="text-sm font-medium"> Filters & Sorting </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className=" hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
                  onClick={toggleModal}
                  style={{ backgroundColor: "#0F4157" }}
                >
                  Want to Become A Local Guide?
                </button>
              </div>

              <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 ">
                <div class="hidden space-y-4 lg:block">
                  <div>
                    <label
                      for="SortBy"
                      class="block text-xs font-medium text-gray-700"
                    ></label>

                    {isModalOpen && <GuideModal toggle={toggleModal} />}
                  </div>

                  <div>
                    <p class="block text-xs font-medium text-gray-700">
                      Filters
                    </p>

                    <div id="main-div" class="mt-1 space-y-2">
                      <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span class="text-sm font-medium"> Status </span>

                          <span class="transition group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </summary>

                        <div class="border-t border-gray-200 bg-white">
                          <ul className="space-y-1 border-t border-gray-200 p-4">
                            {["Available", "UnAvailable"].map((size) => (
                              <li key={size}>
                                <label
                                  htmlFor={`Filter${size}`}
                                  className="inline-flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={`Filter${size}`}
                                    checked={filter.quantity.includes(size)}
                                    onChange={() => handleQuantityChange(size)}
                                    className="h-5 w-5 rounded border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">
                                    {size}
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>

                      <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span class="text-sm font-medium"> Price </span>
                          <span class="transition group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </summary>
                        <div class="border-t border-gray-200 bg-white">
                          <header class="flex items-center justify-between p-4">
                            <span class="text-sm text-gray-700">
                              The highest price is 10000
                            </span>
                            <button
                              type="button"
                              class="text-sm text-gray-900 underline underline-offset-4"
                              onClick={handleResetPrice}
                            >
                              Reset
                            </button>
                          </header>
                          <div class="border-t border-gray-200 p-4">
                            <div class="flex justify-between gap-4">
                              <label
                                for="FilterPriceFrom"
                                class="flex items-center gap-2"
                              >
                                <span class="text-sm text-gray-600">RS</span>
                                <input
                                  type="number"
                                  id="FilterPriceFrom"
                                  placeholder="From"
                                  value={filter.price.from}
                                  onChange={(e) =>
                                    handlePriceChange("from", e.target.value)
                                  }
                                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                />
                              </label>
                              <label
                                for="FilterPriceTo"
                                class="flex items-center gap-2"
                              >
                                <span class="text-sm text-gray-600">RS</span>
                                <input
                                  type="number"
                                  id="FilterPriceTo"
                                  placeholder="To"
                                  value={filter.price.to}
                                  onChange={(e) =>
                                    handlePriceChange("to", e.target.value)
                                  }
                                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </details>

                      <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span class="text-sm font-medium"> Rating </span>
                          <span class="transition group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </summary>
                        <div class="border-t border-gray-200 bg-white">
                          {/* <header class="flex items-center justify-between p-4">
                            <span class="text-sm text-gray-700">
                              {" "}
                              0 Selected{" "}
                            </span>
                            <button
                              type="button"
                              class="text-sm text-gray-900 underline underline-offset-4"
                            >
                              Reset
                            </button>
                          </header> */}
                          <ul className="space-y-1 border-t border-gray-200 p-4">
                            {[
                              "1 Star",
                              "2 Star",
                              "3 Star",
                              "4 Star",
                              "5 Star",
                            ].map((rating) => (
                              <li key={rating}>
                                <label
                                  htmlFor={`Filter${rating.replace(" ", "")}`}
                                  className="inline-flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={`Filter${rating.replace(" ", "")}`}
                                    checked={filter.rating.includes(
                                      parseInt(rating, 10)
                                    )}
                                    onChange={() => handleRatingChange(rating)}
                                    className="h-5 w-5 rounded border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">
                                    {rating}
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 w-auto">
                  {Object.entries(groupedDetails).map(([cityName, details]) => (
                    <div key={cityName} className="mb-8">
                      <h2 className="text-2xl font-bold my-6">{cityName}</h2>
                      <div className="flex flex-wrap mx-3">
                        {details.map((detail) => (
                          <Link
                            to={`/details/${detail._id}`}
                            key={detail._id}
                            className="p-4 w-full sm:w-1/2 lg:w-1/3"
                          >
                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                              <img
                                className="w-full h-48 object-cover"
                                src={detail.image}
                                alt={detail.name}
                              />
                              <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">
                                  {detail.name}
                                </div>
                                <p className="text-gray-700 text-base">
                                  Price per Day: RS{detail.price.toFixed(2)}
                                </p>
                                <p className="text-gray-700 text-base">
                                  About:{" "}
                                  {detail.about.length > 3
                                    ? `${detail.about.slice(0, 10)}...`
                                    : detail.about}
                                </p>
                                <p className="text-gray-700 text-base">
                                  City: {detail.city.name}
                                </p>
                                <p className="text-gray-700 text-base flex items-center">
                                  Rating:{" "}
                                  <span className="ml-2 text-yellow-400">
                                    {detail.ratings}{" "}
                                    <i className="fas fa-star"></i>
                                  </span>
                                </p>
                                <p
                                  className={`text-gray-700 text-base ${
                                    detail.status
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  Avalible Status:{" "}
                                  {detail.status ? "Yes" : "No"}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LocalGuideHomePage;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import "./shophomepage.css";
// import Navbar from "../../homepage/navbar/navBar";
// import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
// import Footer from "../../accommodationpage/footer/footer";
// import MenuBar from "../../homepage/menubar/menuBar";
// import GuideModal from "./guidemodal";

// // Helper function to group products by category name
// const groupByCity = (details) => {
//   return details.reduce((acc, detail) => {
//     const key = detail.city?.name || "Other";
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(detail);
//     return acc;
//   }, {});
// };

// const LocalGuideHomePage = () => {
//   const [details, setDetails] = useState([]);
//   const [temp, setTemp] = useState([]);
//   const [groupedDetails, setGroupedDetails] = useState({});

//   useEffect(() => {
//     fetchDetails();
//   }, []);
//   const fetchDetails = () => {
//     fetch("http://localhost:3001/api/details")
//       .then((response) => response.json())
//       .then((data) => {
//         setDetails(data);
//         setGroupedDetails(groupByCity(data));
//         setTemp(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   };

//   const [filter, setFilter] = useState({
//     quantity: [],
//     price: { from: "", to: 10000 },
//     rating: [],
//   });

//   const handleQuantityChange = (size) => {
//     setFilter((prevFilter) => {
//       let newQuantity;

//       if (prevFilter.quantity.includes(size)) {
//         // If the selected size is already set, clear the selection
//         newQuantity = [];
//       } else {
//         // Set the quantity to an array with the selected size
//         newQuantity = [size];
//       }

//       // Log the change
//       console.log(
//         `Size ${size} is now ${
//           newQuantity.includes(size) ? "selected" : "unselected"
//         }.`
//       );

//       // Return the updated filter object
//       return {
//         ...prevFilter,
//         quantity: newQuantity,
//       };
//     });
//   };

//   const handlePriceChange = (field, value) => {
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       price: {
//         ...prevFilter.price,
//         [field]: Number(value),
//       },
//     }));
//   };

//   const handleRatingChange = (selectedRating) => {
//     setFilter((prevFilter) => {
//       const numericRating = parseInt(selectedRating, 10);

//       const newRatings = prevFilter.rating.includes(numericRating)
//         ? prevFilter.rating.filter((rating) => rating !== numericRating)
//         : [...prevFilter.rating, numericRating];

//       console.log(
//         `Rating ${numericRating} is now ${
//           newRatings.includes(numericRating) ? "selected" : "unselected"
//         }.`
//       );

//       return {
//         ...prevFilter,
//         rating: newRatings,
//       };
//     });
//   };

//   useEffect(() => {
//     let filteredDetails = temp;

//     // Quantity filter logic
//     if (filter.quantity.includes("Available")) {
//       filteredDetails = filteredDetails.filter((detail) => detail.quantity > 0);
//     }

//     if (filter.quantity.includes("UnAvailable")) {
//       filteredDetails = filteredDetails.filter(
//         (detail) => detail.quantity === 0
//       );
//     }

//     // Price filter logic
//     filteredDetails = filteredDetails.filter((detail) => {
//       const detailPrice = detail.price.toFixed(2);
//       return detailPrice >= filter.price.from && detailPrice <= filter.price.to;
//     });

//     if (filter.rating.length > 0) {
//       filteredDetails = filteredDetails.filter((detail) => {
//         const detailRating = parseInt(detail.ratings, 10); // Convert to number
//         return filter.rating.includes(detailRating);
//       });
//     }

//     console.log("Filtered Details:", filteredDetails);

//     setDetails(filteredDetails);
//     setGroupedDetails(groupByCity(filteredDetails));
//   }, [filter]);

//   const handleResetPrice = () => {
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       price: {
//         from: 0,
//         to: 10000,
//       },
//     }));
//   };

//   const resetFilters = () => {
//     setFilter({
//       quantity: new Set(),
//       price: { from: 0, to: 10000 },
//       rating: new Set(),
//     });
//   };

//   const [search, setSearch] = useState("");

//   const searchHandler = (e) => {
//     setSearch(e.target.value.toLowerCase());
//     if (search.length > 1) {
//       const filteredDetails = details.filter((detail) => {
//         return detail.name.toLowerCase().includes(search);
//       });
//       console.log("search.length");
//       setDetails(filteredDetails);
//       setGroupedDetails(groupByCity(filteredDetails));
//     } else {
//       setDetails(temp);
//       setGroupedDetails(groupByCity(temp));
//     }
//   };
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };
//   useEffect(() => {
//     if (isModalOpen) {
//       document
//         .getElementById("main-div")
//         .scrollIntoView({ behavior: "smooth" });
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isModalOpen]);
//   if (!details) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <>
//       <div>
//         <div>
//           <center>
//             <div id="big-Container">
//               <div id="small-Container">
//                 <div id="logo-section">
//                   {/* <img src="" alt="logo" /> */}
//                   <h3>Tourists Terra</h3>
//                 </div>
//                 <div id="search-section">
//                   <input
//                     onChange={searchHandler}
//                     value={search}
//                     type="text"
//                     placeholder="Search"
//                   />
//                   <div id="search-icon">
//                     <i class="fa-solid fa-magnifying-glass"></i>
//                   </div>
//                 </div>
//                 <div id="small-menu">
//                   <Link to="/">
//                     <i class="fa-solid fa-house" id="small-menu-icon"></i>
//                   </Link>
//                   <Link to="/">
//                     <i class="fa-solid fa-message" id="small-menu-icon"></i>
//                   </Link>
//                   <Link to="/">
//                     <i class="fa-solid fa-bell" id="small-menu-icon"></i>
//                   </Link>
//                   <Link to="/sign-up">
//                     <i class="fa-solid fa-user-tie" id="small-menu-icon"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </center>
//         </div>
//         I
//         <div id="accomo-ad-container">
//           <AccommodationAdSection />
//           <div id="opacity-ad">
//             <Link to="">
//               <h1>Wana Shop?</h1>
//             </Link>
//           </div>
//         </div>
//         <div id="menu-acc">
//           <MenuBar />
//         </div>
//         <br />
//         <br />
//         <div>
//           <section>
//             <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//               <div class="mt-8 block lg:hidden">
//                 <button class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
//                   <span class="text-sm font-medium"> Filters & Sorting </span>

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke-width="1.5"
//                     stroke="currentColor"
//                     class="h-4 w-4 rtl:rotate-180"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className="w-full flex justify-end">
//                 <button
//                   className=" hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
//                   onClick={toggleModal}
//                   style={{ backgroundColor: "#0F4157" }}
//                 >
//                   Want to Become A Local Guide?
//                 </button>
//               </div>

//               <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 ">
//                 <div class="hidden space-y-4 lg:block">
//                   <div>
//                     <label
//                       for="SortBy"
//                       class="block text-xs font-medium text-gray-700"
//                     ></label>

//                     {isModalOpen && <GuideModal toggle={toggleModal} />}
//                   </div>

//                   <div>
//                     <p class="block text-xs font-medium text-gray-700">
//                       Filters
//                     </p>

//                     <div id="main-div" class="mt-1 space-y-2">
//                       <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
//                         <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
//                           <span class="text-sm font-medium"> Status </span>

//                           <span class="transition group-open:-rotate-180">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke-width="1.5"
//                               stroke="currentColor"
//                               class="h-4 w-4"
//                             >
//                               <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                               />
//                             </svg>
//                           </span>
//                         </summary>

//                         <div class="border-t border-gray-200 bg-white">
//                           <ul className="space-y-1 border-t border-gray-200 p-4">
//                             {["Available", "UnAvailable"].map((size) => (
//                               <li key={size}>
//                                 <label
//                                   htmlFor={`Filter${size}`}
//                                   className="inline-flex items-center gap-2"
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     id={`Filter${size}`}
//                                     checked={filter.quantity.includes(size)}
//                                     onChange={() => handleQuantityChange(size)}
//                                     className="h-5 w-5 rounded border-gray-300"
//                                   />
//                                   <span className="text-sm font-medium text-gray-700">
//                                     {size}
//                                   </span>
//                                 </label>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </details>

//                       <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
//                         <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
//                           <span class="text-sm font-medium"> Price </span>
//                           <span class="transition group-open:-rotate-180">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke-width="1.5"
//                               stroke="currentColor"
//                               class="h-4 w-4"
//                             >
//                               <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                               />
//                             </svg>
//                           </span>
//                         </summary>
//                         <div class="border-t border-gray-200 bg-white">
//                           <header class="flex items-center justify-between p-4">
//                             <span class="text-sm text-gray-700">
//                               The highest price is 10000
//                             </span>
//                             <button
//                               type="button"
//                               class="text-sm text-gray-900 underline underline-offset-4"
//                               onClick={handleResetPrice}
//                             >
//                               Reset
//                             </button>
//                           </header>
//                           <div class="border-t border-gray-200 p-4">
//                             <div class="flex justify-between gap-4">
//                               <label
//                                 for="FilterPriceFrom"
//                                 class="flex items-center gap-2"
//                               >
//                                 <span class="text-sm text-gray-600">RS</span>
//                                 <input
//                                   type="number"
//                                   id="FilterPriceFrom"
//                                   placeholder="From"
//                                   value={filter.price.from}
//                                   onChange={(e) =>
//                                     handlePriceChange("from", e.target.value)
//                                   }
//                                   className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
//                                 />
//                               </label>
//                               <label
//                                 for="FilterPriceTo"
//                                 class="flex items-center gap-2"
//                               >
//                                 <span class="text-sm text-gray-600">RS</span>
//                                 <input
//                                   type="number"
//                                   id="FilterPriceTo"
//                                   placeholder="To"
//                                   value={filter.price.to}
//                                   onChange={(e) =>
//                                     handlePriceChange("to", e.target.value)
//                                   }
//                                   className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
//                                 />
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </details>

//                       <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
//                         <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
//                           <span class="text-sm font-medium"> Rating </span>
//                           <span class="transition group-open:-rotate-180">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke-width="1.5"
//                               stroke="currentColor"
//                               class="h-4 w-4"
//                             >
//                               <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                               />
//                             </svg>
//                           </span>
//                         </summary>
//                         <div class="border-t border-gray-200 bg-white">
//                           {/* <header class="flex items-center justify-between p-4">
//                             <span class="text-sm text-gray-700">
//                               {" "}
//                               0 Selected{" "}
//                             </span>
//                             <button
//                               type="button"
//                               class="text-sm text-gray-900 underline underline-offset-4"
//                             >
//                               Reset
//                             </button>
//                           </header> */}
//                           <ul className="space-y-1 border-t border-gray-200 p-4">
//                             {[
//                               "1 Star",
//                               "2 Star",
//                               "3 Star",
//                               "4 Star",
//                               "5 Star",
//                             ].map((rating) => (
//                               <li key={rating}>
//                                 <label
//                                   htmlFor={`Filter${rating.replace(" ", "")}`}
//                                   className="inline-flex items-center gap-2"
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     id={`Filter${rating.replace(" ", "")}`}
//                                     checked={filter.rating.includes(
//                                       parseInt(rating, 10)
//                                     )}
//                                     onChange={() => handleRatingChange(rating)}
//                                     className="h-5 w-5 rounded border-gray-300"
//                                   />
//                                   <span className="text-sm font-medium text-gray-700">
//                                     {rating}
//                                   </span>
//                                 </label>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </details>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="lg:col-span-3 w-auto">
//                   {Object.entries(groupedDetails).map(([cityName, details]) => (
//                     <div key={cityName} className="mb-8 bg-white">
//                       <h2 className="text-2xl font-bold my-6">{cityName}</h2>
//                       <div className="flex flex-wrap mx-3">
//                         {details.map((detail) => (
//                           <Link
//                             to={`/details/${detail._id}`}
//                             key={detail._id}
//                             className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-white-100 dark:border-white-700 dark:bg-white-800 dark:hover:bg-white-700 mb-4"
//                             style={{ margin: "0.5rem" }}
//                           >
//                             <img
//                               className="object-cover w-full h-16 md:w-48 md:h-96 rounded-t-lg md:rounded-none md:rounded-l-lg"
//                               src={detail.image}
//                               alt={detail.name}
//                             />
//                             <div className="flex flex-col justify-between p-4 leading-normal">
//                               <h1 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
//                                 {detail.name}
//                               </h1>
//                               <p className="mb-3 font-normal text-black dark:text-gray-400">
//                                 "{detail.about}"
//                               </p>
//                               <p className="text-gray-700 text-base">
//                                 {" "}
//                                 Price per Day: RS{detail.price.toFixed(2)}
//                               </p>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default LocalGuideHomePage;
