import React, { useState, useEffect } from "react";
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
import axios from "axios";

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All"); // State to manage the selected filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/doctors");
        const data = response.data.map((doctor) => ({
          name: `${doctor.firstname} ${doctor.lastname}`,
          department: doctor.specialty,
          todayAppointments: doctor.todayAppointments || 0,
          status: doctor.availability.map((a) => a.status)[0],
        }));
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleAddDoctorClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter doctors based on the selected status and search term
  const filteredDoctors = doctors
    .filter((doctor) =>
      filterStatus === "All" ? true : doctor.status === filterStatus
    )
    .filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  // Status style mapping
  const statusStyles = {
    Available: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-500",
      icon: <Check className="w-4 h-4" />,
    },
    Unavailable: {
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "bg-red-500",
      icon: <X className="w-4 h-4" />,
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
            {/* Top Row with Search and Add Button */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Search Field */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={handleSearch}
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

                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                    ${
                      filterStatus === "Available"
                        ? "bg-green-50 text-green-700 border border-green-300"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setFilterStatus("Available")}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                    Available (
                    {doctors.filter((d) => d.status === "Available").length})
                  </button>

                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                    ${
                      filterStatus === "Unavailable"
                        ? "bg-red-50 text-red-700 border border-red-300"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setFilterStatus("Unavailable")}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                    Unavailable (
                    {doctors.filter((d) => d.status === "Unavailable").length})
                  </button>
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

            {/* Table Section with white background */}
            <div className="max-w-full bg-white rounded-xl p-6 shadow-sm">
              {/* Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden max-w-full">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase">
                    <tr>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <UserRound className="w-4 h-4" />
                          Name
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Department
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Today's Appointments
                        </div>
                      </th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedDoctors.map((doctor, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-bimec-light-green/20 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white text-xs font-medium">
                              {doctor.name.split(" ")[1][0]}
                              {doctor.name.split(" ")[2]
                                ? doctor.name.split(" ")[2][0]
                                : ""}
                            </div>
                            <span className="font-medium text-gray-900">
                              {doctor.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                            {doctor.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <span
                            className={
                              doctor.todayAppointments > 0
                                ? "font-medium text-gray-900"
                                : ""
                            }
                          >
                            {doctor.todayAppointments} appointment
                            {doctor.todayAppointments !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
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

              {/* Pagination */}
              {filteredDoctors.length > 0 && (
                <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredDoctors.length
                    )}{" "}
                    of {filteredDoctors.length} results
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 rounded-lg transition-colors"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft
                        className={`w-5 h-5 ${
                          currentPage === 1
                            ? "text-gray-300"
                            : "text-gray-600 hover:text-bimec-green"
                        }`}
                      />
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
                      className="p-2 rounded-lg transition-colors"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <ChevronRight
                        className={`w-5 h-5 ${
                          currentPage === totalPages || totalPages === 0
                            ? "text-gray-300"
                            : "text-gray-600 hover:text-bimec-green"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
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
