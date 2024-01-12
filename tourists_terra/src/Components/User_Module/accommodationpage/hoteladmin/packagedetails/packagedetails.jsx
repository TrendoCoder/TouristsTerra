import React, { useState } from 'react'
import "./packagedetails.css"
const PackageDetails = ({onClose}) => {
    const [displayPackage, setDisplayPackage] = useState(true);
    const [displayPaymentDetails, setDisplayPaymentDetails] = useState(false);
    const [displayUploadScreenShot, setDisplayUploadScreenShot] = useState(false);
  return (
 <>
    {
        displayPackage&&(
            <div id='accomo-pkg-detail-main-container'>
     <div id="pkg-close-btn" onClick={onClose}>
          &times;
    </div>
    <div id='accomo-pkg-detail-big-container'>
        <h1>Want to reach more users?</h1>
        <span>Currently Available Pacakges</span>
        <div id="accomo-pkg-detail-container">
            <h1>5 day Package</h1>
            <h2>Price: 1000 Rs</h2>
            <h3>Payment Options Available are </h3>
            <div>
                <h2>JazzCash</h2>
                <h2>Bank Transfer</h2>
            </div>
        </div>
        <button onClick={()=>{
            setDisplayPackage(false);
            setDisplayPaymentDetails(true);
        }}>Next</button>
    </div>
    </div>
        )
    }
    {
        displayPaymentDetails && (
            <div id='accomo-pkg-detail-main-container'>
     <div id="pkg-close-btn" onClick={onClose}>
          &times;
    </div>
    <div id='accomo-pkg-detail-big-container'>
    <h1>Payment Methods Available</h1>
    <span>Following are the payment methods</span>
    <div id='accomo-payment-method-container'>
        <div id='accomo-payment-method-l-container'>
        <h1><b>Bank Name:</b>HABIB BANK LIMITED</h1>
        <h1><b>Account/Iban:</b> 020908663782918</h1>
        <h1><b>Title: </b>Chaudhary</h1>
        </div>
        <div id='accomo-payment-method-r-container'>
        <h1><b>JAZZCASH</b></h1>
        <h1><b>AccountNum: </b>03056185570</h1>
        <h1><b>Title: </b>Chaudhary</h1>
        </div>
    </div>
    <p>Note: Pay your featured ads charges and take a screen shot of it and send to us. After verification, your ad will be featured for 5 days.</p>
    <div id='accomo-payment-btns'>
        <button onClick={()=>{setDisplayPackage(true)
        setDisplayPaymentDetails(false)}}>Back</button>
        <button onClick={()=>{setDisplayPackage(true)
        setDisplayPaymentDetails(false)}}>Next</button>
    </div>
    </div>
   
    </div>
        )
    }
    {

    }
 </>
  )
}

export default PackageDetails