import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { 
    HeartIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    LanguageIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

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
    "Gynaecology",
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
    const [selectedSpecialty, setSelectedSpecialty] = useState("Specialty");
    const [selectedOccupation, setSelectedOccupation] = useState("Occupation");
    const [selectedTitle, setSelectedTitle] = useState("Title");
    const [selectedLanguage, setSelectedLanguage] = useState("Language");
    const [selectedDegree, setSelectedDegree] = useState("Degree");

    const dropdownConfig = [
        { 
            icon: HeartIcon, 
            value: selectedSpecialty, 
            setValue: setSelectedSpecialty, 
            options: specialtyOptions,
            placeholder: "Specialty"
        },
        { 
            icon: BriefcaseIcon, 
            value: selectedOccupation, 
            setValue: setSelectedOccupation, 
            options: occupationOptions,
            placeholder: "Occupation"
        },
        { 
            icon: AcademicCapIcon, 
            value: selectedTitle, 
            setValue: setSelectedTitle, 
            options: Title,
            placeholder: "Title"
        },
        { 
            icon: LanguageIcon, 
            value: selectedLanguage, 
            setValue: setSelectedLanguage, 
            options: Language,
            placeholder: "Language"
        },
        { 
            icon: DocumentTextIcon, 
            value: selectedDegree, 
            setValue: setSelectedDegree, 
            options: Degree,
            placeholder: "Degree"
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-bimec-black mb-2">Find Your Healthcare Professional</h2>
                <p className="text-sm text-gray-600">Select filters to narrow down your search</p>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {dropdownConfig.map((config, index) => (
                    <Menu key={index} as="div" className="relative">
                        <MenuButton className="group w-full bg-white rounded-xl border border-gray-200 hover:border-bimec-green transition-all duration-200 ease-in-out shadow-sm hover:shadow-md px-4 py-3.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <config.icon className="h-5 w-5 text-gray-400 group-hover:text-bimec-green transition-colors" />
                                    <span className={`text-sm ${config.value === config.placeholder ? 'text-gray-400' : 'text-bimec-black font-medium'}`}>
                                        {config.value}
                                    </span>
                                </div>
                                <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-bimec-green transition-colors" />
                            </div>
                        </MenuButton>
                        <MenuItems className="absolute z-20 mt-2 w-full origin-top rounded-xl bg-white shadow-lg border border-gray-100 focus:outline-none overflow-hidden">
                            <div className="max-h-60 overflow-auto">
                                {config.options.map((option) => (
                                    <MenuItem key={option}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => config.setValue(option)}
                                                className={`${
                                                    active ? 'bg-bimec-light-green' : ''
                                                } w-full px-4 py-3 text-left text-sm transition-colors duration-150 ease-in-out
                                                ${config.value === option ? 'text-bimec-heavy-green font-medium bg-bimec-light-green' : 'text-gray-700'}`}
                                            >
                                                {option}
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuItems>
                    </Menu>
                ))}
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-8">
                <button className="flex items-center gap-2 bg-bimec-green hover:bg-bimec-heavy-green text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Search Professionals
                </button>
            </div>

            {/* Reset Filters */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => {
                        dropdownConfig.forEach(config => {
                            config.setValue(config.placeholder);
                        });
                    }}
                    className="text-sm text-gray-600 hover:text-bimec-green transition-colors"
                >
                    Reset all filters
                </button>
            </div>
        </div>
    );
};

export default DoctorSearch;