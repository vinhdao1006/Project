import React, { useState, useEffect } from 'react';

const BimecLogo = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by verifying the token in cookies or localStorage
        const token = document.cookie.includes("token"); // Example check
        setIsLoggedIn(token);
    }, []);

    return (
        <div className="w-full flex items-center justify-between px-6 pt-4 pb-4">
            {/* Logo */}
            <div className="flex-shrink-0">
                <a href="/home" className="text-[#181C32] font-bold text-2xl">
                    BIMEC
                </a>
            </div>

            {/* Sign In Button */}
            {!isLoggedIn && (
                <div>
                    <a
                        href="/login"
                        className="bg-bimec-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Sign In
                    </a>
                </div>
            )}
        </div>
    );
};

export default BimecLogo;