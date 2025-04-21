import React from "react";
import icon_phone from '../../assets/icon/icon_phone.png'
import icon_location from '../../assets/icon/icon_location.png'
import icon_mail from '../../assets/icon/icon_mail.png'
import icon_clock from '../../assets/icon/icon_clock.png'

const Contact = () => {
  const contactDetails = [
    {
      id: 1,
      title: "EMERGENCY",
      icon: icon_phone,
      details: ["(237) 681-812-255", "(237) 666-331-894"],
      link: "tel:+237681812255",
    },
    {
      id: 2,
      title: "LOCATION",
      icon: icon_location,
      details: ["0123 Some place", "9876 Some country"],
      link: "https://maps.google.com", // Replace with actual map link
    },
    {
      id: 3,
      title: "EMAIL",
      icon: icon_mail,
      details: ["fildineeesoe@gmail.com", "myebstudios@gmail.com"],
      link: "mailto:fildineeesoe@gmail.com",
    },
    {
      id: 4,
      title: "WORKING HOURS",
      icon: icon_clock,
      details: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"],
      link: "#", // No link, but still clickable
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-center text-xl font-semibold text-bimec-green uppercase mb-2">
        Get In Touch
      </h2>
      <h3 className="text-center text-4xl font-bold font-yeseva text-bimec-heavy-green mb-8">
        Contact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-20">
        {contactDetails.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center text-white bg-bimec-green rounded-lg p-6 shadow-md transition transform hover:bg-bimec-heavy-green hover:scale-105"
          >
            <div className="mb-4 w-12 h-12 flex items-center justify-center bg-bimec-heavy-green text-white rounded-full">
              <img src={item.icon} className={`${item.icon} text-lg`}></img>
            </div>
            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
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
