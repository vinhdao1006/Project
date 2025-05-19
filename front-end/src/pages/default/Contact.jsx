import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/BimecFooter";
import img_SubHead_contact from "../../assets/image/subhead_contact.png";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  InboxIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);

    // Intersection Observer for info cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.dataset.cardId;
          setVisibleCards((prev) => new Set(prev).add(cardId));
        }
      });
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log("Form submitted:", formState);
    };

    const contactInfo = [
      {
        id: 1,
        title: "Emergency",
        icon: ShieldExclamationIcon,
        bgColor: "bg-bimec-red",
        hoverColor: "hover:bg-red-700",
        details: [{ icon: PhoneIcon, text: "(028) 3864-7256" }],
      },
      {
        id: 2,
        title: "Location",
        icon: MapPinIcon,
        bgColor: "bg-bimec-green",
        hoverColor: "hover:bg-bimec-heavy-green",
        details: [
          {
            icon: BuildingOfficeIcon,
            text: "268 Lý Thường Kiệt St., Ward 14, District 10, HCM",
          },
        ],
      },
      {
        id: 3,
        title: "Email",
        icon: EnvelopeIcon,
        bgColor: "bg-bimec-green",
        hoverColor: "hover:bg-bimec-heavy-green",
        details: [{ icon: EnvelopeIcon, text: "email@hcmut.edu.vn" }],
      },
      {
        id: 4,
        title: "Working Hours",
        icon: ClockIcon,
        bgColor: "bg-bimec-green",
        hoverColor: "hover:bg-bimec-heavy-green",
        details: [
          { icon: CalendarIcon, text: "Mon-Sat 07:00-16:00" },
          { icon: ShieldExclamationIcon, text: "Sunday Emergency only" },
        ],
      },
    ];

    return (
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with Parallax Effect */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <div
            className={`absolute inset-0 transform transition-all duration-1000 ${
              isVisible ? "scale-100" : "scale-110"
            }`}
          >
            <img
              src={img_SubHead_contact}
              className="w-full h-full object-cover"
              alt="Contact Header"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1
                className={`text-4xl md:text-5xl font-light text-white transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Contact Us
              </h1>
              <p
                className={`text-white/90 mt-4 text-lg max-w-lg transform transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                We're here to help and answer any questions you might have
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section
          className={`py-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504638894077!2d106.65512307573604!3d10.772608259262775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec17709146b%3A0x54a1658a0639d341!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgLSAyNjggTMO9IFRoxrDhu51uZyBLaeG7h3Q!5e0!3m2!1svi!2s!4v1745205601313!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form Section */}
              <div
                className={`transform transition-all duration-300 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-20 opacity-0"
                }`}
              >
                <div className="text-center lg:text-left mb-8">
                  <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2">
                    Get in Touch
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
                    Send Us a Message
                  </h2>
                  <div className="w-16 h-0.5 bg-bimec-green mx-auto lg:mx-0 mt-4 animate-expand"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-bimec-green transition-colors" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green"
                      />
                    </div>
                    <div className="relative group">
                      <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-bimec-green transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green"
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <InboxIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-bimec-green transition-colors" />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green"
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formState.message}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-bimec-green text-white font-medium py-4 rounded-xl hover:bg-bimec-heavy-green transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
                  >
                    <PaperAirplaneIcon className="h-5 w-5 mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Info Section - Modified Animation Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.id}
                    data-card-id={info.id}
                    className={`info-card ${
                      info.bgColor
                    } p-8 rounded-2xl shadow-lg ${
                      visibleCards.has(info.id.toString())
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                    } info-card-entrance`}
                    style={{ transitionDelay: `${1000 + index * 100}ms` }}
                  >
                    <div className="info-card-content">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 info-card-icon">
                        <info.icon className="text-white h-8 w-8" />
                      </div>
                      <h4 className="font-semibold text-xl text-white text-center mb-4">
                        {info.title}
                      </h4>
                      <div className="space-y-3">
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-white/90 flex items-center justify-center text-sm"
                          >
                            <detail.icon className="h-4 w-4 mr-2" />
                            {detail.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Floating Button Group */}
        {/* <FloatButtonGroup /> */}

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes expand {
            from {
              width: 0;
            }
            to {
              width: 4rem;
            }
          }

          .animate-expand {
            animation: expand 0.8s ease-out forwards;
          }

          /* Separate entrance animation from hover effects */
          .info-card-entrance {
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }

          .info-card {
            transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
          }

          .info-card:hover {
            transform: scale(1.05);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }

          .info-card-icon {
            transition: transform 0.15s ease-out;
          }

          .info-card:hover .info-card-icon {
            transform: scale(1.1) rotate(12deg);
          }
        `}</style>
      </div>
    );

    const cards = document.querySelectorAll(".info-card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formState);
  };

  const contactInfo = [
    {
      id: 1,
      title: "Emergency",
      icon: ShieldExclamationIcon,
      bgColor: "bg-bimec-red",
      hoverColor: "hover:bg-red-700",
      details: [{ icon: PhoneIcon, text: "(028) 3864-7256" }],
    },
    {
      id: 2,
      title: "Location",
      icon: MapPinIcon,
      bgColor: "bg-bimec-green",
      hoverColor: "hover:bg-bimec-heavy-green",
      details: [
        {
          icon: BuildingOfficeIcon,
          text: "268 Lý Thường Kiệt St., Ward 14, District 10, HCM",
        },
      ],
    },
    {
      id: 3,
      title: "Email",
      icon: EnvelopeIcon,
      bgColor: "bg-bimec-green",
      hoverColor: "hover:bg-bimec-heavy-green",
      details: [{ icon: EnvelopeIcon, text: "email@hcmut.edu.vn" }],
    },
    {
      id: 4,
      title: "Working Hours",
      icon: ClockIcon,
      bgColor: "bg-bimec-green",
      hoverColor: "hover:bg-bimec-heavy-green",
      details: [
        { icon: CalendarIcon, text: "Mon-Sat 07:00-16:00" },
        { icon: ShieldExclamationIcon, text: "Sunday Emergency only" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Parallax Effect */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className={`absolute inset-0 transform transition-all duration-1000 ${
            isVisible ? "scale-100" : "scale-110"
          }`}
        >
          <img
            src={img_SubHead_contact}
            className="w-full h-full object-cover"
            alt="Contact Header"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1
              className={`text-4xl md:text-5xl font-light text-white transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Contact Us
            </h1>
            <p
              className={`text-white/90 mt-4 text-lg max-w-lg transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              We're here to help and answer any questions you might have
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        className={`py-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504638894077!2d106.65512307573604!3d10.772608259262775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec17709146b%3A0x54a1658a0639d341!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgLSAyNjggTMO9IFRoxrDhu51uZyBLaeG7h3Q!5e0!3m2!1svi!2s!4v1745205601313!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div
              className={`transform transition-all duration-300 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <div className="text-center lg:text-left mb-8">
                <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2">
                  Get in Touch
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
                  Send Us a Message
                </h2>
                <div className="w-16 h-0.5 bg-bimec-green mx-auto lg:mx-0 mt-4 animate-expand"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-bimec-green transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green"
                    />
                  </div>
                  <div className="relative group">
                    <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-bimec-green transition-colors" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <InboxIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-bimec-green transition-colors" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green"
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bimec-green focus:border-transparent outline-none transition-all hover:border-bimec-green resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-bimec-green text-white font-medium py-4 rounded-xl hover:bg-bimec-heavy-green transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2 transform group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.id}
                  data-card-id={info.id}
                  className={`info-card ${
                    info.bgColor
                  } p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    info.hoverColor
                  } cursor-pointer ${
                    visibleCards.has(info.id.toString())
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-0"
                  }`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <info.icon className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-xl text-white text-center mb-4">
                    {info.title}
                  </h4>
                  <div className="space-y-3">
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-white/90 flex items-center justify-center text-sm"
                      >
                        <detail.icon className="h-4 w-4 mr-2" />
                        {detail.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Button Group */}
      {/* <FloatButtonGroup /> */}

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 4rem;
          }
        }

        .animate-expand {
          animation: expand 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactSection;
