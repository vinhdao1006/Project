import React, { useState } from "react";
import {
  Search,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  UserRound,
  Building2,
  Calendar,
  Check,
  X,
} from "lucide-react";
import SideBar from "./SideBar";
import AddDoctor from "./AddDoctor";
import Header from "./Header";

const doctors = [
  {
    name: "Dr. Petra Winsbury",
    department: "General Medicine",
    todayAppointments: 10,
    status: "Available",
  },
  {
    name: "Dr. Olivia Martinez",
    department: "Cardiology",
    todayAppointments: 0,
    status: "Unavailable",
  },
  {
    name: "Dr. Michael Brown",
    department: "Orthopedics",
    todayAppointments: 5,
    status: "Available",
  },
  {
    name: "Dr. Sarah Johnson",
    department: "Neurology",
    todayAppointments: 8,
    status: "Available",
  },
  {
    name: "Dr. Robert Wilson",
    department: "Pediatrics",
    todayAppointments: 12,
    status: "Available",
  },
  {
    name: "Dr. Emily Davis",
    department: "Dermatology",
    todayAppointments: 0,
    status: "Unavailable",
  },
  // Add more rows...
];

const DoctorsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All"); // State to manage the selected filter
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
    filterStatus === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.status === filterStatus);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    Available: {
      bg: "bg-bimec-light-green",
      text: "text-bimec-green",
      icon: <Check className="w-3 h-3 mr-1.5" />,
    },
    Unavailable: {
      bg: "bg-red-50",
      text: "text-red-600",
      icon: <X className="w-3 h-3 mr-1.5" />,
    },
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
        
        {/* Content Container - Thêm pt-16 để tạo khoảng cách cho header */}
        <main className="pt-16 flex flex-col">
          <div className="p-8 flex-1">
            {/* Top Row with Search and Add Button */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Search Field */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 
                          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bimec-green/20 focus:border-bimec-green"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                    ${
                      filterStatus === "All"
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setFilterStatus("All")}
                  >
                    All
                  </button>

                  {Object.keys(statusStyles).map((status) => (
                    <button
                      key={status}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                      ${
                        filterStatus === status
                          ? `${statusStyles[status].bg} ${
                              statusStyles[status].text
                            } border border-${
                              status === "Available"
                                ? "bimec-green/30"
                                : "red-300/30"
                            }`
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status === "Available" ? (
                        <div className="w-2 h-2 rounded-full bg-bimec-green mr-1.5"></div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                      )}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Doctor Button */}
              <button
                onClick={handleAddDoctorClick}
                className="bg-bimec-green hover:bg-bimec-heavy-green text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm"
              >
                <UserPlus className="w-5 h-5" />
                Add Doctor
              </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <UserRound className="w-4 h-4" />
                          Name
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Department
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Today's Appointments
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedDoctors.map((doctor, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium mr-3">
                              {doctor.name.split(" ")[1][0]}
                              {doctor.name.split(" ")[2]
                                ? doctor.name.split(" ")[2][0]
                                : ""}
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {doctor.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">
                            {doctor.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`text-sm ${
                                doctor.todayAppointments > 0
                                  ? "text-gray-900 font-medium"
                                  : "text-gray-500"
                              }`}
                            >
                              {doctor.todayAppointments} appointment
                              {doctor.todayAppointments !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              statusStyles[doctor.status].bg
                            } ${statusStyles[doctor.status].text}`}
                          >
                            {statusStyles[doctor.status].icon}
                            {doctor.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state if no results */}
              {paginatedDoctors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No doctors found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredDoctors.length)} of{" "}
                {filteredDoctors.length} results
              </p>

              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-bimec-green text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Doctor Modal */}
      {isModalOpen && <AddDoctor onClose={handleCloseModal} />}
    </div>
  );
};

export default DoctorsManagement;