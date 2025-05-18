import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { 
  CalendarDaysIcon, 
  UserIcon, 
  HomeModernIcon, 
  ExclamationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Updated patient data with new status types
const patientsData = [
  {
    admitted: "27 Dec, 2024",
    patient: "Dianne Russell",
    room: "BC5001",
    concern: "Upper Abdomen General",
    status: { label: "Pending", type: "pending" },
  },
  {
    admitted: "03 Feb, 2023",
    patient: "Bessie Cooper",
    room: "DMK502",
    concern: "Gynecologic Disorders",
    status: { label: "Canceled", type: "canceled" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Marvin McKinney",
    room: "DMK502",
    concern: "Brain, Spinal Cord, and Nerve Disorders",
    status: { label: "Checked", type: "checked" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Esther Howard",
    room: "DMK502",
    concern: "Digestive Disorders",
    status: { label: "Checked", type: "checked" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Marvin McKinney",
    room: "BC1022",
    concern: "Upper Abdomen General",
    status: { label: "Pending", type: "pending" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Annette Black",
    room: "BC1022",
    concern: "Digestive Disorders",
    status: { label: "Pending", type: "pending" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Cameron Williamson",
    room: "BC1022",
    concern: "Liver and Gallbladder Disorders",
    status: { label: "Canceled", type: "canceled" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Guy Hawkins",
    room: "BC1022",
    concern: "Medical Care During Pregnancy",
    status: { label: "Checked", type: "checked" },
  },
];

// Updated status styles with only the three required statuses
const statusStyles = {
  pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
    icon: ClockIcon
  },
  canceled: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    icon: XCircleIcon
  },
  checked: {
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
    icon: CheckCircleIcon
  }
};

function StatusBadge({ status }) {
  const style = statusStyles[status.type] || statusStyles.pending;
  const Icon = style.icon;
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <Icon className="w-4 h-4" />
      {status.label}
    </span>
  );
}

function PatientsTable({ paginatedPatients, onPatientClick }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-4 h-4" />
                Admitted
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Patient
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <HomeModernIcon className="w-4 h-4" />
                Room
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ExclamationCircleIcon className="w-4 h-4" />
                Concern
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedPatients.map((patient, index) => (
            <tr
              key={index}
              className="hover:bg-bimec-light-green/30 cursor-pointer transition-colors duration-150"
              onClick={() => onPatientClick(patient)}
            >
              <td className="px-6 py-4 text-sm text-gray-900">
                {patient.admitted}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium">
                    {patient.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {patient.patient}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                  {patient.room}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                {patient.concern}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={patient.status} />
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
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const totalPages = Math.ceil(patientsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = patientsData.slice(
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

  // Count by status type for dashboard stats
  const pendingCount = patientsData.filter(p => p.status.type === 'pending').length;
  const canceledCount = patientsData.filter(p => p.status.type === 'canceled').length;
  const checkedCount = patientsData.filter(p => p.status.type === 'checked').length;

  return (
    <div className="flex flex-1 min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="flex-1 p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{patientsData.length}</p>
                </div>
                <div className="w-12 h-12 bg-bimec-light-green rounded-lg flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-bimec-green" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Canceled</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{canceledCount}</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <XCircleIcon className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Checked</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{checkedCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <PatientsTable
              paginatedPatients={paginatedPatients}
              onPatientClick={handlePatientClick}
            />
            
            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, patientsData.length)} of {patientsData.length} results
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
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
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorAppoinments;