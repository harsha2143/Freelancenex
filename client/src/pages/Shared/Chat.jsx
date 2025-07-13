// import { useState, useEffect, useRef } from "react"
// import { Send, Paperclip, Phone, Video, MoreVertical, ArrowLeft, CheckCircle, Clock } from "lucide-react"

// /**
//  * @typedef {Object} Message
//  * @property {string} id
//  * @property {string} senderId
//  * @property {string} senderName
//  * @property {string} [senderAvatar]
//  * @property {string} content
//  * @property {Date} timestamp
//  * @property {"text"|"file"|"system"} type
//  * @property {"sent"|"delivered"|"read"} status
//  */

// /**
//  * @typedef {Object} ChatRoomProps
//  * @property {string} projectId
//  */

// export default function Chat({ projectId = "1" }: ChatRoomProps) {
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [messages, setMessages] = useState([])
//   const [isTyping, setIsTyping] = useState(false)
  
//   // Mock user data
//   const [user] = useState({
//     id: "current",
//     fullName: "John Doe",
//     firstName: "John",
//     imageUrl: "/placeholder.svg?height=40&width=40"
//   })

//   const [otherUser] = useState({
//     name: "Sarah Johnson",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Full-stack Developer",
//     status: "online",
//   })

//   // Mock project data
//   const [projectData] = useState({
//     title: "E-commerce Website Development",
//     status: "in_progress",
//     budget: 5000,
//     deadline: "2024-02-15",
//   })

//   // Mock messages
//   useEffect(() => {
//     const mockMessages: Message[] = [
//       {
//         id: "1",
//         senderId: "other",
//         senderName: "Sarah Johnson",
//         senderAvatar: "/placeholder.svg?height=40&width=40",
//         content: "Hi! I've started working on the homepage design. I have a few questions about the color scheme.",
//         timestamp: new Date(Date.now() - 3600000),
//         type: "text",
//         status: "read",
//       },
//       {
//         id: "2",
//         senderId: user?.id || "current",
//         senderName: user?.fullName || "You",
//         content: "Great! I'd prefer a modern blue and white theme. Can you show me some mockups?",
//         timestamp: new Date(Date.now() - 3000000),
//         type: "text",
//         status: "read",
//       },
//       {
//         id: "3",
//         senderId: "other",
//         senderName: "Sarah Johnson",
//         senderAvatar: "/placeholder.svg?height=40&width=40",
//         content: "I'll have some initial designs ready by tomorrow. Also, I've completed the database setup milestone.",
//         timestamp: new Date(Date.now() - 1800000),
//         type: "text",
//         status: "read",
//       },
//       {
//         id: "4",
//         senderId: "system",
//         senderName: "System",
//         content: 'Milestone "Database Setup" has been marked as completed by Sarah Johnson',
//         timestamp: new Date(Date.now() - 1800000),
//         type: "system",
//         status: "delivered",
//       },
//       {
//         id: "5",
//         senderId: user?.id || "current",
//         senderName: user?.fullName || "You",
//         content: "Perfect! I'll review and release the payment for that milestone today.",
//         timestamp: new Date(Date.now() - 900000),
//         type: "text",
//         status: "delivered",
//       },
//     ]
//     setMessages(mockMessages)
//   }, [user])

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const handleSendMessage = () => {
//     if (!message.trim()) return

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       senderId: user?.id || "current",
//       senderName: user?.fullName || "You",
//       content: message,
//       timestamp: new Date(),
//       type: "text",
//       status: "sent",
//     }

//     setMessages((prev) => [...prev, newMessage])
//     setMessage("")

//     // Simulate typing indicator
//     setIsTyping(true)
//     setTimeout(() => {
//       setIsTyping(false)
//       // Simulate response
//       const response: Message = {
//         id: (Date.now() + 1).toString(),
//         senderId: "other",
//         senderName: "Sarah Johnson",
//         senderAvatar: "/placeholder.svg?height=40&width=40",
//         content: "Thanks! I'll be waiting for your feedback.",
//         timestamp: new Date(),
//         type: "text",
//         status: "sent",
//       }
//       setMessages((prev) => [...prev, response])
//     }, 2000)
//   }

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//   }

//   const formatDate = (date: Date) => {
//     const today = new Date()
//     const yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)

//     if (date.toDateString() === today.toDateString()) {
//       return "Today"
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return "Yesterday"
//     } else {
//       return date.toLocaleDateString()
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-2rem)]">
//           {/* Project Info Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border h-full">
//               <div className="p-6 border-b">
//                 <div className="flex items-center space-x-2">
//                   <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
//                     <ArrowLeft className="h-4 w-4" />
//                   </button>
//                   <h2 className="text-lg font-semibold">Project Details</h2>
//                 </div>
//               </div>
//               <div className="p-6 space-y-4">
//                 <div>
//                   <h3 className="font-medium mb-2">{projectData.title}</h3>
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
//                     {projectData.status === "in_progress" ? "In Progress" : projectData.status}
//                   </span>
//                 </div>

//                 <div className="border-t pt-4">
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Budget:</span>
//                       <span className="font-medium">${projectData.budget.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Deadline:</span>
//                       <span className="font-medium">{new Date(projectData.deadline).toLocaleDateString()}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4">
//                   <h4 className="font-medium mb-2">Participants</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
//                         <span className="text-sm font-medium">{otherUser.name.charAt(0)}</span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">{otherUser.name}</p>
//                         <p className="text-xs text-gray-500">{otherUser.role}</p>
//                       </div>
//                       <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
//                         <span className="text-sm font-medium">{user?.firstName?.charAt(0)}</span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">{user?.fullName || "You"}</p>
//                         <p className="text-xs text-gray-500">Client</p>
//                       </div>
//                       <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Chat Area */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
//               {/* Chat Header */}
//               <div className="p-6 border-b">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
//                       <ArrowLeft className="h-4 w-4" />
//                     </button>
//                     <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
//                       <span className="text-sm font-medium">{otherUser.name.charAt(0)}</span>
//                     </div>
//                     <div>
//                       <h3 className="font-medium">{otherUser.name}</h3>
//                       <p className="text-sm text-gray-500">
//                         {otherUser.status === "online" ? "Online" : "Last seen 2h ago"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button className="p-2 hover:bg-gray-100 rounded-md">
//                       <Phone className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-md">
//                       <Video className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-md">
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, index) => {
//                   const showDate =
//                     index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp)

//                   return (
//                     <div key={msg.id}>
//                       {showDate && (
//                         <div className="flex justify-center my-4">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
//                             {formatDate(msg.timestamp)}
//                           </span>
//                         </div>
//                       )}

//                       {msg.type === "system" ? (
//                         <div className="flex justify-center">
//                           <div className="bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full">{msg.content}</div>
//                         </div>
//                       ) : (
//                         <div
//                           className={`flex ${msg.senderId === (user?.id || "current") ? "justify-end" : "justify-start"}`}
//                         >
//                           <div
//                             className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
//                               msg.senderId === (user?.id || "current") ? "flex-row-reverse space-x-reverse" : ""
//                             }`}
//                           >
//                             {msg.senderId !== (user?.id || "current") && (
//                               <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center">
//                                 <span className="text-xs font-medium">{msg.senderName.charAt(0)}</span>
//                               </div>
//                             )}
//                             <div
//                               className={`rounded-lg px-3 py-2 ${
//                                 msg.senderId === (user?.id || "current")
//                                   ? "bg-blue-600 text-white"
//                                   : "bg-gray-100 text-gray-900"
//                               }`}
//                             >
//                               <p className="text-sm">{msg.content}</p>
//                               <div
//                                 className={`flex items-center justify-end space-x-1 mt-1 ${
//                                   msg.senderId === (user?.id || "current") ? "text-blue-100" : "text-gray-500"
//                                 }`}
//                               >
//                                 <span className="text-xs">{formatTime(msg.timestamp)}</span>
//                                 {msg.senderId === (user?.id || "current") && (
//                                   <div className="flex">
//                                     {msg.status === "sent" && <Clock className="h-3 w-3" />}
//                                     {msg.status === "delivered" && <CheckCircle className="h-3 w-3" />}
//                                     {msg.status === "read" && <CheckCircle className="h-3 w-3 text-blue-300" />}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )
//                 })}

//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="flex items-end space-x-2">
//                       <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center">
//                         <span className="text-xs font-medium">{otherUser.name.charAt(0)}</span>
//                       </div>
//                       <div className="bg-gray-100 rounded-lg px-3 py-2">
//                         <div className="flex space-x-1">
//                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                           <div
//                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                             style={{ animationDelay: "0.1s" }}
//                           ></div>
//                           <div
//                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                             style={{ animationDelay: "0.2s" }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Message Input */}
//               <div className="border-t p-4">
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-md">
//                     <Paperclip className="h-4 w-4" />
//                   </button>
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type your message..."
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!message.trim()}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }