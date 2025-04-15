import { useState } from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import BookingPage from './pages/BookingPage'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Contact from './pages/Contact'
import DoctorPage from './pages/DoctorPage'
import NewsPage from './pages/NewsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<SignIn />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/booking' element={<BookingPage />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/doctors' element={<DoctorPage />}></Route>
        <Route path='/news' element={<NewsPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
