import react from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import slider_booking from '../assets/image/slider_booking.png'
import icon_phone from '../assets/icon/icon_phone.png'
import Contact from '../components/utils/Contact'
import BimecFooter from '../components/Footer/BimecFooter'

function BookingPage() {

    return (
        <div>

            <Navbar />

            <div>
                <img src={slider_booking} className="w-full h-max"></img>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center min-h-screen p-6 bg-gray-100 mt-[2rem] mx-auto w-[64rem]">
                {/* Left Form Section  */}
                <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold font-yeseva text-bimec-heavy-green mb-4">Make an Appointment</h1>
                    <p className="text-bimec-black mb-6 font-yeseva">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue.
                        Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
                    </p>

                    <form>
                        {/* Specialty and Doctor Selection */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Specialty<span className='text-bimec-red'>*</span></label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                        focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray">
                                    <option value="">Select Specialty</option>
                                    <option value="cardiology">Cardiology</option>
                                    <option value="dermatology">Dermatology</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold font-yeseva text-bimec-black">Doctor<span className='text-bimec-red'>*</span></label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10
                                bg-bimec-gray">
                                    <option value="">Select Doctor</option>
                                    <option value="dr-smith">Dr. Smith</option>
                                    <option value="dr-jane">Dr. Jane</option>
                                </select>
                            </div>
                        </div>

                        {/* Appointment Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold font-yeseva text-bimec-black">Appointment time<span className='text-bimec-red'>*</span></label>
                            <div className="flex space-x-4 mt-2">
                                <button className="py-2 px-4 bg-green-800 text-bimec-light-green rounded-md font-yeseva">12/12 Thursday</button>
                                <button className="py-2 px-4 border border-gray-300 text-bimec-black bg-bimec-gray rounded-md">13/12 Friday</button>
                                <button className="py-2 px-4 border border-gray-300 text-bimec-black bg-bimec-gray rounded-md">14/12 Saturday</button>
                                <button className="py-2 px-4 border border-gray-300 text-bimec-black bg-bimec-gray rounded-md">Other Date</button>
                            </div>
                        </div>

                        {/* Patient Information */}
                        <h2 className="text-lg font-bold text-bimec-heavy-green mt-6 mb-4 font-yeseva">Patient's Information</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Name<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="text"
                                    className="mt-1 pl-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Date of birth<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full pl-2 py-2 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                />
                                <div className="mt-2">
                                    <label className="mb-1 block text-sm font-bold text-bimec-black font-yeseva">Gender<span className='text-bimec-red'>*</span></label>
                                    <label className="inline-flex items-center mr-4">
                                        <input type="radio" name="gender" className="form-radio text-green-500 font-yeseva" /> Male
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="gender" className="form-radio text-green-500 font-yeseva" /> Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-bimec-black font-yeseva">Phone number<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="tel"
                                    className="mt-1 block pl-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-bimec-black">Email<span className='text-bimec-red'>*</span></label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full pl-2 py-2 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-10 bg-bimec-gray"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 font-yeseva">Reason for checkup<span className='text-bimec-red'>*</span></label>
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-bimec-gray pl-2 py-2"
                                placeholder="Enter reason for checkup"
                                rows="10"
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