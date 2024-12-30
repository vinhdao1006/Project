import react from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import BimecFooter from '../components/BimecFooter'
import img_SubHead_doctorPage from '../assets/image/img_SubHead_aboutus.png'
import img_doctor1 from "../assets/image/sliderDoctor1.png";
import img_doctor2 from "../assets/image/sliderDoctor2.png";
import img_doctor3 from "../assets/image/sliderDoctor3.png";


const doctors = [
    {
        id: 1,
        name: "Doctor's Name",
        specialty: "NEUROLOGY",
        image: img_doctor1,
        social: {
            linkedin: "#",
            instagram: "#",
            facebook: "#",
        },
    },
    {
        id: 2,
        name: "Doctor's Name",
        specialty: "NEUROLOGY",
        image: img_doctor2,
        social: {
            linkedin: "#",
            instagram: "#",
            facebook: "#",
        },
    },
    {
        id: 3,
        name: "Doctor's Name",
        specialty: "NEUROLOGY",
        image: img_doctor3,
        social: {
            linkedin: "#",
            instagram: "#",
            facebook: "#",
        },
    },
    {
        id: 4,
        name: "Doctor's Name",
        specialty: "NEUROLOGY",
        image: img_doctor1,
        social: {
            linkedin: "#",
            instagram: "#",
            facebook: "#",
        },
    },
    {
        id: 5,
        name: "Doctor's Name",
        specialty: "NEUROLOGY",
        image: img_doctor2,
        social: {
            linkedin: "#",
            instagram: "#",
            facebook: "#",
        },
    },
    {
        id: 6,
        name: "Doctor's Name",
        specialty: "NEUROLOGY",
        image: img_doctor3,
        social: {
            linkedin: "#",
            instagram: "#",
            facebook: "#",
        },
    },
];

function DoctorPage() {

    return (
        <div>
            <div className='max-w-xl mx-auto pt-4 pb-4 ml-48'>
                <div className="flex-shrink-0">
                    <a href="/home" className="text-bimec-black font-bold text-2xl">
                        BIMEC
                    </a>
                </div>
            </div>

            <Navbar />

            <div>
                <img src={img_SubHead_doctorPage} className="w-full h-fit"></img>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-[2rem] mx-auto w-[64rem]">
                <div>
                    <select
                        className="mt-1 block px-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 bg-bimec-gray">
                        <option value="">Specialty</option>
                        <option value="newrology">Neurology</option>
                        <option value="oncology">Oncology</option>
                        <option value="otorhinolaryngology">Otorhinolaryngology</option>
                        <option value="ophthalmology">Ophthalmology</option>
                        <option value="cardiovascular">Cardiovascular</option>
                        <option value="pulmonology">Pulmonology</option>
                        <option value="renal Medicine">Renal Medicine</option>
                        <option value="gastroenterology">Gastroenterology</option>
                        <option value="urology">Urology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="gynaecology">Gynaecology</option>
                    </select>
                </div>
                <div>
                    <select
                        className="mt-1 block pl-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 bg-bimec-gray">
                        <option value="">Occupation</option>
                        <option value="doctor">Doctor</option>
                        <option value="expert">Expert</option>
                        <option value="specialist">Specialist</option>
                        <option value="consultant">Consultant</option>
                        <option value="nurse">Nurse</option>
                        <option value="pharmacist">Pharmacist</option>
                        <option value="traditional-medicine-doctor">Traditional medicine doctor</option>
                    </select>
                </div>
                <div>
                    <select
                        className="mt-1 block pl-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 bg-bimec-gray">
                        <option value="">Title</option>
                        <option value="professor">Professor</option>
                        <option value="associate-professor">Associate professor</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-[2rem] mx-auto w-[64rem]">
                <div>
                    <select
                        className="mt-1 block pl-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 bg-bimec-gray">
                        <option value="">Language</option>
                        <option value="vn">Vietnamese</option>
                        <option value="en">English</option>
                        <option value="cn">Chinese</option>
                        <option value="kr">Korean</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        className="mt-1 pl-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 bg-bimec-gray"
                        placeholder="Enter doctor's name..."
                    />
                </div>
                <div>
                    <select
                        className="mt-1 block pl-2 py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 bg-bimec-gray">
                        <option value="">Degree</option>
                        <option value="md">MD</option>
                        <option value="bachelor">Bachelor</option>
                        <option value="resident-doctor">Resident doctor</option>
                        <option value="msc">MSc</option>
                        <option value="phD">Ph.D</option>
                        <option value="specialist-level-1-doctor">Specialist Level 1 Doctor</option>
                        <option value="specialist-level-2-doctor">Specialist Level 2 Doctor</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[2rem] mx-auto w-[64rem]">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4">
                        <div className="bg-bimec-light-green rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h4 className="text-lg font-normal text-gray-800 mb-2 text-center">
                                    {doctor.name}
                                </h4>
                                <p className="text-bimec-heavy-green font-extrabold mb-4 text-center">
                                    {doctor.specialty}
                                </p>
                                <div className="flex justify-center space-x-4 mb-4">
                                    <a
                                        href={doctor.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-linkedin text-green-700 text-lg"></i>
                                    </a>
                                    <a
                                        href={doctor.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-instagram text-green-700 text-lg"></i>
                                    </a>
                                    <a
                                        href={doctor.social.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-facebook text-green-700 text-lg"></i>
                                    </a>
                                </div>
                                <button className="bg-green-700 text-bimec-light-green py-2 px-4 rounded-lg w-full">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-[2rem] mx-auto w-[64rem]">

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

export default DoctorPage;