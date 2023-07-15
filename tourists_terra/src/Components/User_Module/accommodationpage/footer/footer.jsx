import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div id="big-container-footer">
      <div id="main-container-footer">
        <div>
          <h3>About Us</h3>
          <span>
            The concept of "Tourist's Terra" is centered around the development
            of a social touring application that fosters socialization among
            travelers.
          </span>
        </div>
        <div id="b-style" >
          <h3>Share</h3>
          <Link to="">
            <i class="fa-brands fa-facebook"></i>{" "}
          </Link>
          <Link to="">
            <i class="fa-brands fa-square-instagram"></i>{" "}
          </Link>
          <Link to="">
            <i class="fa-brands fa-square-whatsapp"></i>{" "}
          </Link>
          <Link to="">
            <i class="fa-brands fa-facebook-messenger"></i>{" "}
          </Link>
<br />
<br />
          <span>@copyright Tourist's Terra</span>
        </div>
        <div>
          <h3>Contact Us</h3>
          <form action="">
            <input type="email" placeholder="Enter your email" />
            <br />
            <textarea name="message" placeholder="Enter your message" id="" cols="42" rows="3"></textarea>
            <br />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
