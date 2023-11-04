import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import { Navigate, useNavigate } from "react-router";

const AddBlogPost = () => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required").max(32),
    category: yup.string().required("Select Category"),
    description: yup.string().required("Description is required").min(1),
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (!values.description || values.description.trim() == null) {
      alert("Please fill all fields");
    } else {
      console.log(values);
      // You can send the form data to your backend or perform any other actions here.

      // Clear the form fields
      resetForm();
      navigate("/my-blogs");
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      category: "",
      file: "",
      description: "",
    },
    validationSchema,
    onSubmit, // Refer to the onSubmit function declared above
  });

  const handlePost = () => {
    if (
      values.title === "" ||
      values.category === "" ||
      values.description === ""
    ) {
      alert("Please fill in all required fields");
    } else {
      onSubmit(values);
    }
  };

  return (
    <div>
      <NavBar />
      <BlogMenu />
      <div className="max-w-lg lg:mx-auto mx-auto">
        <div className="py-2 px-1 rounded-md bg-white">
          <form onSubmit={handleSubmit}>
            <div id="cust-info">
              <span>Create a blog</span>
            </div>
            <div className="grid grid-cols-1 gap-y-6">
              <div className="flex w-full flex-col items-start">
                <label htmlFor="title" className="text-gray-900 text-lg">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={values.title}
                  onBlur={handleBlur("title")}
                  onChange={handleChange("title")}
                  className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}
              </div>
              <div className="flex flex-col items-start md:col-span-2">
                <label htmlFor="category" className="text-gray-900 text-lg">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onBlur={handleBlur("category")}
                  onChange={handleChange("category")}
                  className="w-full bg-gray-100 border-b text-black border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                >
                  <option className="text-gray-400" value="" disabled>
                    Select Category of Blog
                  </option>
                  <option className="text-black" value="hotel">
                    Hotel
                  </option>
                  <option className="text-black" value="restaurant">
                      Restaurant
                    </option>
                    <option className="text-black" value="food">
                      Food
                    </option>
                    <option className="text-black" value="attraction_points">
                      Attraction Points
                    </option>
                    <option className="text-black" value="self_blog">
                      Self Blog
                    </option>
                    <option className="text-black" value="others">
                      Others
                    </option>
                </select>
                {errors.category && touched.category && (
                  <div className="text-red-500 text-sm">{errors.category}</div>
                )}
              </div>
              
              <div className="flex flex-col items-start md:col-span-2">
                <label
                  htmlFor="description"
                  className="text-gray-900 text-lg"
                >
                  Enter Blog here *
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Blog here..."
                  value={values.description}
                  onBlur={handleBlur("description")}
                  onChange={handleChange("description")}
                  className="w-full h-64 bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                )}
              </div>
              <div className="my-10">
                <button
                  type="button"
                  className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover-bg-blue-700 transition duration-300"
                  onClick={handlePost}
                >
                  Post Blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddBlogPost;
