import React from 'react';

const ContactComponent = () => {
  return (
    <section id="contact-container" className="py-20 px-10">
      <div className="contact-container-lite flex justify-between w-full">
        <div className="contact-detail w-1/2 text-left pt-10">
          <span className="text-4xl text-center mb-4 text-[#0E4157]">Get In Touch With Us</span>
          <h2 className="text-3xl mt-4 mb-6 text-[#0E4157]">Visit Our Agency Location </h2>
          <h4 className="text-xl mt-4 mb-6 text-[#0E4157]">Head Office</h4>
          <div>
            <ul className='text-[#0E4157]'>
              <li className="flex items-center mt-4">
                <i className="fas fa-map mr-2"></i>
                <p>Lda, Avenue one main Raiwand Road, Lahore</p>
              </li>
              <li className="flex items-center mt-4">
                <i className="fas fa-phone mr-2"></i>
                <p>+92 3154100710</p>
              </li>
              <li className="flex items-center mt-4">
                <i className="fas fa-envelope mr-2"></i>
                <p>trendocoder@gmail.com</p>
              </li>
              <li className="flex items-center mt-4">
                <i className="fas fa-clock mr-2"></i>
                <p>Monday to Saturday: 9:00am to 5:00pm</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="map w-1/2 h-400">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.7154659623925!2d74.2241045!3d31.421964599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901d446aeddbb%3A0xdadc273864bdfc93!2sLDA%20Ave%20ONE%20Rd%2C%20Block%20A%20Lda%20Avenue%20Phase%201%20Lda%20Avenue%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1661744814013!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
