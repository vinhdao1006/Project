import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import SideBar from './SideBar';
import AddDoctor from './AddDoctor';
import Header from './Header';

const doctors = [
  {
    name: 'Dr. Petra Winsbury',
    id: 'WNH-GM-001',
    department: 'General Medicine',
    totalPatients: 150,
    todayAppointments: 10,
    status: 'Available',
  },
  {
    name: 'Dr. Olivia Martinez',
    id: 'WNH-CD-001',
    department: 'Cardiology',
    totalPatients: 200,
    todayAppointments: 0,
    status: 'Unavailable',
  },
  {
    name: 'Dr. Michael Brown',
    id: 'WNH-OR-002',
    department: 'Orthopedics',
    totalPatients: 120,
    todayAppointments: 5,
    status: 'Available',
  },
  // Add more rows...
];

const DoctorsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All'); // State to manage the selected filter
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const itemsPerPage = 5; // Number of items per page

  const handleAddDoctorClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter doctors based on the selected status
  const filteredDoctors =
    filterStatus === 'All'
      ? doctors
      : doctors.filter((doctor) => doctor.status === filterStatus);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="grid grid-cols-12 min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="col-span-10 p-6">
        {/* Header */}
        <Header activeRouteName="Doctors" />

        {/* Search & Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center border rounded px-3 w-1/3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search name, ID, department..." className="flex-1 outline-none py-2" />
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
          {['Available', 'Unavailable'].map((status) => (
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
          <div className="flex justify-end items-center">
            <button
              onClick={handleAddDoctorClick}
              className="bg-bimec-green text-white px-4 py-2 rounded hover:bg-bimec-heavy-green"
            >
              + Add Doctor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase tracking-wide">
              <tr>
                {['Name', 'ID', 'Department', 'Total Patients', "Today's Appointment", 'Availability Status'].map((heading) => (
                  <th key={heading} className="px-4 py-3 whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedDoctors.map((doc, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{doc.name}</td>
                  <td className="px-4 py-3">{doc.id}</td>
                  <td className="px-4 py-3">{doc.department}</td>
                  <td className="px-4 py-3">{doc.totalPatients}</td>
                  <td className="px-4 py-3">{doc.todayAppointments}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        doc.status === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>Showing {paginatedDoctors.length} of {filteredDoctors.length}</div>
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

      {/* Add Doctor Modal */}
      {isModalOpen && <AddDoctor onClose={handleCloseModal} />}
    </div>
  );
};

export default DoctorsManagement;