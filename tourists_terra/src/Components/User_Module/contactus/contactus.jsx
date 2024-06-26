import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../homepage/navbar/navBar';
import ContactComponent from './contactcomponent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Footer from '../accommodationpage/footer/footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/api/contactus`, formData);

            // Show success message using react-toastify
            toast.success('Message sent successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Reset the form data to the initial state
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <NavBar />

            <div className="flex-col items-center">
                <br /><br />
                <Paper
                    style={{ height: '300px' }}
                    className="bg-gradient-to-r from-[#0E4157] via-[#1F6F8B] to-[#6AA1B2] bg-opacity-75 bg-no-repeat bg-center justify-center flex-col text-snow shadow-md"
                    elevation={3}
                >
                    <Typography variant="h3" className="text-white text-center pt-24 font-bold">
                        Contact Us
                    </Typography>
                    <Typography variant="body1" className="text-white text-center">
                        Let's talk to convert your ideas into reality.
                    </Typography>
                </Paper>
                <br />
                <div className="text-4xl font-bold text-center mb-4 text-[#0E4157]">
                    We’ll Be Glad
                    To Assist You!
                </div><br />

                <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 max-w-lg mx-auto">
                    {/* Form Section */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-100 p-8 rounded-lg shadow-md"
                    >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Enter Full Name'
                                value={formData.name}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='someone@gmail.com'
                                value={formData.email}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder='Enter your message here'
                                rows="6"
                                value={formData.message}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded font-bold hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <ContactComponent />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default ContactUs;
