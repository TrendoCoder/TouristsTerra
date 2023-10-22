import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import BlogMenu from "../blogmenu/blogmenu";
import NavBar from "../../homepage/navbar/navBar";
import Footer from "../../accommodationpage/footer/footer";
import ReactQuill from "react-quill";
import { Navigate, useNavigate } from "react-router";

const AddBlogPost = () => {
  const initialValues = {
    title: "",
    category: "",
    file: "",
    description: "",
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().max(32).required("Title is required"),
    category: Yup.string().required("Select Category"),
    description: Yup.string().min(1).required("Description is required"),
  });

  const onSubmit = (values) => {
    if (!values.description || values.description.trim() === "") {
      alert("Description is required");
    } else {
      console.log(values);
      // You can send the form data to your backend or perform any other actions here.
    }
  };

  const handlePost = () => {
    navigate("/my-blogs");
  };

  return (
    <div>
      <NavBar />
      <BlogMenu />
      <div className="max-w-lg lg:mx-auto mx-auto">
        <div className="py-2 px-1 rounded-md bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div id="cust-info">
                <span>Create a blog</span>
              </div>
              <div className="grid grid-cols-1 gap-y-6">
                <div className="flex w-full flex-col items-start">
                  <label htmlFor="title" className="text-gray-900 text-lg">
                    Title *
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <label htmlFor="category" className="text-gray-900 text-lg">
                    Category *
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    placeholder="Select Category of Blog"
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
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <label
                    htmlFor="file"
                    className="text-gray-900 text-lg float-left block font-normal"
                  >
                    Select picture from device (JPEG, JPG, PNG):
                  </label>
                  <Field
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpeg, .jpg, .png"
                    className="w-full bg-gray-100 border-b border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-gray-900 text-lg"
                  >
                    Enter Blog here *
                  </label>
                  <div className="w-full">
                    <Field name="description" component={RichTextEditor} />
                  </div>
                  <div className="text-red-500 text-sm mt-2">
                    <ErrorMessage name="description" />
                  </div>
                </div>
                <div className="my-10">
                  <button
                    type="submit"
                    className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300"
                    onClick={handlePost}
                  >
                    Post Blog
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const RichTextEditor = ({ field, form }) => {
  return (
    <ReactQuill
      className="w-full h-64"
      value={field.value}
      placeholder="Enter Blog here..."
      onChange={(value) => form.setFieldValue(field.name, value)} // Use field.name here
    />
  );
};

export default AddBlogPost;
