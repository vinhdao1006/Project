import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BimecLogo from '../components/BimecLogo'
import Navbar from '../components/Navbar'
import ServicesHeader from '../components/ServicesHeader'
import Specialties from '../components/Specialties'
import SliderDoctors from '../components/SliderDoctors'
import NewsSlider from '../components/NewsSlider'
import Contact from '../components/Contact'
import Footer from '../components/BimecFooter'
import FloatButtonGroup from '../components/FloatButtonGroup'
import Home_physician from '../assets/image/Home_physician.png'
import BlackDoctors1 from '../assets/image/Blackdoctors 1.png'
import { ReactTyped } from 'react-typed'

function Home() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/home')
            .then(result => {
                console.log(result)
                if (result.data !== "Success") {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="overflow-x-hidden overflow-y-auto">
            <BimecLogo />


            <Navbar />

            <div className="w-full relative">
                <img src={Home_physician} className="w-full h-fit"></img>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col ml-[12rem] mt-44'>
                    <h4 className="font-bold text-xl font-yeseva text-bimec-green">CARING FOR LIFE</h4>
                    <h1 className="font-semibold text-6xl font-yeseva text-bimec-heavy-green">Leading The Way <br /> in Medical Excellence</h1>
                    <button className="w-48 h-12 mt-5 bg-white rounded-full font-semibold">Our Services</button>
                </div>
                <div className='absolute top-0 left-0 flex'>
                    <div className="absolute bg-bimec-heavy-green w-[20rem] h-28 mt-[36rem] ml-[12rem] rounded-lg flex justify-between items-center cursor-pointer">
                        <button
                            onClick={() => navigate('/booking')}
                            className="w-full h-full flex items-center justify-between px-8"
                        >
                            <p className="text-lg text-white font-sans">Book an Appointment</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-20 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='absolute bg-bimec-green w-[16rem] h-28 mt-[36rem] ml-[38rem] rounded-lg flex justify-between items-center'>
                        <p className="ml-8 text-lg text-white font-sans">Find doctors</p>
                        <svg className="size-20 text-white mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-32 absolute flex flex-col items-center w-full">
                <h4 className="text-bimec-green font-bold font-sans text-lg">
                    WELCOME TO BIMEC
                </h4>
                <ReactTyped className="text-bimec-heavy-green font-bold font-yeseva text-4xl"
                    strings={['A Great Place to Receive Care', 'Your Health, Our Commitment', 'Caring for You, Like Family']}
                    typeSpeed={200}
                    backSpeed={220}
                    loop
                />
                <p className="w-[50rem] indent-10">
                    "At BIMEC, we are dedicated to providing compassionate, high-quality care to every patient.
                    With a team of experienced doctors, nurses, and healthcare professionals, we focus on your health and well-being every step of the way.
                    Whether you're seeking preventive care, specialized treatment, or emergency services, we prioritize your comfort and trust.
                    Our commitment is to treat you like family, ensuring that your health is in the best hands possible."
                </p>
                <a className="w-[10rem] flex text-bimec-green hover:underline" href="/about-us">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 ml-2 mt-0.5 text-bimec-heavy-green">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </a>
            </div>

            <div className="mt-[26rem] absolute flex flex-col items-center w-full">
                <img src={BlackDoctors1}></img>
            </div>

            <div className="mt-[44rem] w-[66rem] mx-auto">
                <ServicesHeader />
            </div>

            <div className="mt-[1rem] mx-auto">
                <Specialties />
            </div>

            <div className="mt-[1rem] mx-auto w-[64rem]">
                <SliderDoctors />
            </div>

            <div className="mt-[2rem] mx-auto w-[64rem]">
                <NewsSlider />
            </div>

            <div className="mt-[2rem] mx-auto w-[64rem]">
                <Contact />
            </div>

            <div className="mt-[2rem] mx-auto w-full">
                <Footer />
            </div>

            <FloatButtonGroup></FloatButtonGroup>
        </div>
    )
}

export default Home
