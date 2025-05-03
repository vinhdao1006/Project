import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ServicesHeader from '../../components/Services/ServicesHeader';
import Specialties from '../../components/Home/Specialties';
import SliderDoctors from '../../components/Home/SliderDoctors';
import NewsSlider from '../../components/Home/NewsSlider';
import Contact from '../../components/utils/Contact';
import Footer from '../../components/Footer/BimecFooter';
import FloatButtonGroup from '../../components/utils/FloatButtonGroup';
import Home_physician from '../../assets/image/Home_physician.png';
import BlackDoctors1 from '../../assets/image/Blackdoctors 1.png';
import { ReactTyped } from 'react-typed';

function Home() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    return (
        <div className="overflow-x-hidden overflow-y-auto">

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="w-full relative">
                <img src={Home_physician} className="w-full h-auto" alt="Hero" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center px-6 sm:px-12 lg:px-32">
                    <h4 className="font-bold text-lg sm:text-xl lg:text-2xl font-yeseva text-bimec-green">
                        CARING FOR LIFE
                    </h4>
                    <h1 className="font-semibold text-3xl sm:text-5xl lg:text-6xl font-yeseva text-bimec-heavy-green mt-4">
                        Leading The Way <br /> in Medical Excellence
                    </h1>
                </div>

                {/* Buttons Section */}
                <div className="absolute bottom-1 xl:bottom-10 md:bottom-3 left-0 xl:w-full w-full md:w-full px-6 md:px-12 xl:px-32">
                    <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-1 gap-2 md:gap-4 justify-center xl:gap-8">
                        {/* Our Services Button */}
                        <div className="bg-white h-8 md:h-12 lg:h-20 rounded-lg flex justify-between items-center w-30 md:w-50 lg:w-72 xl:ml-10 border border-bimec-green">
                            <button
                                onClick={() => navigate('/default/services')}
                                className="w-full h-full flex items-center justify-between px-2 lg:px-8 md:px-4"
                            >
                                <p className="text-xs md:text-lg lg:text-xl text-bimec-green font-sans">Our Services</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 sm:w-8 sm:h-8 text-bimec-green"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Book Appointment Button */}
                        <div className="bg-bimec-heavy-green h-8 xl:h-20 md:h-12 lg:h-20 rounded-lg flex justify-between items-center cursor-pointer w-30 md:w-50 xl:w-72 xl:ml-10">
                            <button
                                onClick={() => navigate('/default/booking')}
                                className="w-full h-full flex items-center justify-between px-2 xl:px-8 md:px-4"
                            >
                                <p className="text-xs md:text-base lg:text-xl text-white font-sans">
                                    Book An Appointment
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 sm:w-8 sm:h-8 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Find Doctors Button */}
                        <div className="bg-bimec-green h-8 lg:h-20 md:h-12 rounded-lg flex justify-between items-center w-30 md:w-48 lg:w-72 xl:ml-10">
                            <button
                                onClick={() => navigate('/default/doctors')}
                                className="w-full h-full flex items-center justify-between px-2 lg:px-8 md:px-4"
                            >
                                <p className="text-xs md:text-lg lg:text-xl text-white font-sans">Find Doctors</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 sm:w-8 sm:h-8 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome Section */}
            <div className="mt-16 sm:mt-32 flex flex-col items-center w-full px-6 sm:px-12 lg:px-32">
                <h4 className="text-bimec-green font-bold font-sans text-lg sm:text-xl">
                    WELCOME TO BIMEC
                </h4>
                <ReactTyped
                    className="text-bimec-heavy-green font-bold font-yeseva text-2xl sm:text-4xl lg:text-5xl mt-4"
                    strings={[
                        'A Great Place to Receive Care',
                        'Your Health, Our Commitment',
                        'Caring for You, Like Family',
                    ]}
                    typeSpeed={200}
                    backSpeed={220}
                    loop
                />
                <p className="w-full sm:w-3/4 lg:w-1/2 text-center mt-6 text-sm sm:text-base lg:text-lg">
                    "At BIMEC, we are dedicated to providing compassionate, high-quality care to every patient.
                    With a team of experienced doctors, nurses, and healthcare professionals, we focus on your health and well-being every step of the way.
                    Whether you're seeking preventive care, specialized treatment, or emergency services, we prioritize your comfort and trust.
                    Our commitment is to treat you like family, ensuring that your health is in the best hands possible."
                </p>
                <a
                    className="mt-6 text-bimec-green hover:underline flex items-center text-sm sm:text-base"
                    href="/about-us"
                >
                    Learn More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                    </svg>
                </a>
            </div>

            {/* Doctors Section */}
            <div className="mt-16 sm:mt-32 flex flex-col items-center w-full">
                <img src={BlackDoctors1} alt="Doctors" className="w-full sm:w-3/4 lg:w-1/2" />
            </div>

            {/* Services Section */}
            <div className="mt-16 sm:mt-32 w-full px-6 sm:px-12 lg:px-32">
                <ServicesHeader />
            </div>

            {/* Specialties Section */}
            <div className="mt-8 sm:mt-16 w-full px-6 sm:px-12 lg:px-32">
                <Specialties />
            </div>

            {/* Slider Doctors Section */}
            <div className="mt-8 sm:mt-16 w-full px-6 sm:px-12 lg:px-32">
                <div className="max-w-5xl mx-auto">
                    <SliderDoctors />
                </div>
            </div>

            {/* News Section */}
            <div className="mt-8 sm:mt-16 w-full px-6 sm:px-12 lg:px-32">
                <div className="max-w-5xl mx-auto">
                    <NewsSlider />
                </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8 sm:mt-16 w-full px-6 sm:px-12 lg:px-32">
                <Contact />
            </div>

            {/* Footer */}
            <div className="mt-8 sm:mt-16 w-full">
                <Footer />
            </div>

            {/* Floating Button Group */}
            <FloatButtonGroup />
        </div>
    );
}

export default Home;