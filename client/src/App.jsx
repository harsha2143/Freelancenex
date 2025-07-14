import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import ClientProfile from './pages/Shared/ClientProfile'
import FreelancerProfile from './pages/Shared/FreelancerProfile'
import ClientDashboard from './pages/Client/Dashboard';
import FreelancerDashboard from './pages/Freelancer/Dashboard';
import NewProject from './pages/Client/NewProject';
import MyApplications from './pages/Freelancer/MyApplications';
import ActiveProjects from './pages/Freelancer/ActiveProjects';
import BrowseProjects from './pages/Freelancer/BrowseProjects';
import Applicants from './pages/Client/Applicants';
// import Chat from './pages/Shared/Chat';
import ClientProjects from './pages/Client/Projects';
import Login from './pages/Shared/Login';
import Projects from './pages/Client/Projects';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path="/client/profile" element={<ClientProfile />} />
      <Route path='/freelancer/profile' element={<FreelancerProfile />} />
      <Route path='/client/dashboard' element={<ClientDashboard />} />
      <Route path='/freelancer/dashboard' element={<FreelancerDashboard />} />
      <Route path='/freelancer/my-applications' element={<MyApplications />} />
      <Route path='/freelancer/active-projects' element={<ActiveProjects />} />
      <Route path='/freelancer/browse-projects' element={<BrowseProjects/>} />
      <Route path='/client/post-projects' element={<NewProject />} />
      <Route path='/client/projects' element={<ClientProjects />} />
      <Route path='/client/applicants' element={<Applicants />} />


    </Routes>
  )
}

export default App
