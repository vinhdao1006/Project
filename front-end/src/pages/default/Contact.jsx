import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/BimecFooter';
import img_SubHead_contact from '../../assets/image/subhead_contact.png';
import FloatButtonGroup from '../../components/utils/FloatButtonGroup';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaClock,
  FaPaperPlane,
  FaUser,
  FaInbox,
  FaCalendarAlt,
  FaAmbulance,
  FaBuilding,
  FaGlobeAmericas
} from 'react-icons/fa';
import { MdEmergency } from 'react-icons/md';
import { motion } from 'framer-motion';

const ContactSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="bg-gradient-to-b from-teal-50 to-white">

            {/* Navbar */}
            <div>
                <Navbar />
            </div>

            {/* Header Image with Overlay */}
            <div className="relative">
                <img 
                    src={img_SubHead_contact} 
                    className="w-full h-auto object-cover" 
                    alt="Contact Header" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bimec-heavy-green/60 to-transparent flex items-center">
                    <div className="container mx-auto px-6">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl font-bold text-white font-yeseva"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-white mt-2 text-lg md:text-xl max-w-lg"
                        >
                            We're here to help and answer any questions you might have.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full mt-16"
            >
                <div className="w-11/12 sm:w-3/4 mx-auto h-[300px] sm:h-[400px] lg:h-[500px] shadow-xl rounded-xl overflow-hidden">
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504638894077!2d106.65512307573604!3d10.772608259262775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec17709146b%3A0x54a1658a0639d341!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgLSAyNjggTMO9IFRoxrDhu51uZyBLaeG7h3Q!5e0!3m2!1svi!2s!4v1745205601313!5m2!1svi!2s"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-20 mt-16 mb-16"
            >
                {/* Form Section */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold text-bimec-green uppercase mb-2 flex items-center justify-center">
                        <FaPaperPlane className="mr-3" /> Get in Touch
                    </h3>
                    <h2 className="text-4xl font-bold text-bimec-heavy-green font-yeseva mt-2 text-center">
                        Send Us a Message
                    </h2>
                    <form className="mt-8 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <FaInbox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-bimec-heavy-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                        >
                            <FaPaperPlane className="mr-2" /> Send Message
                        </motion.button>
                    </form>
                </motion.div>

                {/* Info Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Emergency Contact */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-bimec-green p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-bimec-heavy-green group"
                    >
                        <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                            <FaAmbulance className="text-white text-2xl" />
                        </div>
                        <h4 className="font-bold text-xl text-white text-center">Emergency</h4>
                        <div className="mt-4 space-y-2 text-center">
                            <p className="text-white flex items-center justify-center">
                                <FaPhone className="mr-2" /> (237) 681-812-255
                            </p>
                            <p className="text-white flex items-center justify-center">
                                <FaPhone className="mr-2" /> (237) 656-331-894
                            </p>
                        </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-bimec-green p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-bimec-heavy-green group"
                    >
                        <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                            <FaMapMarkerAlt className="text-white text-2xl" />
                        </div>
                        <h4 className="font-bold text-xl text-white text-center">Location</h4>
                        <div className="mt-4 space-y-2 text-center">
                            <p className="text-white flex items-center justify-center">
                                <FaBuilding className="mr-2" /> 0123 Some place
                            </p>
                            <p className="text-white flex items-center justify-center">
                                <FaGlobeAmericas className="mr-2" /> 9876 Some country
                            </p>
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-bimec-green p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-bimec-heavy-green group"
                    >
                        <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                            <FaEnvelope className="text-white text-2xl" />
                        </div>
                        <h4 className="font-bold text-xl text-white text-center">Email</h4>
                        <div className="mt-4 space-y-2 text-center">
                            <p className="text-white flex items-center justify-center">
                                <FaEnvelope className="mr-2" /> filidineeoseo@gmail.com
                            </p>
                            <p className="text-white flex items-center justify-center">
                                <FaEnvelope className="mr-2" /> mybestudios@gmail.com
                            </p>
                        </div>
                    </motion.div>

                    {/* Working Hours */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-bimec-green p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-bimec-heavy-green group"
                    >
                        <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                            <FaClock className="text-white text-2xl" />
                        </div>
                        <h4 className="font-bold text-xl text-white text-center">Working Hours</h4>
                        <div className="mt-4 space-y-2 text-center">
                            <p className="text-white flex items-center justify-center">
                                <FaCalendarAlt className="mr-2" /> Mon-Sat 09:00-20:00
                            </p>
                            <p className="text-white flex items-center justify-center">
                                <MdEmergency className="mr-2" /> Sunday Emergency only
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

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