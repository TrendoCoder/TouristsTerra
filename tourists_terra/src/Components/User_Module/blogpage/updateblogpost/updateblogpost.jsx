import React, { useContext, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../Context/authcontext";
import BackgroundImage from "../../../../images/image.jpg";

const UpdateBlogPost = () => {
  const { user } = useContext(AuthContext);
  console.log('User Data:', user);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const formikRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/bloguser/blog/${id}`
        );
        const fetchedBlog = response.data || {};
        console.log('Fetched Blog:', fetchedBlog);

        formikRef.current.setValues({
          title: fetchedBlog.title || '',
          category: fetchedBlog.category || '',
          description: fetchedBlog.description || '',
        });

        setBlog(fetchedBlog);
        console.log('Fetched Blog:', fetchedBlog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required").max(50),
    category: yup.string().required("Select Category"),
    description: yup.string().required("Description is required").min(20),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      console.log('Request URL:', `http://localhost:3001/api/bloguser/blog/${id}?userId=${user?._id}`);
      console.log('User ID for Request:', user?._id);

      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'oj2mvysk');
        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dw82alf1o/image/upload',
          formData
        );
        const imageUrl = cloudinaryResponse.data.secure_url;
        values.imageURL = imageUrl;
      }

      const response = await axios.put(
        (`http://localhost:3001/api/bloguser/blog/${id}?userId=${user?._id}`),
        values
      );

      console.log('API Response:', response.data);
      alert('Blog updated successfully');
      resetForm();
      navigate(`/single-post/${id}`);
    } catch (error) {
      console.error('API Error:', error);
      alert('An error occurred while updating the blog');
    }
  };

  formikRef.current = useFormik({
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
    maxHeight: '400px', // Set the max height as needed
    overflowY: 'auto', // Add vertical scroll if needed
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
          <div className="py-2 px-8 rounded-md">
            <form onSubmit={formikRef.current.handleSubmit}>
              <div className="mb-8 text-center mt-2">
                <h1 className="text-3xl font-semibold text-gray-900">Update Blog</h1>
              </div>
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  value={formikRef.current.values.title}
                  onBlur={formikRef.current.handleBlur("title")}
                  onChange={formikRef.current.handleChange("title")}
                  className="border p-2 rounded-md w-full"
                />
              </div>
              <div className="flex flex-col mb-4">
                <select
                  id="category"
                  name="category"
                  value={formikRef.current.values.category}
                  onBlur={formikRef.current.handleBlur("category")}
                  onChange={formikRef.current.handleChange("category")}
                  className="mt-1 p-2 border rounded-md w-full"
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
                {formikRef.current.errors.category && formikRef.current.touched.category && (
                  <div className="text-red-500 text-sm">{formikRef.current.errors.category}</div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="avatar" className="mb-2">
                  Select an image from your device (JPEG, JPG, PNG):
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleImageChange}
                  className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {formikRef.current.errors.image && formikRef.current.touched.image && (
                  <div className="text-red-500 text-sm">{formikRef.current.errors.image}</div>
                )}
                {image && (
                  <img className="w-10 h-10 rounded-full mt-2" src={URL.createObjectURL(image)} alt="Rounded avatar" />
                )}
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="description" className="mb-2">
                  Description:
                </label>
                <ReactQuill
                  id="description"
                  value={formikRef.current.values.description}
                  onBlur={() => formikRef.current.handleBlur("description")}
                  onChange={(value) => formikRef.current.handleChange("description")(value)}
                  className="w-full bg-white border-b mt-1 border-black rounded-md focus:outline-none"
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ ...quillStyles, minHeight: '300px' }}  
                />
                {formikRef.current.errors.description && formikRef.current.touched.description && (
                  <div className="text-red-500 text-sm">{formikRef.current.errors.description}</div>
                )}
              </div>
              <br /><br />
              <div className="my-1">
                <button
                  type="submit"
                  className="bg-[#0f4157] text-white w-full py-2 px-4 rounded-md hover:bg-[#14262e] transition duration-300"
                >
                  Update Blog
                </button>
              </div>
              <br />
            </form>
            <br />
          </div>
        </div>
        <br />
        <br />

      </div>
      <Footer />
    </div>
  );
};

export default UpdateBlogPost;
