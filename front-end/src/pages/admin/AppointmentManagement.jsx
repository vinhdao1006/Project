import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
} from "lucide-react";
import SideBar from "./SideBar";
import Header from "./Header";
import axios from "axios";

const AppointmentsManagement = () => {
  const [filterStatus, setFilterStatus] = useState("All"); // State to manage the selected filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const [appointments, setAppointments] = useState([]); // State to manage appointments
  const itemsPerPage = 5; // Number of items per page

  // Map from our current status names to the doctor/appointment status types
  const mapStatusToType = {
    Confirmed: "checked",
    Pending: "pending",
    Cancelled: "canceled",
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/appointments"
        );
        const data = response.data.map((appointment) => ({
          name: appointment.patientInfo
            ? `${appointment.patientInfo.firstname} ${appointment.patientInfo.lastname}`
            : "Unknown",
          doctor: appointment.doctorInfo
            ? `Dr. ${appointment.doctorInfo.firstname} ${appointment.doctorInfo.lastname}`
            : "Unknown",
          date: appointment.appointmentDate
            ? new Date(appointment.appointmentDate).toLocaleDateString()
            : "",
          time: appointment.appointmentTime || "",
          status: appointment.status,
          treatment: appointment.specialtyId || "",
        }));
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();

    const intervalId = setInterval(fetchAppointments, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Count by status type for filter counts
  const pendingCount = appointments.filter(
    (a) => a.status === "Pending"
  ).length;
  const cancelledCount = appointments.filter(
    (a) => a.status === "Cancelled"
  ).length;
  const confirmedCount = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;

  // Filter appointments based on the selected status and search term
  const filteredAppointments = appointments
    .filter((appointment) =>
      filterStatus === "All" ? true : appointment.status === filterStatus
    )
    .filter(
      (appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.treatment
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Status style mapping to match doctor/appointment page
  const statusStyles = {
    Confirmed: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-500",
      icon: CheckCircle,
    },
    Pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
      icon: Clock,
    },
    Cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "bg-red-500",
      icon: XCircle,
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

        {/* Content Container */}
        <main className="pt-16 flex flex-col mt-2">
          <div className="p-8 flex-1 bg-gray-50 m-1">
            {/* Search and Filters Section */}
            <div className="flex flex-wrap justify-between items-center mb-6">
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
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${
                    filterStatus === "All"
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleFilterChange("All")}
                >
                  All
                </button>

                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${
                    filterStatus === "Confirmed"
                      ? "bg-green-50 text-green-700 border border-green-300"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleFilterChange("Confirmed")}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                  Checked ({confirmedCount})
                </button>

                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${
                    filterStatus === "Pending"
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-300"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleFilterChange("Pending")}
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></div>
                  Pending ({pendingCount})
                </button>

                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${
                    filterStatus === "Cancelled"
                      ? "bg-red-50 text-red-700 border border-red-300"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleFilterChange("Cancelled")}
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                  Canceled ({cancelledCount})
                </button>
              </div>
            </div>

            {/* Table Card */}
            <div className="max-w-full bg-white rounded-xl p-6 shadow-sm">
              <div className="border border-gray-200 rounded-xl overflow-hidden max-w-full">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase">
                    <tr>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Patient
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Time
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M3 21h18"></path>
                            <path d="M19 21v-4"></path>
                            <path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path>
                            <path d="M10 17v-2"></path>
                            <path d="M14 17v-2"></path>
                            <path d="M12 17v-6"></path>
                            <path d="M14 11V5a2 2 0 0 0-4 0v6"></path>
                            <path d="M4 13a2 2 0 0 1 0-4"></path>
                            <path d="M20 13a2 2 0 0 0 0-4"></path>
                          </svg>
                          Room
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" />
                          Doctor
                        </div>
                      </th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedAppointments.map((appointment, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-bimec-light-green/20 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium">
                              {appointment.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="font-medium text-gray-900">
                              {appointment.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>{appointment.date}</span>
                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                              {appointment.time}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                            Room {Math.floor(Math.random() * 20) + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                          {appointment.doctor}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                              statusStyles[appointment.status].bg
                            } ${statusStyles[appointment.status].text}`}
                          >
                            {React.createElement(
                              statusStyles[appointment.status].icon,
                              { className: "w-4 h-4" }
                            )}
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
                  <p className="text-gray-500">
                    No appointments found matching your filters.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredAppointments.length > 0 && (
                <div className="flex flex-wrap justify-between items-center mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredAppointments.length
                    )}{" "}
                    of {filteredAppointments.length} results
                  </p>

                  <div className="flex items-center gap-1 mt-4 md:mt-0">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-colors ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:text-bimec-green"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" && handlePageChange(page)
                        }
                        disabled={page === "..."}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-bimec-green text-white"
                            : page === "..."
                            ? "text-gray-400 cursor-default"
                            : "text-gray-600 hover:bg-gray-100"
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
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:text-bimec-green"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentsManagement;
