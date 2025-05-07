import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const PatientInfo = () => (
  <div className="flex items-center justify-between border border-gray-200 rounded-xl p-6 mb-6">
    <div className="flex items-center gap-6">
      <img
        alt="Patient image of a person with black hair wearing black coat and hat"
        className="w-16 h-16 rounded-full object-cover"
        height="64"
        // Ảnh bệnh nhân
        src="https://storage.googleapis.com/a1aa/image/850002c1-0f6a-44f0-1528-80f0a5dc0c5c.jpg"
        width="64"
      />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900 text-base leading-5 select-text">
            Marvin McKinney
          </h2>
          <button
            aria-label="ICU status dropdown"
            className="flex items-center gap-1 text-white text-xs font-semibold bg-purple-700 rounded-md px-2 py-1"
          >
            <span className="w-3 h-3 rounded-full bg-purple-700 inline-block"></span>
            ICU
            <i className="fas fa-chevron-down text-xs"></i>
          </button>
        </div>
        <p className="text-xs text-gray-500 leading-4 select-text">Male · Age 32</p>
        <p className="text-xs text-gray-500 leading-4 select-text max-w-xs">
          Brain, Spinal Cord, and Nerve Disorders
        </p>
      </div>
    </div>
    <div className="flex flex-col text-xs text-gray-500 select-text">
      <span>mamckinder@gmail.com</span>
      <span className="mt-1">+880 172524123123</span>
    </div>
    <button className="flex items-center gap-2 bg-[#4B7A3F] text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-[#3f6533]">
      <i className="fas fa-pen"></i>
      Edit
    </button>
  </div>
);

const Tabs = ({ activeTab, setActiveTab }) => (
  <nav className="flex border-b border-gray-200 mb-6 text-sm font-medium text-gray-600 select-none">
    <button
      onClick={() => setActiveTab('Overview')}
      className={`px-4 pb-2 ${activeTab === 'Overview' ? 'text-[#4B7A3F] border-b-2 border-[#4B7A3F]' : 'hover:text-gray-900'}`}
    >
      Overview
    </button>
    <button
      onClick={() => setActiveTab('Appointment History')}
      className={`px-4 pb-2 ${activeTab === 'Appointment History' ? 'text-[#4B7A3F] border-b-2 border-[#4B7A3F]' : 'hover:text-gray-900'}`}
    >
      Appointment History
    </button>
    <button
      onClick={() => setActiveTab('Medical Record')}
      className={`px-4 pb-2 ${activeTab === 'Medical Record' ? 'text-[#4B7A3F] border-b-2 border-[#4B7A3F]' : 'hover:text-gray-900'}`}
    >
      Medical Record
    </button>
    <button
      onClick={() => setActiveTab('Medication')}
      className={`px-4 pb-2 ${activeTab === 'Medication' ? 'text-[#4B7A3F] border-b-2 border-[#4B7A3F]' : 'hover:text-gray-900'}`}
    >
      Medication
    </button>
  </nav>
);

const OverviewHeader = ({ selectedDate, setSelectedDate, startTime, setStartTime, endTime, setEndTime }) => {
  // Hàm để định dạng ngày thành "Fri, 21 Jul 2024"
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Hàm để thay đổi ngày khi nhấp Previous/Next
  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-[#111827] text-base select-text">Overview</h3>
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 select-none">
        <span className="bg-[#D1F2E7] text-[#2F855A] rounded px-2 py-0.5">
          {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : formatDate(selectedDate)}
        </span>
        <button
          aria-label="Previous day"
          className="p-1 rounded hover:bg-gray-100 text-gray-400"
          onClick={() => changeDate(-1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4B7A3F]"
        />
        <button
          aria-label="Next day"
          className="p-1 rounded hover:bg-gray-100 text-gray-400"
          onClick={() => changeDate(1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="border-l border-gray-300 h-5 mx-3"></span>
        <div className="relative">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B7A3F]"
          />
        </div>
        <span>to</span>
        <div className="relative">
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B7A3F]"
          />
        </div>
      </div>
    </div>
  );
};

const Vitals = () => (
  <div className="border border-gray-200 rounded-xl p-4 mb-6 bg-white max-w-full overflow-x-auto">
    <div className="inline-flex items-center gap-2 mb-3 bg-gray-100 rounded-md px-3 py-1 text-gray-500 text-xs font-semibold select-none">
      <i className="far fa-heart"></i>
      <span>Vitals</span>
    </div>
    <div className="flex flex-wrap gap-x-12 gap-y-3 text-sm text-gray-900">
      <div>
        <p className="font-semibold text-base leading-5">120 mg/dt</p>
        <p className="text-xs text-gray-400 leading-4">Blood glucose level</p>
      </div>
      <div>
        <p className="font-semibold text-base leading-5">55 Kg</p>
        <p className="text-xs text-gray-400 leading-4">Weight</p>
      </div>
      <div>
        <p className="font-semibold text-base leading-5">70 bpm</p>
        <p className="text-xs text-gray-400 leading-4">Heart rate</p>
      </div>
      <div>
        <p className="font-semibold text-base leading-5">71%</p>
        <p className="text-xs text-gray-400 leading-4">Oxygen saturation</p>
      </div>
      <div>
        <p className="font-semibold text-base leading-5">98.1 F</p>
        <p className="text-xs text-gray-400 leading-4">Body temperature</p>
      </div>
      <div>
        <p className="font-semibold text-base leading-5">120/80 mm hg</p>
        <p className="text-xs text-gray-400 leading-4">Blood pressure</p>
      </div>
    </div>
  </div>
);

const Medications = () => (
  <div className="border border-gray-200 rounded-xl p-4 mb-6 bg-white max-w-full overflow-x-auto">
    <div className="inline-flex items-center gap-2 mb-3 bg-gray-100 rounded-md px-3 py-1 text-gray-500 text-xs font-semibold select-none">
      <i className="far fa-clipboard"></i>
      <span>Medications</span>
    </div>
    <div className="flex flex-col gap-4 text-sm text-gray-900">
      <div className="flex flex-wrap gap-x-12 gap-y-1">
        <div>
          <p className="font-semibold leading-5">Ursofalk 300</p>
          <p className="text-xs text-gray-400 leading-4">2 Pills · 02 : 00 PM</p>
        </div>
        <div>
          <p className="font-semibold leading-5">Routine Medicine</p>
          <p className="text-xs text-gray-400 leading-4">No observations or notes</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-12 gap-y-1">
        <div>
          <p className="font-semibold leading-5">Indever 20</p>
          <p className="text-xs text-gray-400 leading-4">1 Pill · 02 : 20 PM</p>
        </div>
        <div>
          <p className="font-semibold leading-5">Emergency</p>
          <p className="text-xs text-gray-400 leading-4">
            Patient observed to be having seizures. Indever given to reduce blood pressure
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TestReports = () => (
  <div className="border border-gray-200 rounded-xl p-4 bg-white max-w-full overflow-x-auto">
    <div className="inline-flex items-center gap-2 mb-3 bg-gray-100 rounded-md px-3 py-1 text-gray-500 text-xs font-semibold select-none">
      <i className="far fa-file-alt"></i>
      <span>Test reports</span>
    </div>
    <div className="flex flex-wrap gap-x-12 gap-y-1 text-sm text-gray-900">
      <div>
        <p className="font-semibold leading-5">UV Invasive Ultrasound</p>
        <p className="text-xs text-gray-400 leading-4">02 : 00 PM</p>
      </div>
      <div className="max-w-xl">
        <p className="font-semibold leading-5">Nerve Disorder</p>
        <p className="text-xs text-gray-400 leading-4">
          A small nerve in the left-mid section of the neck has shown swollen properties. A brain scan is suggested
        </p>
      </div>
    </div>
  </div>
);

const AppointmentHistory = () => (
  <div className="border border-gray-200 rounded-xl p-4 bg-white max-w-full overflow-x-auto">
    <h3 className="font-semibold text-[#111827] text-base mb-4">Appointment History</h3>
    <p className="text-sm text-gray-600">No appointment history available for this patient.</p>
  </div>
);

const MedicalRecord = () => (
  <div className="border border-gray-200 rounded-xl p-4 bg-white max-w-full overflow-x-auto">
    <h3 className="font-semibold text-[#111827] text-base mb-4">Medical Record</h3>
    <p className="text-sm text-gray-600">No medical records available for this patient.</p>
  </div>
);

function PatientDetailStatic() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Ngày hiện tại
  const [startTime, setStartTime] = useState('14:00'); // 02:00 PM
  const [endTime, setEndTime] = useState('23:20'); // 11:20 PM

  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-white">
        <Header />
        <section className="bg-[#F9FAFB] flex-1 overflow-auto p-8">
          <PatientInfo />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <section>
            {activeTab === 'Overview' && (
              <>
                <OverviewHeader
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                />
                <Vitals />
                <Medications />
                <TestReports />
              </>
            )}
            {activeTab === 'Appointment History' && <AppointmentHistory />}
            {activeTab === 'Medical Record' && <MedicalRecord />}
            {activeTab === 'Medication' && <Medications />}
          </section>
        </section>
      </main>
    </div>
  );
}

export default PatientDetailStatic;