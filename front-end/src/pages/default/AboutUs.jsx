import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import Footer from "../../components/Footer/BimecFooter";
import TestimonalSection from "../../components/utils/Testimonial";
import Contact from "../../components/utils/Contact";
import img_blackGirls_aboutus from "../../assets/image/img_blackGirls_aboutus.png";
import img_SubHead_aboutus from "../../assets/image/img_SubHead_aboutus.png";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleValues, setVisibleValues] = useState(new Set());

  const values = [
    "A Passion for Healing",
    "5-Star Care",
    "All our best",
    "Believe in Us",
    "Always Caring",
    "A Legacy of Excellence",
  ];

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);

    // Intersection Observer for value items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.valueIndex;
            setVisibleValues(prev => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    const valueElements = document.querySelectorAll('.value-item');
    valueElements.forEach((el) => observer.observe(el));

    return () => {
      valueElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Uncommented and animated */}
      {/* <section className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className={`absolute inset-0 transform transition-all duration-1000 ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
        >
          <img
            src={img_SubHead_aboutus}
            className="w-full h-full object-cover"
            alt="About Us Header"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 
            className={`text-4xl md:text-5xl font-light text-white transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            About Us
          </h1>
        </div>
      </section> */}

      {/* About Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image with Reveal Animation */}
            <div 
              className={`order-2 md:order-1 transform transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="relative overflow-hidden rounded-lg group">
                <img
                  src={img_blackGirls_aboutus}
                  className={`w-full h-auto transform transition-all duration-700 group-hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  alt="About Us"
                  onLoad={() => setImageLoaded(true)}
                />
                {/* Image Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-bimec-heavy-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Side: Text Content with Stagger Animation */}
            <div 
              className={`order-1 md:order-2 transform transition-all duration-1000 delay-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              }`}
            >
              <p 
                className={`text-sm uppercase tracking-wider text-bimec-green font-medium mb-4 transform transition-all duration-1000 delay-900 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                Welcome to BIMEC
              </p>
              <h2 
                className={`text-3xl md:text-4xl font-light text-bimec-heavy-green mb-8 leading-tight transform transition-all duration-1000 delay-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                Best Care for Your <br />
                Good Health
              </h2>

              {/* Values Grid with Stagger Animation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    data-value-index={index}
                    className={`value-item flex items-center space-x-3 transform transition-all duration-500 ${
                      visibleValues.has(index.toString()) 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${1100 + index * 100}ms` }}
                  >
                    <div 
                      className={`w-1.5 h-1.5 bg-bimec-green rounded-full flex-shrink-0 transform transition-all duration-500 ${
                        visibleValues.has(index.toString()) ? 'scale-100' : 'scale-0'
                      }`}
                      style={{ transitionDelay: `${1200 + index * 100}ms` }}
                    ></div>
                    <span className="text-gray-700 hover:text-bimec-green transition-colors duration-300">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p 
                  className={`transform transition-all duration-1000 delay-[1600ms] ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  Bimec is a modern online appointment booking system, enabling
                  patients to easily schedule visits at outpatient departments
                  of reputable hospitals and clinics.
                </p>
                <p 
                  className={`transform transition-all duration-1000 delay-[1700ms] ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  With a user-friendly interface, Bimec saves time, reduces
                  waiting, and efficiently manages appointments. It integrates
                  advanced technology, ensuring secure information and a
                  convenient, high-quality healthcare experience.
                </p>
              </div>

              <a
                href="/default/contact"
                className={`inline-flex items-center mt-8 text-bimec-green font-medium hover:text-bimec-heavy-green transition-all duration-300 group transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: '1800ms' }}
              >
                Get in Touch
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Button Group */}
      {/* <FloatButtonGroup /> */}
    </div>
  );
};

export default AboutUs;