import React from "react";

const Contact = () => {
  const contactDetails = [
    {
      id: 1,
      title: "Emergency",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      details: ["(028) 3864-7256"],
      link: "tel:+02838647256",
      accent: true,
    },
    {
      id: 2,
      title: "Location",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      details: ["268 Ly Thuong Kiet St, Ward 14", "District 10, HCM city"],
      link: "https://maps.app.goo.gl/pmn1eZWtu3crwLB2A",
    },
    {
      id: 3,
      title: "Email",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      details: ["contact@hcmut.edu.vn"],
      link: "mailto:contact@hcmut.edu.vn",
    },
    {
      id: 4,
      title: "Working Hours",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: ["Mon-Sat: 07:00 - 16:00", "Sunday: Emergency only"],
      link: "#",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Minimalist Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-bimec-heavy-green">
            Contact Information
          </h2>
          <div className="w-16 h-0.5 bg-bimec-green mx-auto mt-4"></div>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-6 rounded-lg border-bimec-gray transition-all duration-300 hover:shadow-sm
                         ${item.accent 
                           ? 'border border-bimec-red hover:border-bimec-red' 
                           : 'border border-transparent hover:border-bimec-heavy-green'}`}
            >
              {/* Icon */}
              <div className={`mb-4 transition-colors duration-300
                             ${item.accent 
                               ? 'text-bimec-red' 
                               : 'text-bimec-green group-hover:text-bimec-heavy-green'}`}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className={`text-lg font-medium mb-2 transition-colors duration-300
                            ${item.accent 
                              ? 'text-bimec-red' 
                              : 'text-bimec-heavy-green'}`}>
                {item.title}
              </h3>

              {/* Details */}
              <div className="space-y-0.5">
                {item.details.map((detail, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Simple Emergency Banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            For immediate medical assistance, please call our emergency line
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;