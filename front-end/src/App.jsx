import { useState } from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp/>}></Route>
        <Route path='/login' element={<SignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
