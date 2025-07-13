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

const FreelancerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    activeProjects: 2,
    totalEarnings: 8500,
    pendingProposals: 5,
    completedProjects: 12,
    successRate: 95,
    weeklyChange: 1,
    monthlyEarningsChange: 12
  });

  const [activeProjects, setActiveProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "TechCorp Inc.",
      amount: 5000,
      dueDate: "15/02/2024",
      progress: 65,
      status: "In Progress"
    },
    {
      id: 2,
      title: "Mobile App Backend API",
      client: "StartupXYZ",
      amount: 3500,
      dueDate: "28/02/2024",
      progress: 30,
      status: "In Progress"
    }
  ]);

  const [recentOpportunities, setRecentOpportunities] = useState([
    {
      id: 1,
      title: "React Native Mobile App Development",
      budget: "$3,000 - $5,000",
      skills: ["React Native", "JavaScript", "API Integration"],
      postedTime: "2 hours ago",
      proposalCount: 8,
      clientType: "Verified Client"
    },
    {
      id: 2,
      title: "WordPress Website Redesign",
      budget: "$1,500 - $2,500",
      skills: ["WordPress", "PHP", "CSS", "JavaScript"],
      postedTime: "5 hours ago",
      proposalCount: 12,
      clientType: "New Client"
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "milestone_funded",
      message: "Milestone 'Database Setup' has been funded by TechCorp Inc.",
      time: "1 hour ago",
      amount: 1500,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "proposal_viewed",
      message: "Your proposal for 'React Native Mobile App' was viewed",
      time: "3 hours ago",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "project_completed",
      message: "Project 'Logo Design' marked as completed",
      time: "2 days ago",
      amount: 500,
      icon: CheckCircle,
      color: "text-purple-600"
    }
  ]);

  // Simulate API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        setNotifications([
          { id: 1, message: "New project match found", unread: true },
          { id: 2, message: "Proposal accepted", unread: true }
        ]);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchDashboardData();
    fetchNotifications();
  }, []);

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

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.client}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${project.amount.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Due {project.dueDate}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
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
          <p className="text-lg font-bold text-gray-900 mt-1">{opportunity.budget}</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800">
          View Project
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {opportunity.skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Posted {opportunity.postedTime}</span>
        <span>{opportunity.proposalCount} proposals</span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          opportunity.clientType === 'Verified Client' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {opportunity.clientType}
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

    return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, skills..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-500" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Browse Projects
              </button>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, harsha!</h1>
              <p className="text-gray-600">Ready to take on new challenges today?</p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Browse Projects
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              title="Active Projects"
              value={dashboardData.activeProjects}
              change={dashboardData.weeklyChange}
              changeText="this week"
              icon={Briefcase}
              color="bg-blue-600"
            />
            <StatCard
              title="Total Earnings"
              value={`$${dashboardData.totalEarnings.toLocaleString()}`}
              change={dashboardData.monthlyEarningsChange}
              changeText="from last month"
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
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Recent Opportunities */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Opportunities</h2>
                    <p className="text-gray-600">New projects matching your skills</p>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 font-medium">
                    Browse All Projects
                  </button>
                </div>
                <div className="space-y-6">
                  {recentOpportunities.map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
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
                  {recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
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