import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../accommodationpage/footer/footer";
import MainNavBar from "../../forms/mainnavbar/mainnavbar";
import { AuthContext } from "../../../../Context/authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../../../images/gallery.png";
const BecomeLocalGuideProvider = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValuesCustomer = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    cnic: "",
    city: "",
    experience: "",
    language: "",
    requestFor: "",
    idCardFrontImg: null,
    idCardBackImg: null,
  };
  const [formValuesCustomer, setFormValuesCustomer] = useState(
    initialValuesCustomer
  );
  const [formErrorsCustomer, setFormErrorsCustomer] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);

  const handleChangeCust = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const formattedContact = value
        .replace(/[^0-9]/g, "")
        .slice(0, 11)
        .replace(/(\d{4})(\d{0,7})(\d{0,4})/, "$1-$2$3");
      setFormValuesCustomer({
        ...formValuesCustomer,
        [name]: formattedContact,
      });
    } else if (name === "cnic") {
      const formattedCnic = value
        .replace(/[^0-9]/g, "")
        .slice(0, 13)
        .replace(/(\d{5})(\d{0,7})(\d{0,1})/, "$1-$2-$3");
      setFormValuesCustomer({ ...formValuesCustomer, [name]: formattedCnic });
    } else {
      setFormValuesCustomer({ ...formValuesCustomer, [name]: value });
    }
  };

  const handleImageClick = (inputName) => {
    document.getElementById(inputName).click();
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormValuesCustomer({
          ...formValuesCustomer,
          [imageType]: file,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmitCust = async (e) => {
    e.preventDefault();
    setFormErrorsCustomer(validate(formValuesCustomer));
    setIsSubmit(true);

    if (Object.keys(formErrorsCustomer).length === 0) {
      const newPost = {
        userId: user._id,
        firstName: formValuesCustomer.firstName,
        lastName: formValuesCustomer.lastName,
        contact: formValuesCustomer.contact,
        city: formValuesCustomer.city,
        email: formValuesCustomer.email,
        cnic: formValuesCustomer.cnic,
        experience: formValuesCustomer.experience,
        language: formValuesCustomer.language,
        requestFor: "LocalGuide Provider",
      };

      if (formValuesCustomer.idCardFrontImg) {
        const data = new FormData();
        const fileName = Date.now() + formValuesCustomer.idCardFrontImg.name;
        data.append("name", fileName);
        data.append("file", formValuesCustomer.idCardFrontImg);
        newPost.idCardFrontImg = fileName;
        try {
          await axios.post(
            "http://localhost:3001/api/upload/idcardfrontpic",
            data
          );
        } catch (err) {
          alert("Formatting Error in Id Card Front Image");
        }
      }

      if (formValuesCustomer.idCardBackImg) {
        const data = new FormData();
        const fileName = Date.now() + formValuesCustomer.idCardBackImg.name;
        data.append("name", fileName);
        data.append("file", formValuesCustomer.idCardBackImg);
        newPost.idCardBackImg = fileName;
        try {
          await axios.post(
            "http://localhost:3001/api/upload/idcardbackpic",
            data
          );
        } catch (err) {
          alert("Formatting Error in Id Card Back Image");
        }
      }

      try {
        await axios.post("http://localhost:3001/api/serviceProvider/", newPost);
        alert(
          "Your request has been successfully sent to our team. We'll respond to you soon."
        );
        navigate("/localguide");
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleCheckPolicy = () => {
    setCheckPolicy(!checkPolicy);
  };

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
    }
    if (!values.cnic) {
      errors.cnic = "CNIC is required";
    }
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!values.experience) {
      errors.experience = "Experience is required";
    }
    if (!values.language) {
      errors.language = "Language is required";
    }
    return errors;
  };

  return (
    <>
      <MainNavBar />

      <div
        id="big-main-container"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <div id="main-container">
          <div id="right-container">
            <div id="right-container-top">
              <div id="cust-info">
                <span>Local-Guide Verification Form</span>
              </div>
              <form onSubmit={onSubmitCust}>
                <div id="inputs-row">
                  <div id="form-inputs" className="margin">
                    <label>First Name</label>
                    <div id="inputs">
                      <i className="fa-solid fa-user"></i>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formValuesCustomer.firstName}
                        onChange={handleChangeCust}
                      />
                    </div>
                    <p className="error">{formErrorsCustomer.firstName}</p>
                  </div>

                  <div id="form-inputs">
                    <label>Last Name</label>
                    <div id="inputs">
                      <i className="fa-solid fa-user"></i>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
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
                      <i className="fa-solid fa-envelope"></i>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email@gmail.com"
                        value={formValuesCustomer.email}
                        onChange={handleChangeCust}
                        style={{ textTransform: "none" }}
                      />
                    </div>
                    <p className="error">{formErrorsCustomer.email}</p>
                  </div>

                  <div id="form-inputs">
                    <label>Contact no.</label>
                    <div id="inputs">
                      <i className="fa-solid fa-phone"></i>
                      <input
                        type="text"
                        name="contact"
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
                      <i className="fa-solid fa-id-card"></i>
                      <input
                        type="text"
                        name="cnic"
                        placeholder="342xx-xxxxxxx-x"
                        value={formValuesCustomer.cnic}
                        onChange={handleChangeCust}
                      />
                    </div>
                    <p className="error">{formErrorsCustomer.cnic}</p>
                  </div>

                  <div id="form-inputs">
                    <label>City</label>
                    <div id="inputs">
                      <i className="fa-solid fa-city"></i>
                      <input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
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
                      <i className="fa-solid fa-certificate"></i>
                      <input
                        type="text"
                        name="experience"
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
                      <i className="fa-solid fa-language"></i>
                      <input
                        type="text"
                        name="language"
                        placeholder="English etc"
                        value={formValuesCustomer.language}
                        onChange={handleChangeCust}
                      />
                    </div>
                    <p className="error">{formErrorsCustomer.language}</p>
                  </div>
                </div>
                <div id="id-card-veri-img">
                  <label onClick={() => handleImageClick("fileInputFront")}>
                    Upload Front side of your Id Card
                  </label>
                  <img
                    src={
                      formValuesCustomer.idCardFrontImg
                        ? URL.createObjectURL(formValuesCustomer.idCardFrontImg)
                        : uploadImage
                    }
                    alt=""
                    onClick={() => handleImageClick("fileInputFront")}
                  />
                  <input
                    type="file"
                    name="idCardFrontImg"
                    id="fileInputFront"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => handleImageChange(e, "idCardFrontImg")}
                    style={{ display: "none" }}
                  />
                </div>

                <div id="id-card-veri-img">
                  <label onClick={() => handleImageClick("fileInputBack")}>
                    Upload Back side of your Id Card
                  </label>
                  <img
                    src={
                      formValuesCustomer.idCardBackImg
                        ? URL.createObjectURL(formValuesCustomer.idCardBackImg)
                        : uploadImage
                    }
                    alt=""
                    onClick={() => handleImageClick("fileInputBack")}
                  />
                  <input
                    type="file"
                    name="idCardBackImg"
                    id="fileInputBack"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => handleImageChange(e, "idCardBackImg")}
                    style={{ display: "none" }}
                  />
                </div>

                <div id="check-terms">
                  <input type="checkbox" name="" onChange={handleCheckPolicy} />{" "}
                  {"  "}
                  <span>
                    I accept the <Link>Terms And Policies</Link> and{" "}
                    <Link>Privacy Policies</Link>{" "}
                  </span>
                </div>
                <br />
                <div id="input-row">
                  <button disabled={!checkPolicy} onSubmit={onSubmitCust}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BecomeLocalGuideProvider;
