import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import { useNavigate } from "react-router";
import axios from "axios";

const cloudinaryWidgetScript = document.createElement('script');
cloudinaryWidgetScript.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
cloudinaryWidgetScript.async = true;
document.head.appendChild(cloudinaryWidgetScript);

const AddBlogPost = () => {

  const [image, setImage] = useState("")
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
  };


  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required").max(32),
    category: yup.string().required("Select Category"),
    description: yup.string().required("Description is required").min(1),
  });

  const navigate = useNavigate();

  function UploadFile(){
    const preset_Key = "oj2mvysk"
    const cloud_name = "dw82alf1o"
    const [Image, setImage] = useState();



    function handleFile(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", preset_Key);
      axios.post(`https://api.cloudinary.com/v1_1/dw82alf1o /image/upload`,formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }

  }

  const onSubmit = async (values, { resetForm }) => {
    try {
                          // Upload the image to Cloudinary
                          const formData = new FormData();
                          formData.append('file', image);
                          formData.append('upload_preset', 'oj2mvysk'); // Replace with your Cloudinary upload preset
                          const cloudinaryResponse = await axios.post(
                              'https://api.cloudinary.com/v1_1/dw82alf1o/image/upload',
                              formData
                          );
                          const imageUrl = cloudinaryResponse.data.secure_url;
                          // Add the Cloudinary image URL to the form data
                          values.imageURL = imageUrl;
                    console.log(values)
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
      <div className="max-w-lg lg:mx-auto mx-auto">
        <div className="py-2 px-1 rounded-md bg-white">
          <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.title}
                  onBlur={formik.handleBlur("title")}
                  onChange={formik.handleChange("title")}
                  className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">{formik.errors.title}</div>
                )}
              </div>
              <div className="flex flex-col items-start md:col-span-2">
                <label htmlFor="category" className="text-gray-900 text-lg">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onBlur={formik.handleBlur("category")}
                  onChange={formik.handleChange("category")}
                  className="w-full bg-gray-100 border-b text-black border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                >
                  <option className="text-gray-400" value="" disabled>
                    Select Category of Blog
                  </option>
                  <option className="text-black" value="Hotel">
                    Hotel
                  </option>
                  <option className="text-black" value="Restaurant">
                    Restaurant
                  </option>
                  <option className="text-black" value="Food">
                    Food
                  </option>
                  <option className="text-black" value="Attraction Points">
                    Attraction Points
                  </option>
                  <option className="text-black" value="Self Blog">
                    Self Blog
                  </option>
                  <option className="text-black" value="Others">
                    Others
                  </option>
                </select>
                {formik.errors.category && formik.touched.category && (
                  <div className="text-red-500 text-sm">{formik.errors.category}</div>
                )}
              </div>
              <div className="flex flex-col items-start md:col-span-2">
                <label
                  htmlFor="image"
                  className="text-gray-900 text-lg float-left block font-normal">
                  Select an image from your device (JPEG, JPG, PNG):
                </label>
                <div>
                <input
                type='file'
                id='avatar'
                name='avatar'
                onChange={handleImageChange}
                className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"/>
                Upload Image
              </div>
                {formik.errors.image && formik.touched.image && (
                  <div className="text-red-500 text-sm">{formik.errors.image}</div>
                )}
              </div>
              {image && (
                <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(image)} alt="Rounded avatar" />
            )}
              <div className="flex flex-col items-start md:col-span-2">
                <label htmlFor="description" className="text-gray-900 text-lg">
                  Enter Blog here *
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Blog here..."
                  value={formik.values.description}
                  onBlur={formik.handleBlur("description")}
                  onChange={formik.handleChange("description")}
                  className="w-full h-64 bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
                {formik.errors.description && formik.touched.description &&
                  (
                    <div className="text-red-500 text-sm">{formik.errors.description}</div>
                  )}
              </div>
              <div className="my-10">
                <button
                  type="submit" // Change the button type to "submit"
                  className="py-3 text-base font-medium rounded text-white bg-[#0F4157] w-full hover-bg-blue-700 transition duration-300"
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
