import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Grid3X3,
  Search,
  Send,
  Briefcase,
  DollarSign,
  MessageSquare,
  User,
  Settings,
  X,
  LogOut
} from 'lucide-react';
import useUserStore from '../../store/userStore';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid3X3, path: '/client/dashboard' },
    { id: 'browse-projects', label: 'Add Projects', icon: Search, path: '/client/post-projects' },
    { id: 'applicants', label: 'Applicants', icon: Send, path: '/client/applicants' },
    { id: 'active-projects', label: 'Projects', icon: Briefcase, path: '/client/projects' },
    // { id: 'earnings', label: 'Earnings', icon: DollarSign, path: '/client/earnings' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2, path: '/client/chat' },
    { id: 'profile', label: 'Profile', icon: User, path: '/client/profile' },
    // { id: 'settings', label: 'Settings', icon: Settings, path: '/client/settings' },
  ];
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);


  const handleLogout = () => {
    clearUser();
    window.location.href = '/login';
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FX</span>
            </div>
            <div className="ml-3">
              <span className="text-xl font-semibold text-gray-900">FreelanceX</span>
              <p className="text-xs text-gray-500">Client Portal</p>
            </div>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-6 py-4 overflow-hidden">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${isActive
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

        </nav>
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg shadow">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{user?.username || "User"}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;