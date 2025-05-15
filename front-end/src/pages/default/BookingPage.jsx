import react, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import slider_booking from "../../assets/image/slider_booking.png";
import icon_phone from "../../assets/icon/icon_phone.png";
import Contact from "../../components/utils/Contact";
import BimecFooter from "../../components/Footer/BimecFooter";

function BookingPage() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    reason: "",
    appointmentTime: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchSpecialties = async () => {
      try {
        console.log("Fetching specialties...");
        const response = await axios.get(
          "http://localhost:3001/api/specialties"
        );
        console.log("Received specialties:", response.data);
        setSpecialties(response.data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };

    fetchSpecialties();
  }, [navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedSpecialty) {
        try {
          console.log("Fetching doctors for specialty:", selectedSpecialty);
          const response = await axios.get(
            `http://localhost:3001/api/doctors/${selectedSpecialty}`
          );
          console.log("Received doctors:", response.data);
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctors([]);
        }
      } else {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    console.log("Selected specialty:", value);
    setSelectedSpecialty(value);
    setSelectedDoctor("");
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleDateChange = (date) => {
    const selectedDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    if (selectedDateObj < today) {
      setErrors(prev => ({
        ...prev,
        date: "Please select a future date"
      }));
      setSelectedDate("");
    } else {
      setSelectedDate(date);
      setErrors(prev => ({
        ...prev,
        date: ""
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedSpecialty) newErrors.specialty = "Please select a specialty";
    if (!selectedDoctor) newErrors.doctor = "Please select a doctor";
    if (!selectedDate) newErrors.date = "Please select an appointment date";
    if (!formData.appointmentTime)
      newErrors.time = "Please select an appointment time";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dateOfBirth) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.reason)
      newErrors.reason = "Please provide a reason for visit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User information not found. Please login again.");
        navigate("/login");
        return;
      }

      const appointmentData = {
        patientId: userId,
        doctorId: selectedDoctor,
        specialtyId: selectedSpecialty,
        appointmentDate: selectedDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
        ...formData,
      };

      const response = await axios.post(
        "http://localhost:3001/api/appointments",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/default/appointments");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-bimec-heavy-green mb-2">
                Make an Appointment
              </h1>
              <p className="text-gray-500 text-sm">
                Please fill out the form below to book your appointment. All
                fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Appointment Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Specialty*
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full px-4 py-2.5 pr-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200 appearance-none
                                                         ${
                                                           errors.specialty
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                        value={selectedSpecialty}
                        onChange={handleSpecialtyChange}
                      >
                        <option value="">Select Specialty</option>
                        {specialties &&
                          specialties.map((specialty) => (
                            <option key={specialty._id} value={specialty._id}>
                              {specialty.name}
                            </option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.specialty && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.specialty}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Doctor*
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full px-4 py-2.5 pr-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200 appearance-none
                                                         ${
                                                           errors.doctor
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                        disabled={!selectedSpecialty}
                      >
                        <option value="">
                          {!selectedSpecialty
                            ? "Please select a specialty first"
                            : doctors.length === 0
                            ? "No doctors available for this specialty"
                            : "Select Doctor"}
                        </option>
                        {doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>
                            Dr. {doctor.userId.firstname}{" "}
                            {doctor.userId.lastname}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.doctor && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.doctor}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Appointment Date*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.date
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Appointment Time*
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        name="appointmentTime"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.time
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.time && (
                      <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Patient Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Name*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.name
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Date of Birth*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.dob
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.dob && (
                      <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Gender*
                    </label>
                    <div className="flex items-center gap-6 px-4 py-2.5 border-[1px] border-gray-400 rounded-sm bg-white">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Female</span>
                      </label>
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Phone Number*
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.phone
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="relative md:col-span-2">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Email*
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.email
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                    Reason for Visit*
                  </label>
                  <div className="relative">
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Please describe the reason for your visit"
                      rows="4"
                      className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-sm bg-white 
                                                     focus:outline-none transition-colors duration-200 resize-none
                                                     ${
                                                       errors.reason
                                                         ? "border-red-400 focus:border-red-500"
                                                         : "border-gray-400 focus:border-gray-500"
                                                     }`}
                    ></textarea>
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#285430] text-white py-3 rounded-lg font-medium 
                                         hover:bg-bimec-green focus:outline-none focus:ring-4 focus:ring-green-300 
                                         transition-all duration-200 flex items-center justify-center gap-2"
              >
                Confirm Appointment
              </button>
            </form>
          </div>

          <div className="lg:w-80 bg-[#285430] text-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Schedule Hours</h2>

            <div className="space-y-3 mb-6">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-green-700/30"
                >
                  <span className="text-sm font-medium">{day}</span>
                  <span className="text-sm">
                    {day === "Sunday"
                      ? "Emergency Only"
                      : "07:00 AM - 04:00 PM"}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Emergency Line
              </h3>
              <div className="flex items-center justify-center gap-2">
                <img src={icon_phone} alt="Phone" className="w-5 h-5" />
                <p className="text-xl font-semibold">(028) 3864-7256</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Same day appointments available</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">24/7 Emergency care</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Contact />
      </div>

      <BimecFooter />
    </div>
  );
}

export default BookingPage;