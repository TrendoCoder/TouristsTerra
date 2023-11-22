// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import Navbar from "../../homepage/navbar/navBar";
// import Footer from "../../accommodationpage/footer/footer";
// import MenuBar from "../../homepage/menubar/menuBar";
// import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";

// const Cart = () => {
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { productId } = useParams();

//   useEffect(() => {
//     fetch(`http://localhost:3001/api/product/${productId}`)
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [productId]);

//   if (!product) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   const incrementQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div id="accomo-ad-container">
//         <AccommodationAdSection />
//         <div id="opacity-ad">
//           <Link to="">
//             <h1>Wana Shop?</h1>
//           </Link>
//         </div>
//       </div>

//       <div id="menu-acc">
//         <MenuBar />
//       </div>

//       <div className="bg-white mt-24 py-6 sm:py-8 lg:py-12">
//         <div className="mx-auto max-w-screen-lg px-4 md:px-8">
//           <div className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
//             <div className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//               />
//             </div>

//             <div className="flex flex-1 flex-col justify-between py-4">
//               <div>
//                 <span className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
//                   {product.name}
//                 </span>
//                 <span className="block text-gray-500">
//                   Description: {product.description}
//                 </span>
//               </div>

//               <div className="flex items-start justify-between gap-6 text-gray-800">
//                 <div className="flex flex-col items-start gap-2">
//                   <div className="flex h-12 w-20 overflow-hidden rounded border">
//                     <input
//                       type="text"
//                       value={quantity}
//                       className="w-full px-4 py-2 outline-none ring-inset ring-indigo-300 transition duration-100 focus:ring"
//                     />
//                     <div className="flex flex-col divide-y border-l">
//                       <button
//                         onClick={incrementQuantity}
//                         className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={decrementQuantity}
//                         className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
//                       >
//                         -
//                       </button>
//                     </div>
//                   </div>

//                   <button className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
//                     Delete
//                   </button>
//                 </div>

//                 <div className="ml-4 mr-4 pt-3 md:ml-6 md:pt-2 lg:ml-16">
//                   <span className="block font-bold text-gray-800 md:text-lg">
//                     Rs:{product.price.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col items-end gap-4 mt-8">
//             <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
//               <div className="space-y-1">
//                 <div className="flex justify-between gap-4 text-gray-500">
//                   <span>Subtotal</span>
//                   <span>Rs:{(product.price * quantity).toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between gap-4 text-gray-500">
//                   <span>Shipping</span>
//                   <span>Rs:4.99</span>
//                 </div>
//               </div>

//               <div className="mt-4 border-t pt-4">
//                 <div className="flex items-start justify-between gap-4 text-gray-800">
//                   <span className="text-lg font-bold">Total</span>

//                   <span className="flex flex-col items-end">
//                     <span className="text-lg font-bold">
//                       Rs:{(product.price * quantity + 4.99).toFixed(2)} PKR
//                     </span>
//                     <span className="text-sm text-gray-500">including VAT</span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
//               Check out
//             </button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import MenuBar from "../../homepage/menubar/menuBar";
import AccommodationAdSection from "../../accommodationpage/accomoadsection/accomoadsection";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
    console.log(product);
  }, [productId]);

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

  const tax = 5;

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

      <div className="bg-white mt-24 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
            <div className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between py-4">
              <div>
                <span className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                  {product.name}
                </span>
                <span className="block text-gray-500">
                  Description: {product.description}
                </span>
              </div>

              <div className="flex items-start justify-between gap-6 text-gray-800">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex h-12 w-20 overflow-hidden rounded border">
                    <input
                      type="number"
                      value={quantity}
                      className="w-full px-4 py-2 outline-none ring-inset ring-indigo-300 transition duration-100 focus:ring"
                    />
                    <div className="flex flex-col divide-y border-l">
                      <button
                        onClick={incrementQuantity}
                        className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                      >
                        +
                      </button>
                      <button
                        onClick={decrementQuantity}
                        className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                      >
                        -
                      </button>
                    </div>
                  </div>

                  <button className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
                    Delete
                  </button>
                </div>

                <div className="ml-4 mr-4 pt-3 md:ml-6 md:pt-2 lg:ml-16">
                  <span className="block font-bold text-gray-800 md:text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 mt-8">
            <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
              <div className="space-y-1">
                <div className="flex justify-between gap-4 text-gray-500">
                  <span>Subtotal</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>

                {/* <div className="flex justify-between gap-4 text-gray-500">
                  <span>Shipping</span>
                  <span>$4.99</span>
                </div> */}
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-start justify-between gap-4 text-gray-800">
                  <span className="text-lg font-bold">Total</span>

                  <span className="flex flex-col items-end">
                    <span className="text-lg font-bold">
                      ${(product.price * quantity).toFixed(2)} USD
                    </span>
                    <span className="text-sm text-gray-500">including VAT</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={makePayment}
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Check out
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
