import React from 'react';
import img_PatientDoctor from '../../assets/image/Patient-Doctor.png';
import img_BlackDoctors2 from '../../assets/image/BlackDoctors2.png';
import icon_bandage from '../../assets/icon/icon_bandage.png';
import icon_cardiologram from '../../assets/icon/icon_cardiologram.png';
import icon_dnaTesting from '../../assets/icon/icon_dnaTesting.png';
import icon_bloodBank from '../../assets/icon/icon_bloodBank.png';

function ServicesSection() {
    return (
        <section className="py-10 px-6 sm:px-8 lg:px-16">
            {/* Header */}
            <h2 className="text-center text-bimec-green text-xl font-semibold uppercase tracking-wide mb-2">
                CARE YOU CAN BELIEVE IN
            </h2>
            <h1 className="text-center text-4xl font-bold mb-8 text-bimec-heavy-green font-yeseva">
                Our Services
            </h1>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
                {/* Left Sidebar */}
                <div className="w-full lg:w-1/5 h-auto lg:h-[17rem] bg-white shadow-lg rounded-md overflow-hidden mb-6 lg:mb-0">
                    <ul>
                        <li className="px-4 py-4 border-b border-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer group">
                            <span className="flex items-center group-hover:text-white">
                                <img
                                    src={icon_bandage}
                                    className="w-6 h-6 mr-2 filter group-hover:invert group-hover:brightness-0 group-hover:contrast-100"
                                    alt="Free Checkup"
                                />
                                Free Checkup
                            </span>
                        </li>
                        <li className="px-4 py-4 border-b border-gray-200 bg-bimec-green text-white cursor-pointer group hover:bg-bimec-heavy-green">
                            <span className="flex items-center">
                                <img
                                    src={icon_cardiologram}
                                    className="w-6 h-6 mr-2 filter group-hover:bg-bimec-heavy-green"
                                    alt="Cardiogram"
                                />
                                Cardiogram
                            </span>
                        </li>
                        <li className="px-4 py-4 border-b border-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer group">
                            <span className="flex items-center">
                                <img
                                    src={icon_dnaTesting}
                                    className="w-6 h-6 mr-2 filter group-hover:invert group-hover:brightness-0 group-hover:contrast-100"
                                    alt="DNA Testing"
                                />
                                DNA Testing
                            </span>
                        </li>
                        <li className="px-4 py-4 border-b border-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer group">
                            <span className="flex items-center">
                                <img
                                    src={icon_bloodBank}
                                    className="w-6 h-6 mr-2 filter group-hover:invert group-hover:brightness-0 group-hover:contrast-100"
                                    alt="Blood Bank"
                                />
                                Blood Bank
                            </span>
                        </li>
                        <li className="px-4 py-4 bg-gray-200 hover:bg-bimec-green hover:text-white cursor-pointer group">
                            <span className="text-center block text-bimec-green group-hover:text-white">
                                View All
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-3/5 lg:pl-8">
                    <h2 className="text-2xl font-sans mb-4">
                        A passion for putting patients first.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="w-full lg:w-1/5 flex flex-col space-y-4 lg:pl-4 mt-6 lg:mt-0">
                    <img
                        src={img_PatientDoctor}
                        alt="Doctor with patient"
                        className="rounded-md"
                    />
                    <img
                        src={img_BlackDoctors2}
                        alt="Team of doctors"
                        className="rounded-md"
                    />
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;