import React, {useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from "@material-ui/core";
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import {AuthContext} from "../../../../Context/authcontext"
import { useNavigate } from "react-router";
import axios from "axios";

const AddBlogPost = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  const [image, setImage] = useState("");
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

  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    try {
      // Upload the image to Cloudinary
      const formData = new FormData();
      values.userId = user._id; 
      formData.append('file', image);
      formData.append('upload_preset', 'oj2mvysk'); // Replace with your Cloudinary upload preset
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dw82alf1o/image/upload',
        formData
      );
      const imageUrl = cloudinaryResponse.data.secure_url;
      // Add the Cloudinary image URL to the form data
      values.imageURL = imageUrl;
      values.authorName = localStorage.getItem("username")
      console.log(values);
      const response = await axios.post("http://127.0.0.1:3001/api/bloguser/createblogs", values);

      console.log('API Response:', response.data);
      alert('Blog posted successfully');
      resetForm();
      navigate('/my-blogs');
    } catch (error) {
      console.error('API Error:', error);
      alert('An error occurred while posting the blog');
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

  return (
    <div>
      <NavBar />
      <BlogMenu />
      <div className="max-w-lg lg:mx-auto mx-auto mt-8">
        <div className="py-2 px-4 rounded-md bg-white shadow-md">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-gray-900">Create a Blog</h1>
            </div>
            <div className="grid grid-cols-1 gap-y-6">
              <div className="flex flex-col mb-4">
                <TextField
                  label="Title *"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={formik.values.title}
                  onBlur={formik.handleBlur("title")}
                  onChange={formik.handleChange("title")}
                  variant="outlined"
                  fullWidth
                  error={formik.errors.title && formik.touched.title}
                  helperText={formik.errors.title && formik.touched.title && formik.errors.title}
                />
              </div>
              <div className="flex flex-col mb-4">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onBlur={formik.handleBlur("category")}
                    onChange={formik.handleChange("category")}
                    label="Category *"
                  >
                    <MenuItem value="" disabled>
                      Select Category of Blog
                    </MenuItem>
                    <MenuItem value="Hotel">Hotel</MenuItem>
                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Attraction Points">Attraction Points</MenuItem>
                    <MenuItem value="Self Blog">Self Blog</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
                {formik.errors.category && formik.touched.category && (
                  <div className="text-red-500 text-sm">{formik.errors.category}</div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <InputLabel className="mb-2" htmlFor="avatar">Select an image from your device (JPEG, JPG, PNG):</InputLabel>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleImageChange}
                  className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {formik.errors.image && formik.touched.image && (
                  <div className="text-red-500 text-sm">{formik.errors.image}</div>
                )}
                {image && (
                  <img className="w-10 h-10 rounded-full mt-2" src={URL.createObjectURL(image)} alt="Rounded avatar" />
                )}
              </div>
              <div className="flex flex-col mb-2">
                <TextField
                  label="Enter Blog here *"
                  id="description"
                  name="description"
                  placeholder="Enter Blog here ..."
                  value={formik.values.description}
                  onBlur={formik.handleBlur("description")}
                  onChange={formik.handleChange("description")}
                  variant="outlined"
                  multiline
                  rows={14}  // number of rows to make the description box larger
                  fullWidth
                  error={formik.errors.description && formik.touched.description}
                  helperText={formik.errors.description && formik.touched.description && formik.errors.description}
                />
              </div>
              <div className="my-1">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#0f4157", color: "white" }}
                  className="w-full hover:bg-[#14262e] transition duration-300 "
                >
                  Post Blog
                </Button>
              </div>
            </div>
          </form>
          <br/>
        </div>
        <br/>
      </div>
      <br/>
      <Footer />
    </div>
  );
};

export default AddBlogPost;
