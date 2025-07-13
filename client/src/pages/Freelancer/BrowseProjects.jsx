// index.js
import React, { useState } from "react";
import { Search, Filter, DollarSign, Calendar, MapPin, Star, Clock, Users,Menu } from "lucide-react";
import Sidebar from "./Sidebar";
// Mock useAuth hook
const useAuth = () => ({
    user: { id: 1, name: "Freelancer" },
});

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
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [budgetRange, setBudgetRange] = useState([0, 10000]);
    const [experienceLevel, setExperienceLevel] = useState("all");
    const [projectLength, setProjectLength] = useState("all");
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const projects = [
        {
            id: 1,
            title: "React Native Mobile App Development",
            description:
                "Looking for an experienced React Native developer to build a cross-platform mobile app for our food delivery service. The app should include user authentication, real-time tracking, payment integration, and push notifications.",
            budget: { type: "fixed", amount: 4500, min: null, max: null },
            deadline: "2024-03-15",
            category: "mobile_development",
            skills: ["React Native", "JavaScript", "API Integration", "Firebase"],
            client: {
                name: "TechCorp Inc.",
                avatar: "/placeholder.svg?height=40&width=40",
                rating: 4.8,
                verified: true,
                location: "United States",
                totalSpent: 25000,
                projectsPosted: 12,
            },
            proposals: 8,
            postedTime: "2 hours ago",
            experienceLevel: "intermediate",
            projectLength: "1_to_3_months",
            featured: true,
        },
        {
            id: 2,
            title: "WordPress Website Redesign",
            description:
                "Need to redesign our existing WordPress website with a modern, responsive design. The site should be optimized for SEO and mobile devices. Experience with WooCommerce is a plus.",
            budget: { type: "range", amount: null, min: 1500, max: 2500 },
            deadline: "2024-02-28",
            category: "web_development",
            skills: ["WordPress", "PHP", "CSS", "JavaScript", "WooCommerce"],
            client: {
                name: "Sarah Johnson",
                avatar: "/placeholder.svg?height=40&width=40",
                rating: 4.6,
                verified: false,
                location: "Canada",
                totalSpent: 8500,
                projectsPosted: 5,
            },
            proposals: 12,
            postedTime: "5 hours ago",
            experienceLevel: "intermediate",
            projectLength: "less_than_1_month",
            featured: false,
        },
        {
            id: 3,
            title: "Python Data Analysis Script",
            description:
                "Create a Python script to analyze sales data from CSV files. The script should generate visualizations and provide insights on sales trends, customer behavior, and product performance.",
            budget: { type: "hourly", amount: null, min: 25, max: 40 },
            deadline: "2024-02-20",
            category: "data_science",
            skills: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
            client: {
                name: "DataCorp Analytics",
                avatar: "/placeholder.svg?height=40&width=40",
                rating: 4.9,
                verified: true,
                location: "United Kingdom",
                totalSpent: 15000,
                projectsPosted: 8,
            },
            proposals: 6,
            postedTime: "1 day ago",
            experienceLevel: "expert",
            projectLength: "less_than_1_month",
            featured: false,
        },
        {
            id: 4,
            title: "UI/UX Design for SaaS Platform",
            description:
                "Design a modern, intuitive user interface for our SaaS platform. We need wireframes, mockups, and a complete design system. Experience with B2B software design is preferred.",
            budget: { type: "fixed", amount: 3200 },
            deadline: "2024-03-10",
            category: "ui_ux_design",
            skills: ["UI/UX", "Figma", "Design Systems", "Prototyping"],
            client: {
                name: "StartupXYZ",
                avatar: "/placeholder.svg?height=40&width=40",
                rating: 4.7,
                verified: true,
                location: "Australia",
                totalSpent: 12000,
                projectsPosted: 6,
            },
            proposals: 15,
            postedTime: "2 days ago",
            experienceLevel: "intermediate",
            projectLength: "1_to_3_months",
            featured: true,
        },
        {
            id: 5,
            title: "Content Writing for Tech Blog",
            description:
                "Write 10 high-quality, SEO-optimized blog posts about emerging technologies. Each post should be 1500-2000 words and include proper research and citations.",
            budget: { type: "fixed", amount: 800 },
            deadline: "2024-03-01",
            category: "content_writing",
            skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
            client: {
                name: "Mike Chen",
                avatar: "/placeholder.svg?height=40&width=40",
                rating: 4.5,
                verified: false,
                location: "Singapore",
                totalSpent: 3500,
                projectsPosted: 3,
            },
            proposals: 20,
            postedTime: "3 days ago",
            experienceLevel: "intermediate",
            projectLength: "less_than_1_month",
            featured: false,
        },
    ];

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "web_development", label: "Web Development" },
        { value: "mobile_development", label: "Mobile Development" },
        { value: "ui_ux_design", label: "UI/UX Design" },
        { value: "content_writing", label: "Content Writing" },
        { value: "data_science", label: "Data Science" },
        { value: "digital_marketing", label: "Digital Marketing" },
    ];

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;

        const projectBudget =
            project.budget.type === "fixed"
                ? project.budget.amount
                : (project.budget.min + project.budget.max) / 2;
        const matchesBudget = projectBudget >= budgetRange[0] && projectBudget <= budgetRange[1];

        const matchesExperience = experienceLevel === "all" || project.experienceLevel === experienceLevel;
        const matchesLength = projectLength === "all" || project.projectLength === projectLength;
        const matchesVerified = !verifiedOnly || project.client.verified;

        return matchesSearch && matchesCategory && matchesBudget && matchesExperience && matchesLength && matchesVerified;
    });

    const formatBudget = (budget) => {
        if (budget.type === "fixed") {
            return `$${budget.amount.toLocaleString()}`;
        } else if (budget.type === "hourly") {
            return `$${budget.min}-${budget.max}/hr`;
        } else {
            return `$${budget.min.toLocaleString()}-${budget.max.toLocaleString()}`;
        }
    };

    const getExperienceLabel = (level) => {
        switch (level) {
            case "entry":
                return "Entry Level";
            case "intermediate":
                return "Intermediate";
            case "expert":
                return "Expert";
            default:
                return level;
        }
    };

    return (
        <FreelancerLayout>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:ml-64">
                
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-6">
                    <Menu className="w-6 h-6 text-gray-500" />
                </button>
                {/* Filters Sidebar */}
                

                {/* Projects List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-black">Browse Projects</h1>
                            <p className="text-gray-600 mt-1">{filteredProjects.length} projects found</p>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="space-y-4">
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
                                    key={project.id}
                                    className={`hover:shadow-lg transition-shadow ${project.featured ? "ring-2 ring-yellow-200 bg-yellow-50" : ""
                                        }`}
                                >
                                    <CardContent className="pt-6">
                                        {project.featured && (
                                            <Badge className="mb-3">⭐ Featured Project</Badge>
                                        )}

                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl text-black font-semibold mb-2">{project.title}</h3>
                                                <p className="text-gray-600 mb-3 line-clamp-3">{project.description}</p>

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {project.skills.map((skill, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-right ml-4">
                                                <p className="text-xl font-bold text-green-600">{formatBudget(project.budget)}</p>
                                                <p className="text-sm text-gray-500">
                                                    {project.budget.type === "hourly" ? "Hourly" : "Fixed Price"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Client Info */}
                                        <div className="flex items-center text-black gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                                            <Avatar>
                                                <AvatarImage src={project.client.avatar} />
                                                <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium">{project.client.name}</p>
                                                    {project.client.verified && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            ✓ Verified
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                                        <span>{project.client.rating}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>{project.client.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-3 w-3" />
                                                        <span>${project.client.totalSpent.toLocaleString()} spent</span>
                                                    </div>
                                                </div>
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
                                                <span>{project.proposals} proposals</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-800" />
                                                <span>Posted {project.postedTime}</span>
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
                                            <Button>Submit Proposal</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                            ))
                            
                        )}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <Card className="sticky top-6">
                        <CardHeader>
                            <CardTitle className="flex text-black items-center gap-2">
                                <Filter className="h-7 text-black w-8" />
                                <span className="font-bold text-2xl">Filters</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/*dial tone sound Search */}
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
                                        <SelectItem value="entry">Entry Level</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="expert">Expert</SelectItem>
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

                            {/* Verified Clients Only */}
                            <div className="flex items-center text-black space-x-2">
                                <Checkbox
                                    id="verified"
                                    checked={verifiedOnly}
                                    onCheckedChange={setVerifiedOnly}
                                />
                                <label htmlFor="verified" className="text-sm text-black font-medium">
                                    Verified clients only
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </FreelancerLayout>
    );
};

export default BrowseProjects;