import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStethoscope, faUserMd, faCalendarAlt, faClock, faUser, faBirthdayCake,
  faMars, faVenus, faPhone, faEnvelope, faComment, faCheckCircle, faExclamationCircle, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import slider_booking from '../../assets/image/slider_booking.png';
import Contact from '../../components/utils/Contact';
import BimecFooter from '../../components/Footer/BimecFooter';

function BookingPage() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    reason: '',
    appointmentTime: ''
  });

  // Back-end Function: Fetch specialties from API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Gọi API để lấy danh sách specialties từ server
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/specialties');
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
  }, [navigate]);

  // Back-end Function: Fetch doctors based on selected specialty from API
  useEffect(() => {
    // Gọi API để lấy danh sách bác sĩ theo chuyên khoa được chọn
    const fetchDoctors = async () => {
      if (selectedSpecialty) {
        try {
          const response = await axios.get(`http://localhost:3001/api/doctors/${selectedSpecialty}`);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          setDoctors([]);
        }
      } else {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
    setSelectedDoctor('');
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Back-end Function: Handle form submission and send appointment data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const userId = localStorage.getItem('userId');
      if (!userId) {
        showNotification('User information not found. Please login again.', 'error');
        navigate('/login');
        return;
      }

      const appointmentData = {
        patientId: userId,
        doctorId: selectedDoctor,
        specialtyId: selectedSpecialty,
        appointmentDate: selectedDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
        ...formData
      };

      // Gửi dữ liệu cuộc hẹn đến API để tạo mới
      const response = await axios.post('http://localhost:3001/api/appointments', appointmentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        showNotification('Appointment booked successfully!', 'success');
        setTimeout(() => {
          navigate('/default/appointments');
        }, 1500);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (error.response && error.response.status === 401) {
        showNotification('Session expired. Please login again.', 'error');
        navigate('/login');
      } else {
        showNotification('Failed to book appointment. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const [notification, setNotification] = useState({ message: '', type: '', show: false });

  const showNotification = (message, type) => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      <Navbar />

      {/* Mobile App Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center lg:hidden">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-bimec-heavy-green font-yeseva">
          Book Appointment
        </h1>
      </div>

      {/* Main Content - Optimized for Mobile */}
      <div className="relative lg:hidden">
        <img src={slider_booking} className="w-full h-48 object-cover" alt="Booking Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-bimec-heavy-green/40 to-transparent flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-2xl font-bold text-white font-yeseva drop-shadow-lg">
              Book Your Appointment
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Form Section */}
      <div className="lg:hidden p-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-xl font-bold font-yeseva text-bimec-green mb-4">
            Make an Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Specialty and Doctor Selection */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                <FontAwesomeIcon icon={faStethoscope} className="text-bimec-heavy-green" />
                <span>Specialty<span className="text-bimec-red">*</span></span>
              </label>
              <select
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
                required
              >
                <option value="">Select Specialty</option>
                {specialties && specialties.map(specialty => (
                  <option key={specialty._id} value={specialty._id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                <FontAwesomeIcon icon={faUserMd} className="text-bimec-heavy-green" />
                <span>Doctor<span className="text-bimec-red">*</span></span>
              </label>
              <select
                className={`block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm 
                  ${!selectedSpecialty ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                value={selectedDoctor}
                onChange={handleDoctorChange}
                required
                disabled={!selectedSpecialty}
              >
                <option value="">
                  {!selectedSpecialty
                    ? "Please select a specialty first"
                    : doctors.length === 0
                      ? "No doctors available"
                      : "Select Doctor"}
                </option>
                {doctors.map(doctor => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.userId.firstname} {doctor.userId.lastname}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold font-yeseva text-bimec-black/80 mb-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-bimec-heavy-green" />
                  <span>Date<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold font-yeseva text-bimec-black/80 mb-2">
                  <FontAwesomeIcon icon={faClock} className="text-bimec-heavy-green" />
                  <span>Time<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="time"
                  name="appointmentTime"
                  min="07:00"
                  max="16:00"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">From 7:00 AM to 4:00 PM</p>
              </div>
            </div>

            {/* Patient Information */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-bimec-green font-yeseva">
                Patient Information
              </h3>

              <div className="space-y-4 mt-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                    <FontAwesomeIcon icon={faUser} className="text-bimec-heavy-green" />
                    <span>Name<span className="text-bimec-red">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                    <FontAwesomeIcon icon={faBirthdayCake} className="text-bimec-heavy-green" />
                    <span>Date of birth<span className="text-bimec-red">*</span></span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                    Gender<span className="text-bimec-red">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        required
                      />
                      <FontAwesomeIcon icon={faMars} className="text-bimec-heavy-green" />
                      <span className="text-sm font-yeseva text-bimec-black/80">Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300"
                      />
                      <FontAwesomeIcon icon={faVenus} className="text-bimec-heavy-green" />
                      <span className="text-sm font-yeseva text-bimec-black/80">Female</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                    <FontAwesomeIcon icon={faPhone} className="text-bimec-heavy-green" />
                    <span>Phone<span className="text-bimec-red">*</span></span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                    placeholder="Phone number"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-bimec-heavy-green" />
                    <span>Email<span className="text-bimec-red">*</span></span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                    <FontAwesomeIcon icon={faComment} className="text-bimec-heavy-green" />
                    <span>Reason<span className="text-bimec-red">*</span></span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white resize-none"
                    placeholder="Reason for appointment"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg py-3 px-6 font-medium text-white ${isSubmitting ? 'bg-gray-400' : 'bg-bimec-heavy-green'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                  Processing...
                </span>
              ) : (
                'Confirm Appointment'
              )}
            </button>
          </form>
        </div>

        {/* Mobile Schedule Section */}
        <div className="bg-bimec-heavy-green text-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 font-yeseva flex items-center space-x-2">
            <FontAwesomeIcon icon={faClock} />
            <span>Schedule Hours</span>
          </h2>
          <div className="space-y-3 mb-6">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-green-600/30">
                <span className="font-yeseva">{day}</span>
                <span className="font-yeseva">
                  {day === "Sunday" ? "Emergency only" : "7:00 AM - 4:00 PM"}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-bimec-green/80 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-3 font-yeseva text-center">Emergency</h3>
            <div className="flex items-center justify-center space-x-3">
              <FontAwesomeIcon icon={faPhone} className="text-2xl text-bimec-red" />
              <p className="text-lg font-semibold font-yeseva">(028) 3864-7256</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block relative"
      >
        <img src={slider_booking} className="w-full h-64 object-cover" alt="Booking Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-bimec-heavy-green/40 to-transparent flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold text-white font-yeseva drop-shadow-lg">
              Book Your Appointment
            </h1>
          </div>
        </div>
      </motion.div>

      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-24 right-6 z-50 px-6 py-3 rounded-lg shadow-lg 
            ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
            text-white font-medium flex items-center space-x-2`}
        >
          {notification.type === 'success' ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon icon={faExclamationCircle} />
          )}
          <span>{notification.message}</span>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex flex-col lg:flex-row items-start justify-center p-6 mt-8 mx-auto max-w-6xl"
      >
        {/* Left Form Section */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold font-yeseva text-bimec-green mb-4">
            Make an Appointment
          </h1>
          <p className="text-bimec-black/80 mb-6 font-yeseva">
            Please fill out the form below to book your appointment. All fields marked with <span className="text-bimec-red">*</span> are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Specialty and Doctor Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                  <FontAwesomeIcon icon={faStethoscope} className="text-bimec-heavy-green" />
                  <span>Specialty<span className="text-bimec-red">*</span></span>
                </label>
                <select
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  value={selectedSpecialty}
                  onChange={handleSpecialtyChange}
                  required
                >
                  <option value="">Select Specialty</option>
                  {specialties && specialties.map(specialty => (
                    <option key={specialty._id} value={specialty._id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                  <FontAwesomeIcon icon={faUserMd} className="text-bimec-heavy-green" />
                  <span>Doctor<span className="text-bimec-red">*</span></span>
                </label>
                <select
                  className={`block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm 
                    ${!selectedSpecialty ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                  required
                  disabled={!selectedSpecialty}
                >
                  <option value="">
                    {!selectedSpecialty
                      ? "Please select a specialty first"
                      : doctors.length === 0
                        ? "No doctors available"
                        : "Select Doctor"}
                  </option>
                  {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.userId.firstname} {doctor.userId.lastname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Appointment Time */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold font-yeseva text-bimec-black/80 mb-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-bimec-heavy-green" />
                  <span>Date<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold font-yeseva text-bimec-black/80 mb-2">
                  <FontAwesomeIcon icon={faClock} className="text-bimec-heavy-green" />
                  <span>Time<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="time"
                  name="appointmentTime"
                  min="07:00"
                  max="16:00"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">From 7:00 AM to 4:00 PM</p>
              </div>
            </div>

            {/* Patient Information */}
            <h2 className="text-2xl font-bold text-bimec-green mt-8 mb-4 font-yeseva">
              Patient's Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                  <FontAwesomeIcon icon={faUser} className="text-bimec-heavy-green" />
                  <span>Name<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                  <FontAwesomeIcon icon={faBirthdayCake} className="text-bimec-heavy-green" />
                  <span>Date of birth<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                Gender<span className="text-bimec-red">*</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                    required
                  />
                  <FontAwesomeIcon icon={faMars} className="text-bimec-heavy-green" />
                  <span className="text-sm font-yeseva text-bimec-black/80">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <FontAwesomeIcon icon={faVenus} className="text-bimec-heavy-green" />
                  <span className="text-sm font-yeseva text-bimec-black/80">Female</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                  <FontAwesomeIcon icon={faPhone} className="text-bimec-heavy-green" />
                  <span>Phone<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-bimec-heavy-green" />
                  <span>Email<span className="text-bimec-red">*</span></span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white"
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-bimec-black/80 font-yeseva mb-2">
                <FontAwesomeIcon icon={faComment} className="text-bimec-heavy-green" />
                <span>Reason<span className="text-bimec-red">*</span></span>
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm bg-white resize-none"
                placeholder="Reason for appointment"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg py-3 px-6 font-medium text-white mt-6 ${isSubmitting ? 'bg-gray-400' : 'bg-bimec-heavy-green hover:bg-bimec-heavy-green/90'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                  Processing...
                </span>
              ) : (
                'Confirm Appointment'
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Schedule Section */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/3 rounded-xl mt-6 lg:mt-0 lg:ml-6"
        >
          <div className="bg-bimec-heavy-green text-white p-6 rounded-xl shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-6 font-yeseva flex items-center space-x-2">
              <FontAwesomeIcon icon={faClock} />
              <span>Schedule Hours</span>
            </h2>
            <div className="mb-8 space-y-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-green-600/30">
                  <span className="font-yeseva">{day}</span>
                  <span className="font-yeseva">
                    {day === "Sunday" ? "Emergency only" : "7:00 AM - 4:00 PM"}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-bimec-green/80 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 font-yeseva text-center">Emergency Contact</h3>
              <div className="flex items-center justify-center space-x-4">
                <FontAwesomeIcon icon={faPhone} className="text-2xl text-bimec-red" />
                <p className="text-xl font-semibold font-yeseva">(028) 3864-7256</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-12 mx-auto max-w-6xl px-6">
        <Contact />
      </div>

      <div className="mt-12 w-full">
        <BimecFooter />
      </div>
    </div>
  );
}

export default BookingPage;