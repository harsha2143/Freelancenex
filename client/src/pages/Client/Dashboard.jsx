import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  Bell,
  Plus,
  FolderOpen,
  CreditCard,
  Eye,
  Settings,
  User,
  LogOut,
  CheckCircle,
  Clock,
  DollarSign,
  MessageSquare,
  AlertCircle,
  Calendar,
  TrendingUp,
  Search,
  Send,
  Briefcase,
  Menu
} from 'lucide-react';

import useUserStore from '../../store/userStore';
import axiosInstance from '../../api/axiosInstance';
import { Navigate, useNavigate } from 'react-router-dom';


const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeProjects: 0,
      pendingPayments: 0,
      proposalsReceived: 0,
      totalBudget: 0
    },
    recentProjects: [],
    notifications: []
  });
  const user = useUserStore((state) => state.user);
  const navigate=useNavigate()

  // Mock API calls - replace with actual backend endpoints
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const clientId = user.id;
      if (!clientId) {
        throw new Error('Client ID not found. Please log in again.');
      }

      // Call your dashboard endpoint with clientId as query parameter
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/client/dashboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: { clientId }
      });

      if (response.data) {
        // Format the response to match our frontend state structure
        const formattedData = {
          stats: response.data.stats,
          recentProjects: response.data.recentProjects.map(project => ({
            id: project._id,
            title: project.title,
            status: project.status,
            budget: project.budget,
            proposalCount: project.applicants?.length || 0,
            dueDate: project.deadline ? new Date(project.deadline).toLocaleDateString() : null,
            freelancer: project.Freelancer ? 'Assigned' : null
          })),
          notifications: (response.data.notifications || []).map(notification => ({
            id: notification._id,
            title: notification.title || 'Notification',
            message: notification.message || notification.description || 'New notification',
            time: notification.createdAt ? new Date(notification.createdAt).toLocaleString() : 'Recently',
            unread: notification.unread !== false // Default to true if not specified
          }))
        };

        setDashboardData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load dashboard data');

      // Fallback: fetch data separately if dashboard endpoint fails
      // try {
      //   await fetchDashboardDataSeparately();
      // } catch (fallbackError) {
      //   console.error('Fallback fetch also failed:', fallbackError);
      // }
    } finally {
      setLoading(false);
    }
  };

  // const fetchDashboardDataSeparately = async () => {
  //   const clientId = '64e92fa3a128c3f3c88d9b2';
  //   if (!clientId) {
  //     throw new Error('Client ID not found');
  //   }

  //   try {
  //     // Fetch projects for this client
  //     const projectsResponse = await axiosInstance.get(`/client/getProjects/${clientId}`);
  //     const projects = projectsResponse.data?.projects || [];

  //     // Calculate stats from projects (matching your controller logic)
  //     const stats = {
  //       activeProjects: projects.filter(p => p.status === 'In Progress').length,
  //       pendingPayments: projects.filter(p => p.status === 'Payment Pending').length,
  //       proposalsReceived: projects.reduce((total, project) => total + (project.applicants?.length || 0), 0),
  //       totalBudget: projects.reduce((total, project) => total + (project.budget || 0), 0)
  //     };

  //     // Format recent projects
  //     const recentProjects = projects
  //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       .slice(0, 5)
  //       .map(project => ({
  //         id: project._id,
  //         title: project.title,
  //         status: project.status,
  //         budget: project.budget,
  //         proposalCount: project.applicants?.length || 0,
  //         dueDate: project.deadline ? new Date(project.deadline).toLocaleDateString() : null,
  //         freelancer: project.Freelancer ? 'Assigned' : null
  //       }));

  //     // Mock notifications (replace with actual notification endpoint when available)
  //     const mockNotifications = [
  //       {
  //         id: '1',
  //         title: 'New Proposal Received',
  //         message: 'You have received a new proposal for your project.',
  //         time: new Date().toLocaleString(),
  //         unread: true
  //       },
  //       {
  //         id: '2',
  //         title: 'Project Update',
  //         message: 'One of your projects has been updated.',
  //         time: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(),
  //         unread: false
  //       }
  //     ];

  //     setDashboardData({
  //       stats,
  //       recentProjects,
  //       notifications: mockNotifications
  //     });

  //   } catch (error) {
  //     console.error('Error fetching dashboard data separately:', error);
  //     throw error;
  //   }
  // };

  const handleNavigation = (section) => {
    // Handle navigation based on section
    switch (section) {
      case 'active-projects':
        navigate('/client/projects');
        // Navigate to active projects page
        console.log('Navigate to active projects');
        break;
      case 'post-newProject':
        navigate('/client/post-projects')
        // Navigate to earnings/payment history
        console.log('Navigate to earnings');
        break;
      default:
        console.log('Navigate to', section);
    }
  };

  const handlePostNewProject = async () => {
    try {
      const clientId = user.id;
      if (!clientId) {
        alert('Client ID not found. Please log in again.');
        return;
      }

      const projectData = {
        title: "New Project",
        description: "Project description here",
        budget: 1000,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        requiredSkills: ["JavaScript", "React"],
        customSkills: ["Node.js"],
        client: clientId,
        category: "Web Development",
        experienceLevel: "Intermediate"
      };

      const response = await axiosInstance.post('/client/addProject', projectData);

      if (response.data) {
        alert("Project Posted Successfully!");
        // Refresh dashboard data
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error posting project:', error);
      alert(`Error posting project: ${error.response?.data?.message || error.message}`);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      // Update notification in backend when endpoint is available
      // await axiosInstance.put(`/client/notifications/${notificationId}/read`);

      // Update local state
      setDashboardData(prev => ({
        ...prev,
        notifications: prev.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, unread: false } : notif
        )
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'Payment Pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = dashboardData.notifications.filter(n => n.unread).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4"
              >
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
              <div className="flex items-center justify-between px-4">
                {/* Left Side - Heading and Subtitle */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {user?.username || "User"}</p>
                </div>
                {/* Profile Card */}
                {/* <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg shadow">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user?.name || "User"}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div> */}
                
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
              <button
                onClick={()=>navigate('/client/post-projects')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Post Project</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Active Projects</p>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.activeProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Proposals Received</p>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.proposalsReceived}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Budget</p>
                  <p className="text-2xl font-semibold text-gray-900">${dashboardData.stats.totalBudget.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Pending Payments</p>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.pendingPayments}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                    <button
                      onClick={() => handleNavigation('active-projects')}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Your latest project activities</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData.recentProjects.length > 0 ? (
                      dashboardData.recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <FolderOpen className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{project.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                                  {project.status}
                                </span>
                                {project.freelancer && (
                                  <span className="text-sm text-gray-500">with {project.freelancer}</span>
                                )}
                                {project.proposalCount > 0 && (
                                  <span className="text-sm text-gray-500">{project.proposalCount} proposals</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${project.budget.toLocaleString()}</p>
                            {project.dueDate && (
                              <p className="text-sm text-gray-500">Due {project.dueDate}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No projects yet</p>
                        <button
                          onClick={handlePostNewProject}
                          className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          Post your first project
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500 mt-1">Alerts and updates</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData.notifications.length > 0 ? (
                      dashboardData.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <button
                                onClick={() => markNotificationAsRead(notification.id)}
                                className="ml-2 w-2 h-2 bg-blue-500 rounded-full"
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-500 mt-1">Common tasks to manage your projects</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleNavigation('post-newProject')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Post New Project</p>
                      <p className="text-sm text-gray-500">Start hiring for your next project</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavigation('active-projects')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Briefcase className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Manage Projects</p>
                      <p className="text-sm text-gray-500">View and update your projects</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavigation('earnings')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <DollarSign className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Payment History</p>
                      <p className="text-sm text-gray-500">Track your spending and invoices</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;