import React, { useState } from 'react';
import Select from 'react-select';
import { UserPlus, BookOpen, Languages, Award, GraduationCap, DollarSign, Clock } from 'lucide-react';

const specialties = [
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

const languages = ["Vietnamese", "English"]; 
const titles = ["Professor", "Associate Professor"];
const degrees = [
  "MD", 
  "PhD", 
  "Bachelor",
  "Resident Doctor", 
  "Specialist Level 1 Doctor", 
  "Specialist Level 2 Doctor"];

const toOptions = (array) => array.map(item => ({ label: item, value: item }));

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid #285430' : '1px solid #5f8d4d',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(95, 141, 77, 0.1)' : 'none',
    borderRadius: '8px',
    padding: '2px',
    '&:hover': {
      border: '1px solid #285430',
    },
    fontSize: '0.875rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '0.875rem',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#E7F0E2' : state.isFocused ? '#F0F7ED' : 'white',
    color: state.isSelected ? '#285430' : '#111827',
    fontSize: '0.875rem',
    '&:active': {
      backgroundColor: '#E7F0E2',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#E7F0E2',
    borderRadius: '4px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#285430',
    fontSize: '0.75rem',
    fontWeight: 500,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#285430',
    '&:hover': {
      backgroundColor: '#C7E2B7',
      color: '#285430',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Ensure dropdown appears above other elements
  }),
};

const AddDoctor = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    consultantFee: '',
    experience: '',
    title: '',
    language: [],
    degree: '',
  });
  const [error, setError] = useState(null);

  const handleMultiChange = (name, isMulti = true) => (selected) => {
    setFormData((prev) => ({
      ...prev,
      [name]: isMulti
        ? selected?.map((item) => item.value) || []
        : selected?.value || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        name: formData.name,
        specialty: formData.specialty,
        title: formData.title,
        consultationFee: Number(formData.consultantFee),
        experience: Number(formData.experience),
        language: formData.language,
        degree: formData.degree,
      };

      // Here you would typically make an API call

      onClose(); // Close the modal after submission
    } catch (err) {
      console.error("Failed to create doctor:", err);
      setError("Failed to create doctor. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Doctor Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 flex items-start">
              <span className="bg-red-100 p-1 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="coolinput">
              <label className="text" htmlFor="name">
                <UserPlus size={14} className="mr-1 inline-block" />
                Doctor's Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Dr. Smith"
                required
                className="input bg-white"
              />
            </div>

            <div className="coolinput">
              <label className="text" htmlFor="specialty">
                <BookOpen size={14} className="mr-1 inline-block" />
                Specialty
              </label>
              <div className="select-container relative z-20">
                <Select
                  id="specialty"
                  options={toOptions(specialties)}
                  isMulti={false}
                  onChange={handleMultiChange('specialty', false)}
                  placeholder="Select specialty"
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
            </div>

            <div className="coolinput">
              <label className="text" htmlFor="language">
                <Languages size={14} className="mr-1 inline-block" />
                Languages
              </label>
              <div className="select-container relative z-20">
                <Select
                  id="language"
                  options={toOptions(languages)}
                  isMulti
                  onChange={handleMultiChange('language')}
                  placeholder="Select languages"
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
            </div>

            <div className="coolinput">
              <label className="text" htmlFor="title">
                <Award size={14} className="mr-1 inline-block" />
                Title
              </label>
              <div className="select-container relative z-20">
                <Select
                  id="title"
                  options={toOptions(titles)}
                  isMulti={false}
                  onChange={handleMultiChange('title', false)}
                  placeholder="Select title"
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
            </div>

            <div className="coolinput">
              <label className="text" htmlFor="degree">
                <GraduationCap size={14} className="mr-1 inline-block" />
                Degree
              </label>
              <div className="select-container relative z-20">
                <Select
                  id="degree"
                  options={toOptions(degrees)}
                  isMulti={false}
                  onChange={handleMultiChange('degree', false)}
                  placeholder="Select degree"
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
            </div>

            <div className="coolinput">
              <label className="text" htmlFor="consultantFee">
                <DollarSign size={14} className="mr-1 inline-block" />
                Consultant Fee
              </label>
              <input
                id="consultantFee"
                name="consultantFee"
                type="number"
                value={formData.consultantFee}
                onChange={handleChange}
                placeholder="e.g., 100"
                required
                className="input bg-white"
              />
            </div>

            <div className="coolinput">
              <label className="text" htmlFor="experience">
                <Clock size={14} className="mr-1 inline-block" />
                Experience (years)
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 5"
                required
                className="input bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-bimec-green hover:bg-bimec-heavy-green text-white transition-colors duration-200 text-sm font-medium"
            >
              Add Doctor
            </button>
          </div>
        </form>

        <style jsx>{`
          .coolinput {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
          }

          .coolinput label.text {
            font-size: 0.75rem;
            color: #285430;
            font-weight: 700;
            position: relative;
            top: 0.5rem;
            margin: 0 0 0 7px;
            padding: 0 3px;
            background: #ffffff;
            width: fit-content;
            z-index: 10;
            display: flex;
            align-items: center;
          }

          .coolinput .input {
            padding: 11px 10px;
            font-size: 0.875rem;
            border: 1px #5f8d4d solid;
            border-radius: 8px;
            background: #ffffff;
            transition: all 0.3s ease;
            color: #111827;
          }

          .coolinput .input:focus {
            outline: none;
            border-color: #285430;
            box-shadow: 0 0 0 3px rgba(95, 141, 77, 0.1);
          }

          .coolinput .input:hover {
            border-color: #285430;
          }
          
          .select-container {
            position: relative;
            z-index: 5;
          }
          
          .react-select__control {
            min-height: 42px !important;
          }
          
          /* Remove spinner buttons from number inputs */
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
          
          /* Fix menu portal positioning */
          .react-select__menu-portal {
            z-index: 9999 !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AddDoctor;