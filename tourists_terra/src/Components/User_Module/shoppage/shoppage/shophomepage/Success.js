// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Success = () => {
//   return (
// <div>
//   <div class="bg-white py-6 sm:py-8 lg:py-12">
//     <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
//       <div class="flex flex-col items-center">
//         <a
//           href="/"
//           class="mb-8 inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
//           aria-label="logo"
//         >
//           <svg
//             width="95"
//             height="94"
//             viewBox="0 0 95 94"
//             class="h-auto w-6 text-indigo-500"
//             fill="currentColor"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M96 0V47L48 94H0V47L48 0H96Z" />
//           </svg>
//           Tourist Terra
//         </a>

//         <p class="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
//           Payment Success Page
//         </p>
//         <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
//           Thanks For Shopping
//         </h1>

//         <p class="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
//           Your Payment is Done Successfully.
//         </p>

//         <Link
//           to="../shop-home-page"
//           class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
//         >
//           Go home
//         </Link>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default Success;

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import RatingModal from "./ratingModal";
import { AuthContext } from "../../../../Context/authcontext"; // Import AuthContext
import axios from "axios";

const Success = () => {
  const [cart, setCart] = useState(null);

  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { user } = useContext(AuthContext); // Use AuthContext to access the user info
  const [selectedProductId, setSelectedProductId] = useState(null);
  const fetchCart = async () => {
    axios
      .get(`http://localhost:3001/api/cart/get-cart/${user._id}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error fetching cart:", error));
  };

  useEffect(() => {
    if (user) {
      fetchCart();
      console.log(cart);
    }
  }, [user]);

  const deleteCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/cart/delete-cart/${cart?._id}`
      );
      console.log("Cart deleted:", response.data);
      // Handle any additional logic like updating state or UI
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
    console.log(product);
  }, [productId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (productId) => {
    setIsModalOpen(!isModalOpen);
    setSelectedProductId(productId);
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

  if (!cart) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  console.log(cart);

  const products = cart.products.map((product) => ({
    id: product.productId._id, // Assuming productId is the identifier for your products
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    quantity: product.quantity,
  }));

  return (
    <div id="main-div">
      <Navbar />

      <h1 class=" flex flex-col items-center mt-24 mb-0 pb-0 text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Payment Successfull Hurry!!!
      </h1>
      <h1 class=" flex flex-col items-center mt-0 mb-0 pb-0 text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Purchased Items
      </h1>
      <div className="bg-white mt-8 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="space-y-4">
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6"
              >
                <div className="group relative block h-48 w-40 overflow-hidden bg-gray-100 sm:h-56 sm:w-[35%]">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between py-4">
                  <div className="flex justify-between items-center px-6 ">
                    <div>
                      <span className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                        {product?.name}
                      </span>
                      <span className="block text-gray-500">
                        Description: {product?.description}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleModal(product.productId._id)}
                      className="sm:inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                      style={{ backgroundColor: "#0F4157" }}
                    >
                      Rate Product
                    </button>
                    {isModalOpen && (
                      <RatingModal
                        toggle={toggleModal}
                        productId={selectedProductId}
                        setIsModalOpen={setIsModalOpen}
                        productName={product?.name}
                      />
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-6 text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="block text-gray-500">
                        Quantity: {product?.quantity}
                      </span>
                    </div>

                    <div className="ml-4 mr-4 pt-3 md:ml-6 md:pt-2 lg:ml-16">
                      <span className="block font-bold text-gray-800 md:text-lg">
                        Rs. {product?.price.toFixed(2)} / unit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <div class="bg-white py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                  <div class="flex flex-col items-center">
                    <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
                      Thanks For Shopping On Tourist Terra
                    </h1>

                    <p class="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
                      Your Payment is Done Successfully.
                    </p>

                    <Link
                      to="../shop-home-page"
                      class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                      onClick={deleteCart}
                    >
                      More Shopping...
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Success;
