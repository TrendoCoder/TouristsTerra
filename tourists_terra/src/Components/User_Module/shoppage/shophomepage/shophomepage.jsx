import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./shophomepage.css";
import Navbar from "../../homepage/navbar/navBar";
import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
import Footer from "../../accommodationpage/footer/footer";
import MenuBar from "../../homepage/menubar/menuBar";

// Helper function to group products by category name
const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    const key = product.category?.name || "Other";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});
};

const ShopHomePage = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  



  useEffect(() => {
   fetchProducts();
  }, []);
  const fetchProducts = ()=>{
    fetch("http://localhost:3001/api/product")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
      setGroupedProducts(groupByCategory(data));
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  }

  const [filter, setFilter] = useState({
    quantity: [],
    price: { from: 0, to: 10000 },
    rating: [],
  });
  useEffect(() => {
    console.log("Filter updated:", filter);
    let filteredProducts = [...products]; 
    if (filter.rating.includes("1 Star")) { 
      filteredProducts = filteredProducts.filter(product => product.ratings <= 1);
    }
    if (filter.rating.includes("2 Star")) { 
      filteredProducts = filteredProducts.filter(product => product.ratings <= 2);
    }
     if (filter.rating.includes("3 Star")) { 
      filteredProducts = filteredProducts.filter(product => product.ratings <= 3);
    }
    if (filter.rating.includes("4 Star")) { 
      filteredProducts = filteredProducts.filter(product => product.ratings === 4);
      console.log("Filter updated:",filteredProducts);
    }
    if (filter.rating.includes("5 Star")) { 
      filteredProducts = filteredProducts.filter(product => product.ratings <= 5);
    }
    if(filter.rating.length<1) fetchProducts();

    if (filter.quantity.includes("Small")) { 
      filteredProducts = filteredProducts.filter(product => product.quantity <= 50);
    }
    if (filter.quantity.includes("Meduim")) { 
      filteredProducts = filteredProducts.filter(product => product.quantity <= 100);
    }
     if (filter.quantity.includes("Large")) { 
      filteredProducts = filteredProducts.filter(product => product.quantity > 100);
    }
    if(filter.quantity.length<1) fetchProducts();

  
    setGroupedProducts(groupByCategory(filteredProducts));
  
    setProducts(filteredProducts);
  
  }, [filter]); 

  const handleQuantityChange = (size) => {
    setFilter((prevFilter) => {
      const newQuantity = prevFilter.quantity.includes(size)
        ? prevFilter.quantity.filter((s) => s !== size) // Remove size if it's already included
        : [...prevFilter.quantity, size]; // Add size if it's not included

      // Log the change
      console.log(`Size ${size} is now ${newQuantity.includes(size) ? 'selected' : 'unselected'}.`);

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
        [field]: Number(value), // Ensure the value is stored as a Number
      },
    }));
  };
  const handleRatingChange = (selectedRating) => {
    setFilter((prevFilter) => {
      // Toggle the selection of the rating
      const newRatings = prevFilter.rating.includes(selectedRating)
        ? prevFilter.rating.filter(rating => rating !== selectedRating) // Remove it if it's there
        : [...prevFilter.rating, selectedRating]; // Add it if it's not

      // Log the selected ratings
      console.log(`Rating ${selectedRating} is now ${newRatings.includes(selectedRating) ? 'selected' : 'unselected'}.`);

      return {
        ...prevFilter,
        rating: newRatings,
      };
    });
  };
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
  if (!products) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }
  return (
    <>
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

        <div>
          <section>
            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              {/* <header>
                <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
                  Product Collection
                </h2>

                <p class="mt-4 max-w-md text-gray-500">
                  Embark on unforgettable journeys with our "Tourist Terra"
                  travel collection. From the "Epic Adventure Backpack" to the
                  "Cultural Discovery Guide," our store is your gateway to
                  thrilling experiences. Let your wanderlust guide you, and
                  start exploring today!
                </p>
              </header> */}

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

              <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 ">
                <div class="hidden space-y-4 lg:block">
                  <div>
                    <label
                      for="SortBy"
                      class="block text-xs font-medium text-gray-700"
                    ></label>

                    <select
                      id="SortBy"
                      class="mt-1 rounded border-gray-300 text-sm"
                    >
                      <option>Sort By</option>
                      <option value="Title, DESC">Title, DESC</option>
                      <option value="Title, ASC">Title, ASC</option>
                      <option value="Price, DESC">Price, DESC</option>
                      <option value="Price, ASC">Price, ASC</option>
                    </select>
                  </div>

                  <div>
                    <p class="block text-xs font-medium text-gray-700">
                      Filters
                    </p>

                    <div class="mt-1 space-y-2">
                      <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span class="text-sm font-medium"> Quantity </span>

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
                              {" "}
                              0 Selected{" "}
                            </span>

                            <button
                              type="button"
                              class="text-sm text-gray-900 underline underline-offset-4"
                            >
                              Reset
                            </button>
                          </header>

                          <ul className="space-y-1 border-t border-gray-200 p-4">
                            {['Small', 'Medium', 'Large'].map((size) => (
                              <li key={size}>
                                <label htmlFor={`Filter${size}`} className="inline-flex items-center gap-2">
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
                                  onChange={(e) => handlePriceChange('from', e.target.value)}
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
                                  onChange={(e) => handlePriceChange('to', e.target.value)}
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
                          <header class="flex items-center justify-between p-4">
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
                          </header>

                          <ul className="space-y-1 border-t border-gray-200 p-4">
                            {['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'].map((rating) => (
                              <li key={rating}>
                                <label htmlFor={`Filter${rating.replace(' ', '')}`} className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`Filter${rating.replace(' ', '')}`}
                                    checked={filter.rating.includes(rating)}
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
                  {Object.entries(groupedProducts).map(
                    ([categoryName, products]) => (
                      <div key={categoryName} className="mb-8">
                        <h2 className="text-2xl font-bold my-6">
                          {categoryName}
                        </h2>
                        <div className="flex flex-wrap mx-3">
                          {products.map((product) => (
                            <Link
                              to={`/product/${product._id}`}
                              key={product._id}
                              className="p-4 w-full sm:w-1/2 lg:w-1/3"
                            >
                              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                                <img
                                  className="w-full h-48 object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                                <div className="px-6 py-4">
                                  <div className="font-bold text-xl mb-2">
                                    {product.name}
                                  </div>
                                  <p className="text-gray-700 text-base">
                                    Price: RS{product.price.toFixed(2)}
                                  </p>
                                  <p className="text-gray-700 text-base">
                                    About:{" "}
                                    {product.description.length > 3
                                      ? `${product.description.slice(0, 30)}...`
                                      : product.description}
                                  </p>
                                  <p className="text-gray-700 text-base">
                                    City: {product.quantity}
                                  </p>
                                  <p className="text-gray-700 text-base flex items-center">
                                    Rating:{" "}
                                    <span className="ml-2 text-yellow-400">
                                      {product.ratings}{" "}
                                      <i className="fas fa-star"></i>
                                    </span>
                                  </p>
                                  <p
                                    className={`text-gray-700 text-base ${product.inStock
                                      ? "text-green-500"
                                      : "text-red-500"
                                      }`}
                                  >
                                    Avalible Status:{" "}
                                    {product.inStock ? "Yes" : "No"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  )}
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

export default ShopHomePage;