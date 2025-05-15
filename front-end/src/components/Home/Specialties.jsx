import React, { useState } from "react";

const specialties = [
  { 
    name: "Neurology", 
    id: 1,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3v1.5m4.5-1.5v1.5M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    )
  },
  { 
    name: "Bones", 
    id: 2,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 9.75a3 3 0 106 0 3 3 0 00-6 0zm0 4.5a3 3 0 106 0 3 3 0 00-6 0zm9-9a3 3 0 106 0 3 3 0 00-6 0zm0 13.5a3 3 0 106 0 3 3 0 00-6 0zm-4.5-6.75h9" />
      </svg>
    )
  },
  { 
    name: "Oncology", 
    id: 3,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    name: "Otorhinolaryngology", 
    id: 4,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    )
  },
  { 
    name: "Ophthalmology", 
    id: 5,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  { 
    name: "Cardiovascular", 
    id: 6,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.5c0-1.657-3.134-3-7-3s-7 1.343-7 3m14 0v3M7 8.5v3m14-3c0 1.657-3.134 3-7 3s-7-1.343-7-3m7-3v3m0 0v6m-7-6c0 1.657 3.134 3 7 3s7-1.343 7-3M3.75 21h16.5M3.75 3h16.5" />
      </svg>
    )
  },
  { 
    name: "Pulmonology", 
    id: 7,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    )
  },
  { 
    name: "Renal Medicine", 
    id: 8,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c0-1.657-3.134-3-7-3s-7 1.343-7 3m14 0a9 9 0 01-9 9m9-9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-3.134 3-7s-1.343-7-3-7m0 14a9 9 0 01-9-9m9 9V3m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  { 
    name: "Gastroenterology", 
    id: 9,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  { 
    name: "Urology", 
    id: 10,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    )
  },
  { 
    name: "Dermatology", 
    id: 11,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
    )
  },
  { 
    name: "Gynaecology", 
    id: 12,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
];

const SpecialtiesGrid = () => {
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2">
            Always Caring
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
            Our Specialties
          </h2>
          <div className="w-16 h-0.5 bg-bimec-green mx-auto mt-4"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className={`group relative flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer 
                         transition-all duration-300 border ${
                activeSpecialty === specialty.id
                  ? "bg-bimec-heavy-green text-white border-bimec-heavy-green"
                  : "bg-white text-bimec-heavy-green border-gray-200 hover:border-bimec-green hover:shadow-md"
              }`}
              onClick={() => setActiveSpecialty(specialty.id)}
            >
              <div className={`mb-3 transition-colors duration-300 ${
                activeSpecialty === specialty.id
                  ? "text-white"
                  : "text-bimec-green group-hover:text-bimec-heavy-green"
              }`}>
                {specialty.icon}
              </div>
              <span className="font-medium text-center text-sm lg:text-base">
                {specialty.name}
              </span>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href="/default/services" 
            className="inline-flex items-center text-sm font-medium text-bimec-green hover:text-bimec-heavy-green transition-colors duration-200"
          >
            View All Services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesGrid;