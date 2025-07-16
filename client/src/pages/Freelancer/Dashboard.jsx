import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Star,
  Grid3X3,
  FileText,
  Send,
  Briefcase,
  Settings,
  User,
  Menu
} from 'lucide-react';
import axiosInstance from '../../api/axiosInstance'; 

const FreelancerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [activeProjects, setActiveProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyWorkedProjects, setRecentlyWorkedProjects] = useState([]);

  // Get freelancer ID from localStorage or context
  const getFreelancerId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || user?._id || '68737c718a4b0e09448f541b'; // Fallback for testing
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch all projects for this freelancer
      const freelancerId = getFreelancerId();
      const response = await axiosInstance.get(`/freelancer/active-projects/${freelancerId}`);
      const projects = response.data.projects || [];
      console.log("Fetched projects:", projects);

      // Active projects (current work)
      setActiveProjects(projects);

      // Recently worked (completed) projects, sorted by completedAt descending, top 3
      const completedProjects = projects
        .filter(p => p.status === 'Completed')
        .sort((a, b) => new Date(b.completedAt || b.updatedAt || b.createdAt) - new Date(a.completedAt || a.updatedAt || a.createdAt))
        .slice(0, 3);
      setRecentlyWorkedProjects(completedProjects);

      // Calculate stats
      const activeProjectsCount = projects.length;
      const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
      const pendingProposals = projects.filter(p => p.status === 'Pending').length;
      const totalEarnings = projects.reduce((sum, p) => sum + (p.earned || 0), 0);
      const successRate = projects.length > 0
        ? Math.round((completedProjectsCount / projects.length) * 100)
        : 0;

      setDashboardData({
        activeProjects: activeProjectsCount,
        totalEarnings,
        pendingProposals,
        completedProjects: completedProjectsCount,
        successRate,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, changeText, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% {changeText}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Updated ProjectCard to use real project fields
  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.client?.name || 'Unknown Client'}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${project.budget?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500">Due {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{project.progress || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress || 0}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {project.status}
        </span>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );

  const OpportunityCard = ({ opportunity }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
          <p className="text-lg font-bold text-gray-900 mt-1">${opportunity.budget?.toLocaleString() || 0}</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800">
          View Project
        </button>
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {(opportunity.requiredSkills || []).map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Posted {opportunity.createdAt ? new Date(opportunity.createdAt).toLocaleDateString() : 'N/A'}</span>
        <span>{opportunity.applicants ? opportunity.applicants.length : 0} proposals</span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${opportunity.client?.verified ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {opportunity.client?.verified ? 'Verified Client' : 'Client'}
        </span>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    return (
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          activity.color === 'text-green-600' ? 'bg-green-100' :
          activity.color === 'text-blue-600' ? 'bg-blue-100' :
          'bg-purple-100'
        }`}>
          <Icon className={`w-4 h-4 ${activity.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{activity.message}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
        {activity.amount && (
          <div className="flex-shrink-0">
            <span className="text-sm font-medium text-green-600">
              ${activity.amount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col lg:ml-64 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between py-4 px-8">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, harsha!</h1>
                <p className="text-gray-600">Ready to take on new challenges today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-500" />
              </div>
              <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Browse Projects
              </button>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              title="Active Projects"
              value={dashboardData.activeProjects}
              icon={Briefcase}
              color="bg-blue-600"
            />
            <StatCard
              title="Total Earnings"
              value={`$${dashboardData.totalEarnings?.toLocaleString() || 0}`}
              icon={DollarSign}
              color="bg-green-600"
            />
            <StatCard
              title="Pending Proposals"
              value={dashboardData.pendingProposals}
              icon={Send}
              color="bg-yellow-600"
            />
            <StatCard
              title="Completed"
              value={dashboardData.completedProjects}
              icon={CheckCircle}
              color="bg-purple-600"
            />
            <StatCard
              title="Success Rate"
              value={`${dashboardData.successRate}%`}
              icon={Star}
              color="bg-indigo-600"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Projects */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                  <p className="text-gray-600">Your current work in progress</p>
                </div>
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {activeProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
              {/* Recently Worked Projects */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recently Worked Projects</h2>
                    <p className="text-gray-600">Projects you recently completed</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {recentlyWorkedProjects.length === 0 ? (
                    <div className="text-gray-500 text-center">No recently completed projects.</div>
                  ) : (
                    recentlyWorkedProjects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Recent Activity & Quick Actions */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-600">Latest updates and notifications</p>
                </div>
                <div className="space-y-4">
                  {/* recentActivity data is not available in the current fetch, so this will be empty */}
                  {/* You would typically fetch this from a separate endpoint or pass it as a prop */}
                  {/* For now, it's a placeholder */}
                  <ActivityItem key="activity-1" activity={{
                    id: "act-1",
                    icon: MessageSquare,
                    message: "New message from client John Doe on project 'Web App Development'",
                    time: "10 minutes ago",
                    amount: 150,
                    color: "text-blue-600"
                  }} />
                  <ActivityItem key="activity-2" activity={{
                    id: "act-2",
                    icon: DollarSign,
                    message: "Payment received for project 'E-commerce Website'",
                    time: "2 hours ago",
                    amount: 2500,
                    color: "text-green-600"
                  }} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <p className="text-sm text-gray-600 mb-4">Common tasks to grow your freelance business</p>
                <div className="space-y-3">
                  <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <Search className="w-5 h-5 text-gray-500 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Browse Projects</p>
                      <p className="text-sm text-gray-600">Find your next opportunity</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <Send className="w-5 h-5 text-gray-500 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">My Proposals</p>
                      <p className="text-sm text-gray-600">Track your submitted proposals</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <Star className="w-5 h-5 text-gray-500 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Update Profile</p>
                      <p className="text-sm text-gray-600">Enhance your professional profile</p>
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

export default FreelancerDashboard;