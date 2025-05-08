import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const patientsData = [
  {
    admitted: "27 Dec, 2024",
    patient: "Dianne Russell",
    room: "BC5001",
    concern: "Upper Abdomen General",
    status: { label: "Report Pending", color: "#3B8A9E" },
  },
  {
    admitted: "03 Feb, 2023",
    patient: "Bessie Cooper",
    room: "DMK502",
    concern: "Gynecologic Disorders",
    status: { label: "Life Support", color: "#8B1E2F" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Marvin McKinney",
    room: "DMK502",
    concern: "Brain, Spinal Cord, and Nerve Disorders",
    status: { label: "ICU", color: "#6B21A8" },
    highlight: true,
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Esther Howard",
    room: "DMK502",
    concern: "Digestive Disorders",
    status: { label: "Discharged", color: "#6FCF97" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Marvin McKinney",
    room: "BC1022",
    concern: "Upper Abdomen General –",
    status: { label: "Report Pending", color: "#2F5597" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Annette Black",
    room: "BC1022",
    concern: "Digestive Disorders",
    status: { label: "Report Pending", color: "#2F5597" },
    rowBg: "white",
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Cameron Williamson",
    room: "BC1022",
    concern: "Liver and Gallbladder Disorders",
    status: { label: "Report Pending", color: "#2F5597" },
  },
  {
    admitted: "02 Mar, 2023",
    patient: "Guy Hawkins",
    room: "BC1022",
    concern: "Medical Care During Pregnancy",
    status: { label: "Life Support", color: "#8B1E2F" },
  },
];

function PatientsTable({ paginatedPatients, onPatientClick }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-full">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-[#F9FAFB] text-xs text-gray-400 font-semibold">
          <tr>
            <th className="py-3 px-6 uppercase font-semibold">Admitted</th>
            <th className="py-3 px-6 uppercase font-semibold">Patient</th>
            <th className="py-3 px-6 uppercase font-semibold">Room</th>
            <th className="py-3 px-6 uppercase font-semibold">Concern</th>
            <th className="py-3 px-6 uppercase font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPatients.map((patient, index) => (
            <tr
              key={index}
              className="hover:bg-[#E6F6FF] cursor-pointer"
              onClick={() => onPatientClick(patient)}
            >
              <td className="py-4 px-6">{patient.admitted}</td>
              <td className="py-4 px-6">{patient.patient}</td>
              <td className="py-4 px-6">{patient.room}</td>
              <td className="py-4 px-6">{patient.concern}</td>
              <td
                className="py-4 px-6 flex items-center gap-2"
                style={{ color: patient.status.color }}
              >
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: patient.status.color }}
                ></span>
                {patient.status.label}
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
    setCurrentPage(page);
  };

  const handlePatientClick = (patient) => {
    navigate("/doctor/patient-detail", { state: { patient } });
  };

  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="bg-[#F9FAFB] flex-1 p-7 overflow-auto">
          <div className="max-w-full bg-white rounded-xl p-6 space-y-6 shadow-sm">
            <PatientsTable
              paginatedPatients={paginatedPatients}
              onPatientClick={handlePatientClick}
            />
            <div className="flex justify-between items-center text-sm text-gray-600">
              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorAppoinments;