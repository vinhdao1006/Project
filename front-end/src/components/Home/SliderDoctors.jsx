import React from "react";
import Slider from "react-slick";
import img_doctor1 from "../../assets/image/sliderDoctor1.png";
import img_doctor2 from "../../assets/image/sliderDoctor2.png";
import img_doctor3 from "../../assets/image/sliderDoctor3.png";

const doctors = [
  {
    id: 1,
    name: "Dr. Marques",
    specialty: "Neurologist",
    image: img_doctor1,
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
  },
  {
    id: 2,
    name: "Dr. Shaun",
    specialty: "Dermatologist",
    image: img_doctor2,
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
  },
  {
    id: 3,
    name: "Dr. Michelle",
    specialty: "Psychiatrist",
    image: img_doctor3,
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
  },
];

const DoctorsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet and smaller
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-8">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-300 rounded-full transition-all duration-300 cursor-pointer hover:bg-bimec-green slick-active:bg-bimec-green slick-active:w-8"></div>
    ),
  };

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2">
            Trusted Care
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
            Our Doctors
          </h2>
          <div className="w-16 h-0.5 bg-bimec-green mx-auto mt-4"></div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {doctors.map((doctor) => (
            <div key={doctor.id} className="px-3">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                {/* Doctor Image */}
                <div className="relative overflow-hidden aspect-w-3 aspect-h-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-bimec-heavy-green mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {doctor.specialty}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 mb-6">
                    <a
                      href={doctor.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-bimec-light-green hover:text-bimec-green transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href={doctor.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-bimec-light-green hover:text-bimec-green transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href={doctor.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-bimec-light-green hover:text-bimec-green transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>

                  {/* View Profile Button */}
                  <button className="w-full py-2.5 px-4 bg-white text-bimec-heavy-green border-2 border-bimec-heavy-green rounded-md font-medium hover:bg-bimec-heavy-green hover:text-white transition-all duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a 
            href="/default/doctors" 
            className="inline-flex items-center text-sm font-medium text-bimec-green hover:text-bimec-heavy-green transition-colors duration-200"
          >
            View All Doctors
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSlider;