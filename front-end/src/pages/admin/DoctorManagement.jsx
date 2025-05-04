import React, { useState } from 'react';
import { Search, Filter, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import SideBar from './SideBar';
import AddDoctor from './AddDoctor'; 

const doctors = [
  {
    name: 'Dr. Petra Winsbury',
    id: 'WNH-GM-001',
    department: 'General Medicine',
    specialist: 'Routine Check-Ups',
    totalPatients: 150,
    todayAppointments: 10,
    status: 'Available',
  },
  {
    name: 'Dr. Olivia Martinez',
    id: 'WNH-CD-001',
    department: 'Cardiology',
    specialist: 'Heart Specialist',
    totalPatients: 200,
    todayAppointments: 0,
    status: 'Unavailable',
  },
  // Add more rows...
];

const DoctorsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleAddDoctorClick = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Doctors</h1>
          <button
            onClick={handleAddDoctorClick}
            className="bg-bimec-green text-white px-4 py-2 rounded hover:bg-bimec-heavy-green"
          >
            + Add Doctor
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center border rounded px-3 w-1/3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search name, ID, age..." className="flex-1 outline-none py-2" />
          </div>
          {['Department', 'Specialist', 'Status'].map((filter) => (
            <button key={filter} className="flex items-center gap-1 border px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
              <Filter className="w-4 h-4" />
              {filter}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase tracking-wide">
              <tr>
                {['Name', 'ID', 'Department', 'Specialist', 'Total Patients', "Today's Appointment", 'Availability Status', 'Action'].map((heading) => (
                  <th key={heading} className="px-4 py-3 whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{doc.name}</td>
                  <td className="px-4 py-3">{doc.id}</td>
                  <td className="px-4 py-3">{doc.department}</td>
                  <td className="px-4 py-3">{doc.specialist}</td>
                  <td className="px-4 py-3">{doc.totalPatients}</td>
                  <td className="px-4 py-3">{doc.todayAppointments}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
                    <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>Showing 1–12 of 58</div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-gray-200"><ChevronLeft size={18} /></button>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} className={`px-3 py-1 rounded ${n === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>{n}</button>
            ))}
            <button className="p-1 rounded hover:bg-gray-200"><ChevronRight size={18} /></button>
          </div>
        </div>
      </main>

      {/* Add Doctor Modal */}
      {isModalOpen && <AddDoctor onClose={handleCloseModal} />}
    </div>
  );
};

export default DoctorsManagement;