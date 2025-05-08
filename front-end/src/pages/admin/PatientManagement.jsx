import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import SideBar from './SideBar';
import Header from './Header';

const patients = [
  {
    name: 'John Doe',
    id: '100',
    age: 30,
    treatment: 'Routine Check-Ups',
    doctor: 'Dr. Petra Winsbury',
    room: 'Room 101',
    status: 'Admitted',
  },
  {
    name: 'Jane Smith',
    id: '101',
    age: 20,
    treatment: 'Gynecology',
    doctor: 'Dr. Olivia Martinez',
    room: 'Room 102',
    status: 'Pending',
  },
  {
    name: 'Mark Johnson',
    id: '102',
    age: 40,
    treatment: 'Cardiology',
    doctor: 'Dr. Michael Brown',
    room: 'Room 103',
    status: 'Discharged',
  },
  // Add more rows...
];

const PatientsManagement = () => {
  const [filterStatus, setFilterStatus] = useState('All'); // State to manage the selected filter
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const itemsPerPage = 5; // Number of items per page

  // Filter patients based on the selected status
  const filteredPatients =
    filterStatus === 'All'
      ? patients
      : patients.filter((patient) => patient.status === filterStatus);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 grid grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="col-span-10 p-6">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patients</h1>
        </div> */}
        <Header activeRouteName="Patients" />

        {/* Search & Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center border rounded px-3 w-1/3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search name, ID, age..." className="flex-1 outline-none py-2" />
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-1 border px-3 py-2 rounded text-gray-600 hover:bg-gray-100"
              onClick={() => setFilterStatus('All')}
            >
              <Filter className="w-4 h-4" />
              All
            </button>
          </div>
          {['Admitted', 'Pending', 'Discharged'].map((status) => (
            <button
              key={status}
              className={`flex items-center gap-1 border px-3 py-2 rounded text-gray-600 hover:bg-gray-100 ${
                filterStatus === status ? 'bg-gray-200 font-bold' : ''
              }`}
              onClick={() => setFilterStatus(status)}
            >
              <Filter className="w-4 h-4" />
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase tracking-wide">
              <tr>
                {['Name', 'ID', 'Age', 'Treatment', 'Doctor Assigned', 'Room', 'Status'].map((heading) => (
                  <th key={heading} className="px-4 py-3 whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{patient.name}</td>
                  <td className="px-4 py-3">{patient.id}</td>
                  <td className="px-4 py-3">{patient.age}</td>
                  <td className="px-4 py-3">{patient.treatment}</td>
                  <td className="px-4 py-3">{patient.doctor}</td>
                  <td className="px-4 py-3">{patient.room}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        patient.status === 'Admitted'
                          ? 'bg-green-100 text-green-700'
                          : patient.status === 'Pending'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>Showing {paginatedPatients.length} of {filteredPatients.length}</div>
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded hover:bg-gray-200"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`px-3 py-1 rounded ${n === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="p-1 rounded hover:bg-gray-200"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientsManagement;