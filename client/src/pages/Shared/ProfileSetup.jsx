import React, { useState, useEffect } from 'react';
// Assuming you have Clerk integrated and can use its hooks
import { useUser } from '@clerk/clerk-react'; // This import assumes Clerk is set up

// Placeholder for navigation (in a real app, you'd use react-router-dom's useNavigate)
const useNavigate = () => {
  return (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real application, you would use:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate(path);
  };
};

// Placeholder for a generic message display (instead of alert())
const showMessage = (message, type = 'info') => {
  const messageBox = document.getElementById('message-box');
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    } opacity-100`;
    setTimeout(() => {
      messageBox.className = messageBox.className.replace('opacity-100', 'opacity-0');
    }, 3000);
  }
};


const ProfileSetup = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  // State to hold user role (determined from Clerk metadata or initial signup choice)
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Common profile fields
  const [profilePicture, setProfilePicture] = useState(null);

  // Client specific fields
  const [clientData, setClientData] = useState({
    companyName: '',
    industry: '',
    contactNumber: '',
    location: '',
    companyDescription: '',
  });

  // Freelancer specific fields
  const [freelancerData, setFreelancerData] = useState({
    fullName: user?.fullName || '', // Pre-fill from Clerk
    headline: '',
    skills: [], // Array of strings
    experienceLevel: '',
    hourlyRate: '',
    portfolioLink: '',
    resume: null, // File object
  });

  // Effect to determine user role and pre-fill data
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // IMPORTANT: In a real app, you would store the role in Clerk's publicMetadata
      // For example: user.publicMetadata.role
      // For this example, we'll simulate based on a placeholder or assume it's passed
      // If you're using Clerk's organization feature, you might check user.organizationMemberships
      // For simplicity, let's assume `user.publicMetadata.role` exists after initial signup choice.
      const roleFromClerk = user.publicMetadata?.role;

      if (roleFromClerk) {
        setUserRole(roleFromClerk);
        // If user already has profile data, you might fetch and pre-fill it here
        // For now, we'll just set the role.
        if (roleFromClerk === 'freelancer') {
          setFreelancerData(prev => ({ ...prev, fullName: user.fullName || '' }));
        }
      } else {
        // If role is not set in Clerk metadata, this is a critical point.
        // You might need a separate step *before* this component to choose the role,
        // or prompt the user here if they haven't chosen one.
        // For this example, we'll assume the role is determined.
        // If no role, perhaps redirect to a role selection page.
        setError("User role not defined. Please select your role first.");
        // Example: navigate('/select-role');
      }
      setLoading(false);
    } else if (isLoaded && !isSignedIn) {
      // User is not signed in, redirect to sign-in page
      navigate('/sign-in');
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  // Handle common input changes for client and freelancer data
  const handleChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e, setFile) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle skills input for freelancer (e.g., comma-separated)
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setFreelancerData(prev => ({ ...prev, skills: skillsArray }));
  };

  // Simulate Cloudinary upload (in a real app, this would be an API call)
  const uploadFileToCloudinary = async (file) => {
    if (!file) return null;

    // This is a placeholder. In a real app, you'd send this file to your backend
    // which then uploads to Cloudinary, or use Cloudinary's direct upload from frontend.
    // Example direct upload (requires Cloudinary SDK and unsigned preset):
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('upload_preset', 'your_unsigned_upload_preset');
    // const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const data = await response.json();
    // return data.secure_url; // Or data.public_id

    console.log(`Simulating Cloudinary upload for: ${file.name}`);
    return `https://placehold.co/150x150/000000/FFFFFF?text=${file.name.substring(0, 5)}`; // Mock URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Basic validation
      if (userRole === 'client' && (!clientData.companyName || !clientData.contactNumber)) {
        throw new Error("Please fill in all required client fields.");
      }
      if (userRole === 'freelancer' && (!freelancerData.fullName || freelancerData.skills.length === 0 || !freelancerData.headline)) {
        throw new Error("Please fill in all required freelancer fields.");
      }

      let profilePictureUrl = null;
      let resumeUrl = null;

      // Upload profile picture if available
      if (profilePicture) {
        profilePictureUrl = await uploadFileToCloudinary(profilePicture);
      }

      // Upload resume if freelancer and available
      if (userRole === 'freelancer' && freelancerData.resume) {
        resumeUrl = await uploadFileToCloudinary(freelancerData.resume);
      }

      const finalData = {
        userId: user.id, // Clerk user ID
        role: userRole,
        profilePictureUrl: profilePictureUrl,
        ...(userRole === 'client' ? { ...clientData } : {}),
        ...(userRole === 'freelancer' ? { ...freelancerData, resumeUrl: resumeUrl } : {}),
      };

      console.log('Submitting profile data:', finalData);

      // Simulate API call to backend
      // In a real app:
      // const response = await fetch('/api/profile/setup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${await user.getSession().getToken()}` // Get Clerk JWT
      //   },
      //   body: JSON.stringify(finalData),
      // });
      // if (!response.ok) {
      //   const errData = await response.json();
      //   throw new Error(errData.message || 'Failed to save profile.');
      // }
      // const result = await response.json();
      // console.log('Profile saved successfully:', result);

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      showMessage('Profile setup complete!', 'success');

      // Redirect to appropriate dashboard
      if (userRole === 'client') {
        navigate('/client/dashboard');
      } else if (userRole === 'freelancer') {
        navigate('/freelancer/dashboard');
      }

    } catch (err) {
      console.error('Profile setup error:', err);
      setError(err.message || 'An unexpected error occurred.');
      showMessage(err.message || 'An unexpected error occurred.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-4">
        <div className="text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700 p-4">
        <div className="text-xl font-semibold">
          User role not determined. Please ensure you've selected a role during signup.
          {/* You might add a button here to allow role selection if it's a common scenario */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div id="message-box" className="fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 opacity-0"></div>
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 font-inter">
          Complete Your {userRole === 'client' ? 'Client' : 'Freelancer'} Profile
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Tell us a bit about yourself to get started on FreelanceX.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Field: Profile Picture */}
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfilePicture)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {profilePicture && (
              <p className="mt-2 text-sm text-gray-500">Selected: {profilePicture.name}</p>
            )}
          </div>

          {/* Client Specific Fields */}
          {userRole === 'client' && (
            <>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={clientData.companyName}
                  onChange={(e) => handleChange(e, setClientData)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Innovate Solutions Inc."
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={clientData.industry}
                  onChange={(e) => handleChange(e, setClientData)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Software Development, Marketing"
                />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={clientData.contactNumber}
                  onChange={(e) => handleChange(e, setClientData)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., +1234567890"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={clientData.location}
                  onChange={(e) => handleChange(e, setClientData)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  id="companyDescription"
                  name="companyDescription"
                  value={clientData.companyDescription}
                  onChange={(e) => handleChange(e, setClientData)}
                  rows="3"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Briefly describe your company and what you do."
                ></textarea>
              </div>
            </>
          )}

          {/* Freelancer Specific Fields */}
          {userRole === 'freelancer' && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={freelancerData.fullName}
                  onChange={(e) => handleChange(e, setFreelancerData)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
                  Headline/Specialization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  value={freelancerData.headline}
                  onChange={(e) => handleChange(e, setFreelancerData)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Full-stack MERN Developer, UI/UX Designer"
                />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={freelancerData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., React, Node.js, MongoDB, Tailwind CSS"
                />
              </div>
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={freelancerData.experienceLevel}
                  onChange={(e) => handleChange(e, setFreelancerData)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate (USD)
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={freelancerData.hourlyRate}
                  onChange={(e) => handleChange(e, setFreelancerData)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 50"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Link
                </label>
                <input
                  type="url"
                  id="portfolioLink"
                  name="portfolioLink"
                  value={freelancerData.portfolioLink}
                  onChange={(e) => handleChange(e, setFreelancerData)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., https://yourportfolio.com"
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume (PDF, DOCX)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, (file) => setFreelancerData(prev => ({ ...prev, resume: file })))}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {freelancerData.resume && (
                  <p className="mt-2 text-sm text-gray-500">Selected: {freelancerData.resume.name}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105
              ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {submitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
