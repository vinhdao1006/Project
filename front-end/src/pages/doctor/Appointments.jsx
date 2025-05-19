import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { 
  UserIcon, 
  ClockIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Updated patient data without status information
const patientsData = [
  {
    patient: "Dianne Russell",
    time: "09:30 AM",
    concern: "Upper Abdomen General",
  },
  {
    patient: "Bessie Cooper",
    time: "11:00 AM",
    concern: "Gynecologic Disorders",
  },
  {
    patient: "Marvin McKinney",
    time: "02:15 PM",
    concern: "Brain, Spinal Cord, and Nerve Disorders",
  },
  {
    patient: "Esther Howard",
    time: "10:45 AM",
    concern: "Digestive Disorders",
  },
  {
    patient: "Marvin McKinney",
    time: "03:30 PM",
    concern: "Upper Abdomen General",
  },
  {
    patient: "Annette Black",
    time: "01:00 PM",
    concern: "Digestive Disorders",
  },
  {
    patient: "Cameron Williamson",
    time: "08:15 AM",
    concern: "Liver and Gallbladder Disorders",
  },
  {
    patient: "Guy Hawkins",
    time: "04:45 PM",
    concern: "Medical Care During Pregnancy",
  },
];

function PatientsTable({ paginatedPatients, onPatientClick }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden max-w-full">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase">
          <tr>
            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Patient
              </div>
            </th>
            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Time
              </div>
            </th>
            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <ExclamationCircleIcon className="w-4 h-4" />
                Concern
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedPatients.map((patient, index) => (
            <tr
              key={index}
              className="hover:bg-bimec-light-green/20 cursor-pointer transition-colors duration-150"
              onClick={() => onPatientClick(patient)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium">
                    {patient.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-medium text-gray-900">
                    {patient.patient}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                  {patient.time}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                {patient.concern}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DoctorAppoinments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Filter appointments based on search term only
  const filteredPatients = patientsData
    .filter(patient => 
      patient.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.concern.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePatientClick = (patient) => {
    navigate("/doctor/patient-detail", { state: { patient } });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="bg-gray-50 flex-1 p-7 overflow-auto">
          {/* Search Section */}
          <div className="flex items-center mb-6">
            {/* Search Field */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bimec-green/20 focus:border-bimec-green"
              />
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Table Section with white background */}
          <div className="max-w-full bg-white rounded-xl p-6 shadow-sm">
            {/* Table */}
            <PatientsTable
              paginatedPatients={paginatedPatients}
              onPatientClick={handlePatientClick}
            />
            
            {/* Empty state if no results */}
            {paginatedPatients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No appointments found matching your search.
                </p>
              </div>
            )}
            
            {/* Pagination */}
            {filteredPatients.length > 0 && (
              <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPatients.length)} of {filteredPatients.length} results
                </p>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-600 hover:text-bimec-green'
                    }`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-bimec-green text-white'
                          : page === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages || totalPages === 0
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-600 hover:text-bimec-green'
                    }`}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorAppoinments;