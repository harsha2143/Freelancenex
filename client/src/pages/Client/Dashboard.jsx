import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
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


const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeProjects: 0,
      pendingPayments: 0,
      proposalsReceived: 0,
      totalBudget: 0
    },
    recentProjects: [],
    // recentActivity: [],
    notifications: []
  });
  const user = useUserStore((state) => state.user);

  // Mock API calls - replace with actual backend endpoints
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Backend API call syntax
      const response = await axiosInstance.get('/client/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };


  const handleNavigation = () => {
    // Handle actual navigation here
    /*
    switch(tabId) {
      case 'dashboard':
        // Navigate to dashboard
        break;
      case 'browse-projects':
        // Navigate to browse projects
        break;
      case 'my-proposals':
        // Navigate to my proposals
        break;
      // ... other cases
    }
    */
  };

  const handlePostNewProject = async (projectData) => {
    // Backend API call for posting new project
    try {
      const response = await axiosInstance.post('/client/projects', projectData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      // Handle response
      return response.data;
    } catch (error) {
      console.error('Error posting project:', error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    // Backend API call to mark notification as read
    try {
      await axiosInstance.put(`/client/notifications/${notificationId}/read`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }

    setDashboardData(prev => ({
      ...prev,
      notifications: prev.notifications.map(notif =>
        notif.id === notificationId ? { ...notif, unread: false } : notif
      )
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending Proposals': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // const getActivityIcon = (type) => {
  //   switch (type) {
  //     case 'proposal': return User;
  //     case 'milestone': return CheckCircle;
  //     case 'payment': return DollarSign;
  //     case 'message': return MessageSquare;
  //     default: return Bell;
  //   }
  // };

  // const getActivityColor = (type) => {
  //   switch (type) {
  //     case 'proposal': return 'bg-blue-100 text-blue-600';
  //     case 'milestone': return 'bg-green-100 text-green-600';
  //     case 'payment': return 'bg-purple-100 text-purple-600';
  //     case 'message': return 'bg-orange-100 text-orange-600';
  //     default: return 'bg-gray-100 text-gray-600';
  //   }
  // };

  const unreadCount = dashboardData.notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center jusify-start  lg:justify-between">
            <div className="flex">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
              <div className="flex items-center justify-between px-6 py-4">
                {/* Left Side - Heading and Subtitle */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {user?.name || "User"}</p>
                </div>
                {/* Profile Card */}
                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg shadow">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user?.name || "User"}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
                {/* Right Side - Bell and Button */}
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
                    onClick={handlePostNewProject}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
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

            <div className="bg-white rounded-lg shadow p-6">
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

            <div className="bg-white rounded-lg shadow p-6">
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

            <div className="bg-white rounded-lg shadow p-6">
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
                    {dashboardData.recentProjects.map((project) => (
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
                              {project.proposalCount && (
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
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Notifications */}
            <div className="space-y-6">
              {/* Recent Activity */}
              {/* <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <p className="text-sm text-gray-500 mt-1">Latest updates from your projects</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div> */}

              {/* Notifications */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500 mt-1">Alerts and updates</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData.notifications.map((notification) => (
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
                    ))}
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
                    onClick={handlePostNewProject}
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
        </main>
      </main>
    </div>

  );
};

export default ClientDashboard;