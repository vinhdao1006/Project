import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/BimecFooter';
import Contact from '../../components/utils/Contact';
import FloatButtonGroup from '../../components/utils/FloatButtonGroup';

// Mock data for demonstration
const mockAppointments = [
  {
    id: 1,
    doctor: 'Dr. John Doe',
    specialty: 'Cardiology',
    date: '2024-06-10',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    doctor: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    date: '2024-06-15',
    time: '2:30 PM',
    status: 'Pending',
  },
];

const Appointments = () => {
  return (
    <div className="overflow-x-hidden overflow-y-auto min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto">
        <div className="w-full h-48 bg-bimec-green flex items-center justify-center">
          <h1 className="text-4xl font-yeseva font-bold text-white">My Appointments</h1>
        </div>
        <div className="max-w-4xl mx-auto mt-10 px-4 py-8 bg-white rounded-lg shadow-md">
          {mockAppointments.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-bimec-heavy-green mb-4">No Appointments Yet</h2>
              <p className="mb-6">You have not booked any appointments. Book your first appointment now!</p>
              <a href="/booking" className="inline-block bg-bimec-green text-white px-6 py-2 rounded hover:bg-bimec-heavy-green font-semibold transition">Book Appointment</a>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-bimec-heavy-green mb-6">Upcoming Appointments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-bimec-green">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Doctor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Specialty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockAppointments.map((appt) => (
                      <tr key={appt.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-bimec-heavy-green">{appt.doctor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appt.specialty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appt.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appt.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{appt.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <a href="/booking" className="inline-block bg-bimec-green text-white px-6 py-2 rounded hover:bg-bimec-heavy-green font-semibold transition">Book Another Appointment</a>
              </div>
            </>
          )}
        </div>
        <div className="mt-16 mx-auto w-full">
          <Contact />
        </div>
        <div className="mt-16 mx-auto w-full">
          <Footer />
        </div>
        <FloatButtonGroup />
      </div>
    </div>
  );
};

export default Appointments; 