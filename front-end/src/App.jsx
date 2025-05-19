import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Home from "./pages/default/Home";
import BookingPage from "./pages/default/BookingPage";
import AboutUs from "./pages/default/AboutUs";
import Services from "./pages/default/Services";
import Contact from "./pages/default/Contact";
import DoctorPage from "./pages/default/DoctorPage";
import NewsPage from "./pages/default/NewsPage";
import SingleNews from "./pages/default/SingleNews";
import Appointments from "./pages/default/Appointments";

import AdminDashboard from "./pages/admin/Dashboard";
import DoctorManagement from "./pages/admin/DoctorManagement";
import PatientsManagement from "./pages/admin/PatientManagement";
import AppointmentsManagement from "./pages/admin/AppointmentManagement";
import DepartmentsPage from "./pages/admin/Department";
import DoctorSchedulePage from "./pages/admin/Schedule";

import Patients from "./pages/doctor/Patients";
import PatientDetail from "./pages/doctor/PatientDetail";
import DoctorAppointment from "./pages/doctor/Appointments";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";

import AIAssistant from './components/utils/AIAssistant'

function App() {
  return (
    <Router>
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/settings" element={<Settings />}></Route>

        {/* Patient routes */}
        <Route path="/default/home" element={<Home />}></Route>
        <Route path="/default/booking" element={<BookingPage />}></Route>
        <Route path="/default/about-us" element={<AboutUs />}></Route>
        <Route path="/default/services" element={<Services />}></Route>
        <Route path="/default/contact" element={<Contact />}></Route>
        <Route path="/default/doctors" element={<DoctorPage />}></Route>
        <Route path="/default/news" element={<NewsPage />}></Route>
        <Route path="/default/news/:title" element={<SingleNews />} />
        <Route path="/default/appointments" element={<Appointments />}></Route>

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin/doctors" element={<DoctorManagement />}></Route>
        <Route path="/admin/patients" element={<PatientsManagement />}></Route>
        <Route
          path="/admin/appointments"
          element={<AppointmentsManagement />}
        ></Route>
        <Route path="/admin/departments" element={<DepartmentsPage />}></Route>
        <Route
          path="/admin/doctor-schedule"
          element={<DoctorSchedulePage />}
        ></Route>

        {/* Doctor routes */}
        <Route path="/doctor/patients" element={<Patients />}></Route>
        <Route path="/doctor/patient-detail" element={<PatientDetail />} />
        <Route
          path="/doctor/appointments"
          element={<DoctorAppointment />}
        ></Route>
        <Route path="/doctor/schedule" element={<DoctorSchedule />}></Route>
      </Routes>
      <AIAssistant />
    </Router>
  );
}

export default App;
