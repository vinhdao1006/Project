import React from 'react';
import BimecLogo from '../components/BimecLogo'
import Navbar from '../components/Navbar'
import icon_phone from '../assets/icon/icon_phone.png'
import icon_location from '../assets/icon/icon_location.png'
import icon_mail from '../assets/icon/icon_mail.png'
import icon_clock from '../assets/icon/icon_clock.png'
import Footer from '../components/BimecFooter'
const ContactSection = () => {
    return (

        <div>
            <BimecLogo></BimecLogo>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="w-full mt-16">
                {/* Map Section */}
                <div className="w-3/4 mx-auto h-[400px]">
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24176.46435895738!2d-74.0137960540258!3d40.73061003775432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQzJzQ5LjkiTiA3NMKwMDAnMTQuOSJX!5e0!3m2!1sen!2sus!4v1234567890"
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>
                </div>

                {/* Contact Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 px-8 lg:px-32">
                    {/* Form Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-bimec-green">Get in Touch</h3>
                        <h2 className="text-4xl font-bold text-bimec-heavy-green font-yeseva mt-2">Contact</h2>
                        <form className="mt-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-bimec-heavy-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Emergency Contact */}
                        <div className="bg-bimec-green p-6 rounded-lg shadow-md">
                            <img
                                src={icon_phone}
                            ></img>
                            <h4 className="font-bold text-lg text-white">Emergency</h4>
                            <p className="mt-2 text-white">(237) 681-812-255</p>
                            <p className="text-white">(237) 656-331-894</p>
                        </div>

                        {/* Location */}
                        <div className="bg-bimec-green p-6 rounded-lg shadow-md">
                            <img
                                src={icon_location}
                            ></img>
                            <h4 className="font-bold text-lg text-white">Location</h4>
                            <p className="mt-2 text-white">0123 Some place</p>
                            <p className="text-white">9876 Some country</p>
                        </div>

                        {/* Email */}
                        <div className="bg-bimec-green p-6 rounded-lg shadow-md">
                            <img
                                src={icon_mail}
                            ></img>
                            <h4 className="font-bold text-lg text-white">Email</h4>
                            <p className="mt-2 text-white">filidineeoseo@gmail.com</p>
                            <p className="text-white">mybestudios@gmail.com</p>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-bimec-green p-6 rounded-lg shadow-md">
                        <img
                                src={icon_clock}
                            ></img>
                            <h4 className="font-bold text-lg text-white">Working Hours</h4>
                            <p className="mt-2 text-white">Mon-Sat 09:00-20:00</p>
                            <p className="text-white">Sunday Emergency only</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[4rem]">
                <Footer></Footer>
            </div>
        </div>


    );
};

export default ContactSection;
