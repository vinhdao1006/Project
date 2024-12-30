import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import FloatButtonGroup from '../components/FloatButtonGroup'
import Footer from '../components/BimecFooter'
import img_blackGirls_aboutus from '../assets/image/img_blackGirls_aboutus.png'
import img_SubHead_aboutus from '../assets/image/img_SubHead_aboutus.png'
const AboutUs = () => {
    return (
        <div>
            <div className='max-w-xl mx-auto pt-4 pb-4 ml-48'>
                <div className="flex-shrink-0">
                    <a href="/home" className="text-[#181C32] font-bold text-2xl">
                        BIMEC
                    </a>
                </div>
            </div>

            <Navbar />
            
            <div>
                <img
                    src={img_SubHead_aboutus}
                    
                ></img>
            </div>
            <section className="w-full bg-white py-16">
                <div className="container mx-auto flex flex-wrap items-center">
                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/2 px-4">
                        <img
                            src={img_blackGirls_aboutus} // Replace with the actual image URL
                            className="rounded-lg shadow-lg ml-[15rem]"
                        />
                    </div>

                    {/* Right Side: Text Content */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-xl font-semibold text-bimec-green uppercase mb-4">
                            Welcome to BIMEC
                        </h2>
                        <h3 className="text-6xl font-bold text-bimec-heavy-green font-yeseva mb-6">
                            Best Care for Your Good Health
                        </h3>
                        <ul className="grid grid-cols-2 gap-y-3 font-sans font-medium mb-6">
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>A Passion for Healing</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>5-Star Care</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>All our best</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>Believe in Us</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>Always Caring</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 bg-bimec-green rounded-full"></span>
                                <span>A Legacy of Excellence</span>
                            </li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                            placerat scelerisque tortor ornare ornare. Quisque placerat
                            scelerisque tortor ornare ornare.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                            placerat scelerisque tortor ornare ornare.
                        </p>
                    </div>
                </div>
            </section>


            <FloatButtonGroup></FloatButtonGroup>

            <div className="mt-[2rem] mx-auto w-full">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default AboutUs