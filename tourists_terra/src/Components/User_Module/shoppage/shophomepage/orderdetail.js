import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import MenuBar from "../../homepage/menubar/menuBar";
import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../../../Context/authcontext"; // Import AuthContext
import axios from "axios";

const OrderDetails = () => {
  const [cart, setCart] = useState(null);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { user } = useContext(AuthContext); // Use AuthContext to access the user info

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/cart/get-cart/${user._id}`
      );
      const cartData = response.data;

      // Extract products where sellerId matches user._id
      const sellerProducts = cartData.products.filter(
        (product) => String(product.sellerId) === String(user._id)
      );

      // Update the cart state with the filtered products
      setCart({
        ...cartData,
        products: sellerProducts,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const calculateTotal = () => {
    return cart.products
      .reduce((acc, product) => acc + product?.price * product?.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
    console.log(product);
  }, [productId]);

  if (!cart) {
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

  const updateCartQuantity = async (productId, newQuantity) => {
    if (!cart || !user) {
      return;
    }

    if (!productId) {
      console.log("Error: Invalid quantity or product ID");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/cart/update-cart/${cart._id}`,
        {
          productId: productId._id,
          quantity: newQuantity,
        }
      );

      fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  console.log(cart);

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OFAzLHNYB7xRUtt828R4itFeJaCXKxqwqnzeaJpfhrjXmn3Ptb3dGbFRA6FatC1ClmXEhzwXqmpF4C3PaIOgv4Y002iRHUwKW"
    );

    const products = cart.products.map((product) => ({
      id: product.productId._id, // Assuming productId is the identifier for your products
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
    }));

    const body = {
      products: products,
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

  const tax = 5;

  return (
    <div>
      <Navbar />

      <h1 class="mt-20  text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Orders to Deliver
      </h1>

      <div className="bg-white mt-8 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="space-y-4">
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6"
              >
                <div className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between py-4">
                  <div>
                    <span className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                      {product?.name}
                    </span>
                    <span className="block text-gray-500">
                      Description: {product?.description}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-6 text-gray-800">
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex h-8 w-32 overflow-hidden rounded">
                        <div className="flex flex-col divide-y">
                          <div className="flex items-center gap-2">
                            <span className="block font-bold text-gray-700">
                              Quantity: {product?.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
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
          </div>
          <div className="flex flex-col items-end gap-4 mt-8">
            <Link
              className={`ml-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                    }`}
              to={`http://localhost:3002/products?userId=${user._id}`}
              style={{ backgroundColor: "#0F4157" }}
            >
              Product Lists
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetails;
