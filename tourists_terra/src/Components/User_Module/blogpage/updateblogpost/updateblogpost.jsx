// import React, { useContext, useState, useEffect, useRef } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import BlogMenu from "../blogmenu/blogmenu";
// import NavBar from "../../homepage/navbar/navBar";
// import Footer from "../../accommodationpage/footer/footer";
// import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from "@material-ui/core";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../../../Context/authcontext";

// const UpdateBlogPost = () => {

// const { user } = useContext(AuthContext);
// console.log('User Data:', user);
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [image, setImage] = useState("");
//   const navigate = useNavigate();

//   // Use useRef to create a mutable object that we can update inside useEffect
//   const formikRef = useRef(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/bloguser/blog/${id}`
//         );
//         const fetchedBlog = response.data || {};
//         console.log('Fetched Blog:', fetchedBlog);

//         // Update formik initial values based on fetched blog data
//         formikRef.current.setValues({
//           title: fetchedBlog.title || '',
//           category: fetchedBlog.category || '',
//           description: fetchedBlog.description || '',
//         });

//         setBlog(fetchedBlog);
//         console.log('Fetched Blog:', fetchedBlog);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const validationSchema = yup.object().shape({
//     title: yup.string().required("Title is required").max(50),
//     category: yup.string().required("Select Category"),
//     description: yup.string().required("Description is required").min(20),
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     try {
//         console.log('Request URL:', `http://localhost:3001/api/bloguser/blog/${id}?userId=${user?._id}`);
//         console.log('User ID for Request:', user?._id); 

//       // Check if there's a new image to upload
//       if (image) {
//         const formData = new FormData();
//         formData.append('file', image);
//         formData.append('upload_preset', 'oj2mvysk'); // Replace with your Cloudinary upload preset
//         const cloudinaryResponse = await axios.post(
//           'https://api.cloudinary.com/v1_1/dw82alf1o/image/upload',
//           formData
//         );
//         const imageUrl = cloudinaryResponse.data.secure_url;
//         values.imageURL = imageUrl;
//       }

//       const response = await axios.put((`http://localhost:3001/api/bloguser/blog/${id}?userId=${user?._id}`), values
//       );

//       console.log('API Response:', response.data);
//       alert('Blog updated successfully');
//       resetForm();
//       navigate(`/single-post/${id}`);
//     } catch (error) {
//       console.error('API Error:', error);
//       alert('An error occurred while updating the blog');
//     }
//   };

//   formikRef.current = useFormik({
//     initialValues: {
//       title: "",
//       category: "",
//       description: "",
//     },
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <div>
//       <NavBar />
//       <BlogMenu />
//       <div className="max-w-xl xl:mx-auto mx-auto mt-8 bg-[#f7f7fdda] shadow-md">
//         <div className="py-2 px-8 rounded-md ">
//           <form onSubmit={formikRef.current.handleSubmit}>
//             <div className="mb-8 text-center mt-2">
//               <h1 className="text-3xl font-semibold text-gray-900">Update Blog</h1>
//             </div>
//             <div className="flex flex-col mb-4">
//               <TextField
//                 label="Title *"
//                 id="title"
//                 name="title"
//                 placeholder="Title"
//                 value={formikRef.current.values.title}
//                 onBlur={formikRef.current.handleBlur("title")}
//                 onChange={formikRef.current.handleChange("title")}
//                 variant="outlined"
//                 fullWidth
//                 error={formikRef.current.errors.title && formikRef.current.touched.title}
//                 helperText={formikRef.current.errors.title && formikRef.current.touched.title && formikRef.current.errors.title}
//               />
//             </div>
//             <div className="flex flex-col mb-4">
//               <FormControl variant="outlined" fullWidth>
//                 <InputLabel id="category-label">Category *</InputLabel>
//                 <Select
//                   variant="standard"
//                   labelId="category-label"
//                   id="category"
//                   name="category"
//                   value={formikRef.current.values.category}
//                   onBlur={formikRef.current.handleBlur("category")}
//                   onChange={formikRef.current.handleChange("category")}
//                   label="Category *">
//                   <MenuItem value="" disabled>
//                     Select Category of Blog
//                   </MenuItem>
//                   <MenuItem value="Hotel">Hotel</MenuItem>
//                   <MenuItem value="Restaurant">Restaurant</MenuItem>
//                   <MenuItem value="Food">Food</MenuItem>
//                   <MenuItem value="Attraction Points">Attraction Points</MenuItem>
//                   <MenuItem value="Self Blog">Self Blog</MenuItem>
//                   <MenuItem value="Others">Others</MenuItem>
//                 </Select>
//               </FormControl>
//               {formikRef.current.errors.category && formikRef.current.touched.category && (
//                 <div className="text-red-500 text-sm">{formikRef.current.errors.category}</div>
//               )}
//             </div>
//             <div className="flex flex-col mb-4">
//               <InputLabel className="mb-2" htmlFor="avatar">Select an image from your device (JPEG, JPG, PNG):</InputLabel>
//               <input
//                 type="file"
//                 id="avatar"
//                 name="avatar"
//                 onChange={handleImageChange}
//                 className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
//               />
//               {formikRef.current.errors.image && formikRef.current.touched.image && (
//                 <div className="text-red-500 text-sm">{formikRef.current.errors.image}</div>
//               )}
//               {image && (
//                 <img className="w-10 h-10 rounded-full mt-2" src={URL.createObjectURL(image)} alt="Rounded avatar" />
//               )}
//             </div>
//             <div className="flex flex-col mb-2">
//               <TextField
//                 label="Enter Blog here *"
//                 id="description"
//                 name="description"
//                 placeholder="Enter Blog here ..."
//                 value={formikRef.current.values.description}
//                 onBlur={formikRef.current.handleBlur("description")}
//                 onChange={formikRef.current.handleChange("description")}
//                 variant="outlined"
//                 multiline
//                 rows={17}
//                 fullWidth
//                 error={formikRef.current.errors.description && formikRef.current.touched.description}
//                 helperText={formikRef.current.errors.description && formikRef.current.touched.description && formikRef.current.errors.description}
//               />
//             </div>
//             <br />
//             <div className="my-1">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 style={{ backgroundColor: "#0f4157", color: "white" }}
//                 className="w-full hover:bg-[#14262e] transition duration-300 "
//               >
//                 Update Blog
//               </Button>
//             </div>
//             <br />
//           </form>
//         </div>
//       </div>
//       <br />
//       <Footer />
//     </div>
//   );
// };

// export default UpdateBlogPost;