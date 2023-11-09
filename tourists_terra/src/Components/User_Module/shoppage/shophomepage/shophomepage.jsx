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
    fetch("http://localhost:3001/api/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setGroupedProducts(groupByCategory(data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
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
                          <span class="text-sm font-medium"> Language </span>

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

                          <ul class="space-y-1 border-t border-gray-200 p-4">
                            <li>
                              <label
                                for="FilterInStock"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterInStock"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Urdu
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterPreOrder"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterPreOrder"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  English
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterOutOfStock"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterOutOfStock"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Punjabi
                                </span>
                              </label>
                            </li>
                            <li>
                              <label
                                for="FilterOutOfStock"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterOutOfStock"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Sindhi
                                </span>
                              </label>
                            </li>
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
                                  class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
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
                                  class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </details>

                      <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span class="text-sm font-medium"> City </span>

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

                          <ul class="space-y-1 border-t border-gray-200 p-4">
                            <li>
                              <label
                                for="FilterRed"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterRed"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Lahore
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterBlue"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterBlue"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Karachi
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterGreen"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterGreen"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Kashmir
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterOrange"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterOrange"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Naran
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterPurple"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterPurple"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Swat
                                </span>
                              </label>
                            </li>

                            <li>
                              <label
                                for="FilterTeal"
                                class="inline-flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  id="FilterTeal"
                                  class="h-5 w-5 rounded border-gray-300"
                                />

                                <span class="text-sm font-medium text-gray-700">
                                  Quetta
                                </span>
                              </label>
                            </li>
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
                                    className={`text-gray-700 text-base ${
                                      product.inStock
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