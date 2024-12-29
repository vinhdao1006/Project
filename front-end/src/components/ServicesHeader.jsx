import React from 'react';
import img_PatientDoctor from '../assets/image/Patient-Doctor.png'
import img_BlackDoctors2 from '../assets/image/BlackDoctors2.png'
function ServicesSection() {
    return (
        <section className="py-10 px-8">
            <h2 className="text-center text-bimec-green text-xl font-semibold uppercase tracking-wide mb-2">
                CARE YOU CAN BELIEVE IN
            </h2>
            <h1 className="text-center text-4xl font-bold mb-8 text-bimec-heavy-green font-yeseva">Our Services</h1>

            <div className="flex max-w-7xl mx-auto">
                {/* Left Sidebar */}
                <div className="w-1/5 bg-white shadow-lg rounded-md overflow-hidden">
                    <ul>
                        <li className="px-4 py-4 border-b border-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer group">
                            <span className="flex items-center group-hover:text-white">
                                <svg
                                    className="w-6 h-6 text-bimec-green mr-2 group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9.75v4.5m-4.5-2.25h9m3.75 1.5c0 7.5-7.5 12-7.5 12s-7.5-4.5-7.5-12a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                Free Checkup
                            </span>
                        </li>
                        <li className="px-4 py-4 bg-bimec-green text-white border-b border-gray-200 cursor-pointer">
                            <span className="flex items-center">
                                <svg
                                    className="w-6 h-6 text-white mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9.75v4.5m-4.5-2.25h9m3.75 1.5c0 7.5-7.5 12-7.5 12s-7.5-4.5-7.5-12a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                Cardiogram
                            </span>
                        </li>
                        <li className="px-4 py-4 border-b border-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer">
                            <span className="flex items-center">
                                <svg
                                    className="w-6 h-6 text-bimec-green mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9.75v4.5m-4.5-2.25h9m3.75 1.5c0 7.5-7.5 12-7.5 12s-7.5-4.5-7.5-12a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                Dna Testing
                            </span>
                        </li>
                        <li className="px-4 py-4 border-b border-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer">
                            <span className="flex items-center">
                                <svg
                                    className="w-6 h-6 text-bimec-green mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9.75v4.5m-4.5-2.25h9m3.75 1.5c0 7.5-7.5 12-7.5-12a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                Blood Bank
                            </span>
                        </li>
                        <li className="px-4 py-4 bg-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer">
                            <span className="text-center block text-bimec-green">View All</span>
                        </li>
                    </ul>
                </div>

                {/* Right Content */}
                <div className="w-3/5 pl-8">
                    <h2 className="text-2xl font-sans mb-4">A passion for putting patients first.</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <ul className="list-none">
                            <li className="relative pl-6 mb-2">
                                <span className="absolute left-0 top-1 w-3 h-3 bg-bimec-green rounded-full"></span>
                                A Passion for Healing
                            </li>
                            <li className="relative pl-6 mb-2">
                                <span className="absolute left-0 top-1 w-3 h-3 bg-bimec-green rounded-full"></span>
                                All our best
                            </li>
                            <li className="relative pl-6">
                                <span className="absolute left-0 top-1 w-3 h-3 bg-bimec-green rounded-full"></span>
                                A Legacy of Excellence
                            </li>
                        </ul>
                        <ul className="list-none">
                            <li className="relative pl-6 mb-2">
                                <span className="absolute left-0 top-1 w-3 h-3 bg-bimec-green rounded-full"></span>
                                5-Star Care
                            </li>
                            <li className="relative pl-6 mb-2">
                                <span className="absolute left-0 top-1 w-3 h-3 bg-bimec-green rounded-full"></span>
                                Believe in Us
                            </li>
                            <li className="relative pl-6">
                                <span className="absolute left-0 top-1 w-3 h-3 bg-bimec-green rounded-full"></span>
                                Always Caring
                            </li>
                        </ul>
                    </div>
                    <p className="text-gray-500 mt-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
                        Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
                    </p>
                    <p className="text-gray-500 mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
                        Convallis felis vitae tortor augue. Velit nascetur proin massa in.
                    </p>
                </div>


                {/* Images in Column */}
                <div className="w-1/5 flex flex-col space-y-4 pl-4">
                    <img src={img_PatientDoctor} alt="Doctor with patient" className="rounded-md" />
                    <img src={img_BlackDoctors2} alt="Team of doctors" className="rounded-md" />
                </div>
            </div>
        </section>

    );
}

export default ServicesSection;
