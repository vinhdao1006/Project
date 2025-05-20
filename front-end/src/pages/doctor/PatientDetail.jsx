import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  HeartIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CalendarIcon,
  PlusIcon,
  DocumentTextIcon,
  BeakerIcon,
  ScaleIcon,
  ClockIcon,
  FireIcon,
  CakeIcon,
  UserGroupIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

// Helper components
const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 rounded-lg bg-bimec-light-green flex items-center justify-center text-bimec-heavy-green">
      {icon}
    </div>
    <h3 className="font-medium text-bimec-black">{title}</h3>
  </div>
);

const TabButton = ({ active, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
      active
        ? "bg-bimec-light-green text-bimec-heavy-green"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    {children}
  </button>
);

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          selectedDate === new Date().toISOString().split("T")[0]
            ? "bg-bimec-light-green text-bimec-heavy-green"
            : "bg-gray-100"
        }`}
      >
        {selectedDate === new Date().toISOString().split("T")[0]
          ? "Today"
          : formatDate(selectedDate)}
      </span>
      <button
        onClick={() => changeDate(-1)}
        className="p-1.5 rounded-full bg-white border border-gray-200 hover:bg-bimec-light-green text-gray-500 hover:text-bimec-heavy-green"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-bimec-green"
      />
      <button
        onClick={() => changeDate(1)}
        className="p-1.5 rounded-full bg-white border border-gray-200 hover:bg-bimec-light-green text-gray-500 hover:text-bimec-heavy-green"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

// Main components
const PatientInfo = ({ patient }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    return names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 mb-6 hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-bimec-light-green flex items-center justify-center border-2 border-bimec-green">
              <span className="text-bimec-heavy-green text-xl font-bold">
                {getInitials(patient.patient)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-bimec-green rounded-full flex items-center justify-center">
              <span className="text-white text-xs">M</span>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-bimec-black text-lg">
              {patient.patient}
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <UserIcon className="w-3 h-3" />
                <span>{patient.gender}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <div className="flex items-center gap-1">
                <CakeIcon className="w-3 h-3" />
                <span>{patient.dateOfBirth}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 text-bimec-green" />
              <span>mamckinder@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-bimec-green" />
              <span>+880 172524123123</span>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 bg-bimec-light-green text-bimec-heavy-green border border-bimec-green/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-bimec-green hover:text-white">
            <PencilIcon className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const Vitals = () => {
  // Define different color schemes for vitals
  const vitalColors = [
    {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: <HeartIcon className="h-5 w-5" />,
    },
    {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: <ScaleIcon className="h-5 w-5" />,
    },
    {
      bg: "bg-amber-50",
      text: "text-amber-700",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      bg: "bg-rose-50",
      text: "text-rose-700",
      icon: <FireIcon className="h-5 w-5" />,
    },
    {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: <BoltIcon className="h-5 w-5" />,
    },
  ];

  const vitalsData = [
    {
      label: "Blood glucose",
      value: "120 mg/dt",
      icon: <BeakerIcon className="h-5 w-5" />,
    },
    {
      label: "Weight",
      value: "55 Kg",
      icon: <ScaleIcon className="h-5 w-5" />,
    },
    {
      label: "Heart rate",
      value: "70 bpm",
      icon: <HeartIcon className="h-5 w-5" />,
    },
    {
      label: "Temperature",
      value: "36.9 °C",
      icon: <FireIcon className="h-5 w-5" />,
    },
    {
      label: "Blood pressure",
      value: "120/80",
      icon: <BoltIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm hover:shadow-md">
      <SectionHeader
        icon={<ClipboardDocumentCheckIcon className="h-5 w-5" />}
        title="Vitals"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vitalsData.map((item, idx) => {
          const colorScheme = vitalColors[idx % vitalColors.length];
          return (
            <div
              key={idx}
              className={`${colorScheme.bg} rounded-lg p-4 border border-opacity-20 transition-transform hover:transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-medium ${colorScheme.text}`}>
                  {item.label}
                </p>
                <div className={`${colorScheme.text}`}>{item.icon}</div>
              </div>
              <p className={`font-semibold ${colorScheme.text} text-lg`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AppointmentHistory = ({
  selectedDate,
  setSelectedDate,
  appointmentHistory = [],
}) => {
  // Filter appointments by selected date
  const filteredAppointments = selectedDate
    ? appointmentHistory.filter(
        (app) => new Date(app.date).toISOString().split("T")[0] === selectedDate
      )
    : appointmentHistory;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <SectionHeader
          icon={<CalendarIcon className="h-5 w-5" />}
          title="Appointment History"
        />
        <div className="flex items-center gap-2">
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <button className="bg-bimec-green text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-bimec-heavy-green flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Book Appointment
          </button>
        </div>
      </div>

      {filteredAppointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Admitted Date", "Time", "Dr Assigned", "Concern"].map(
                  (head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="h-4 w-4 mr-2 text-bimec-green" />
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <ClockIcon className="h-4 w-4 mr-2 text-bimec-green" />
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <UserGroupIcon className="h-4 w-4 mr-2 text-bimec-green" />
                      {appointment.doctorName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <ClipboardDocumentCheckIcon className="h-4 w-4 mr-2 text-bimec-green" />
                      {appointment.reason}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <CalendarIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">
            No appointments found for the selected date.
          </p>
          <button
            onClick={() => setSelectedDate("")}
            className="mt-4 text-sm font-medium text-bimec-green hover:text-bimec-heavy-green flex items-center gap-1 justify-center mx-auto"
          >
            <GlobeAltIcon className="h-4 w-4" />
            View all appointments
          </button>
        </div>
      )}
    </div>
  );
};

const MedicalRecord = ({ selectedDate, setSelectedDate }) => {
  // Sample medical records data
  const medicalRecords = [
    {
      id: 1,
      date: "2025-05-19",
      medications: [
        {
          name: "Amoxicillin 500mg",
          dosage: "1 Pill",
          time: "08:00 AM, 08:00 PM",
          type: "Antibiotic",
          notes: "Take with food.",
        },
        {
          name: "Ibuprofen 400mg",
          dosage: "1 Pill",
          time: "As needed",
          type: "Pain Relief",
          notes: "Take for fever or pain.",
        },
      ],
      tests: [
        {
          name: "Complete Blood Count",
          time: "09:30 AM",
          result: "Normal Range",
          notes: "All parameters normal.",
        },
      ],
    },
    {
      id: 2,
      date: "2025-05-20",
      medications: [
        {
          name: "Indever 20",
          dosage: "1 Pill",
          time: "02:20 PM",
          type: "Emergency",
          notes: "For blood pressure.",
        },
      ],
      tests: [
        {
          name: "ECG Test",
          time: "01:45 PM",
          result: "Minor Abnormalities",
          notes: "Slight irregularity detected.",
        },
      ],
    },
  ];

  // Filter records by selected date
  const filteredRecords = selectedDate
    ? medicalRecords.filter((record) => record.date === selectedDate)
    : medicalRecords;
  const [expandedRecords, setExpandedRecords] = useState({});

  // Toggle expand/collapse for a record
  const toggleRecord = (recordId) => {
    setExpandedRecords((prev) => ({ ...prev, [recordId]: !prev[recordId] }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <SectionHeader
          icon={<DocumentTextIcon className="h-5 w-5" />}
          title="Medical Record"
        />
        <div className="flex items-center gap-2">
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <button className="bg-bimec-green text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-bimec-heavy-green flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add New Record
          </button>
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="border border-gray-100 rounded-lg overflow-hidden"
            >
              <div
                className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                onClick={() => toggleRecord(record.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bimec-light-green flex items-center justify-center text-bimec-heavy-green">
                    <DocumentTextIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-bimec-black">
                      Medical Record
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(record.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedRecords[record.id] ? "transform rotate-180" : ""
                  }`}
                />
              </div>

              {expandedRecords[record.id] && (
                <div className="p-4 space-y-6">
                  {/* Medications */}
                  {record.medications.length > 0 && (
                    <div>
                      <SectionHeader
                        icon={<BeakerIcon className="h-5 w-5" />}
                        title="Medications"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {record.medications.map((med, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-bimec-black flex items-center gap-1">
                                  <BeakerIcon className="h-4 w-4 text-bimec-green" />
                                  {med.name}
                                </h4>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <ClockIcon className="h-3 w-3" />
                                  {med.dosage} · {med.time}
                                </p>
                              </div>
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                  med.type === "Emergency"
                                    ? "bg-red-100 text-bimec-red"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {med.type === "Emergency" ? (
                                  <BoltIcon className="h-3 w-3" />
                                ) : (
                                  <AcademicCapIcon className="h-3 w-3" />
                                )}
                                {med.type}
                              </span>
                            </div>
                            {med.notes && (
                              <p className="mt-2 text-sm text-gray-600 border-t border-gray-100 pt-2 flex items-center gap-1">
                                <ClipboardDocumentCheckIcon className="h-3 w-3 text-gray-500" />
                                {med.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Test Reports */}
                  {record.tests.length > 0 && (
                    <div>
                      <SectionHeader
                        icon={<DocumentTextIcon className="h-5 w-5" />}
                        title="Test Reports"
                      />
                      <div className="space-y-4 mt-4">
                        {record.tests.map((test, idx) => (
                          <div
                            key={idx}
                            className="border border-gray-100 rounded-lg p-4 hover:shadow-sm"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between gap-2">
                              <div>
                                <h4 className="font-medium text-bimec-black flex items-center gap-1">
                                  <DocumentTextIcon className="h-4 w-4 text-bimec-green" />
                                  {test.name}
                                </h4>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <ClockIcon className="h-3 w-3" />
                                  {test.time}
                                </p>
                              </div>
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                  test.result === "Normal Range"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {test.result === "Normal Range" ? (
                                  <ClipboardDocumentCheckIcon className="h-3 w-3" />
                                ) : (
                                  <ClipboardDocumentCheckIcon className="h-3 w-3" />
                                )}
                                {test.result}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 border-t border-gray-100 pt-2 flex items-center gap-1">
                              <ClipboardDocumentCheckIcon className="h-3 w-3 text-gray-500" />
                              {test.notes}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <DocumentTextIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">
            No medical records found for the selected date.
          </p>
          <button
            onClick={() => setSelectedDate("")}
            className="mt-4 text-sm font-medium text-bimec-green hover:text-bimec-heavy-green flex items-center gap-1 justify-center mx-auto"
          >
            <GlobeAltIcon className="h-4 w-4" />
            View all records
          </button>
        </div>
      )}
    </div>
  );
};

function PatientDetail() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const location = useLocation();
  const { patient } = location.state || {};

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patient?.patientId) return;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/patient-records/${patient.patientId}/appointments-history`
        );
        console.log("Fetched appointment history:", response.data);
        setAppointmentHistory(response.data);
      } catch (error) {
        console.error("Error fetching appointment history:", error);
      }
    };
    fetchAppointments();
  }, [patient?.patientId]);

  if (!patient) {
    return (
      <div className="flex min-h-screen max-w-screen mx-auto">
        <Sidebar />
        <main className="flex-1 flex flex-col bg-white">
          <Header />
          <section className="bg-gray-50 flex-1 overflow-auto p-8">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <UserIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No Patient Selected
                </h3>
                <p className="text-gray-500 mb-4">
                  Please select a patient to view their details
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="bg-bimec-green text-white px-4 py-2 rounded-lg font-medium hover:bg-bimec-heavy-green flex items-center gap-2 justify-center mx-auto"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Return to Patients
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen max-w-screen mx-auto">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-white">
        <Header />
        <section className="bg-gray-50 flex-1 overflow-auto p-4">
          <button
            onClick={() => window.history.back()}
            className="mb-4 text-sm font-medium text-gray-600 hover:text-bimec-green flex items-center gap-1"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>

          <PatientInfo patient={patient} />

          <div className="bg-white rounded-xl p-3 mb-6 shadow-sm">
            <div className="flex space-x-2">
              <TabButton
                active={activeTab === "Overview"}
                onClick={() => setActiveTab("Overview")}
                icon={<ClipboardDocumentCheckIcon className="h-4 w-4" />}
              >
                Overview
              </TabButton>
              <TabButton
                active={activeTab === "Appointment History"}
                onClick={() => setActiveTab("Appointment History")}
                icon={<CalendarIcon className="h-4 w-4" />}
              >
                Appointment History
              </TabButton>
              <TabButton
                active={activeTab === "Medical Record"}
                onClick={() => setActiveTab("Medical Record")}
                icon={<DocumentTextIcon className="h-4 w-4" />}
              >
                Medical Record
              </TabButton>
            </div>
          </div>

          <section>
            {activeTab === "Overview" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-bimec-black flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-bimec-green" />
                    Overview
                  </h3>
                  <DateSelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
                <Vitals />
              </div>
            )}

            {activeTab === "Appointment History" && (
              <AppointmentHistory
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                appointmentHistory={appointmentHistory}
              />
            )}
            {activeTab === "Medical Record" && (
              <MedicalRecord
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default PatientDetail;
