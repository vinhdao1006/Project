import React from 'react'
import Bimec_logo from '../assets/image/Bimec_logo.png'

const BimecHeader = () => {
    return (
        <div className="mt-6 flex justify-end mt">
            <a href="http://localhost:5173/home" className="flex items-center">
                <img src={Bimec_logo} alt="Bimec Logo" className="mr-4"/>
                <p className="font-bold text-3xl">BIMEC</p>
            </a>
        </div>
    )
}

export default BimecHeader