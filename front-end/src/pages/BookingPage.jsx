import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import slider_booking from '../assets/image/slider_booking.png'
import icon_phone from '../assets/icon/icon_phone.png'
import Contact from '../components/utils/Contact'
import BimecFooter from '../components/Footer/BimecFooter'

function BookingPage() {
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        reason: '',
        appointmentTime: ''
    });

    useEffect(() => {
        // Fetch specialties
        axios.get('http://localhost:3001/api/specialties')
            .then(response => {
                setSpecialties(response.data);
            })
            .catch(error => {
                console.error('Error fetching specialties:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch doctors when specialty is selected
        if (selectedSpecialty) {
            axios.get(`http://localhost:3001/api/doctors/${selectedSpecialty}`)
                .then(response => {
                    setDoctors(response.data);
                })
                .catch(error => {
                    console.error('Error fetching doctors:', error);
                });
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // First, get the current user's ID (you'll need to implement this based on your auth system)
            var userId = localStorage.getItem('userId'); // Assuming you store user ID in localStorage
            
            if (!userId) {
                userId = 123456; // or generate dynamically
                localStorage.setItem('userId', userId);
            }

            const appointmentData = {
                patientId: userId,
                doctorId: selectedDoctor,
                specialtyId: selectedSpecialty,
                appointmentDate: selectedDate,
                appointmentTime: formData.appointmentTime, // Ensure it's passed correctly
                reason: formData.reason,
                ...formData
            };

            const response = await axios.post('http://localhost:3001/api/appointments', appointmentData);
            
            if (response.status === 201) {
                alert('Appointment booked successfully!');
                navigate('/appointments'); // Redirect to appointments page
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />

            <div>
                <img src={slider_booking} className="w-full h-max" alt="Booking Banner" />
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center min-h-screen p-6 bg-gray-100 mt-[2rem] mx-auto w-[64rem]">
                {/* Left Form Section */}
                <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold font-yeseva text-bimec-heavy-green mb-4">Make an Appointment</h1>
                    <p className="text-bimec-black mb-6 font-yeseva">
                        Please fill out the form below to book your appointment. All fields marked with * are required.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Specialty and Doctor Selection */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Specialty<span className='text-bimec-red'>*</span></label>
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    value={selectedSpecialty}
                                    onChange={handleSpecialtyChange}
                                    required
                                >
                                    <option value="">Select Specialty</option>
                                    {specialties.map(specialty => (
                                        <option key={specialty._id} value={specialty._id}>
                                            {specialty.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold font-yeseva text-bimec-black">Doctor<span className='text-bimec-red'>*</span></label>
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    value={selectedDoctor}
                                    onChange={handleDoctorChange}
                                    required
                                    disabled={!selectedSpecialty}
                                >
                                    <option value="">Select Doctor</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor._id} value={doctor._id}>
                                            Dr. {doctor.userId.firstname} {doctor.userId.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Appointment Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold font-yeseva text-bimec-black">Appointment Date<span className='text-bimec-red'>*</span></label>
                            <input
                                type="date"
                                className="mt-1 block w-full pl-2 py-2 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                value={selectedDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold font-yeseva text-bimec-black">Appointment Time<span className='text-bimec-red'>*</span></label>
                            <input
                                type="time"
                                name="appointmentTime"	
                                className="mt-1 block w-full pl-2 py-2 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                value={formData.appointmentTime}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Patient Information */}
                        <h2 className="text-lg font-bold text-bimec-heavy-green mt-6 mb-4 font-yeseva">Patient's Information</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Name<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 pl-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Date of birth<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full pl-2 py-2 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    required
                                />
                                <div className="mt-2">
                                    <label className="mb-1 block text-sm font-bold text-bimec-black font-yeseva">Gender<span className='text-bimec-red'>*</span></label>
                                    <label className="inline-flex items-center mr-4">
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="Male"
                                            checked={formData.gender === 'Male'}
                                            onChange={handleInputChange}
                                            className="form-radio text-green-500 font-yeseva"
                                            required
                                        /> Male
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="Female"
                                            checked={formData.gender === 'Female'}
                                            onChange={handleInputChange}
                                            className="form-radio text-green-500 font-yeseva"
                                        /> Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Phone number<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block pl-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-bimec-black">Email<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full pl-2 py-2 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 font-yeseva">Reason for checkup<span className='text-bimec-red'>*</span></label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-bimec-gray pl-2 py-2"
                                placeholder="Enter reason for checkup"
                                rows="10"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-bimec-heavy-green text-bimec-light-green py-2 px-4 rounded-md hover:bg-bimec-green"
                        >
                            CONFIRM
                        </button>
                    </form>
                </div>

                {/* Right Schedule Section */}
                <div className="w-full lg:w-1/3 bg-bimec-green text-bimec-light-green p-8 rounded-lg shadow-md mt-6 lg:mt-0 lg:ml-6">
                    <h2 className="text-3xl font-bold mb-4 font-sans">Schedule hours</h2>
                    <ul className="mb-6 font-yeseva">
                        {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                        ].map((day, index) => (
                            <li
                                key={index}
                                className="flex justify-between border-b border-green-700 py-2"
                            >
                                <span>{day}</span>
                                <span>
                                    {day === "Sunday" ? "Only Emergency" : "09:00 AM - 07:00 PM"}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center font-yeseva text-bimec-red">
                        <h3 className="text-xl font-bold mb-2">Emergency</h3>
                        <div className="flex items-center justify-center space-x-2">
                            <img src={icon_phone} alt="Phone Icon" className="w-6 h-6" />
                            <p className="text-2xl font-semibold">(237) 681-912-255</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[2rem] mx-auto w-[64rem]">
                <Contact />
            </div>

            <div className="mt-[2rem] mx-auto w-full">
                <BimecFooter />
            </div>
        </div>
    )
}

export default BookingPage