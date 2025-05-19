import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import SideBar from './SideBar';
import Header from './Header';

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

  // Status style mapping
  const statusStyles = {
    Confirmed: {
      bg: 'bg-bimec-light-green',
      text: 'text-bimec-green',
      icon: <div className="w-2 h-2 rounded-full bg-bimec-green mr-1.5"></div>
    },
    Pending: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></div>
    },
    Cancelled: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-2">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="col-span-10">
        <Header />
        
        {/* Main Content - Thêm pt-16 để tạo khoảng cách cho header */}
        <main className="pt-16 flex flex-col">
          {/* Content Container */}
          <div className="p-8 flex-1">
            {/* Filters Row */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              {/* Search Field */}
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Search appointments..." 
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bimec-green/20 focus:border-bimec-green"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                    ${filterStatus === 'All' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setFilterStatus('All')}
                >
                  All
                </button>
                
                {Object.keys(statusStyles).map((status) => (
                  <button
                    key={status}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                      ${filterStatus === status
                        ? `${statusStyles[status].bg} ${statusStyles[status].text} border border-${status === 'Confirmed' ? 'bimec-green' : status === 'Pending' ? 'blue-300' : 'red-300'}`
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setFilterStatus(status)}
                  >
                    {statusStyles[status].icon}
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Name
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Time
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Treatment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" />
                          Doctor
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedAppointments.map((appointment, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium mr-3">
                              {appointment.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.treatment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.doctor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[appointment.status].bg} ${statusStyles[appointment.status].text}`}>
                            {statusStyles[appointment.status].icon}
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Empty state if no results */}
              {paginatedAppointments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No appointments found matching your filters.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} results
              </p>
              
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-bimec-green text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentsManagement;