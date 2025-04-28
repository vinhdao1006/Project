import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import FloatButtonGroup from '../components/utils/FloatButtonGroup';
import Footer from '../components/Footer/BimecFooter';
import TestimonalSection from '../components/utils/Testimonial';
import ServiceGrid from '../components/Services/ServiceGrid';
import Contact from '../components/utils/Contact';
import img_SubHead_services from '../assets/image/img_SubHead_services.png';

const Services = () => {
    return (
        <div className="overflow-x-hidden overflow-y-auto">
            <div>
                {/* Navbar */}
                <Navbar />

                {/* Floating Button Group */}
                <FloatButtonGroup />

                {/* Header Image */}
                <div className="w-full mx-auto">
                    <img
                        src={img_SubHead_services}
                        className="w-full h-auto"
                        alt="Services Header"
                    />
                </div>

                {/* Services Grid Section */}
                <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4 sm:px-8 lg:px-16 xl:px-32">
                    <ServiceGrid />
                </div>

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
        </div>
    );
};

export default Services;