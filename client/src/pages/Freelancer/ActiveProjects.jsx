import React, { useState } from 'react';
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
const ActiveProjects = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [projects] = useState([
        {
            id: 1,
            title: "E-commerce Website Development",
            client: {
                name: "TechCorp Inc.",
                avatar: "/api/placeholder/40/40",
                rating: 4.8,
            },
            budget: 5000,
            progress: 65,
            deadline: "2024-02-15",
            status: "in_progress",
            startedAt: "2024-01-10",
            milestones: [
                { id: 1, name: "Database Setup", status: "completed", amount: 1500, completedAt: "2024-01-15" },
                { id: 2, name: "Frontend Development", status: "in_progress", amount: 2000, dueDate: "2024-02-01" },
                { id: 3, name: "Payment Integration", status: "pending", amount: 1500, dueDate: "2024-02-10" },
            ],
            totalEarned: 1500,
            pendingPayment: 0,
            lastActivity: "2024-01-25",
            urgency: "normal",
        },
        {
            id: 2,
            title: "Mobile App Backend API",
            client: {
                name: "StartupXYZ",
                avatar: "/api/placeholder/40/40",
                rating: 4.7,
            },
            budget: 3500,
            progress: 30,
            deadline: "2024-02-28",
            status: "in_progress",
            startedAt: "2024-01-20",
            milestones: [
                { id: 1, name: "API Design", status: "completed", amount: 1000, completedAt: "2024-01-25" },
                { id: 2, name: "Authentication System", status: "in_progress", amount: 1500, dueDate: "2024-02-05" },
                { id: 3, name: "Data Models", status: "pending", amount: 1000, dueDate: "2024-02-15" },
            ],
            totalEarned: 1000,
            pendingPayment: 0,
            lastActivity: "2024-01-26",
            urgency: "normal",
        },
        {
            id: 3,
            title: "WordPress Website Redesign",
            client: {
                name: "Sarah Johnson",
                avatar: "/api/placeholder/40/40",
                rating: 4.6,
            },
            budget: 2000,
            progress: 85,
            deadline: "2024-01-30",
            status: "review",
            startedAt: "2024-01-08",
            milestones: [
                { id: 1, name: "Theme Setup", status: "completed", amount: 500, completedAt: "2024-01-12" },
                { id: 2, name: "Content Migration", status: "completed", amount: 1000, completedAt: "2024-01-20" },
                { id: 3, name: "Final Testing", status: "review", amount: 500, submittedAt: "2024-01-26" },
            ],
            totalEarned: 1500,
            pendingPayment: 500,
            lastActivity: "2024-01-26",
            urgency: "high",
        },
        {
            id: 4,
            title: "Content Writing for Tech Blog",
            client: {
                name: "Mike Chen",
                avatar: "/api/placeholder/40/40",
                rating: 4.5,
            },
            budget: 800,
            progress: 100,
            deadline: "2024-01-30",
            status: "completed",
            startedAt: "2024-01-05",
            milestones: [
                { id: 1, name: "Research & Outline", status: "completed", amount: 200, completedAt: "2024-01-08" },
                { id: 2, name: "First 5 Articles", status: "completed", amount: 300, completedAt: "2024-01-15" },
                { id: 3, name: "Final 5 Articles", status: "completed", amount: 300, completedAt: "2024-01-25" },
            ],
            totalEarned: 800,
            pendingPayment: 0,
            lastActivity: "2024-01-25",
            urgency: "normal",
        },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case "in_progress":
                return "bg-blue-100 text-blue-800";
            case "review":
                return "bg-yellow-100 text-yellow-800";
            case "completed":
                return "bg-green-100 text-green-800";
            case "on_hold":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "in_progress":
                return "In Progress";
            case "review":
                return "Under Review";
            case "completed":
                return "Completed";
            case "on_hold":
                return "On Hold";
            default:
                return status;
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "high":
                return "text-red-600";
            case "medium":
                return "text-yellow-600";
            case "normal":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    const getUrgencyIcon = (urgency) => {
        switch (urgency) {
            case "high":
                return <AlertCircle className="h-4 w-4" />;
            case "medium":
                return <Clock className="h-4 w-4" />;
            case "normal":
                return <CheckCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: projects.length,
        inProgress: projects.filter((p) => p.status === "in_progress").length,
        review: projects.filter((p) => p.status === "review").length,
        completed: projects.filter((p) => p.status === "completed").length,
        totalEarned: projects.reduce((sum, p) => sum + p.totalEarned, 0),
        pendingPayment: projects.reduce((sum, p) => sum + p.pendingPayment, 0),
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
                            value === "in_progress" ? "In Progress" :
                                value === "review" ? "Under Review" :
                                    value === "completed" ? "Completed" :
                                        value === "on_hold" ? "On Hold" : "Filter by status"}
                    </div>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {[
                            { value: "all", label: "All Projects" },
                            { value: "in_progress", label: "In Progress" },
                            { value: "review", label: "Under Review" },
                            { value: "completed", label: "Completed" },
                            { value: "on_hold", label: "On Hold" }
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
                style={{ width: `${value}%` }}
            />
        </div>
    );

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
                            <h3 className="text-sm font-medium text-gray-500">Under Review</h3>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.review}</div>
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
                            <Card key={project.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl text-black font-semibold">{project.title}</h3>
                                                <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                                                <div className={`flex items-center gap-1 ${getUrgencyColor(project.urgency)}`}>
                                                    {getUrgencyIcon(project.urgency)}
                                                    <span className="text-sm capitalize">{project.urgency} Priority</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-black gap-3 mb-4">
                                                <Avatar
                                                    src={project.client.avatar}
                                                    alt={project.client.name}
                                                    fallback={project.client.name.charAt(0)}
                                                />
                                                <div>
                                                    <p className="font-medium text-black">{project.client.name}</p>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm text-gray-600">{project.client.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right ml-4">
                                            <p className="text-2xl text-yellow-600 font-bold">${project.budget.toLocaleString()}</p>
                                            <p className="text-sm text-gray-500">Total Budget</p>
                                            <p className="text-lg font-semibold text-green-600 mt-1">
                                                ${project.totalEarned.toLocaleString()} earned
                                            </p>
                                            {project.pendingPayment > 0 && (
                                                <p className="text-sm text-yellow-600">${project.pendingPayment.toLocaleString()} pending</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-black font-medium">Overall Progress</span>
                                            <span className="text-sm text-gray-600">{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} className="h-3" />
                                    </div>

                                    {/* Milestones */}
                                    <div className="mb-6">
                                        <h4 className="font-medium text-blue-500 mb-3">Milestones</h4>
                                        <div className="space-y-3">
                                            {project.milestones.map((milestone) => (
                                                <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-3 h-3 rounded-full ${milestone.status === "completed"
                                                                ? "bg-green-500"
                                                                : milestone.status === "in_progress"
                                                                    ? "bg-blue-500"
                                                                    : milestone.status === "review"
                                                                        ? "bg-yellow-500"
                                                                        : "bg-gray-300"
                                                                }`}
                                                        />
                                                        <div>
                                                            <p className="font-medium text-black text-sm">{milestone.name}</p>
                                                            <p className="text-xs text-gray-600">
                                                                {milestone.status === "completed" &&
                                                                    milestone.completedAt &&
                                                                    `Completed ${new Date(milestone.completedAt).toLocaleDateString()}`}
                                                                {milestone.status === "review" &&
                                                                    milestone.submittedAt &&
                                                                    `Submitted ${new Date(milestone.submittedAt).toLocaleDateString()}`}
                                                                {milestone.status === "in_progress" &&
                                                                    milestone.dueDate &&
                                                                    `Due ${new Date(milestone.dueDate).toLocaleDateString()}`}
                                                                {milestone.status === "pending" &&
                                                                    milestone.dueDate &&
                                                                    `Due ${new Date(milestone.dueDate).toLocaleDateString()}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-sm">${milestone.amount.toLocaleString()}</p>
                                                        <Badge variant="outline" className="text-xs">
                                                            {milestone.status === "completed"
                                                                ? "Paid"
                                                                : milestone.status === "review"
                                                                    ? "Review"
                                                                    : milestone.status === "in_progress"
                                                                        ? "Active"
                                                                        : "Pending"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Meta */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">Started: {new Date(project.startedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">Last activity: {new Date(project.lastActivity).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-gray-800" />
                                            <span className="text-black">{Math.round((project.totalEarned / project.budget) * 100)}% earned</span>
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

                                        {project.status === "in_progress" && (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                Mark Milestone Complete
                                            </Button>
                                        )}

                                        {project.status === "review" && (
                                            <Badge className="bg-yellow-100 text-yellow-800">Waiting for client review</Badge>
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