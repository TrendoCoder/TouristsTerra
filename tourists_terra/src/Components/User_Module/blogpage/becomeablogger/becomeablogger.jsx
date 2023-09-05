import React, { useEffect, useState } from "react";
import "./becomeablogger.css";
import { Link } from "react-router-dom";
import BlogMenu from "../blogmenu/blogmenu";
import Footer from "../../accommodationpage/footer/footer";
const BecomeABlogger = () => {
    const initialValuesCustomer = {
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        cnic: "",
        city: "",
        experience: "",
        language:"",
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
    <>
    <BlogMenu/>
<div id="big-main-container">
<div id="main-container">
        <div id="right-container">
          <div id="right-container-top">
            <div id="cust-info">
              <span>Blogger Verification Form</span>
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
                <div id="form-inputs" className="margin">
                  <label>Experience</label>
                  <div id="inputs">
                  <i class="fa-solid fa-certificate"></i>
                    <input
                      type="text"
                      name="experience"
                      id=""
                      placeholder="2 years.."
                      value={formValuesCustomer.experience}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.experience}</p>
                </div>

                <div id="form-inputs">
                  <label>Languages Preferences</label>
                  <div id="inputs">
                  <i class="fa-solid fa-language"></i>
                    <input
                      type="text"
                      name="language"
                      id=""
                      placeholder="English etc"
                      value={formValuesCustomer.language}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.language}</p>
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
            <div id="book-btn">
              <button onSubmit={onSubmitCust}>Register</button>
            </div>
          </div>
        </div>
        <div id="left-container">
        <div id="cust-info">
              <span>Add Bank Details</span>
        </div>
        <div id="form-inputs"  style={{ width: "90%" }}>
                  <label>Account Title</label>
                  <div id="inputs" style={{padding:"10px 10px"}}>
                    <input
                      type="text"
                      name="experience"
                      id=""
                      placeholder=""
                      value={formValuesCustomer.experience}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.experience}</p>
                </div>

                <div id="form-inputs"  style={{ width: "90%" }}>
                  <label>Account Number</label>
                  <div id="inputs" style={{padding:"10px 10px"}} >
                    <input
                      type="text"
                      name="experience"
                      id=""
                      placeholder=""
                      value={formValuesCustomer.experience}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.experience}</p>
                </div>

                <div id="form-inputs"  style={{ width: "90%" }}>
                  <label>Bank Name</label>
                  <div id="inputs" style={{padding:"10px 10px"}} >
                    <input
                      type="text"
                      name="experience"
                      id=""
                      placeholder=""
                      value={formValuesCustomer.experience}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.experience}</p>
                </div>

                 <div id="form-inputs"  style={{ width: "90%"}}>
                  <label>Branch Code</label>
                  <div id="inputs" style={{padding:"10px 10px"}} >
                    <input
                      type="text"
                      name="experience"
                      id=""
                      placeholder=""
                      value={formValuesCustomer.experience}
                      onChange={handleChangeCust}
                    />
                  </div>
                  <p className="error">{formErrorsCustomer.experience}</p>
                </div>
        </div>
      </div>
</div>
    <Footer/>
    </>
  );
};

export default BecomeABlogger;
