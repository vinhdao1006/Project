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
              gender: response.data.gender,
              dayOfBirth: response.data.dayOfBirth,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bimec-green mx-auto"></div>
          <p className="mt-4 text-bimec-heavy-green">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-bimec-green text-white px-4 py-2 rounded hover:bg-bimec-heavy-green"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto">
        <div className="w-full h-48 bg-bimec-heavy-green flex items-center justify-center">
          <h1 className="text-4xl font-yeseva font-bold text-white">
            My Appointments
          </h1>
        </div>
        <div className="max-w-4xl mx-auto mt-10 px-4 py-8 bg-white rounded-lg shadow-md">
          {appointments.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-bimec-heavy-green mb-4">
                No Appointments Yet
              </h2>
              <p className="mb-6">
                You have not booked any appointments. Book your first
                appointment now!
              </p>
              <button
                onClick={() => navigate("/default/booking")}
                className="inline-block bg-bimec-green text-white px-6 py-2 rounded hover:bg-bimec-heavy-green font-semibold transition"
              >
                Book Appointment
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-bimec-heavy-green mb-6">
                Upcoming Appointments
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-bimec-green">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Specialty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appt) => (
                      <tr key={appt._id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-bimec-heavy-green">
                          Dr. {appt.doctorInfo?.firstname}{" "}
                          {appt.doctorInfo?.lastname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appt.specialtyId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(appt.appointmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appt.appointmentTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              appt.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate("/default/booking")}
                  className="inline-block bg-bimec-green text-white px-6 py-2 rounded hover:bg-bimec-heavy-green font-semibold transition"
                >
                  Book Another Appointment
                </button>
              </div>
            </>
          )}
        </div>
        <div className="mt-16 mx-auto w-full">
          <Contact />
        </div>
        <div className="mt-16 mx-auto w-full">
          <Footer />
        </div>
        {/* <FloatButtonGroup /> */}
      </div>
    </div>
  );
};

export default Appointments;
