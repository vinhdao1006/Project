import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const specialtyOptions = [
    "Neurology",
    "Oncology",
    "Otorhinolaryngology",
    "Ophthalmology",
    "Cardiovascular",
    "Pulmonology",
    "Renal Medicine",
    "Gastroenterology",
    "Urology",
    "Dermatology",
    "Gynaecology"
];

const occupationOptions = [
    "Doctor",
    "Nurse",
    "Expert",
    "Specialist",
    "Consultant",
    "Pharmacist",
    "Traditional Medicine Doctor",
];

const Title = [
    "Professor",
    "Associate Professor",
];

const Language = [
    "Vietnamese",
    "English",
    "Chinese",
    "Korean",
];

const Degree = [
    "MD", // Doctor of Medicine
    "PhD",
    "Bachelor",
    "Resident Doctor", 
    "MSc",
    "Specialist Level 1 Doctor",
    "Specialist Level 2 Doctor",
];

const DoctorSearch = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState("Specialty")
    const [selectedOccupation, setSelectedOccupation] = useState("Occupation")
    const [selectedTitle, setSelectedTitle] = useState("Title")
    const [selectedLanguage, setSelectedLanguage] = useState("Language")
    const [selectedDegree, setSelectedDegree] = useState("Degree")

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-[2rem] mx-auto w-[64rem]">
            {/* Specialty */}
            <div>
                <Menu as="div" className="relative inline-block w-full text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-bimec-gray h-12">
                            {selectedSpecialty}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                            {specialtyOptions.map(option => (
                                <MenuItem key={option}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setSelectedSpecialty(option)}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block w-full px-4 py-2 text-left text-sm`}
                                        >
                                            {option}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            </div>

            {/* Occupation */}
            <div>
                <Menu as="div" className="relative inline-block w-full text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-bimec-gray h-12">
                            {selectedOccupation}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                            {occupationOptions.map(option => (
                                <MenuItem key={option}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setSelectedOccupation(option)}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block w-full px-4 py-2 text-left text-sm`}
                                        >
                                            {option}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            </div>

            {/* Title */}
            <div>
                <Menu as="div" className="relative inline-block w-full text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-bimec-gray h-12">
                            {selectedTitle}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                            {Title.map(option => (
                                <MenuItem key={option}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setSelectedTitle(option)}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block w-full px-4 py-2 text-left text-sm`}
                                        >
                                            {option}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            </div>

            {/* Language */}
            <div>
                <Menu as="div" className="relative inline-block w-full text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-bimec-gray h-12">
                            {selectedLanguage}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                            {Language.map(option => (
                                <MenuItem key={option}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setSelectedLanguage(option)}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block w-full px-4 py-2 text-left text-sm`}
                                        >
                                            {option}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            </div>

            {/* Degree */}
            <div>
                <Menu as="div" className="relative inline-block w-full text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-bimec-gray h-12">
                            {selectedDegree}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                            {Degree.map(option => (
                                <MenuItem key={option}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setSelectedDegree(option)}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block w-full px-4 py-2 text-left text-sm`}
                                        >
                                            {option}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </div>
        
    );
};

export default DoctorSearch;