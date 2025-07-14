import axios from "axios";
import {
  CheckCircle,
  Clock,
  Filter,
  Menu,
  Search,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Applicants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(2);
  const navigate = useNavigate();

  // State to manage clientId, initialized from localStorage or set manually below
  const [clientId, setClientId] = useState(
    localStorage.getItem("clientId") || "64e92fa3a12d8c3f3c88d9b2"
  );
  // TODO: Replace the following line with your temporary clientId for testing
  // setClientId('68738184c60db42071ca5a30'); // Uncomment this line and comment the next one to use the temporary clientId
  // setClientId(''); // Keep this commented or remove it once you set the temporary clientId

  useEffect(() => {
    if (clientId) {
      fetchProjects();
    } else {
      console.warn("clientId is not set. Please provide a valid clientId.");
    }
  }, [clientId, currentPage, sortBy, statusFilter]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/client/getProjects/${clientId}`
      );
      let filteredProjects = response.data.projects.filter((project) =>
        project.applicants.some(
          (applicant) =>
            (statusFilter === "all" ||
              (applicant.status || "pending") === statusFilter) &&
            (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              applicant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );

      filteredProjects.sort((a, b) => {
        if (sortBy === "budget") {
          return b.budget - a.budget;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const indexOfLastProject = currentPage * projectsPerPage;
      const indexOfFirstProject = indexOfLastProject - projectsPerPage;
      const currentProjects = filteredProjects.slice(
        indexOfFirstProject,
        indexOfLastProject
      );

      setProjects(currentProjects);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    }
  };

  const handleAcceptProposal = async (projectId, freelancerId) => {
    if (!clientId) {
      alert("Client ID is missing. Please provide a valid clientId.");
      return;
    }
    console.log('Accept Proposal Attempt:', {
      clientId,
      projectId,
      freelancerId,
      url: `${import.meta.env.VITE_BACKEND_URL}/client/projects/${projectId}/applicants/${freelancerId}/accept`
    });
    if (!/^[0-9a-fA-F]{24}$/.test(projectId) || !/^[0-9a-fA-F]{24}$/.test(freelancerId) || !/^[0-9a-fA-F]{24}$/.test(clientId)) {
      console.error('Invalid ID format:', { projectId, freelancerId, clientId });
      alert("Invalid ID format. Please check the data.");
      return;
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/client/projects/${projectId}/applicants/${freelancerId}/accept`,
        { clientId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setProjects(
        projects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                applicants: project.applicants.map((applicant) =>
                  applicant.freelancerId.toString() === freelancerId
                    ? { ...applicant, status: "accepted" }
                    : applicant
                ),
              }
            : project
        )
      );
      alert("Proposal accepted successfully!");
    } catch (error) {
      console.error("Error accepting proposal:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        clientId,
        projectId,
        freelancerId
      });
      alert("Failed to accept proposal. Please try again.");
    }
  };

  const handleDeclineProposal = async (projectId, freelancerId) => {
    if (!clientId) {
      alert("Client ID is missing. Please provide a valid clientId.");
      return;
    }
    console.log('Decline Proposal Attempt:', {
      clientId,
      projectId,
      freelancerId,
      url: `${import.meta.env.VITE_BACKEND_URL}/client/projects/${projectId}/applicants/${freelancerId}/decline`
    });
    if (!/^[0-9a-fA-F]{24}$/.test(projectId) || !/^[0-9a-fA-F]{24}$/.test(freelancerId) || !/^[0-9a-fA-F]{24}$/.test(clientId)) {
      console.error('Invalid ID format:', { projectId, freelancerId, clientId });
      alert("Invalid ID format. Please check the data.");
      return;
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/client/projects/${projectId}/applicants/${freelancerId}/decline`,
        { clientId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setProjects(
        projects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                applicants: project.applicants.map((applicant) =>
                  applicant.freelancerId.toString() === freelancerId
                    ? { ...applicant, status: "declined" }
                    : applicant
                ),
              }
            : project
        )
      );
      alert("Proposal declined successfully!");
    } catch (error) {
      console.error("Error declining proposal:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        clientId,
        projectId,
        freelancerId
      });
      alert("Failed to decline proposal. Please try again.");
    }
  };

  const handleViewProfile = (profileLink) => {
    navigate(profileLink);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: projects.reduce(
      (sum, project) => sum + project.applicants.length,
      0
    ),
    pending: projects.reduce(
      (sum, project) =>
        sum +
        project.applicants.filter((a) => (a.status || "pending") === "pending")
          .length,
      0
    ),
    accepted: projects.reduce(
      (sum, project) =>
        sum + project.applicants.filter((a) => a.status === "accepted").length,
      0
    ),
    declined: projects.reduce(
      (sum, project) =>
        sum + project.applicants.filter((a) => a.status === "declined").length,
      0
    ),
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full mx-auto lg:ml-64">
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  Applicants
                </h1>
                <p className="text-gray-600 mt-1">
                  Review proposals for your projects
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center">
              <Users className="w-10 h-10 text-blue-600" />
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  Total Proposals
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center">
              <Clock className="w-10 h-10 text-yellow-600" />
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Accepted</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.accepted}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center">
              <XCircle className="w-10 h-10 text-red-600" />
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Declined</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.declined}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-6 w-6" />
              <input
                type="text"
                placeholder="Search by project or freelancer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white/90 shadow-inner"
              />
            </div>
            <div className="relative w-full sm:w-64">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-6 w-6" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white/90 shadow-inner text-gray-900 transition duration-300"
              >
                <option value="all">All Proposals</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            <div className="relative w-full sm:w-40">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white/90 shadow-inner text-gray-900 transition duration-300"
              >
                <option value="createdAt">Sort by Date</option>
                <option value="budget">Sort by Budget</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md border p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No projects found
              </h3>
              <p className="text-gray-600">
                {statusFilter === "all"
                  ? "No projects or proposals found."
                  : `No projects with ${statusFilter} status proposals.`}
              </p>
            </div>
          ) : (
            <>
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg transition duration-300"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.applicants.length} proposals received
                    </p>
                  </div>
                  {project.applicants.map((applicant) => (
                    <div
                      key={applicant._id || applicant.freelancerId}
                      className="border-t border-gray-200 pt-6 mt-6 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {(applicant.name && applicant.name.charAt(0)) ||
                                "U"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-lg font-medium text-gray-900">
                                  {applicant.name || "Unknown Freelancer"}
                                </p>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-sm ${getStatusColor(
                                    applicant.status || "pending"
                                  )}`}
                                >
                                  {applicant.status
                                    ? applicant.status
                                        .charAt(0)
                                        .toUpperCase() +
                                      applicant.status.slice(1)
                                    : "Pending"}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleViewProfile(
                                    `/freelancer/${
                                      applicant._id || applicant.freelancerId
                                    }`
                                  )
                                }
                                className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-200 shadow-sm flex items-center gap-2 w-full sm:w-auto"
                              >
                                <User className="h-4 w-4" />
                                View Profile
                              </button>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {applicant.coverLetter || "No cover letter provided"}
                          </p>
                          <div className="text-sm text-gray-600">
                            <p>Bid: ${applicant.bid || 0}</p>
                            <p>
                              Submitted:{" "}
                              {project.createdAt
                                ? new Date(project.createdAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-2">
                          {applicant.status === "pending" ||
                          !applicant.status ? (
                            <>
                              <button
                                onClick={() =>
                                  handleAcceptProposal(
                                    project._id,
                                    applicant.freelancerId
                                  )
                                }
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md ring-2 ring-green-500 ring-opacity-0 hover:ring-opacity-50 flex items-center gap-2"
                              >
                                <span className="text-lg">✔</span> Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleDeclineProposal(
                                    project._id,
                                    applicant.freelancerId
                                  )
                                }
                                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md ring-2 ring-red-500 ring-opacity-0 hover:ring-opacity-50 flex items-center gap-2"
                              >
                                <span className="text-lg">✖</span> Decline
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                disabled
                                className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed opacity-70"
                              >
                                ✔ Accept
                              </button>
                              <button
                                disabled
                                className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed opacity-70"
                              >
                                ✖ Decline
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white text-gray-900">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;