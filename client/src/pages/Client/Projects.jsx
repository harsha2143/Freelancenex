import { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
  Star,
  Menu,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function ClientProjects() {
  const { clientId }= useParams(); // ✅ Correct
  // assumes route: /projects/:clientId
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/client/getProjects/${clientId}`
        );
        setProjects(response.data.projects);
        console.log(response.data.projects);
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects.", err);
        setProjects([]); // Ensure projects is always an array
        setLoading(false);
      }
    };

    fetchProjects();
  }, [clientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending_proposals":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "open":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "pending_proposals":
        return "Pending Proposals";
      case "completed":
        return "Completed";
      case "open":
        return "Open";
      default:
        return status;
    }
  };

  const filteredProjects = Array.isArray(projects)
    ? projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    : [];

  const projectsByStatus = {
    all: filteredProjects,
    open: filteredProjects.filter((p) => p.status === "open"),
    pending_proposals: filteredProjects.filter(
      (p) => p.status === "pending_proposals"
    ),
    in_progress: filteredProjects.filter((p) => p.status === "in_progress"),
    completed: filteredProjects.filter((p) => p.status === "completed"),
  };

  const currentProjects = projectsByStatus[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full mx-auto lg:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4"
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
              <p className="text-gray-600 my-5 sm:my-2">
                Manage and track all your projects
              </p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            <Plus className="h-4 w-4" />
            Post New Project
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Projects</option>
                <option value="open">Open</option>
                <option value="pending_proposals">Pending Proposals</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-2 bg-gray-100 p-1 rounded-lg mt-5">
            {[
              { key: "all", label: "All" },
              { key: "open", label: "Open" },
              { key: "pending_proposals", label: "Pending" },
              { key: "in_progress", label: "Active" },
              { key: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {tab.label} ({projectsByStatus[tab.key].length})
              </button>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading projects...
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : currentProjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {activeTab === "all"
                      ? "You haven't posted any projects yet."
                      : `No projects with ${getStatusText(activeTab)} status.`}
                  </p>
                  {activeTab === "all" && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Post Your First Project
                    </button>
                  )}
                </div>
              </div>
            ) : (
              currentProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {getStatusText(project.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-semibold text-gray-900">
                        ${project.budget?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Budget</p>
                    </div>
                  </div>

                  {project.freelancer && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {project.freelancer.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {project.freelancer.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {project.freelancer.rating}
                          </span>
                        </div>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>
                        Due:{" "}
                        {new Date(project.deadline).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{project.proposals} proposals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span>
                        Posted:{" "}
                        {new Date(project.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        View Details
                      </button>
                      {project.status === "pending_proposals" && (
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
                          View Proposals ({project.proposals})
                        </button>
                      )}
                    </div>
                    {project.status === "in_progress" && (
                      <div className="text-sm text-gray-600">
                        {project.milestones?.filter((m) => m.status === "completed")
                          .length || 0}{" "}
                        / {project.milestones?.length || 0} milestones completed
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
