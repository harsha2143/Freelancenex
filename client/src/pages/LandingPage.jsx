import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Star, Clock, Users, CheckCircle, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const LandingPage = () => {
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleLoginClick = () => {
    setShowRoleOptions((prev) => !prev);
  };

  const handleRoleSelect = (role) => {
    console.log("Selected role:", role);
    setShowRoleOptions(false);
    // Trigger your login/signup form logic here
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const testimonials = [
    {
      name: "Brandon Vega",
      company: "Artistry Studios",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Freelancenex has transformed the way I manage my freelance projects. The real-time collaboration tools and seamless payment processing have made my work life so much easier. I can focus on what I do best while the platform handles the rest."
    },
    {
      name: "Chris Wei",
      company: "Innovative Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "As a client, I was searching for a platform that could streamline my project management and communication with freelancers. Freelancenex exceeded my expectations with its intuitive interface and robust features."
    },
    {
      name: "Karen Weiss",
      company: "Tech Innovators",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c5ad?w=100&h=100&fit=crop&crop=face",
      text: "Joining Freelancenex has been one of the best decisions of my freelancing career. The platform's technological backbone ensures that my projects are managed efficiently, and the real-time updates keep me connected."
    }
  ];

  const projects = [
    {
      title: "Developed a comprehensive freelance management system for a local business",
      description: "Created a tailored freelance management solution with advanced project tracking and client communication features.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      title: "Implemented real-time communication features for a tech startup",
      description: "Enhanced a tech startup's communication with real-time features, boosting team collaboration and productivity.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      title: "Created a scalable payment processing system for an E-commerce platform",
      description: "Developed a secure payment system for an e-commerce platform, ensuring smooth transactions and user trust.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    }
  ];

  const features = [
    {
      title: "Seamless onboarding",
      description: "Experience a smooth onboarding process tailored for both clients and freelancers.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
    },
    {
      title: "Real-time project management",
      description: "Stay on top of your projects with real-time management tools and updates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      title: "Integrated payment processing",
      description: "Enjoy hassle-free payments with our secure integrated processing system.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    },
    {
      title: "Role-based dashboards",
      description: "Navigate effortlessly with personalized dashboards tailored to your role.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-lg ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                FREELANCENEX
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'} transition-colors`}>
                  Home
                </a>
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                  About
                </a>
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                  Services
                </a>
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                  Projects
                </a>
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                  Testimonials
                </a>
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                  Contact
                </a>
              </div>
            </div>

            {/* Login/Signup & Theme Toggle */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6 relative">
                <div className="relative">
                  <button
                    onClick={handleLoginClick}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode  ? 'text-white hover:text-gray-200 hover:bg-white': 'text-gray-700 hover:bg-gray-200' } transition-colors`}                  >
                    Login
                  </button>

                  {showRoleOptions && (
                    <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-md z-10">
                      <button
                        onClick={() => handleRoleSelect('client')}
                        className="block w-full px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        As Client
                      </button>
                      <button
                        onClick={() => handleRoleSelect('freelancer')}
                        className="block w-full px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        As Freelancer
                      </button>
                    </div>
                  )}
                </div>

                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                  Sign Up
                </button>
              </div>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-md ${darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-md ${darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'} transition-colors`}>
                Home
              </a>
              <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                About
              </a>
              <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                Services
              </a>
              <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                Projects
              </a>
              <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                Testimonials
              </a>
              <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                More
              </a>
              <div className="pt-4 space-y-2">
                <button className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}>
                  Login
                </button>
                <button className="w-full text-left px-3 py-2 bg-green-600 text-white rounded-md text-base font-medium hover:bg-green-700 transition-colors">
                  Sign Up
                </button>
                <button className={`w-full text-left px-3 py-2 rounded-md text-base font-medium border-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors`}>
                  CONTACT
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
                EMPOWERING FREELANCERS
              </div>
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
                Empowering
                <br />
                freelancers
              </h1>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Streamlined projects made easy
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105">
                VIEW SERVICES
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
                alt="Freelancer working"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div>
              <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
                EMPOWERING FREELANCERS
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Connecting talent with opportunity
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Freelancenex revolutionizes the freelance experience by providing a modern, secure platform that connects clients and freelancers seamlessly. Our MERN stack technology ensures a streamlined onboarding process, efficient project management, and integrated payment solutions. With features like milestone tracking and role-based dashboards, we empower users to focus on what really matters—their work. Experience a new era of freelancing, where collaboration and creativity thrive.
              </p>
              <button className={`${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} font-semibold underline transition-colors`}>
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
              SEAMLESS FREELANCING
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Connect, collaborate, and succeed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {feature.description}
                </p>
                <button className={`${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} font-semibold underline transition-colors`}>
                  Learn more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
              EMPOWER YOUR VISION
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Transform ideas into reality with ease.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300`}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                    {project.title}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
              WHAT OUR USERS SAY
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Success stories from our community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
                GET IN TOUCH
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                We're here to assist you 24/7
              </h2>

              <form className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@website.com"
                    className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="555-555-5555"
                    className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    I allow this website to store my submission so they can respond to my inquiry. <span className="text-red-500">*</span>
                  </label>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
                  SUBMIT
                </button>
              </form>
            </div>

            <div>
              <div className="space-y-8">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Get in touch
                  </h3>
                  <div className="flex items-center">
                    <Mail className="text-green-600 mr-3" size={20} />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      harshamahi505@gmail.com
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Location
                  </h3>
                  <div className="flex items-center">
                    <MapPin className="text-green-600 mr-3" size={20} />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Vijayawada, AP IN
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Hours
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 10:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tuesday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 10:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wednesday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 10:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Thursday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 10:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Friday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 10:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Saturday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 6:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sunday</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>9:00am — 6:00pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 text-center ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} FreelanceNex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
