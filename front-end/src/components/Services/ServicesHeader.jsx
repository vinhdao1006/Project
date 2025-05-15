import React, { useState } from "react";
import img_PatientDoctor from "../../assets/image/Patient-Doctor.png";
import img_BlackDoctors2 from "../../assets/image/BlackDoctors2.png";

function ServicesSection() {
  const [activeService, setActiveService] = useState('cardiogram');

  const services = [
    {
      id: 'checkup',
      name: 'Free Checkup',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'cardiogram',
      name: 'Cardiogram',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'dna',
      name: 'DNA Testing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'blood',
      name: 'Blood Bank',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    }
  ];

  const benefits = [
    'A Passion for Healing',
    'All our best',
    'A Legacy of Excellence',
    '5-Star Care',
    'Believe in Us',
    'Always Caring'
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2">
            Care You Can Believe In
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-bimec-green mx-auto mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full px-4 py-4 flex items-center gap-3 border-b border-gray-100 transition-all duration-200
                    ${activeService === service.id 
                      ? 'bg-bimec-green text-white' 
                      : 'hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  <span className={activeService === service.id ? 'text-white' : 'text-bimec-green'}>
                    {service.icon}
                  </span>
                  <span className="font-medium">{service.name}</span>
                </button>
              ))}
              <a 
                href="/default/services"
                className="block w-full px-4 py-4 text-center font-medium text-bimec-green hover:bg-gray-50 transition-colors duration-200"
              >
                View All Services →
              </a>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-light text-bimec-heavy-green">
              A passion for putting patients first.
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-bimec-green rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                BIMEC stands out as a premier hospital offering top-tier outpatient
                services, backed by a team of highly experienced and specialized
                doctors. We are equipped with state-of-the-art medical technology,
                ensuring accurate diagnoses and effective treatments.
              </p>
              <p>
                Our outpatient process is streamlined for efficiency, saving you
                time while prioritizing your comfort and privacy. Above all, our
                dedicated and professional staff are committed to placing your
                health and satisfaction at the forefront. Visit BIMEC for reliable
                and comprehensive medical care you can trust.
              </p>
            </div>

            <a 
              href="/default/services"
              className="inline-flex items-center text-bimec-green font-medium hover:text-bimec-heavy-green transition-colors duration-200"
            >
              Explore All Services
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Images */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={img_PatientDoctor}
                alt="Doctor with patient"
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={img_BlackDoctors2}
                alt="Team of doctors"
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;