import React from 'react';
import BimecLogo from '../components/utils/BimecLogo';
import Navbar from '../components/Navbar/Navbar';
import icon_phone from '../assets/icon/icon_phone.png';
import icon_location from '../assets/icon/icon_location.png';
import icon_mail from '../assets/icon/icon_mail.png';
import icon_clock from '../assets/icon/icon_clock.png';
import Footer from '../components/Footer/BimecFooter';
import img_SubHead_contact from '../assets/image/subhead_contact.png';
import FloatButtonGroup from '../components/utils/FloatButtonGroup';

const ContactSection = () => {
    return (
        <div>

            {/* Navbar */}
            <div>
                <Navbar />
            </div>

            {/* Header Image */}
            <div>
                <img src={img_SubHead_contact} className="w-full h-auto" alt="Contact Header" />
            </div>

            {/* Map Section */}
            <div className="w-full mt-16">
                <div className="w-11/12 sm:w-3/4 mx-auto h-[300px] sm:h-[400px]">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504638894077!2d106.65512307573604!3d10.772608259262775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec17709146b%3A0x54a1658a0639d341!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgLSAyNjggTMO9IFRoxrDhu51uZyBLaeG7h3Q!5e0!3m2!1svi!2s!4v1745205601313!5m2!1svi!2s"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>

            {/* Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-20 mt-16">
                {/* Form Section */}
                <div>
                    <h3 className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold text-bimec-green uppercase mb-2">
                        Get in Touch
                    </h3>
                    <h2 className="text-4xl font-bold text-bimec-heavy-green font-yeseva mt-2 text-center">
                        Contact
                    </h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Emergency Contact */}
                    <div className="bg-bimec-green p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-bimec-heavy-green">
                        <img src={icon_phone} alt="Phone Icon" className="w-12 h-12 mx-auto" />
                        <h4 className="font-bold text-lg text-white text-center">Emergency</h4>
                        <p className="mt-2 text-white text-center">(237) 681-812-255</p>
                        <p className="text-white text-center">(237) 656-331-894</p>
                    </div>

                    {/* Location */}
                    <div className="bg-bimec-green p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-bimec-heavy-green">
                        <img src={icon_location} alt="Location Icon" className="w-12 h-12 mx-auto" />
                        <h4 className="font-bold text-lg text-white text-center">Location</h4>
                        <p className="mt-2 text-white text-center">0123 Some place</p>
                        <p className="text-white text-center">9876 Some country</p>
                    </div>

                    {/* Email */}
                    <div className="bg-bimec-green p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-bimec-heavy-green">
                        <img src={icon_mail} alt="Mail Icon" className="w-12 h-12 mx-auto" />
                        <h4 className="font-bold text-lg text-white text-center">Email</h4>
                        <p className="mt-2 text-white text-center">filidineeoseo@gmail.com</p>
                        <p className="text-white text-center">mybestudios@gmail.com</p>
                    </div>

                    {/* Working Hours */}
                    <div className="bg-bimec-green p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-bimec-heavy-green">
                        <img src={icon_clock} alt="Clock Icon" className="w-12 h-12 mx-auto" />
                        <h4 className="font-bold text-lg text-white text-center">Working Hours</h4>
                        <p className="mt-2 text-white text-center">Mon-Sat 09:00-20:00</p>
                        <p className="text-white text-center">Sunday Emergency only</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16">
                <Footer />
            </div>

            {/* Floating Button Group */}
            <FloatButtonGroup />
        </div>
    );
};

export default ContactSection;