import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import { AuthContext } from "../../../../Context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundImage from "../../../../images/image.jpg";

const AddBlogPost = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const validationSchema = yup.object().shape({
    userId: user._Id,
    title: yup.string().required("Title is required").max(50),
    category: yup.string().required("Select Category"),
    description: yup.string().required("Description is required").min(20),
  });


  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      values.userId = user._id;
      formData.append("file", image);
      formData.append("upload_preset", "oj2mvysk");
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dw82alf1o/image/upload",
        formData
      );
      const imageUrl = cloudinaryResponse.data.secure_url;
      values.imageURL = imageUrl;
      values.authorName = localStorage.getItem("username");
      const response = await axios.post(
        "http://127.0.0.1:3001/api/bloguser/createblogs",
        values
      );

      console.log("API Response:", response.data);
      alert("Blog posted successfully");
      resetForm();
      navigate("/my-blogs");
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while posting the blog");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
    },
    validationSchema,
    onSubmit,
  });

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
  ];

  const quillStyles = {
    maxHeight: '400px', // Set the max height 
    overflowY: 'auto', // Add vertical scroll 
  };

  return (
    <div>
      <NavBar />
      <BlogMenu />

      {/* Background section */}
      <div
        style={{ backgroundImage: `url(${BackgroundImage})`, backgroundPosition: "center", backgroundSize: "cover", backgroundAttachment: "fixed" }}
      >
        <br />
        {/* Content within the background section */}
        <br />
        <div className="max-w-xl xl:mx-auto mx-auto  bg-[#fcfcfcd5] rounded-xl shadow-md">
          <div className="py-2 px-8 ">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-8 text-center mt-1 rounded-md">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Create a Blog
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-y-5">
                <div className="flex flex-col mb-4">
                  <label htmlFor="category" className="text-gray-900 font-semibold">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={formik.values.title}
                    onBlur={formik.handleBlur("title")}
                    onChange={formik.handleChange("title")}
                    className="w-full bg-white mt-1 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                  {formik.errors.title && formik.touched.title && (
                    <div className="text-red-500 text-sm font-semibold">
                      {formik.errors.title}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <div className="w-full">
                    <label htmlFor="category" className="text-gray-900 font-semibold">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formik.values.category}
                      onBlur={formik.handleBlur("category")}
                      onChange={formik.handleChange("category")}
                      className="w-full bg-white mt-1 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    >
                      <option value="" disabled>
                        Select Category of Blog
                      </option>
                      <option value="Hotel">Hotel</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Food">Food</option>
                      <option value="Attraction Points">Attraction Points</option>
                      <option value="Self Blog">Self Blog</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  {formik.errors.category && formik.touched.category && (
                    <div className="text-red-500 text-sm font-semibold">
                      {formik.errors.category}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="avatar" className="mb-2 text-gray-900 font-semibold">
                    Select an image from your device (JPEG, JPG, PNG):
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleImageChange}
                    className="w-full bg-white border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                  {formik.errors.image && formik.touched.image && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.image}
                    </div>
                  )}
                  {image && (
                    <img
                      className="w-10 h-10 rounded-full mt-2"
                      src={URL.createObjectURL(image)}
                      alt="Rounded avatar"
                    />
                  )}
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="category" className="text-gray-900 font-semibold">
                    Description *
                  </label>
                  <ReactQuill
                    id="description"
                    value={formik.values.description}
                    onBlur={() => formik.handleBlur("description")}
                    onChange={(value) => formik.handleChange("description")(value)}
                    className="w-full bg-white border-b mt-1 border-black rounded-md focus:outline-none"
                    modules={quillModules}
                    formats={quillFormats}
                    style={{ ...quillStyles, minHeight: '250px' }}  
                  />
                  {formik.errors.description && formik.touched.description && (
                    <div className="text-red-500 text-sm font-semibold">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <br/>
                <div className="my-1">
                  <button
                    type="submit"
                    className="bg-[#0f4157] text-white w-full py-2 px-4 rounded-md hover:bg-[#14262e] transition duration-300"
                  >
                    Post Blog
                  </button>
                </div>
              </div>
            </form>
            <br />
          </div>
          <br />
        </div>
        <br />
        <br />
      </div>

      <Footer />
    </div>
  );
};

export default AddBlogPost;
