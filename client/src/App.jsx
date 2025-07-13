import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import ClientProfile from './pages/Shared/ClientProfile'
import FreelancerProfile from './pages/Shared/FreelancerProfile'
import ClientDashboard from './pages/Client/Dashboard';
import FreelancerDashboard from './pages/Freelancer/Dashboard';
import Login from './pages/Shared/Login';
import Projects from './pages/Client/Projects';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/client/profile" element={<ClientProfile/>}/>
      <Route path='/freelancer/profile' element={<FreelancerProfile/>}/>
      <Route path='/client/dashboard' element={<ClientDashboard/>}/>
      <Route path='/freelancer/dashboard' element={<FreelancerDashboard/>}/>
      <Route path='/client/projects' element={<Projects/>}/>
    </Routes>
  )
}

export default App
