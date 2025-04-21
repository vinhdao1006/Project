import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import FloatButtonGroup from '../components/utils/FloatButtonGroup'
import Footer from '../components/Footer/BimecFooter'
import TestimonalSection from '../components/utils/Testimonial'
import ServiceGrid from '../components/Services/ServiceGrid'
import Contact from '../components/utils/Contact'
import BimecLogo from '../components/utils/BimecLogo'
import img_SubHead_services from '../assets/image/img_SubHead_services.png'

const Services = () => {
    return (
        <div class="overflow-x-hidden overflow-y-auto">
        <div>
            <BimecLogo></BimecLogo>

            <Navbar />
            
            <FloatButtonGroup></FloatButtonGroup>
            
            <div className="w-full mx-auto">
                <img
                    src={img_SubHead_services}
                    className="w-full"
                >
                </img>
            </div>

            <div className="mt-[4rem]">
            <ServiceGrid></ServiceGrid>
                
            </div>

            <div className="mt-[4rem] mx-auto w-full">
                <TestimonalSection></TestimonalSection>
            </div>

            <div className="mt-[4rem] mx-auto w-full">
                <Contact></Contact>
            </div>

            <div className="mt-[6rem] mx-auto w-full">
                <Footer></Footer>
            </div>
        </div>
        </div>
    )
}

export default Services