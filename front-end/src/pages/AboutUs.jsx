import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import FloatButtonGroup from '../components/utils/FloatButtonGroup';
import Footer from '../components/Footer/BimecFooter';
import TestimonalSection from '../components/utils/Testimonial';
import Contact from '../components/utils/Contact';
import img_blackGirls_aboutus from '../assets/image/img_blackGirls_aboutus.png';
import img_SubHead_aboutus from '../assets/image/img_SubHead_aboutus.png';

const AboutUs = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Floating Button Group */}
            <FloatButtonGroup />

            {/* Header Image */}
            <div>
                <img
                    src={img_SubHead_aboutus}
                    className="w-full h-auto"    
                    alt="About Us Header"
                />
            </div>

            {/* About Us Section */}
            <section className="w-full bg-white py-16 mt-8">
                <div className="container mx-auto flex flex-wrap items-center">
                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex justify-center">
                        <img
                            src={img_blackGirls_aboutus}
                            className="rounded-lg shadow-lg w-3/4 sm:w-2/3 md:w-full lg:w-4/5 xl:w-3/4"
                            alt="About Us"
                        />
                    </div>

                    {/* Right Side: Text Content */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-bimec-green uppercase mb-4">
                            Welcome to BIMEC
                        </h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-bimec-heavy-green font-yeseva mb-6">
                            Best Care for Your Good Health
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 font-sans font-medium mb-6">
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>A Passion for Healing</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>5-Star Care</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>All our best</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>Believe in Us</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>Always Caring</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>A Legacy of Excellence</span>
                            </li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base lg:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                            placerat scelerisque tortor ornare ornare. Quisque placerat
                            scelerisque tortor ornare ornare.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                            placerat scelerisque tortor ornare ornare.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <div className="mt-16 w-full mx-auto">
                <TestimonalSection />
            </div>

            {/* Contact Section */}
            <div className="mt-8 w-full mx-auto">
                <Contact />
            </div>

            {/* Footer */}
            <div className="mt-16 mx-auto w-full">
                <Footer />
            </div>
        </div>
    );
};

export default AboutUs;