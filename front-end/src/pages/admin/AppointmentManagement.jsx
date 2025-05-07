import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import SideBar from './SideBar';

const appointments = [
  {
    name: 'John Doe',
    date: '2024-06-10',
    time: '10:00 AM',
    treatment: 'Routine Check-Ups',
    doctor: 'Dr. Petra Winsbury',
    status: 'Confirmed',
  },
  {
    name: 'Jane Smith',
    date: '2024-06-11',
    time: '12:00 AM',
    treatment: 'Gynecology',
    doctor: 'Dr. Olivia Martinez',
    status: 'Pending',
  },
  {
    name: 'Mark Johnson',
    date: '2024-06-12',
    time: '09:00 AM',
    treatment: 'Paediatrics',
    doctor: 'Dr. Michael Brown',
    status: 'Cancelled',
  },
  // Add more rows...
];

const AppointmentsManagement = () => {
  const [filterStatus, setFilterStatus] = useState('All'); // State to manage the selected filter
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const itemsPerPage = 5; // Number of items per page

  // Filter appointments based on the selected status
  const filteredAppointments =
    filterStatus === 'All'
      ? appointments
      : appointments.filter((appointment) => appointment.status === filterStatus);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center border rounded px-3 w-1/3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search appointments..." className="flex-1 outline-none py-2" />
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
          {['Confirmed', 'Pending', 'Cancelled'].map((status) => (
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
                {['Name', 'Date', 'Time', 'Treatment', 'Doctor', 'Status'].map((heading) => (
                  <th key={heading} className="px-4 py-3 whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedAppointments.map((doc, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{doc.name}</td>
                  <td className="px-4 py-3">{doc.date}</td>
                  <td className="px-4 py-3">{doc.time}</td>
                  <td className="px-4 py-3">{doc.treatment}</td>
                  <td className="px-4 py-3">{doc.doctor}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        doc.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : doc.status === 'Pending'
                          ? 'bg-blue-100 text-blue-700'
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
          <div>Showing {paginatedAppointments.length} of {filteredAppointments.length}</div>
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

export default AppointmentsManagement;