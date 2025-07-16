import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import ClientProfile from './pages/Shared/ClientProfile'
import FreelancerProfile from './pages/Shared/FreelancerProfile'
import ClientDashboard from './pages/Client/Dashboard';
import FreelancerDashboard from './pages/Freelancer/Dashboard';
import NewProject from './pages/Client/NewProject';
import FreelancerProposals from './pages/Freelancer/MyProposals';
import ActiveProjects from './pages/Freelancer/ActiveProjects';
import BrowseProjects from './pages/Freelancer/BrowseProjects';
// import Chat from './pages/Shared/Chat';
import ClientProjects from './pages/Client/Projects';
import Login from './pages/Shared/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/client/profile' element={
        <ProtectedRoute role="client">
          <ClientProfile />
        </ProtectedRoute>
      } />
      <Route path='/freelancer/profile' element={
        <ProtectedRoute role="freelancer">
          <FreelancerProfile />
        </ProtectedRoute>
      } />
      <Route path='/client/dashboard' element={
        <ProtectedRoute role="client">
          <ClientDashboard />
        </ProtectedRoute>
      } />
      <Route path='/freelancer/dashboard' element={
        <ProtectedRoute role="freelancer">
          <FreelancerDashboard />
        </ProtectedRoute>
      } />
      <Route path='/freelancer/my-proposals' element={<FreelancerProposals />} />
      <Route path='/freelancer/active-projects' element={<ActiveProjects />} />
       <Route path='/freelancer/browse-projects' element={<BrowseProjects/>} />
      <Route path='/client/post-projects' element={<NewProject />} />
      <Route path='/client/projects' element={<ClientProjects />} />


    </Routes>
  )
}

export default App
