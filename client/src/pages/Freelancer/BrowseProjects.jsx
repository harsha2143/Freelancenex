// index.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, DollarSign, Calendar, MapPin, Star, Clock, Users, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import axiosInstance from "../../api/axiosInstance";
import useUserStore from "../../store/userStore";
// Mock useAuth hook

// Mock FreelancerLayout component
const FreelancerLayout = ({ children }) => (
    <div className="container mx-auto px-4 py-8">{children}</div>
);

// Mock Shadcn components with Tailwind styling
const Card = ({ className, children }) => (
    <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
    <div className="p-6 border-b">{children}</div>
);

const CardTitle = ({ className, children }) => (
    <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

const CardContent = ({ className, children }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ className, children, variant = "default", onClick }) => (
    <button
        className={`px-4 py-2 rounded-md font-medium transition-colors ${variant === "outline"
            ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            } ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
);

const Badge = ({ className, children, variant = "default" }) => (
    <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variant === "outline"
            ? "border border-gray-300 text-gray-700"
            : variant === "secondary"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
            } ${className}`}
    >
        {children}
    </span>
);

const Avatar = ({ children }) => (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">{children}</div>
);

const AvatarImage = ({ src }) => (
    <img src={src} alt="avatar" className="w-full h-full object-cover" />
);

const AvatarFallback = ({ children }) => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">{children}</div>
);

const Input = ({ className, placeholder, value, onChange }) => (
    <input
        type="text"
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

const Select = ({ value, onValueChange, children }) => (
    <select
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
    >
        {children}
    </select>
);

const SelectTrigger = ({ children }) => <div>{children}</div>;
const SelectValue = () => null;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => (
    <option value={value}>{children}</option>
);

const Slider = ({ value, onValueChange, max, min, step }) => (
    <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange([Number(e.target.value), value[1]])}
        className="w-full"
    />
);

const Checkbox = ({ id, checked, onCheckedChange }) => (
    <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
);

const BrowseProjects = () => {
    // const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [budgetRange, setBudgetRange] = useState([0, 10000]);
    const [experienceLevel, setExperienceLevel] = useState("all");
    const [projectLength, setProjectLength] = useState("all");
    // const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`/freelancer/projects`);

            const data = response.data;
            // console.log('Fetched projects:', data);

            if (data.projects && Array.isArray(data.projects)) {
                setProjects(data.projects);
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to fetch projects. Please try again later.');
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };
    const handleApplyProject = async (projectId) => {
        try {
            console.log(user?.id);
            console.log(projectId);
            const response = await axiosInstance.post('/freelancer/projects/apply', { // Or whatever your API endpoint is
                projectId: projectId,
                freelancerId: user.id
                // If you added to schema:
                // proposalText: proposalText,
                // bidAmount: bidAmount,
            });

            // Check for success
            if (response.status === 200) {
                console.log(response.data.message); // "Application submitted successfully!"
                // Update UI, show success message, disable button, etc.
                alert("Application submitted successfully!");
                // You might want to refresh project data or update the local state
            }

        } catch (error) {
            console.error('Error submitting proposal:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 409) {
                alert(error.response.data.message); // "You have already applied to this project."
            } else {
                alert('Failed to submit application. Please try again.');
            }
        }
    };


    const categories = [
        { value: "all", label: "All Categories" },
        { value: "Web Development", label: "Web Development" },
        { value: "Mobile Development", label: "Mobile Development" },
        { value: "UI/UX Design", label: "UI/UX Design" },
        { value: "Content Writing", label: "Content Writing" },
        { value: "Data Science", label: "Data Science" },
        { value: "Digital Marketing", label: "Digital Marketing" },
        { value: "Other", label: "Other" },
    ];

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.requiredSkills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;

        const projectBudget = project.budget || 0;
        const matchesBudget = projectBudget >= budgetRange[0] && projectBudget <= budgetRange[1];

        const matchesExperience = experienceLevel === "all" || project.experienceLevel === experienceLevel;

        // For project length, we'll use a simple heuristic based on deadline
        const now = new Date();
        const deadline = new Date(project.deadline);
        const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

        let projectLengthCategory = "more_than_6_months";
        if (daysUntilDeadline <= 30) projectLengthCategory = "less_than_1_month";
        else if (daysUntilDeadline <= 90) projectLengthCategory = "1_to_3_months";
        else if (daysUntilDeadline <= 180) projectLengthCategory = "3_to_6_months";

        const matchesLength = projectLength === "all" || projectLengthCategory === projectLength;

        return matchesSearch && matchesCategory && matchesBudget && matchesExperience && matchesLength;
    });

    const formatBudget = (budget, budgetType) => {
        if (budgetType === "Hourly") {
            return `$${budget}/hr`;
        } else {
            return `$${budget.toLocaleString()}`;
        }
    };

    const getExperienceLabel = (level) => {
        switch (level) {
            case "Entry Level":
                return "Entry Level";
            case "Intermediate":
                return "Intermediate";
            case "Expert":
                return "Expert";
            default:
                return level;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    if (loading) {
        return (
            <FreelancerLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading projects...</p>
                    </div>
                </div>
            </FreelancerLayout>
        );
    }

    if (error) {
        return (
            <FreelancerLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="text-red-500 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading projects</h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <Button onClick={fetchProjects}>Try Again</Button>
                    </div>
                </div>
            </FreelancerLayout>
        );
    }

    return (
        <FreelancerLayout>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:ml-64">

                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-6">
                    <Menu className="w-6 h-6 text-gray-500" />
                </button>

                {/* Projects List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Header */}
                    <motion.div className="flex items-center justify-between"
                        initial={{ opacity: 0.1, y: 80 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 1 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}>
                        <div>
                            <h1 className="text-3xl font-bold text-black">Browse Projects</h1>
                            <p className="text-gray-600 mt-1">{filteredProjects.length} projects found</p>
                        </div>
                    </motion.div>

                    {/* Projects */}
                    <motion.div className="space-y-4"
                        initial={{ opacity: 0.2, y: 80 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 1.5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}>
                        {filteredProjects.length === 0 ? (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center py-12">
                                        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                                        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredProjects.map((project) => (
                                <Card
                                    key={project._id}
                                    className={`hover:shadow-lg transition-shadow ${project.isFeatured ? "ring-2 ring-yellow-200 bg-yellow-50" : ""
                                        }`}
                                >
                                    <CardContent className="pt-6">
                                        {project.isFeatured && (
                                            <Badge className="mb-3">⭐ Featured Project</Badge>
                                        )}

                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl text-black font-semibold mb-2">{project.title}</h3>
                                                <p className="text-gray-600 mb-3 line-clamp-3">{project.description}</p>

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {project.requiredSkills.map((skill, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-right ml-4">
                                                <p className="text-xl font-bold text-green-600">{formatBudget(project.budget, project.budgetType)}</p>
                                                <p className="text-sm text-gray-500">
                                                    {project.budgetType}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Project Meta */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-black">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-800" />
                                                <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-800" />
                                                <span>{project.applicants ? project.applicants.length : 0} proposals</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-800" />
                                                <span>Posted {formatDate(project.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {getExperienceLabel(project.experienceLevel)}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between">
                                            <Button variant="outline">View Details</Button>
                                            <Button onClick={() => handleApplyProject(project._id)}>Submit Proposal</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </motion.div>
                </div>

                {/* Filters Sidebar */}
                <motion.div className="lg:col-span-1"
                    initial={{ opacity: 0.1, y: 80 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}>
                    <Card className="sticky top-6">
                        <CardHeader>
                            <CardTitle className="flex text-black items-center gap-2">
                                <Filter className="h-7 text-black w-8" />
                                <span className="font-bold text-2xl">Filters</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Search */}
                            <div className="space-y-2 text-black">
                                <label className="text-sm text-black font-medium">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="space-y-2 text-black">
                                <label className="text-sm text-black font-medium">Category</label>
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Budget Range */}
                            <div className="space-y-2">
                                <label className="text-sm text-black font-medium">Budget Range</label>
                                <div className="px-2">
                                    <Slider
                                        value={budgetRange}
                                        onValueChange={setBudgetRange}
                                        max={10000}
                                        min={0}
                                        step={100}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>${budgetRange[0]}</span>
                                        <span>${budgetRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div className="space-y-2 text-black">
                                <label className="text-sm text-black font-medium">Experience Level</label>
                                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="text-black">
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Project Length */}
                            <div className="space-y-2 text-black">
                                <label className="text-sm text-black font-medium">Project Length</label>
                                <Select value={projectLength} onValueChange={setProjectLength}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Any Duration</SelectItem>
                                        <SelectItem value="less_than_1_month">Less than 1 month</SelectItem>
                                        <SelectItem value="1_to_3_months">1 to 3 months</SelectItem>
                                        <SelectItem value="3_to_6_months">3 to 6 months</SelectItem>
                                        <SelectItem value="more_than_6_months">More than 6 months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </FreelancerLayout>
    );
};

export default BrowseProjects;