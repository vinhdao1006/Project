import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';

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

    const payload = {
      name: formData.name,
      specialty: formData.specialty,
      title: formData.title,
      consultationFee: Number(formData.consultantFee),
      experience: Number(formData.experience),
      language: formData.language,
      degree: formData.degree,
    };

    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-5/6  overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Doctor Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specialties:</label>
            <Select
              options={toOptions(specialties)}
              isMulti = {false}
              onChange={handleMultiChange('specialty', false)}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Language:</label>
            <Select
              options={toOptions(languages)}
              isMulti
              onChange={handleMultiChange('language')}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <Select
              options={toOptions(titles)}
              isMulti = {false}
              onChange={handleMultiChange('title', false)}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Degree:</label>
            <Select
              options={toOptions(degrees)}
              isMulti = {false}
              onChange={handleMultiChange('degree', false)}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Consultant Fee:</label>
            <input
              type="number"
              name="consultantFee"
              value={formData.consultantFee}
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Experience (years):</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-bimec-green text-white px-4 py-2 rounded text-sm hover:bg-bimec-heavy-green"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;