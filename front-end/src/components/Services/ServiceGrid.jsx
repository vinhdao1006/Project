import React from 'react';
import icon_bandage from '../../assets/icon/icon_bandage.png'; // Replace with your image paths
import img_patientDoctor_services from '../../assets/image/img_patientDoctor_services.png'; // Replace with your image paths

const services = [
  {
    id: 1,
    title: 'Free Checkup',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.',
    icon: icon_bandage,
    image: img_patientDoctor_services,
    link: '#',
  },
  {
    id: 2,
    title: 'Free Checkup',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.',
    icon: icon_bandage,
    image: img_patientDoctor_services,
    link: '#',
  },
  {
    id: 3,
    title: 'Free Checkup',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.',
    icon: icon_bandage,
    image: img_patientDoctor_services,
    link: '#',
  },
  {
    id: 4,
    title: 'Free Checkup',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.',
    icon: icon_bandage,
    image: img_patientDoctor_services,
    link: '#',
  },
  {
    id: 5,
    title: 'Free Checkup',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.',
    icon: icon_bandage,
    image: img_patientDoctor_services,
    link: '#',
  },
  {
    id: 6,
    title: 'Free Checkup',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.',
    icon: icon_bandage,
    image: img_patientDoctor_services,
    link: '#',
  },
];

const ServicesGrid = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden group"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-bimec-green bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <img
                  src={service.icon}
                  alt={`${service.title} icon`}
                  className="w-12 h-12"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <a
                  href={service.link}
                  className="text-bimec-green mt-4 inline-flex items-center space-x-1 hover:underline"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
