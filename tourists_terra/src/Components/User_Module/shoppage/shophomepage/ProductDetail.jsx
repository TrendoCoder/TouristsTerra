import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import MenuBar from "../../homepage/menubar/menuBar";
import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
import { loadStripe } from "@stripe/stripe-js";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const { productId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OFAzLHNYB7xRUtt828R4itFeJaCXKxqwqnzeaJpfhrjXmn3Ptb3dGbFRA6FatC1ClmXEhzwXqmpF4C3PaIOgv4Y002iRHUwKW"
    );

    const body = {
      product: {
        id: product.id, // Assuming your product object has an 'id' property
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity: quantity,
        // tax: tax,
        // Send the incremented quantity
      },
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/stripe/create-checkout-session",
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

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product Details */}
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                Product Name
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <div className="flex h-7 items-center gap-1 rounded-full bg-indigo-500 px-2 text-white">
                <span className="text-sm">{product.ratings}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500 transition duration-100">
                {product.ratingCount} ratings
              </span>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                Description
              </span>
              <div className="flex flex-wrap gap-2">
                {/* {product.colors?.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-8 w-8 rounded-full border ${color} ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200`}
                  ></button>
                ))} */}

                {product.description}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8 md:mb-10">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                Quantity
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="h-8 w-8 flex items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  -
                </button>
                <span className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="h-8 w-8 flex items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add size and other details here as needed */}

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  Rs:{product.price.toFixed(2)}
                </span>
                {/* Add original price with strike-through if applicable */}
              </div>
              <span className="text-sm text-gray-500">
                incl. VAT plus shipping
              </span>
            </div>

            {/* Add shipping notice and other details as needed */}

            <div className="flex gap-2.5">
              <Link to={`/cart/${product._id}`} key={product._id}>
                <button className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base">
                  Add to cart
                </button>
              </Link>
              <button
                onClick={makePayment}
                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
