import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import ProfileSetup from './pages/Shared/ProfileSetup'
import Login from './pages/Shared/Login';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/profilesetup" element={<ProfileSetup/>}/>
    </Routes>
  )
}

export default App
