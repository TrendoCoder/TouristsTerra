import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import "./shophomepage.css";
import Navbar from '../../homepage/navbar/navBar'
import AccommodationAdSection from '../../accommodationpage/accomoadsection/accomoadsection'
import Footer from '../../accommodationpage/footer/footer'
import MenuBar from '../../homepage/menubar/menuBar'

// Helper function to group products by category name
const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    const key = product.category?.name || 'Other';
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

    fetch('http://localhost:3001/api/product')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setGroupedProducts(groupByCategory(data));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);


  return (
    <>
      <div>
        <Navbar />
        <div id='accomo-ad-container'>
          <AccommodationAdSection />
          <div id='opacity-ad'>
            <Link to=""><h1>Wana Shop?</h1></Link>
          </div>
        </div>

        <div id='menu-acc'>
          <MenuBar />
        </div>
        <br />
        <br />

        <div className="p-4">
          {Object.entries(groupedProducts).map(([categoryName, products]) => (
            <div key={categoryName} className="mb-8">
              <h2 className="text-2xl font-bold my-6">{categoryName}</h2>
              <div className="flex flex-wrap -mx-4">
                {products.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id} className="p-4 w-full sm:w-1/2 lg:w-1/4">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                      <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{product.name}</div>
                        <p className="text-gray-700 text-base">Price: ${product.price.toFixed(2)}</p>
                        <p className="text-gray-700 text-base">Description: {product.description}</p>
                        <p className="text-gray-700 text-base">Quantity: {product.quantity}</p>
                        <p className="text-gray-700 text-base flex items-center">
                          Rating: <span className="ml-2 text-yellow-400">{product.ratings} <i className="fas fa-star"></i></span>
                        </p>
                        {/* <p className="text-gray-700 text-base">Seller ID: {product.seller}</p> */}
                        <p className={`text-gray-700 text-base ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                          In Stock: {product.inStock ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Footer />

      </div>
    </>
  )
};

export default ShopHomePage;
