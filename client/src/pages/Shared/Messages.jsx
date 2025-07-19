import { useState } from "react"
import { Search, MessageSquare, Clock, CheckCircle } from "lucide-react"
import Sidebar from "../Client/Sidebar.jsx"

// Mock auth hook
const useAuth = () => ({ user: { name: "John Doe" } })

// Mock UI components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 pb-2 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
)

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50"
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md"
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    outline: "text-gray-900 border-gray-300"
  }
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

const Avatar = ({ children, className = "" }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
)

const AvatarImage = ({ src, alt = "" }) => (
  <img
    src={src}
    alt={alt}
    className="aspect-square h-full w-full object-cover"
  />
)

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300 text-gray-700 font-medium">
    {children}
  </div>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Link = ({ href, children, className = "" }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

const ClientLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8">
      {children}
    </div>
  </div>
)

export default function ClientMessages() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const [conversations] = useState([
    {
      id: 1,
      projectId: 1,
      projectTitle: "E-commerce Website Development",
      freelancer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      lastMessage: {
        content: "I've completed the database setup milestone. Please review when you have a chance.",
        timestamp: "2024-01-25T14:30:00Z",
        sender: "freelancer",
      },
      unreadCount: 2,
      isActive: true,
    },
    {
      id: 2,
      projectId: 2,
      projectTitle: "Mobile App UI/UX Design",
      freelancer: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
      lastMessage: {
        content: "Thanks for the feedback! I'll incorporate those changes into the design.",
        timestamp: "2024-01-24T16:45:00Z",
        sender: "freelancer",
      },
      unreadCount: 0,
      isActive: true,
    },
    {
      id: 3,
      projectId: 3,
      projectTitle: "Content Writing for Blog",
      freelancer: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      lastMessage: {
        content: "All articles have been delivered. Thank you for working with me!",
        timestamp: "2024-01-23T10:15:00Z",
        sender: "freelancer",
      },
      unreadCount: 0,
      isActive: false,
    },
    {
      id: 4,
      projectId: 4,
      projectTitle: "WordPress Website Redesign",
      freelancer: {
        name: "Lisa Wang",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
      lastMessage: {
        content: "I have some questions about the color scheme. Can we schedule a call?",
        timestamp: "2024-01-22T09:20:00Z",
        sender: "freelancer",
      },
      unreadCount: 1,
      isActive: true,
    },
  ])

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <ClientLayout>
        <Sidebar/>
      <div className="space-y-8 lg:ml-44">
        {/* Header */}
        <div className="flex items-center justify-between text-black">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-gray-600 mt-1">
              Communicate with your freelancers
              {totalUnread > 0 && <Badge className="ml-2 bg-red-500 text-red-800">{totalUnread} unread</Badge>}
            </p>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative text-black">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Conversations List */}
        <div className="space-y-4 text-black">
          {filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? "Try adjusting your search terms."
                      : "Start a project to begin messaging freelancers."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conversation) => (
              <Link key={conversation.id} href={`/client/chat/`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer mt-5">
                  <CardContent className="pt-6 gap-">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.freelancer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.freelancer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              conversation.freelancer.status === "online" ? "bg-green-400" : "bg-gray-400"
                            }`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{conversation.freelancer.name}</h3>
                            {!conversation.isActive && (
                              <Badge variant="outline" className="text-xs">
                                Project Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1 truncate">{conversation.projectTitle}</p>
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-xs text-gray-500">{formatTime(conversation.lastMessage.timestamp)}</span>

                        <div className="flex items-center gap-2">
                          {conversation.lastMessage.sender === "client" && (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          )}

                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center p-0 text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>

                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Open Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <Card className="text-black">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/client/projects">
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">View All Projects</div>
                    <div className="text-sm text-gray-500">Access all your project communications</div>
                  </div>
                </Button>
              </Link>

              <Link href="/client/projects/new">
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <Clock className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Post New Project</div>
                    <div className="text-sm text-gray-500">Start a new project and find freelancers</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}