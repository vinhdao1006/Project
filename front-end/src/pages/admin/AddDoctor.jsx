import React, { useState } from 'react';
import Select from 'react-select';

const specialties = [
  "Cardiology", "Neurology", "Oncology", "Otorhinolaryngology", "Ophthalmology",
  "Cardiovascular", "Pulmonology", "Renal Medicine", "Gastroenterology",
  "Urology", "Dermatology", "Gynaecology"
];

const occupations = ["Full-time", "Part-time", "Visiting", "Resident"];
const languages = ["English", "Spanish", "French", "German", "Hindi", "Arabic", "Mandarin"];
const titles = ["Dr.", "Prof.", "Mr.", "Ms."];
const degrees = ["MBBS", "MD", "DO", "PhD", "DM", "MCh"];

const toOptions = (array) => array.map(item => ({ label: item, value: item }));

const AddDoctor = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: [],
    consultantFee: '',
    experience: '',
    occupation: [],
    language: [],
    title: [],
    degree: [],
  });

  const handleMultiChange = (name) => (selected) => {
    setFormData(prev => ({
      ...prev,
      [name]: selected ? selected.map(item => item.value) : [],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Doctor Info:", formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-full overflow-y-auto">
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
              isMulti
              onChange={handleMultiChange('specialty')}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Occupation:</label>
            <Select
              options={toOptions(occupations)}
              isMulti
              onChange={handleMultiChange('occupation')}
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
              isMulti
              onChange={handleMultiChange('title')}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Degree:</label>
            <Select
              options={toOptions(degrees)}
              isMulti
              onChange={handleMultiChange('degree')}
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