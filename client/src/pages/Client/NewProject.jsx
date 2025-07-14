import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Upload, X, DollarSign, Calendar, FileText, Tag, Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function NewProject() {
    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [customSkill, setCustomSkill] = useState("");
    const fileInputRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (skillInput === "other" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [skillInput]);

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        category: "",
        budgetType: "fixed",
        budget: "",
        deadline: "",
        experienceLevel: "",
        attachments: [], // Store selected files
    });

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
    ];

    const predefinedSkills = [
        "JavaScript",
        "UI/UX",
        "Python",
        "Java",
        "C++",
        "Ruby",
        "PHP",
        "HTML/CSS",
        "React",
        "Node.js",
        "Django",
        "Flask",
        "Angular",
        "Vue.js",
        "other"
    ];

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const removeFile = (indexToRemove) => {
        setProjectData({
            ...projectData,
            attachments: projectData.attachments.filter((_, index) => index !== indexToRemove),
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'application/zip'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        const validFiles = files.filter(file => {
            if (!validFormats.includes(file.type)) {
                alert(`File ${file.name} has an unsupported format. Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP`);
                return false;
            }
            if (file.size > maxSize) {
                alert(`File ${file.name} exceeds the 10MB size limit.`);
                return false;
            }
            return true;
        });

        setProjectData({
            ...projectData,
            attachments: [...projectData.attachments, ...validFiles],
        });
    };

    const mapExperience = (level) => {
        switch (level) {
            case "entry": return "Entry Level";
            case "intermediate": return "Intermediate";
            case "expert": return "Expert";
            default: return "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Separate predefined and custom skills
            const requiredSkills = skills.filter(skill => predefinedSkills.includes(skill));
            const customSkills = skills.filter(skill => !predefinedSkills.includes(skill));

            // Upload files to Cloudinary
            let fileUrls = [];
            if (projectData.attachments.length > 0) {
                const formData = new FormData();
                projectData.attachments.forEach(file => formData.append('files', file));

                const uploadResponse = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/client/upload`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );

                fileUrls = uploadResponse.data.fileUrls;
            }

            const payload = {
                title: projectData.title,
                description: projectData.description,
                budget: Number(projectData.budget),
                deadline: projectData.deadline,
                requiredSkills,
                customSkills,
                client: "68738184c60db42071ca5a30", // Replace with dynamic client ID later
                category: projectData.category.replace(/_/g, " "),
                experienceLevel: mapExperience(projectData.experienceLevel),
                files: fileUrls, // Include Cloudinary URLs
            };

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/client/addProject`,
                payload
            );

            alert("✅ Project posted successfully!");
            console.log(res.data);

            // Reset form
            setProjectData({
                title: "",
                description: "",
                category: "",
                budgetType: "fixed",
                budget: "",
                deadline: "",
                experienceLevel: "",
                attachments: [],
            });
            setSkills([]);
            setSkillInput("");
            setCustomSkill("");
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear file input
            }
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Failed to post project: " + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col sm:px-6 lg:px-8 lg:ml-64">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center flex-wrap sm:flex-nowrap">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-6">
                            <Menu className="w-6 h-6 text-gray-500" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-black text-gray-900">Post a New Project</h1>
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
                            <div className="px-6 py-6 space-y-6 text-black">
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

                                <div className="space-y-2 text-black">
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
                                            <option key={category} value={category.replace(/\s+/g, "_")}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 text-black">
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

                                <div className="space-y-2 text-black">
                                    <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={skillInput}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === "other") {
                                                    setSkillInput("other");
                                                    setCustomSkill("");
                                                } else if (value !== "") {
                                                    if (!skills.includes(value)) {
                                                        setSkills([...skills, value]);
                                                    }
                                                    setSkillInput("");
                                                }
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select a skill</option>
                                            {predefinedSkills.map((skill) => (
                                                <option key={skill} value={skill}>
                                                    {skill === "other" ? "Other (Type your own)" : skill}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {skillInput === "other" && (
                                        <div className="flex gap-2 mt-2">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={customSkill}
                                                onChange={(e) => setCustomSkill(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && customSkill.trim()) {
                                                        e.preventDefault();
                                                        if (!skills.includes(customSkill.trim())) {
                                                            setSkills([...skills, customSkill.trim()]);
                                                        }
                                                        setCustomSkill("");
                                                        setSkillInput("");
                                                    }
                                                }}
                                                placeholder="Enter custom skill"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
                                                        setSkills([...skills, customSkill.trim()]);
                                                        setCustomSkill("");
                                                        setSkillInput("");
                                                    }
                                                }}
                                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center gap-1"
                                            >
                                                <Tag className="h-4 w-4" />
                                                Add
                                            </button>
                                        </div>
                                    )}

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
                                    Budget
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">Set your budget</p>
                            </div>
                            <div className="px-6 py-6 space-y-6">
                                <div className="space-y-2 text-black">
                                    <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
                                        Project Budget (USD) *
                                    </label>
                                    <input
                                        id="budget"
                                        type="number"
                                        value={projectData.budget}
                                        onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                                        placeholder="5000"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 text-black">
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
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-black">
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
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        multiple
                                        accept=".pdf,.doc,.docx,.jpg,.png,.zip"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        Choose Files
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB each, up to 5 files)
                                    </p>
                                </div>
                                {/* Display selected files */}
                                {projectData.attachments.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
                                        <ul className="mt-2 space-y-2">
                                            {projectData.attachments.map((file, index) => (
                                                <li key={index} className="flex items-center justify-between text-sm text-gray-600">
                                                    <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                    <X
                                                        className="h-4 w-4 cursor-pointer hover:text-red-500"
                                                        onClick={() => removeFile(index)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
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
    );
}