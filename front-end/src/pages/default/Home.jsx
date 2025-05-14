import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ServicesHeader from "../../components/Services/ServicesHeader";
import Specialties from "../../components/Home/Specialties";
import SliderDoctors from "../../components/Home/SliderDoctors";
import NewsSlider from "../../components/Home/NewsSlider";
import Contact from "../../components/utils/Contact";
import Footer from "../../components/Footer/BimecFooter";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import Home_physician from "../../assets/image/Home_physician.png";
import BlackDoctors1 from "../../assets/image/Blackdoctors 1.png";
import { ReactTyped } from "react-typed";

function Home() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen">
        <img src={Home_physician} className="w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-xl">
              <p className="text-bimec-green font-medium text-sm tracking-wider uppercase mb-3">
                Caring for Life
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-bimec-heavy-green leading-tight">
                Leading The Way <br /> 
                in Medical Excellence
              </h1>
              
              {/* Action Buttons */}
              <div className="mt-10 space-y-4">
                <button
                  onClick={() => navigate("/default/booking")}
                  className="group flex items-center justify-between w-full md:w-auto px-6 py-4 bg-bimec-heavy-green text-white rounded-lg hover:bg-bimec-green transition-colors duration-300"
                >
                  <span className="text-sm md:text-base font-medium mr-8">Book an Appointment</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/default/services")}
                    className="group flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-bimec-green border border-bimec-green rounded-lg hover:bg-bimec-light-green transition-colors duration-300"
                  >
                    <span className="text-sm font-medium mr-3">Our Services</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  </button>
                  
                  <button
                    onClick={() => navigate("/default/doctors")}
                    className="group flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-bimec-green border border-bimec-green rounded-lg hover:bg-bimec-light-green transition-colors duration-300"
                  >
                    <span className="text-sm font-medium mr-3">Find Doctors</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-bimec-green font-medium text-sm tracking-wider uppercase mb-4">
            Welcome to BIMEC
          </p>
          
          <div className="h-20 mb-8">
            <ReactTyped
              className="text-3xl md:text-4xl lg:text-5xl font-light text-bimec-heavy-green"
              strings={[
                "A Great Place to Receive Care",
                "Your Health, Our Commitment",
                "Caring for You, Like Family",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </div>
          
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            At BIMEC, we are dedicated to providing compassionate, high-quality
            care to every patient. With a team of experienced doctors, nurses, and
            healthcare professionals, we focus on your health and well-being every
            step of the way. Whether you're seeking preventive care, specialized
            treatment, or emergency services, we prioritize your comfort and
            trust. Our commitment is to treat you like family, ensuring that your
            health is in the best hands possible.
          </p>
          
          <a
            href="/default/about-us"
            className="inline-flex items-center text-bimec-green font-medium hover:text-bimec-heavy-green transition-colors duration-200"
          >
            Learn More
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
      </section>

      {/* Doctors Image Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <img
            src={BlackDoctors1}
            alt="Our Medical Team"
            className="w-full rounded-lg shadow-sm"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ServicesHeader />
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Specialties />
        </div>
      </section>

      {/* Doctors Slider Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SliderDoctors />
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <NewsSlider />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
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
}

export default Home;