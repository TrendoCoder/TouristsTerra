import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./bookingaccomodationform.css";
import MainNavBar from "../mainnavbar/mainnavbar";
import img from "../../../../images/h_ad1.jfif";
import Footer from "../../accommodationpage/footer/footer";
const BookingAccomodationForm = () => {
  const initialValuesCustomer = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    cnic: "",
    city: "",
    address: "",
    state: "",
    zipCode: "",
  };
  const [formValuesCustomer, setFormValuesCustomer] = useState(
    initialValuesCustomer
  );
  const [formErrorsCustomer, setFormErrorsCustomer] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);

  const handleChangeCust = (e) => {
    const { name, value } = e.target;
    setFormValuesCustomer({ ...formValuesCustomer, [name]: value });
  };
  const onSubmitCust = (e) => {
    e.preventDefault();
    setFormErrorsCustomer(validate(formValuesCustomer));
    setIsSubmit(true);
  };

  const handleCheckPolicy = () => {
    setCheckPolicy(!checkPolicy);
    console.log(checkPolicy);
  };

  useEffect(() => {
    if (Object.keys(formErrorsCustomer) === 0 && isSubmit) {
      console.log(formValuesCustomer);
    }
  }, [formErrorsCustomer]);

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.contact) {
      errors.contact = "Contact is required";
    } else if (values.contact.length < 10) {
      errors.contact = "Enter a valid contact number";
    }
    if (!values.cnic) {
      errors.cnic = "Cnic is required";
    } else if (values.cnic.length < 13 || values.cnic.length > 13) {
      errors.cnic = "Enter valid cnic";
    }
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }
    if (!values.state) {
      errors.state = "State is required";
    }
    if (!values.zipCode) {
      errors.zipCode = "Zipcode is required";
    }
    return errors;
  };

  return (
    <div>
      <MainNavBar />
      <div id="h-name">
        <h2>Hotel Name</h2>
      </div>
      <div id="main-container">
        <div id="right-container">
          <div id="right-container-top">
            <div id="cust-info">
              <span>Customer Information</span>
            </div>
            <form onSubmit={onSubmitCust}>
              <div id="inputs-row">
                <div id="form-inputs" className="margin">
                  <label>First Name</label>
                  <div id="inputs">
                    <i class="fa-solid fa-user"></i>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="first name"
                      value={formValuesCustomer.firstName}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.firstName}</p>
                </div>

                <div id="form-inputs">
                  <label>Last Name</label>
                  <div id="inputs">
                    <i class="fa-solid fa-user"></i>
                    <input
                      type="text"
                      name="lastName"
                      id=""
                      placeholder="last name"
                      value={formValuesCustomer.lastName}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.lastName}</p>
                </div>
              </div>

              <div id="inputs-row">
                <div id="form-inputs" className="margin">
                  <label>Email</label>
                  <div id="inputs">
                    <i class="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      id=""
                      placeholder="email@gmail.com"
                      value={formValuesCustomer.email}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.email}</p>
                </div>

                <div id="form-inputs">
                  <label>Contact no.</label>
                  <div id="inputs">
                    <i class="fa-solid fa-phone"></i>
                    <input
                      type="number"
                      name="contact"
                      id=""
                      placeholder="03xx-xxxxxxx"
                      value={formValuesCustomer.contact}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.contact}</p>
                </div>
              </div>

              <div id="inputs-row">
                <div id="form-inputs" className="margin">
                  <label>CNIC</label>
                  <div id="inputs">
                    <i class="fa-solid fa-id-card"></i>
                    <input
                      type="text"
                      name="cnic"
                      id=""
                      placeholder="342xxxxxxxxxxx"
                      value={formValuesCustomer.cnic}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.cnic}</p>
                </div>

                <div id="form-inputs">
                  <label>City</label>
                  <div id="inputs">
                    <i class="fa-solid fa-city"></i>
                    <input
                      type="text"
                      name="city"
                      id=""
                      placeholder="enter your city"
                      value={formValuesCustomer.city}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.city}</p>
                </div>
              </div>

              <div id="inputs-row">
                <div id="form-inputs" style={{ width: "90%" }}>
                  <label>Address</label>
                  <div id="inputs">
                    <i class="fa-solid fa-location-dot"></i>
                    <input
                      type="text"
                      name="address"
                      id=""
                      placeholder="enter your address"
                      value={formValuesCustomer.address}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.address}</p>
                </div>
              </div>

              <div id="inputs-row">
                <div id="form-inputs" className="margin">
                  <label>State/Province</label>
                  <div id="inputs">
                    <i class="fa-solid fa-location-arrow"></i>
                    <input
                      type="text"
                      name="state"
                      id=""
                      placeholder="enter your province"
                      value={formValuesCustomer.state}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.state}</p>
                </div>

                <div id="form-inputs">
                  <label>Zip Code</label>
                  <div id="inputs">
                    <i class="fa-solid fa-envelope-open"></i>
                    <input
                      type="number"
                      name="zipCode"
                      id=""
                      placeholder="enter Zip code"
                      value={formValuesCustomer.zipCode}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.zipCode}</p>
                </div>
              </div>
              <div id="check-terms">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={handleCheckPolicy}
                />
                <span>
                  I accept the <Link>Terms And Policies</Link> and{" "}
                  <Link>Privacy Policies</Link>{" "}
                </span>
              </div>
              <br />
              <div id="input-row">
                <button disabled={!checkPolicy}>Save Info</button>
              </div>
            </form>
          </div>
          <div id="right-container-bottom">
            <span id="payment-heading">Choose a Payment Method</span>

            <div id="payment-method">
              <div id="payment-method-top">
                <div>
                  <input type="radio" name="payment" id="" />
                  <label htmlFor="">JazzCash</label>
                </div>

                <div>
                  <input type="radio" name="payment" id="" />
                  <label htmlFor="">Bank Transfer</label>
                </div>
              </div>
              <div id="payment-method-bottom">
                <div>
                  <input type="radio" name="payment" id="" />
                  <label htmlFor="">Cash on Delivery</label>
                </div>
              </div>
            </div>
            <div id="book-btn">
              <button onSubmit={onSubmitCust}>Book Now</button>
            </div>
          </div>
        </div>
        <div id="left-container">
          <div id="img">
            <img src={img} alt="" />
          </div>

          <div id="calender">
            <div id="date">
              <div>
                <div>
                  <i class="fa-solid fa-calendar-days"></i>
                  <span> Check in</span>
                </div>
                <div>
                  <span> 20-03-2023</span>
                </div>
              </div>
            </div>

            <div id="date">
              <div id="date-checks">
                <div id="check-div">
                  <span>
                    <i class="fa-solid fa-calendar-days"></i> Check out
                  </span>
                </div>
                <div>
                  <span> 20-03-2023</span>
                </div>
              </div>
            </div>
          </div>
          <div id="no-of-nights">
            <span>1x night</span>
          </div>
          <hr id="hr" />
          <div id="t-name">
            <span>Million star</span>
          </div>
          <div id="r-detail">
            <span>1x Delux King Room</span>
          </div>
          <div id="details">
            <div id="details-left-container">
              <div id="details-left">
                <span>1x night</span>
              </div>
              <div id="details-left">
                <span>Total GST(16%)</span>
              </div>
              <div id="details-left">
                <span>Total</span>
              </div>
            </div>
            <div id="details-right-container">
              <div id="details-left">
                <span>Rs 6000</span>
              </div>
              <div id="details-left">
                <span>Rs 500</span>
              </div>
              <div id="details-left">
                <span>Rs 70000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BookingAccomodationForm;
