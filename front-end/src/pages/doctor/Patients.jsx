import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { 
  UserIcon, 
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Updated patient data with new columns
const patientsData = [
  {
    patient: "Dianne Russell",
    dateOfBirth: "15 Apr, 1985",
    gender: "Female",
    lastVisit: "27 Dec, 2024",
    avatar: "DR"
  },
  {
    patient: "Bessie Cooper",
    dateOfBirth: "03 Jun, 1992",
    gender: "Female",
    lastVisit: "03 Feb, 2023",
    avatar: "BC"
  },
  {
    patient: "Marvin McKinney",
    dateOfBirth: "12 Nov, 1978",
    gender: "Male",
    lastVisit: "02 Mar, 2023",
    avatar: "MM"
  },
  {
    patient: "Esther Howard",
    dateOfBirth: "22 Sep, 1990",
    gender: "Female",
    lastVisit: "02 Mar, 2023",
    avatar: "EH"
  },
  {
    patient: "Marvin McKinney",
    dateOfBirth: "12 Nov, 1978",
    gender: "Male",
    lastVisit: "15 Jan, 2023",
    avatar: "MM"
  },
  {
    patient: "Annette Black",
    dateOfBirth: "19 Jul, 1995",
    gender: "Female",
    lastVisit: "02 Mar, 2023",
    avatar: "AB"
  },
  {
    patient: "Cameron Williamson",
    dateOfBirth: "05 May, 1988",
    gender: "Male",
    lastVisit: "14 Feb, 2023",
    avatar: "CW"
  },
  {
    patient: "Guy Hawkins",
    dateOfBirth: "23 Dec, 1983",
    gender: "Male",
    lastVisit: "02 Mar, 2023",
    avatar: "GH"
  },
];

// Gender badge component
function GenderBadge({ gender }) {
  const styles = {
    Male: "bg-blue-50 text-blue-700",
    Female: "bg-pink-50 text-pink-700",
    Other: "bg-purple-50 text-purple-700"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[gender] || styles.Other}`}>
      {gender}
    </span>
  );
}

function PatientsTable({ paginatedPatients, onPatientClick }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden max-w-full">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase">
          <tr>
            <th className="py-4 px-6">Patient</th>
            <th className="py-4 px-6">Date of Birth</th>
            <th className="py-4 px-6">Gender</th>
            <th className="py-4 px-6">Last Visit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedPatients.map((patient, index) => (
            <tr
              key={index}
              className="hover:bg-bimec-light-green/20 cursor-pointer transition-colors duration-150"
              onClick={() => onPatientClick(patient)}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium">
                    {patient.avatar}
                  </div>
                  <span className="font-medium text-gray-900">{patient.patient}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-500">{patient.dateOfBirth}</td>
              <td className="py-4 px-6">
                <GenderBadge gender={patient.gender} />
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <CalendarDaysIcon className="w-4 h-4 text-bimec-green" />
                  {patient.lastVisit}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Patients() {
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

  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="bg-gray-50 flex-1 p-7 overflow-auto">
          <div className="max-w-full bg-white rounded-xl p-6 shadow-sm">
            {/* Table */}
            <PatientsTable
              paginatedPatients={paginatedPatients}
              onPatientClick={handlePatientClick}
            />
            
            {/* Pagination */}
            <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
              <button
                className="p-2 rounded-lg transition-colors"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className={`w-5 h-5 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:text-bimec-green'}`} />
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
                className="p-2 rounded-lg transition-colors"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className={`w-5 h-5 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:text-bimec-green'}`} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Patients;