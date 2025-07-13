import { useState ,useEffect} from "react"
import { Send, Search, Filter, Calendar, DollarSign, Eye, MessageSquare, CheckCircle, X, Menu } from "lucide-react"
import Sidebar from "./Sidebar"
import axiosInstance from "../../api/axiosInstance"
export default function MyApplications() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [activeTab, setActiveTab] = useState("all")
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

   const FreelancerId='68737c718a4b0e09448f541b'

    useEffect(() => {
        // Fetch proposals from API or state management
        fetchApplications();
    }, [])
    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`/freelancer/applications/${FreelancerId}`);
            setApplications(response.data.applications || []);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error response:', error.response.data);
                setError(`Failed to fetch applications: ${error.response.data.message || error.message}`);
            } else {
                // Network error or other
                console.error('Error fetching applications:', error);
                setError(`Failed to fetch applications: ${error.message}`);
            }
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

  

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "accepted":
                return "bg-green-100 text-green-800"
            case "declined":
                return "bg-red-100 text-red-800"
            case "withdrawn":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "pending":
                return "Pending"
            case "accepted":
                return "Accepted"
            case "declined":
                return "Declined"
            case "withdrawn":
                return "Withdrawn"
            default:
                return status
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Send className="h-4 w-4" />
            case "accepted":
                return <CheckCircle className="h-4 w-4" />
            case "declined":
                return <X className="h-4 w-4" />
            case "withdrawn":
                return <X className="h-4 w-4" />
            default:
                return <Send className="h-4 w-4" />
        }
    }

    // Ensure applications is always an array
    const applicationsArray = Array.isArray(applications) ? applications : [];
    console.log('Applications state:', applications);
    console.log('ApplicationsArray length:', applicationsArray.length);
    
    const filteredapplications = applicationsArray.filter((proposal) => {
        const matchesSearch =
            proposal.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.client.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || proposal.status === statusFilter
        return matchesSearch && matchesStatus
    })
    
    console.log('Filtered applications length:', filteredapplications.length);
    console.log('Active tab:', activeTab);

    const applicationsByStatus = {
        all: filteredapplications,
        pending: filteredapplications.filter((p) => p.status === "pending"),
        accepted: filteredapplications.filter((p) => p.status === "accepted"),
        declined: filteredapplications.filter((p) => p.status === "declined"),
        withdrawn: filteredapplications.filter((p) => p.status === "withdrawn"),
    };

    console.log('Applications by status:', applicationsByStatus);
    console.log('Current tab applications:', applicationsByStatus[activeTab]);

    const stats = {
        total: applicationsArray.length,
        pending: applicationsArray.filter((p) => p.status === "pending").length,
        accepted: applicationsArray.filter((p) => p.status === "accepted").length,
        declined: applicationsArray.filter((p) => p.status === "declined").length,
        successRate: applicationsArray.length > 0 ? Math.round((applicationsArray.filter((p) => p.status === "accepted").length / applicationsArray.length) * 100) : 0,
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="w-full px-1 sm:px-8 lg:px-12 lg:ml-64">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading applications...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="w-full px-1 sm:px-8 lg:px-12 lg:ml-64">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="text-red-500 mb-4">
                                <Send className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading applications</h3>
                            <p className="text-gray-500 mb-4">{error}</p>
                            <button 
                                onClick={fetchApplications}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="w-full px-1 sm:px-8 lg:px-12 lg:ml-64">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center jusify-start sm:gap-6 lg:justify-between flex-wrap sm:flex-nowrap">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                            <Menu className="w-6 h-6 text-gray-500" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                            <p className="text-gray-600 mt-1">Track all your submitted applications</p>
                        </div>
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-3 sm:ml-12 transition-all">
                            <Search className="h-4 w-4" />
                            Browse Projects
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <Send className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <Send className="h-8 w-8 text-yellow-600" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Accepted</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                                </div>
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Declined</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.declined}</p>
                                </div>
                                <X className="h-8 w-8 text-red-600" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                                </div>
                                <CheckCircle className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search Applications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Applications</option>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="declined">Declined</option>
                                    <option value="withdrawn">Withdrawn</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Application Tabs */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                            <div className="grid grid-cols-5 gap-1">
                                {Object.entries(applicationsByStatus).map(([status, statusApplications]) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveTab(status)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === status
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {getStatusText(status)} ({statusApplications.length})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-4">
                            {applicationsByStatus[activeTab].length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                                    <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                                    <p className="text-gray-500 mb-4">
                                        {activeTab === "all"
                                            ? "You haven't submitted any applications yet."
                                            : `No applications with ${getStatusText(activeTab)} status.`}
                                    </p>
                                    {activeTab === "all" && (
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                                            Browse Projects
                                        </button>
                                    )}
                                </div>
                            ) : (
                                applicationsByStatus[activeTab].map((proposal) => (
                                    <div key={proposal.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">{proposal.projectTitle}</h3>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                                                        {getStatusIcon(proposal.status)}
                                                        {getStatusText(proposal.status)}
                                                    </span>
                                                    {proposal.shortlisted && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            ⭐ Shortlisted
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-600">
                                                            {proposal.client.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-900">{proposal.client.name}</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-yellow-400 text-xs">★</span>
                                                            <span className="text-xs text-gray-600">{proposal.client.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{proposal.coverLetter}</p>
                                            </div>

                                            <div className="text-right lg:ml-4">
                                                <p className="text-xl font-bold text-gray-900">${proposal.proposedBudget.toLocaleString()}</p>
                                                <p className="text-sm text-gray-500">Proposed</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                <span>Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Eye className="h-4 w-4" />
                                                <span>{proposal.views} views</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <DollarSign className="h-4 w-4" />
                                                <span>Timeline: {proposal.timeline}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {proposal.status === "accepted" && proposal.acceptedAt && (
                                                    <>
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                        <span className="text-green-600 text-sm">
                                                            Accepted {new Date(proposal.acceptedAt).toLocaleDateString()}
                                                        </span>
                                                    </>
                                                )}
                                                {proposal.status === "declined" && proposal.declinedAt && (
                                                    <>
                                                        <X className="h-4 w-4 text-red-600" />
                                                        <span className="text-red-600 text-sm">
                                                            Declined {new Date(proposal.declinedAt).toLocaleDateString()}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {proposal.status === "declined" && proposal.declineReason && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-red-800">
                                                    <strong>Decline reason:</strong> {proposal.declineReason}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex flex-wrap gap-2">
                                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    View Project
                                                </button>
                                                {proposal.status === "accepted" && (
                                                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1">
                                                        <MessageSquare className="h-4 w-4" />
                                                        Chat with Client
                                                    </button>
                                                )}
                                            </div>

                                            {proposal.status === "pending" && (
                                                <div className="flex flex-wrap gap-2">
                                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                        Edit Proposal
                                                    </button>
                                                    <button className="px-3 py-1 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                                                        Withdraw
                                                    </button>
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
        </div>
    )
}