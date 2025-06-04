import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/BimecFooter";
import Contact from "../../components/utils/Contact";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import { jwtDecode } from "jwt-decode";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

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
          `http://localhost:3001/api/appointments/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Appointments fetched:", response.data);

        // create a patient record
        try {
          const patientRecordResponse = await axios.post(
            "http://localhost:3001/api/patient-records",
            {
              patientId: userId,
              appointments: response.data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Patient record created:", patientRecordResponse.data);
        } catch (error) {
          console.error("Error creating patient record:", error);
        }

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

  const filteredAppointments = appointments.filter(appt => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "confirmed") return appt.status === "Confirmed";
    if (selectedFilter === "pending") return appt.status !== "Confirmed";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bimec-light-green via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-bimec-gray rounded-full"></div>
            <div className="w-20 h-20 border-4 border-bimec-green rounded-full border-t-transparent animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-bimec-heavy-green font-medium animate-pulse">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bimec-light-green via-white to-green-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-transform">
          <div className="w-20 h-20 bg-bimec-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-bimec-red animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-bimec-red font-medium mb-6 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-bimec-green to-bimec-heavy-green text-white px-8 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto min-h-screen bg-gradient-to-br from-bimec-light-green via-white to-green-50">
      <Navbar />
      
      {/* Enhanced Header with Gradient and Pattern */}
      <div className="relative w-full bg-gradient-to-r from-bimec-heavy-green via-bimec-green to-bimec-heavy-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }}></div>
        </div>
        <div className="relative px-4 py-20 sm:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-yeseva font-bold text-white text-center mb-4 animate-fade-in-down">
            My Appointments
          </h1>
          <p className="text-center text-green-100 text-lg max-w-2xl mx-auto">
            Manage your healthcare journey with ease
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-bimec-heavy-green/20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16">
        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-16 max-w-2xl mx-auto transform hover:scale-102 transition-transform">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-bimec-light-green rounded-full animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-bimec-heavy-green mb-4">
                No Appointments Yet
              </h2>
              <p className="text-gray-600 mb-10 text-lg max-w-md mx-auto">
                Begin your health journey today. Book your first appointment with our expert medical professionals.
              </p>
              <button
                onClick={() => navigate("/default/booking")}
                className="group relative inline-flex items-center bg-gradient-to-r from-bimec-green to-bimec-heavy-green text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all font-semibold text-lg"
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Book Your First Appointment
                </span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="bg-white rounded-3xl shadow-xl p-2 mb-8 max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all ${
                    selectedFilter === "all"
                      ? "bg-gradient-to-r from-bimec-green to-bimec-heavy-green text-white shadow-lg"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All ({appointments.length})
                </button>
                <button
                  onClick={() => setSelectedFilter("confirmed")}
                  className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all ${
                    selectedFilter === "confirmed"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Confirmed ({appointments.filter(a => a.status === "Confirmed").length})
                </button>
                <button
                  onClick={() => setSelectedFilter("pending")}
                  className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all ${
                    selectedFilter === "pending"
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Pending ({appointments.filter(a => a.status !== "Confirmed").length})
                </button>
              </div>
            </div>

            {/* Enhanced Table/Cards Container */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-bimec-green to-bimec-heavy-green p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Your Scheduled Appointments
                </h2>
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-bimec-light-green to-green-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-bimec-heavy-green uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-bimec-heavy-green uppercase tracking-wider">
                          Specialty
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-bimec-heavy-green uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-bimec-heavy-green uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-bimec-heavy-green uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-bimec-heavy-green uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAppointments.map((appt, index) => (
                        <tr 
                          key={appt._id} 
                          className="hover:bg-gradient-to-r hover:from-bimec-light-green/30 hover:to-transparent transition-all group"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-bimec-green to-bimec-heavy-green rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-lg">
                                  {appt.doctorInfo?.firstname?.[0]}{appt.doctorInfo?.lastname?.[0]}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-bimec-heavy-green text-lg">
                                  Dr. {appt.doctorInfo?.firstname} {appt.doctorInfo?.lastname}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-bimec-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {appt.specialtyId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-bimec-light-green rounded-lg p-2 mr-2">
                                <svg className="w-5 h-5 text-bimec-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {new Date(appt.appointmentDate).toLocaleDateString('en-US', { 
                                    weekday: 'short',
                                    month: 'short', 
                                    day: 'numeric'
                                  })}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(appt.appointmentDate).getFullYear()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2 text-bimec-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-medium">{appt.appointmentTime}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${
                                appt.status === "Confirmed"
                                  ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
                                  : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md"
                              }`}
                            >
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {appt.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-bimec-green hover:text-bimec-heavy-green transition-colors transform hover:scale-110">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden p-4 sm:p-6 space-y-4">
                {filteredAppointments.map((appt, index) => (
                  <div 
                    key={appt._id} 
                    className="bg-gradient-to-br from-white to-bimec-light-green/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-102 transition-all border border-green-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-bimec-green to-bimec-heavy-green rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-lg">
                            {appt.doctorInfo?.firstname?.[0]}{appt.doctorInfo?.lastname?.[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-bimec-heavy-green text-lg">
                            Dr. {appt.doctorInfo?.firstname} {appt.doctorInfo?.lastname}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <svg className="w-4 h-4 mr-1 text-bimec-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {appt.specialtyId}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          appt.status === "Confirmed"
                            ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                            : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-3 border border-green-100">
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-bimec-green mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs text-gray-500 font-medium">Date</p>
                        </div>
                        <p className="font-semibold text-bimec-heavy-green">
                          {new Date(appt.appointmentDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-green-100">
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-bimec-green mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-gray-500 font-medium">Time</p>
                        </div>
                        <p className="font-semibold text-bimec-heavy-green">
                          {appt.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Book Another Appointment */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-bimec-light-green/50 to-green-50 text-center">
                <button
                  onClick={() => navigate("/default/booking")}
                  className="inline-flex items-center bg-gradient-to-r from-bimec-green to-bimec-heavy-green text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all font-semibold text-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Book Another Appointment
                </button>
              </div>
            </div>

            {/* Floating Stats for Mobile */}
            <div className="fixed bottom-6 left-6 lg:hidden bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-4 z-40">
              <div className="text-center">
                <p className="text-2xl font-bold text-bimec-heavy-green">{filteredAppointments.length}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{filteredAppointments.filter(a => a.status === "Confirmed").length}</p>
                <p className="text-xs text-gray-500">Confirmed</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Section */}
      <div className="mt-16">
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Appointments;