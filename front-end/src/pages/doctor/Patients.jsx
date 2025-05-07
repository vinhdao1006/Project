import React from "react";
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

function StatusDot({ color }) {
  return (
    <span
      aria-hidden="true"
      className="w-3 h-3 rounded-full inline-block"
      style={{ backgroundColor: color }}
    ></span>
  );
}

function PatientsTable() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between bg-[#F9FAFB] border-b border-gray-200 px-6 py-3">
        <h2 className="font-extrabold text-[#111827] text-sm select-none">
          Patients List
        </h2>
        <div className="flex flex-wrap gap-6 text-xs text-gray-500 select-none">
          <div className="flex items-center gap-1">
            <StatusDot color="#6FCF97" />
            <span>Discharged</span>
          </div>
          <div className="flex items-center gap-1">
            <StatusDot color="#2F5597" />
            <span>Report Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <StatusDot color="#6B21A8" />
            <span>ICU</span>
          </div>
          <div className="flex items-center gap-1">
            <StatusDot color="#3B8A9E" />
            <span>In Recovery</span>
          </div>
          <div className="flex items-center gap-1">
            <StatusDot color="#8B1E2F" />
            <span>Life Support</span>
          </div>
        </div>
      </div>
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-[#F9FAFB] text-xs text-gray-400 font-semibold">
          <tr>
            <th className="py-3 px-6 uppercase font-semibold">Admitted</th>
            <th className="py-3 px-6 uppercase font-semibold">Patient</th>
            <th className="py-3 px-6 uppercase font-semibold">Room</th>
            <th className="py-3 px-6 uppercase font-semibold">
              Area of Concern
            </th>
            <th className="py-3 px-6 uppercase font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {patientsData.map(
            (
              { admitted, patient, room, concern, status, highlight, rowBg },
              i
            ) => (
              <tr
                key={i}
                className={`${
                  rowBg === "white" ? "bg-white" : ""
                } hover:bg-[#E6F6FF]`}
              >
                <td className="py-4 px-6">{admitted}</td>
                <td className="py-4 px-6">{patient}</td>
                <td className="py-4 px-6">{room}</td>
                <td className="py-4 px-6">{concern}</td>
                <td
                  className="py-4 px-6 flex items-center gap-2"
                  style={{ color: status.color }}
                >
                  <StatusDot color={status.color} />
                  {status.label}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex flex-wrap items-center justify-between text-gray-600 text-sm select-none">
      <nav className="flex items-center gap-1 flex-wrap">
        <button
          aria-label="Previous page"
          className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 transition"
        >
          <i className="fas fa-arrow-left"></i> Previous
        </button>
        <button
          className="rounded bg-[#2F4F2F] text-white px-3 py-1 font-semibold"
          aria-current="page"
        >
          1
        </button>
        <button className="rounded hover:bg-gray-100 px-3 py-1 transition">
          2
        </button>
        <button className="rounded hover:bg-gray-100 px-3 py-1 transition">
          3
        </button>
        <button className="rounded hover:bg-gray-100 px-3 py-1 transition">
          4
        </button>
        <button className="rounded hover:bg-gray-100 px-3 py-1 transition">
          5
        </button>
        <span className="px-2 py-1">…</span>
        <button className="rounded hover:bg-gray-100 px-3 py-1 transition">
          10
        </button>
        <button
          aria-label="Next page"
          className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 transition"
        >
          Next <i className="fas fa-arrow-right"></i>
        </button>
      </nav>
      <div className="flex items-center gap-2">
        <span>Page</span>
        <select
          aria-label="Select page number"
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F2F] focus:border-transparent"
          defaultValue="2"
        >
          <option>2</option>
          <option>1</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <span>of 34</span>
      </div>
    </div>
  );
}

function Patients() {
  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="bg-[#F9FAFB] flex-1 p-7 overflow-auto">
          <div className="max-w-full bg-white rounded-xl p-6 space-y-6 shadow-sm">
            <div>
              <button
                type="button"
                className="bg-gray-200 text-gray-500 text-sm font-medium rounded-lg px-4 py-1 select-none"
              >
                Outpatients
              </button>
            </div>
            <PatientsTable />
            <Pagination />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Patients;
