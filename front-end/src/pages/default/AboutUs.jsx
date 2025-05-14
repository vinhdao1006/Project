import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import Footer from "../../components/Footer/BimecFooter";
import TestimonalSection from "../../components/utils/Testimonial";
import Contact from "../../components/utils/Contact";
import img_blackGirls_aboutus from "../../assets/image/img_blackGirls_aboutus.png";
import img_SubHead_aboutus from "../../assets/image/img_SubHead_aboutus.png";

const AboutUs = () => {
  const values = [
    "A Passion for Healing",
    "5-Star Care",
    "All our best",
    "Believe in Us",
    "Always Caring",
    "A Legacy of Excellence",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-64 md:h-80">
        <img
          src={img_SubHead_aboutus}
          className="w-full h-full object-cover"
          alt="About Us Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-light text-white">
            About Us
          </h1>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image */}
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={img_blackGirls_aboutus}
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                  alt="About Us"
                />
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="order-1 md:order-2">
              <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-4">
                Welcome to BIMEC
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green mb-8 leading-tight">
                Best Care for Your <br />
                Good Health
              </h2>

              {/* Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-bimec-green rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Bimec is a modern online appointment booking system, enabling
                  patients to easily schedule visits at outpatient departments
                  of reputable hospitals and clinics.
                </p>
                <p>
                  With a user-friendly interface, Bimec saves time, reduces
                  waiting, and efficiently manages appointments. It integrates
                  advanced technology, ensuring secure information and a
                  convenient, high-quality healthcare experience.
                </p>
              </div>

              <a
                href="/default/contact"
                className="inline-flex items-center mt-8 text-bimec-green font-medium hover:text-bimec-heavy-green transition-colors duration-200"
              >
                Get in Touch
                <svg
                  className="w-4 h-4 ml-2"
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

      {/* Testimonial Section */}
      {/* <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <TestimonalSection />
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Button Group */}
      <FloatButtonGroup />
    </div>
  );
};

export default AboutUs;
