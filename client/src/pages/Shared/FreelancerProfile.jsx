import { useState } from "react"
import { User, Star, Upload, Save, X, Plus, ExternalLink, Award, Briefcase, Menu } from "lucide-react"
import Sidebar from "../Freelancer/Sidebar"
export default function FreelancerProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [skills, setSkills] = useState(["React", "Node.js", "JavaScript"])
  const [skillInput, setSkillInput] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    headline: "Full-stack MERN Developer",
    description: "Experienced full-stack developer with 5+ years building web applications using React, Node.js, and modern JavaScript frameworks. Passionate about creating clean, efficient code and delivering exceptional user experiences.",
    hourlyRate: "75",
    location: "New York, NY",
    website: "https://johndoe.dev",
    experienceLevel: "expert",
    languages: ["English", "Spanish"],
  })

  const [portfolio] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution built with React and Node.js",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      url: "https://example.com",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "React Native mobile app for banking services",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
      url: "https://example.com",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Enterprise task management with real-time collaboration",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      url: "https://example.com",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
    },
  ])

  const [certifications] = useState([
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023-12-15",
      credentialId: "AWS-123456",
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023-10-20",
      credentialId: "META-789012",
    },
  ])

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleProfileUpdate = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  const TabButton = ({ value, children, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
      {children}
    </button>
  )

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  )

  const CardHeader = ({ children }) => (
    <div className="px-6 py-4 border-b">
      {children}
    </div>
  )

  const CardContent = ({ children }) => (
    <div className="px-6 py-4">
      {children}
    </div>
  )

  const Button = ({ children, variant = "primary", size = "md", disabled = false, onClick, type = "button" }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
    }
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      icon: "p-2"
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
    )
  }

  const Badge = ({ children, variant = "default" }) => {
    const variants = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      outline: "border border-gray-300 bg-white text-gray-700"
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
        {children}
      </span>
    )
  }

  const Avatar = ({ src, fallback, size = "md" }) => {
    const sizes = {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-20 w-20",
      xl: "h-24 w-24"
    }

    return (
      <div className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center overflow-hidden`}>
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-600 font-medium">{fallback}</span>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex w-full mx-auto lg:ml-80">
        <div className="w-full max-w-5xl space-y-6 ">
          
          {/* Header */}
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
                  My Profile
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your professional profile and showcase your skills
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="space-y-6 text-black ">
            <div className="flex space-x-10 bg-gray-100 p-1 rounded-lg">
              <TabButton value="basic" isActive={activeTab === "basic"} onClick={setActiveTab}>
                Basic Info
              </TabButton>
              <TabButton value="portfolio" isActive={activeTab === "portfolio"} onClick={setActiveTab}>
                Portfolio
              </TabButton>
              <TabButton value="certifications" isActive={activeTab === "certifications"} onClick={setActiveTab}>
                Certifications
              </TabButton>
              <TabButton value="preview" isActive={activeTab === "preview"} onClick={setActiveTab}>
                Preview
              </TabButton>
            </div>

            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-black">
                    <User className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                  </div>
                  <p className="text-gray-600">Update your basic profile information</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 text-black">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-8 ml-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        fallback="JD"
                        size="lg"
                      />
                      <div className="mt-4">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-gray-500 ml-3 mr-6 mt-1">JPG, PNG up to 5MB</p>
                      </div>
                      <div className="space-y-2 ml-44">
                        <label className="text-sm font-medium text-gray-700">User Name</label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          placeholder="City, Country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Professional Headline</label>
                      <input
                        type="text"
                        value={profileData.headline}
                        onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })}
                        placeholder="e.g., Full-stack MERN Developer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Professional Summary</label>
                      <textarea
                        value={profileData.description}
                        onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                        placeholder="Describe your experience, expertise, and what makes you unique..."
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Hourly Rate (USD)</label>
                        <input
                          type="number"
                          value={profileData.hourlyRate}
                          onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                          placeholder="25"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Experience Level</label>
                        <select
                          value={profileData.experienceLevel}
                          onChange={(e) => setProfileData({ ...profileData, experienceLevel: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="intermediate">Intermediate (2-5 years)</option>
                          <option value="expert">Expert (5+ years)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Website/Portfolio URL</label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="https://yourportfolio.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Skills</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          placeholder="Add a skill"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        />
                        <Button type="button" onClick={addSkill} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            <span className="flex items-center gap-1">
                              {skill}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading} onClick={handleProfileUpdate}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Portfolio Tab */}
            {activeTab === "portfolio" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Portfolio</h2>
                      </div>
                      <p className="text-gray-600">Showcase your best work and projects</p>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolio.map((project) => (
                      <Card key={project.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{project.title}</h4>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications Tab */}
            {activeTab === "certifications" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Certifications</h2>
                      </div>
                      <p className="text-gray-600">Add your professional certifications and achievements</p>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="h-8 w-8 text-yellow-600" />
                          <div>
                            <h4 className="font-medium">{cert.name}</h4>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                            <p className="text-xs text-gray-500">
                              Issued: {new Date(cert.date).toLocaleDateString()} • ID: {cert.credentialId}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preview Tab */}
            {activeTab === "preview" && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Profile Preview</h2>
                  <p className="text-gray-600">This is how your profile appears to clients</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-start gap-6">
                      <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        fallback="JD"
                        size="xl"
                      />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                        <p className="text-lg text-gray-600 mb-2">{profileData.headline}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>{profileData.location}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>4.9 (12 reviews)</span>
                          </div>
                          <span>•</span>
                          <span>${profileData.hourlyRate}/hr</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skills.slice(0, 5).map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                          {skills.length > 5 && (
                            <Badge variant="outline">+{skills.length - 5} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-600">{profileData.description || "No description provided yet."}</p>
                    </div>

                    {/* Portfolio Preview */}
                    <div>
                      <h3 className="font-semibold mb-3">Portfolio</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {portfolio.slice(0, 3).map((project) => (
                          <div key={project.id} className="border rounded-lg overflow-hidden">
                            <div className="aspect-video bg-gray-100">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-sm">{project.title}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}