import React from "react";
import Slider from "react-slick";
import img_doctor1 from "../../assets/image/sliderDoctor1.png";
import img_doctor2 from "../../assets/image/sliderDoctor2.png";
import img_doctor3 from "../../assets/image/sliderDoctor3.png";

const doctors = [
  {
    id: 1,
    name: "Dr. Marques",
    specialty: "NEUROLOGIST",
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
    specialty: "DERMATOLOGIST",
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
    specialty: "PSYCHIATRIST",
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
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-green-700 rounded-full opacity-70 hover:opacity-100 transition"></div>
    ),
  };

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16">
      {/* Header */}
      <h2 className="text-center text-xl font-semibold text-bimec-green uppercase mb-2">
        Trusted Care
      </h2>
      <h3 className="text-center text-4xl font-bold text-bimec-heavy-green font-yeseva mb-8">
        Our Doctors
      </h3>

      {/* Slider */}
      <Slider {...settings}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-fit object-cover"
              />
              {/* Doctor Info */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {doctor.name}
                </h4>
                <p className="text-bimec-green font-medium mb-4">
                  {doctor.specialty}
                </p>
                {/* Social Links */}
                <div className="flex justify-center space-x-4 mb-4">
                  <a
                    href={doctor.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin text-green-700 text-lg"></i>
                  </a>
                  <a
                    href={doctor.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram text-green-700 text-lg"></i>
                  </a>
                  <a
                    href={doctor.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook text-green-700 text-lg"></i>
                  </a>
                </div>
                {/* View Profile Button */}
                <button className="bg-bimec-heavy-green text-white py-2 px-4 rounded-lg w-full">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DoctorsSlider;