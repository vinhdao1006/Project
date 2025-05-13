import React from "react";

const Contact = () => {
  const contactDetails = [
    {
      id: 1,
      title: "EMERGENCY",
      icon: "fas fa-phone",
      details: ["(028) 3864-7256"],
      link: "tel:+02838647256",
    },
    {
      id: 2,
      title: "LOCATION",
      icon: "fas fa-location-dot", 
      details: ["268, Ly Thuong Kiet St, Ward 14, District 10, HCM city"],
      link: "https://maps.google.com",
    },
    {
      id: 3,
      title: "EMAIL",
      icon: "fas fa-envelope",
      details: ["@hcmut.edu.vn"],
      link: "mailto:@hcmut.edu.vn",
    },
    {
      id: 4,
      title: "WORKING HOURS",
      icon: "fas fa-clock",
      details: ["Mon-Sat 07:00-16:00", "Sunday Emergency only"],
      link: "#",
    },
  ];

  return (
    <div className="py-10">
      {/* Tiêu đề chính */}
      <h2 className="text-center text-xl font-semibold text-bimec-green uppercase mb-2">
        Get In Touch
      </h2>
      <h3 className="text-center text-4xl font-bold font-yeseva text-bimec-heavy-green mb-8">
        Contact
      </h3>
      {/* Grid hiển thị các mục liên hệ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-6 lg:px-20">
        {contactDetails.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center text-white bg-bimec-green rounded-lg p-6 shadow-md transition transform hover:bg-bimec-heavy-green hover:scale-105"
          >
            {}
            <i className={`${item.icon} text-2xl text-white mb-3 leading-none`}></i>
            {}
            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
            {}
            <div className="space-y-1">
              {item.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;