import React, { useState, useEffect } from 'react';
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
  BarChart3,
  Grid3X3,
  Star
} from 'lucide-react';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  // Mock API calls - replace with actual backend endpoints
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Backend API call syntax
      /*
      const response = await fetch('/api/client/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setDashboardData(data);
      */
      
      // Demo data
      setTimeout(() => {
        setDashboardData({
          stats: {
            activeProjects: 3,
            pendingPayments: 2,
            proposalsReceived: 8,
            totalBudget: 8800
          },
          recentProjects: [
            {
              id: 1,
              title: 'E-commerce Website Development',
              status: 'In Progress',
              freelancer: 'Sarah Johnson',
              budget: 5000,
              dueDate: '2024-02-15',
              progress: 65
            },
            {
              id: 2,
              title: 'Mobile App UI/UX Design',
              status: 'Pending Proposals',
              freelancer: null,
              budget: 3000,
              proposalCount: 8,
              progress: 0
            },
            {
              id: 3,
              title: 'Content Writing for Blog',
              status: 'Completed',
              freelancer: 'Mike Chen',
              budget: 800,
              dueDate: '2024-01-30',
              progress: 100
            }
          ],
          recentActivity: [
            {
              id: 1,
              type: 'proposal',
              title: 'New proposal received for E-commerce Website Development',
              time: '2 hours ago',
              icon: User
            },
            {
              id: 2,
              type: 'milestone',
              title: "Milestone 'Homepage Design' completed by Sarah Johnson",
              time: '1 day ago',
              icon: CheckCircle
            },
            {
              id: 3,
              type: 'payment',
              title: 'Payment of $800 released to Mike Chen',
              time: '2 days ago',
              icon: DollarSign
            },
            {
              id: 4,
              type: 'message',
              title: 'New message from Sarah Johnson',
              time: '3 days ago',
              icon: MessageSquare
            }
          ],
          notifications: [
            {
              id: 1,
              type: 'proposal',
              title: 'New Proposal Received',
              message: 'You have 3 new proposals for Mobile App UI/UX Design project',
              time: '1 hour ago',
              unread: true
            },
            {
              id: 2,
              type: 'milestone',
              title: 'Milestone Completed',
              message: 'Sarah Johnson completed the Homepage Design milestone',
              time: '1 day ago',
              unread: true
            },
            {
              id: 3,
              type: 'payment',
              title: 'Payment Due',
              message: 'Payment for completed milestone is ready for release',
              time: '2 days ago',
              unread: false
            }
          ]
        });
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid3X3 },
    { id: 'browse-projects', label: 'Browse Projects', icon: Search },
    { id: 'my-proposals', label: 'My Proposals', icon: Send },
    { id: 'active-projects', label: 'Active Projects', icon: Briefcase },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
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

  const handlePostNewProject = async () => {
    // Backend API call for posting new project
    /*
    try {
      const response = await fetch('/api/client/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });
      // Handle response
    } catch (error) {
      console.error('Error posting project:', error);
    }
    */
    console.log('Redirecting to post new project...');
  };

  const markNotificationAsRead = async (notificationId) => {
    // Backend API call to mark notification as read
    /*
    try {
      await fetch(`/api/client/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
    */
    
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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'proposal': return User;
      case 'milestone': return CheckCircle;
      case 'payment': return DollarSign;
      case 'message': return MessageSquare;
      default: return Bell;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'proposal': return 'bg-blue-100 text-blue-600';
      case 'milestone': return 'bg-green-100 text-green-600';
      case 'payment': return 'bg-purple-100 text-purple-600';
      case 'message': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = dashboardData.notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed left-0 top-0 h-full overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">FX</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FreelanceX</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Client Portal</p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">H</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">harsha</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.9 (12 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Saripalli Harshavardhan</p>
              </div>
              <div className="flex items-center space-x-4">
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
      </div>
    </div>
  );
};

export default ClientDashboard;