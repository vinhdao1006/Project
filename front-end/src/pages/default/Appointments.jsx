import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/BimecFooter";
import Contact from "../../components/utils/Contact";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set visibility for animation after component mounts
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:3001/api/patient-appointments/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Appointments data:", response.data);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        } else {
          setError("Failed to fetch appointments. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bimec-green"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6 py-8 bg-white rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bimec-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-bimec-black mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-bimec-green text-white px-5 py-2 rounded-lg hover:bg-bimec-heavy-green transition-colors duration-150 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section - updated to match Profile page */}
      <div className="bg-gradient-to-r from-bimec-green to-bimec-heavy-green py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-3xl md:text-4xl font-light text-white text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            My Appointments
          </h1>
          <p className={`text-white/80 text-center mt-2 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Manage and view your scheduled appointments
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 animate-slideInUp animation-delay-300 lg:-mt-4 md:-mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {appointments.length === 0 ? (
            <div className={`text-center py-16 px-4 transform transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}>
              <div className="w-20 h-20 bg-bimec-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-10 w-10 text-bimec-green" />
              </div>
              <h2 className="text-xl font-bold text-bimec-heavy-green mb-2">
                No Appointments Yet
              </h2>
              <p className="mb-6 text-gray-600 max-w-md mx-auto">
                You have not booked any appointments. Schedule your first appointment to start your healthcare journey.
              </p>
              <a
                href="/default/booking"
                className="inline-block bg-bimec-green text-white px-6 py-3 rounded-lg hover:bg-bimec-heavy-green font-medium transition-colors duration-150"
              >
                Book Your First Appointment
              </a>
            </div>
          ) : (
            <div className={`p-6 transform transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-bimec-heavy-green">
                  Upcoming Appointments
                </h2>
                <button
                  onClick={() => navigate("/default/booking")}
                  className="inline-block bg-bimec-green text-white px-4 py-2 rounded-lg hover:bg-bimec-heavy-green font-medium transition-colors duration-150 text-sm w-full sm:w-auto"
                >
                  + New Appointment
                </button>
              </div>
              
              <div className="grid gap-4">
                {appointments.map((appt, index) => (
                  <div 
                    key={appt._id} 
                    className="p-5 bg-white border border-gray-100 rounded-xl hover:border-bimec-green transition-all duration-150 shadow-sm hover:shadow"
                    style={{ 
                      transform: isVisible ? 'translateX(0)' : 'translateX(10px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'all 0.7s ease-out',
                      transitionDelay: `${600 + index * 100}ms`
                    }}
                  >
                    <div className="md:flex justify-between items-center gap-4">
                      {/* Left content */}
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-bimec-heavy-green flex items-center">
                          <UserIcon className="h-5 w-5 mr-2 text-bimec-green" />
                          Dr. {appt.doctorId?.firstname} {appt.doctorId?.lastname}
                        </h3>
                        <p className="text-gray-600 mt-1 flex items-center">
                          <TagIcon className="h-4 w-4 mr-2 text-bimec-green" />
                          {appt.specialtyId}
                        </p>
                      </div>
                      
                      {/* Middle content */}
                      <div className="mb-4 md:mb-0 flex flex-col">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-bimec-green" />
                          <span className="text-gray-700">
                            {new Date(appt.appointmentDate).toLocaleDateString(undefined, {
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <ClockIcon className="h-4 w-4 mr-2 text-bimec-green" />
                          <span className="text-gray-700">{appt.appointmentTime}</span>
                        </div>
                      </div>
                      
                      {/* Right content */}
                      <div className="flex justify-between items-center md:justify-end gap-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                            appt.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                        <button 
                          className="text-xs text-bimec-red hover:text-red-700 transition-colors duration-150"
                          aria-label="Cancel appointment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Past Appointments Collapsible Section */}
        {appointments.length > 0 && (
          <div className={`mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-1000 delay-750 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <button 
              className="w-full p-4 flex justify-between items-center text-left hover:bg-bimec-light-green transition-colors duration-150"
              onClick={() => setShowPastAppointments(!showPastAppointments)}
            >
              <h2 className="text-lg font-medium text-bimec-black">Past Appointments</h2>
              <ChevronDownIcon 
                className={`h-5 w-5 text-bimec-green transition-transform duration-150 ${showPastAppointments ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Collapsible content */}
            <div 
              className={`transition-all duration-200 ease-in-out overflow-hidden ${
                showPastAppointments ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 border-t border-gray-100">
                <p className="text-gray-500 text-center py-8">No past appointments found</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className={`mt-16 mx-auto w-full transform transition-all duration-1000 delay-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        <Contact />
      </div>
      <div className={`mt-8 mx-auto w-full transform transition-all duration-1000 delay-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        <Footer />
      </div>
      <FloatButtonGroup />
    </div>
  );
};

export default Appointments;