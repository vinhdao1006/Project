import React from 'react'

const BimecLogo = () => {
    return (
<div className="w-full flex items-center justify-between px-6 pt-4 pb-4">
    {/* Logo */}
    <div className="flex-shrink-0">
        <a href="/home" className="text-[#181C32] font-bold text-2xl">
            BIMEC
        </a>
    </div>

    {/* Sign In Button */}
    <div>
        <a
            href="/login"
            className="bg-bimec-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
            Sign In
        </a>
    </div>
</div>


    )
}

export default BimecLogo