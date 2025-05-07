import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/default/Home'
import BookingPage from './pages/default/BookingPage'
import AboutUs from './pages/default/AboutUs'
import Services from './pages/default/Services'
import Contact from './pages/default/Contact'
import DoctorPage from './pages/default/DoctorPage'
import NewsPage from './pages/default/NewsPage'
import SingleNews from './pages/default/SingleNews'
import Appointments from './pages/default/Appointments'

import AdminDashboard from './pages/admin/Dashboard'
import DoctorManagement from './pages/admin/DoctorManagement'

import Patients from './pages/doctor/Patients'
import PatientDetailStatic from './pages/doctor/PatientDetailStatic'

function App() {
  return (
    <Router>
      <Routes>
        {/* Patient routes */}
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<SignIn />}></Route>
        <Route path='/default/home' element={<Home />}></Route>
        <Route path='/default/booking' element={<BookingPage />}></Route>
        <Route path='/default/about-us' element={<AboutUs />}></Route>
        <Route path='/default/services' element={<Services />}></Route>
        <Route path='/default/contact' element={<Contact />}></Route>
        <Route path='/default/doctors' element={<DoctorPage />}></Route>
        <Route path='/default/news' element={<NewsPage />}></Route>
        <Route path="/default/news/:title" element={<SingleNews />} />
        <Route path='/default/appointments' element={<Appointments />}></Route>

        {/* Admin routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
        <Route path='/admin/doctors' element={<DoctorManagement />}></Route>

        {/* Doctor routes */}
        <Route path='/doctor/patients' element={<Patients />}></Route>
        <Route path='/doctor/patient-static' element={<PatientDetailStatic />} />
      </Routes>
    </Router>
  )
}

export default App
