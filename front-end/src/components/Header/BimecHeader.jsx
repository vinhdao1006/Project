import React from 'react';
import Bimec_logo from '../../assets/icon/Bimec_logo.png';

const BimecHeader = () => {
    return (
        <div className="mt-6 flex justify-center sm:justify-end px-4 sm:px-8 lg:px-16">
            <a href="http://localhost:5173/home" className="flex items-center">
                <img
                    src={Bimec_logo}
                    alt="Bimec Logo"
                    className="mr-2 sm:mr-4 w-8 sm:w-10 lg:w-12 h-auto"
                />
                <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-center">
                    BIMEC
                </p>
            </a>
        </div>
    );
};

export default BimecHeader;