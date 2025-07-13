import { useState } from "react"
import { Upload, X, DollarSign, Calendar, FileText, Tag, Menu } from "lucide-react"
import Sidebar from "./Sidebar";
export default function NewProject() {
    const [isLoading, setIsLoading] = useState(false)
    const [skills, setSkills] = useState([])
    const [skillInput, setSkillInput] = useState("")
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        category: "",
        budgetType: "fixed",
        budgetAmount: "",
        budgetMin: "",
        budgetMax: "",
        deadline: "",
        experienceLevel: "",
        projectLength: "",
        attachments: [],
    })

    const categories = [
        "Web Development",
        "Mobile Development",
        "UI/UX Design",
        "Content Writing",
        "Digital Marketing",
        "Data Science",
        "DevOps",
        "Graphic Design",
        "Video Editing",
        "Translation",
    ]

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()])
            setSkillInput("")
        }
    }

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            alert("Project posted successfully! Your project is now live and freelancers can start submitting proposals.")
        } catch (error) {
            alert("Error: Failed to post project. Please try again.", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col sm:px-6 lg:px-8 lg:ml-64">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center flex-wrap sm:flex-nowrap">
                        {/* Button */}
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-6">
                            <Menu className="w-6 h-6 text-gray-500" />
                        </button>

                        {/* Heading and subtext */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Post a New Project</h1>
                            <p className="text-gray-600 mt-1">Tell us about your project and find the perfect freelancer</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Project Details */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Project Details
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">Provide a clear and detailed description of your project</p>
                            </div>
                            <div className="px-6 py-6 space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Project Title *
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={projectData.title}
                                        onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                        placeholder="e.g., Build a responsive e-commerce website"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        value={projectData.category}
                                        onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select project category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category.toLowerCase().replace(/\s+/g, "_")}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Project Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        value={projectData.description}
                                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                        placeholder="Describe your project in detail. Include requirements, goals, and any specific technologies or skills needed..."
                                        rows={6}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            placeholder="Add a required skill"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addSkill}
                                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center gap-1"
                                        >
                                            <Tag className="h-4 w-4" />
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                            >
                                                {skill}
                                                <X
                                                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                                                    onClick={() => removeSkill(skill)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Budget & Timeline */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    Budget & Timeline
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">Set your budget and project timeline</p>
                            </div>
                            <div className="px-6 py-6 space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Budget Type *</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div
                                            className={`cursor-pointer rounded-lg border-2 transition-all ${projectData.budgetType === "fixed"
                                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20"
                                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                            onClick={() => setProjectData({ ...projectData, budgetType: "fixed" })}
                                        >
                                            <div className="p-4 text-center">
                                                <h4 className="font-medium text-gray-900">Fixed Price</h4>
                                                <p className="text-sm text-gray-600 mt-1">Pay a set amount for the entire project</p>
                                            </div>
                                        </div>
                                        <div
                                            className={`cursor-pointer rounded-lg border-2 transition-all ${projectData.budgetType === "hourly"
                                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20"
                                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                            onClick={() => setProjectData({ ...projectData, budgetType: "hourly" })}
                                        >
                                            <div className="p-4 text-center">
                                                <h4 className="font-medium text-gray-900">Hourly Rate</h4>
                                                <p className="text-sm text-gray-600 mt-1">Pay based on hours worked</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {projectData.budgetType === "fixed" ? (
                                    <div className="space-y-2">
                                        <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
                                            Project Budget (USD) *
                                        </label>
                                        <input
                                            id="budgetAmount"
                                            type="number"
                                            value={projectData.budgetAmount}
                                            onChange={(e) => setProjectData({ ...projectData, budgetAmount: e.target.value })}
                                            placeholder="5000"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700">
                                                Min Hourly Rate (USD) *
                                            </label>
                                            <input
                                                id="budgetMin"
                                                type="number"
                                                value={projectData.budgetMin}
                                                onChange={(e) => setProjectData({ ...projectData, budgetMin: e.target.value })}
                                                placeholder="25"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700">
                                                Max Hourly Rate (USD) *
                                            </label>
                                            <input
                                                id="budgetMax"
                                                type="number"
                                                value={projectData.budgetMax}
                                                onChange={(e) => setProjectData({ ...projectData, budgetMax: e.target.value })}
                                                placeholder="50"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                                        Project Deadline *
                                    </label>
                                    <input
                                        id="deadline"
                                        type="date"
                                        value={projectData.deadline}
                                        onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="projectLength" className="block text-sm font-medium text-gray-700">
                                        Expected Project Length
                                    </label>
                                    <select
                                        id="projectLength"
                                        value={projectData.projectLength}
                                        onChange={(e) => setProjectData({ ...projectData, projectLength: e.target.value })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select project duration</option>
                                        <option value="less_than_1_month">Less than 1 month</option>
                                        <option value="1_to_3_months">1 to 3 months</option>
                                        <option value="3_to_6_months">3 to 6 months</option>
                                        <option value="more_than_6_months">More than 6 months</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                    Freelancer Requirements
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">Specify the experience level you're looking for</p>
                            </div>
                            <div className="px-6 py-6">
                                <div className="space-y-2">
                                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                                        Experience Level
                                    </label>
                                    <select
                                        id="experienceLevel"
                                        value={projectData.experienceLevel}
                                        onChange={(e) => setProjectData({ ...projectData, experienceLevel: e.target.value })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select required experience level</option>
                                        <option value="entry">Entry Level (0-2 years)</option>
                                        <option value="intermediate">Intermediate (2-5 years)</option>
                                        <option value="expert">Expert (5+ years)</option>
                                        <option value="any">Any Experience Level</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-orange-600" />
                                    Project Attachments
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">Upload any relevant files, documents, or images</p>
                            </div>
                            <div className="px-6 py-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h4>
                                    <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        Choose Files
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB each)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Ready to post your project?</h4>
                                        <p className="text-sm text-gray-600">Your project will be visible to freelancers immediately</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            type="button"
                                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? "Posting Project..." : "Post Project"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}