import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#0E4157] text-white py-8">
      <div className="container mx-auto flex justify-around">
        <div className="w-1/3 text-center">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <span>
            The concept of "Tourist's Terra" is centered around the development
            of a social touring application that fosters socialization among
            travelers.
          </span>
        </div>

        <div className="w-1/3 border-l border-r border-white pl-8 pr-8 text-center">
          <h3 className="text-lg font-semibold mb-4">Share</h3>
          <div className="flex items-center justify-center space-x-4">
            <Link to=""><i className="fab fa-facebook text-2xl"></i></Link>
            <Link to=""><i className="fab fa-instagram text-2xl"></i></Link>
            <Link to=""><i className="fab fa-whatsapp-square text-2xl"></i></Link>
            <Link to=""><i className="fab fa-facebook-messenger text-2xl"></i></Link>
          </div>
          <div className="mt-4">
            <span>@copyright Tourist's Terra</span>
          </div>
        </div>

        <div className="w-1/3 text-center">
        <Link to="/contact-us">
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      </Link>

        </div>
      </div>
    </div>
  );
};

export default Footer;
