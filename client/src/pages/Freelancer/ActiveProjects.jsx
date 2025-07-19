import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Search,
    Filter,
    Calendar,
    DollarSign,
    MessageSquare,
    CheckCircle,
    Clock,
    AlertCircle,
    Star,
    Menu
} from 'lucide-react';
import Sidebar from './Sidebar';
import useUserStore from '../../store/userStore';
import axiosInstance from '../../api/axiosInstance';
const ActiveProjects = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useUserStore((state) => state.user);
    // Get freelancer ID from localStorage or context
    const getFreelancerId = () => {
        // const user = JSON.parse(localStorage.getItem('user'));
        // return user?.id || user?._id || '68737c718a4b0e09448f541b'; // Fallback for testing
        return user?.id;
    };

    useEffect(() => {
        fetchActiveProjects();
    }, []);

    const fetchActiveProjects = async () => {
        try {
            setLoading(true);
            const freelancerId = getFreelancerId();
            
            if (!freelancerId) {
                setError('Freelancer ID not found. Please login again.');
                setLoading(false);
                return;
            }

            const response = await axiosInstance.get(`/freelancer/active-projects/${freelancerId}`);
            // console.log('Fetched projects:', response.data);
            setProjects(response.data.projects || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching projects:', err);
            if (err.response && err.response.status === 404) {
                setError('No active projects found for this freelancer.');
                setProjects([]);
            } else {
                setError('Failed to fetch projects. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-blue-100 text-blue-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Completed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "Active":
                return "In Progress";
            case "Pending":
                return "Pending";
            case "Completed":
                return "Completed";
            case "cancelled":
                return "Cancelled";
            default:
                return status;
        }
    };

    const getUrgencyColor = (deadline) => {
        if (!deadline) return "text-gray-600";
        
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline <= 3) return "text-red-600";
        if (daysUntilDeadline <= 7) return "text-yellow-600";
        return "text-green-600";
    };

    const getUrgencyIcon = (deadline) => {
        if (!deadline) return <Clock className="h-4 w-4" />;
        
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline <= 3) return <AlertCircle className="h-4 w-4" />;
        if (daysUntilDeadline <= 7) return <Clock className="h-4 w-4" />;
        return <CheckCircle className="h-4 w-4" />;
    };

    const getUrgencyText = (deadline) => {
        if (!deadline) return "normal";
        
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline <= 3) return "high";
        if (daysUntilDeadline <= 7) return "medium";
        return "normal";
    };

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.client?.name && project.client.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === "all" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: projects.length,
        inProgress: projects.filter((p) => p.status === "Active").length,
        pending: projects.filter((p) => p.status === "Pending").length,
        completed: projects.filter((p) => p.status === "Completed").length,
        totalEarned: projects.reduce((sum, p) => sum + (p.earned || 0), 0),
        pendingPayment: projects.reduce((sum, p) => sum + (p.paymentStatus === "Unpaid" ? (p.earned || 0) : 0), 0),
    };

    const Card = ({ children, className = "" }) => (
        <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
            {children}
        </div>
    );

    const CardHeader = ({ children, className = "" }) => (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );

    const CardContent = ({ children, className = "" }) => (
        <div className={`px-6 pb-6 ${className}`}>
            {children}
        </div>
    );

    const Badge = ({ children, className = "", variant = "default" }) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        const variants = {
            default: "bg-gray-100 text-gray-800",
            outline: "border border-gray-300 bg-white text-gray-700"
        };

        return (
            <span className={`${baseClasses} ${variant === "outline" ? variants.outline : ""} ${className}`}>
                {children}
            </span>
        );
    };

    const Button = ({ children, className = "", variant = "default", size = "default", onClick }) => {
        const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
        const variants = {
            default: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500",
            outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
        };
        const sizes = {
            default: "px-4 py-2 text-sm",
            sm: "px-3 py-1.5 text-sm"
        };

        return (
            <button
                className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
                onClick={onClick}
            >
                {children}
            </button>
        );
    };

    const Input = ({ className = "", ...props }) => (
        <input
            className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${className}`}
            {...props}
        />
    );

    const Select = ({ children, value, onValueChange, className = "" }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                    <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        {value === "all" ? "All Projects" :
                            value === "Active" ? "In Progress" :
                                value === "Pending" ? "Pending" :
                                    value === "Completed" ? "Completed" : "Filter by status"}
                    </div>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {[
                            { value: "all", label: "All Projects" },
                            { value: "Active", label: "In Progress" },
                            { value: "Pending", label: "Pending" },
                            { value: "Completed", label: "Completed" }
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onValueChange(option.value);
                                    setIsOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const Avatar = ({ src, alt, fallback }) => (
        <div className="relative h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500 font-medium">
                    {fallback}
                </div>
            )}
        </div>
    );

    const Progress = ({ value, className = "" }) => (
        <div className={`w-full bg-gray-200 rounded-full ${className}`}>
            <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${value || 0}%` }}
            />
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="w-full mx-auto space-y-8 lg:ml-64">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading projects...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="w-full mx-auto space-y-8 lg:ml-64">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={fetchActiveProjects}>Try Again</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="w-full mx-auto space-y-8 lg:ml-64">
                {/* Header */}
                <div className="flex items-center jusify-start lg:justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-6">
                        <Menu className="w-6 h-6 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Active Projects</h1>
                        <p className="text-gray-600 mt-1">Manage your ongoing work and track progress</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white sm:ml-64">
                        <Search className="h-4 w-4 mr-2" />
                        Find More Work
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
                            <Briefcase className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl text-black font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
                            <Clock className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Total Earned</h3>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">${stats.totalEarned.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Pending Payment</h3>
                            <DollarSign className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">${stats.pendingPayment.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-48" />
                        </div>
                    </CardContent>
                </Card>

                {/* Projects List */}
                <div className="space-y-6">
                    {filteredProjects.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center py-12">
                                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                                    <p className="text-gray-500 mb-4">
                                        {statusFilter === "all"
                                            ? "You don't have any active projects yet."
                                            : `No projects with ${getStatusText(statusFilter)} status.`}
                                    </p>
                                    {statusFilter === "all" && (
                                        <Button>Browse Projects</Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredProjects.map((project) => (
                            <Card key={project._id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl text-black font-semibold">{project.title}</h3>
                                                <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                                                <div className={`flex items-center gap-1 ${getUrgencyColor(project.deadline)}`}>
                                                    {getUrgencyIcon(project.deadline)}
                                                    <span className="text-sm capitalize">{getUrgencyText(project.deadline)} Priority</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-black gap-3 mb-4">
                                                <Avatar
                                                    src={project.client?.avatar}
                                                    alt={project.client?.name}
                                                    fallback={project.client?.name?.charAt(0) || 'C'}
                                                />
                                                <div>
                                                    <p className="font-medium text-black">{project.client?.name || 'Unknown Client'}</p>
                                                    <p className="text-sm text-gray-600">{project.client?.company || project.client?.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right ml-4">
                                            <p className="text-2xl text-yellow-600 font-bold">${project.budget?.toLocaleString() || 0}</p>
                                            <p className="text-sm text-gray-500">Total Budget</p>
                                            <p className="text-lg font-semibold text-green-600 mt-1">
                                                ${(project.earned || 0).toLocaleString()} earned
                                            </p>
                                            {project.paymentStatus === "Unpaid" && project.earned > 0 && (
                                                <p className="text-sm text-yellow-600">${(project.earned || 0).toLocaleString()} pending</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-black font-medium">Overall Progress</span>
                                            <span className="text-sm text-gray-600">{project.progress || 0}%</span>
                                        </div>
                                        <Progress value={project.progress} className="h-3" />
                                    </div>

                                    

                                    {/* Project Meta */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">
                                                Due: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">
                                                Started: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Not set'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">
                                                Last updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'Not set'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">
                                                {project.budget ? Math.round(((project.earned || 0) / project.budget) * 100) : 0}% earned
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                            <Button size="sm">
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                Chat
                                            </Button>
                                        </div>

                                        {project.status === "Active" && (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                Mark Complete
                                            </Button>
                                        )}

                                        {project.status === "Pending" && (
                                            <Badge className="bg-yellow-100 text-yellow-800">Waiting to start</Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveProjects;