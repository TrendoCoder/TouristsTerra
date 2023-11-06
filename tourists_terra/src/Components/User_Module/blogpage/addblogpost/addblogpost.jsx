import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import { useNavigate } from "react-router";
import axios from "axios";

const AddBlogPost = () => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required").max(32),
    category: yup.string().required("Select Category"),
    image: yup
      .mixed()
      .test("fileSize", "Image file is too large", (value) => {
        if (value) {
          return value.size <= 1048576; // 1MB
        }
        return true;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (value) {
          return (
            value.type === "image/jpeg" ||
            value.type === "image/jpg" ||
            value.type === "image/png"
          );
        }
        return true;
      }),
    description: yup.string().required("Description is required").min(1),
  });

  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    if (!values.description || values.description.trim() == null) {
      alert("Please fill all the fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("image", values.image);
        formData.append("description", values.description);

        // Make the API request using Axios
        const response = await axios.post("http://127.0.0.1:3001/api/bloguser/createblogs", values);
console.log(response)
        // Handle the response as needed
        console.log("API Response:", response.data);
        alert("Blog posted successfully");

        // Clear the form fields
        resetForm();

        // Redirect to the desired page
        navigate("/my-blogs");
      } catch (error) {
        console.error("API Error:", error);
        alert("An error occurred while posting the blog");
        // Handle the error as needed
      }
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      category: "",
      image: null,
      description: "",
    },
    validationSchema,
    onSubmit,
  });

  const handlePost = () => {
    if (
      values.title === "" ||
      values.category === "" ||
      values.description === ""
    ) {
      alert("Please fill all the required fields");
    } else {
      onSubmit(values, { resetForm });
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
                  htmlFor="image"
                  className="text-gray-900 text-lg float-left block font-normal"
                >
                  Select an image from your device (JPEG, JPG, PNG):
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpeg, .jpg, .png"
                  onChange={(event) =>
                    setFieldValue("image", event.currentTarget.files[0])
                  }
                  className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {errors.image && touched.image && (
                  <div className="text-red-500 text-sm">{errors.image}</div>
                )}
              </div>
              <div className="flex flex-col items-start md:col-span-2">
                <label htmlFor="description" className="text-gray-900 text-lg">
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