import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Contact from '../../components/utils/Contact';
import BimecFooter from '../../components/Footer/BimecFooter';
import img_SubHead_doctorPage from '../../assets/image/img_SubHead_aboutus.png';
import img_doctor1 from "../../assets/image/sliderDoctor1.png";
import img_doctor2 from "../../assets/image/sliderDoctor2.png";
import img_doctor3 from "../../assets/image/sliderDoctor3.png";
import FloatButtonGroup from '../../components/utils/FloatButtonGroup';
import DoctorSearch from '../../components/utils/DoctorSearch';
import axios from 'axios';

function DoctorPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [hoveredCard, setHoveredCard] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initial page load animation
        setIsVisible(true);

        // Intersection Observer for card animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleCards(prev => new Set(prev).add(entry.target.dataset.cardId));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = document.querySelectorAll('.doctor-card');
        cards.forEach((card) => observer.observe(card));

        return () => {
            cards.forEach((card) => observer.unobserve(card));
        };
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/doctors');

                setDoctors(response.data);     
                setLoading(false);
            } catch (err) {
                console.error('Error fetching doctors:', err);
                setError('Failed to load doctors. Please try again later.');
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // Function to get a random doctor image
    const getRandomDoctorImage = () => {
        const images = [img_doctor1, img_doctor2, img_doctor3];
        return images[Math.floor(Math.random() * images.length)];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bimec-green"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section with Parallax Effect */}
            <section className="relative h-64 md:h-80 overflow-hidden">
                <div 
                    className={`absolute inset-0 transform transition-all duration-1000 ${
                        isVisible ? 'scale-100' : 'scale-110'
                    }`}
                >
                    <img 
                        src={img_SubHead_doctorPage} 
                        className="w-full h-full object-cover" 
                        alt="Doctors Header" 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 
                        className={`text-4xl md:text-5xl font-light text-white transform transition-all duration-1000 delay-300 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                    >
                        Our Doctors
                    </h1>
                </div>
            </section>

            {/* Search Section with Slide-in Animation */}
            <section 
                className={`py-8 px-4 transform transition-all duration-1000 delay-500 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <div className="max-w-6xl mx-auto">
                    <DoctorSearch />
                </div>
            </section>

            {/* Doctors Grid */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header with Animation */}
                    <div 
                        className={`text-center mb-12 transform transition-all duration-1000 delay-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                    >
                        <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2 animate-fade-in">
                            Expert Medical Team
                        </p>
                        <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
                            Meet Our Specialists
                        </h2>
                        <div className="w-16 h-0.5 bg-bimec-green mx-auto mt-4 animate-expand"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor, index) => (
                            <div
                                key={doctor._id}
                                data-card-id={doctor._id}
                                className={`doctor-card group transform transition-all duration-700 ${
                                    visibleCards.has(doctor._id.toString()) 
                                        ? 'translate-y-0 opacity-100' 
                                        : 'translate-y-20 opacity-0'
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onMouseEnter={() => setHoveredCard(doctor._id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="relative overflow-hidden aspect-w-3 aspect-h-4">
                                        <img
                                            src={getRandomDoctorImage()}
                                            alt={`Dr. ${doctor.firstname} ${doctor.lastname}`}
                                            className={`w-full h-72 object-cover transform transition-transform duration-700 ${
                                                hoveredCard === doctor._id ? 'scale-110' : 'scale-100'
                                            }`}
                                        />
                                        {/* Overlay with animation */}
                                        <div 
                                            className={`absolute inset-0 bg-gradient-to-t from-bimec-heavy-green/70 to-transparent transition-opacity duration-500 ${
                                                hoveredCard === doctor._id ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-medium text-bimec-heavy-green mb-1 transition-all duration-300">
                                            Dr. {doctor.firstname} {doctor.lastname}
                                        </h3>
                                        <p className="text-sm text-bimec-green mb-1">
                                            {doctor.specialty}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-4">
                                            {doctor.experience} years experience
                                        </p>
                                        
                                        {/* Social Icons with Stagger Animation */}
                                        <div className="flex justify-center gap-3 mb-6">
                                            {['linkedin', 'instagram', 'facebook'].map((social, idx) => (
                                                <a
                                                    key={social}
                                                    href="#"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-bimec-light-green hover:text-bimec-green transform transition-all duration-300 hover:scale-110 ${
                                                        hoveredCard === doctor._id ? 'translate-y-0' : 'translate-y-2'
                                                    }`}
                                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                                >
                                                    {social === 'linkedin' && (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                        </svg>
                                                    )}
                                                    {social === 'instagram' && (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                        </svg>
                                                    )}
                                                    {social === 'facebook' && (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                        </svg>
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                        
                                        <button className="w-full py-2.5 px-4 bg-white text-bimec-heavy-green border-2 border-bimec-heavy-green rounded-md font-medium hover:bg-bimec-heavy-green hover:text-white transition-all duration-300 transform hover:scale-105">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More with Animation */}
                    <div className="text-center mt-12">
                        <button className="inline-flex items-center px-6 py-3 bg-bimec-green text-white rounded-lg hover:bg-bimec-heavy-green transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <span className="mr-2">Load More Doctors</span>
                            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <Contact />
                </div>
            </section>

            {/* Footer */}
            <BimecFooter />

            {/* Floating Button Group */}
            <FloatButtonGroup />

            {/* Custom Styles for Animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes expand {
                    from {
                        width: 0;
                    }
                    to {
                        width: 4rem;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-expand {
                    animation: expand 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default DoctorPage;