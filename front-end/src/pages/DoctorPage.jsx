import react from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Contact from '../components/utils/Contact'
import BimecFooter from '../components/Footer/BimecFooter'
import BimecLogo from '../components/utils/BimecLogo'
import img_SubHead_doctorPage from '../assets/image/img_SubHead_aboutus.png'
import img_doctor1 from "../assets/image/sliderDoctor1.png";
import img_doctor2 from "../assets/image/sliderDoctor2.png";
import img_doctor3 from "../assets/image/sliderDoctor3.png";
import FloatButtonGroup from '../components/utils/FloatButtonGroup'
import DoctorSearch from '../components/utils/DoctorSearch'

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

            <Navbar />

            <div>
                <img src={img_SubHead_doctorPage} className="w-full h-fit"></img>
            </div>

            
            <DoctorSearch/>
            

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

            <FloatButtonGroup></FloatButtonGroup>
        </div>
    )
}

export default DoctorPage;