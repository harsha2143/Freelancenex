import { useState } from 'react';

export default function CreateAccountPage({ onCreate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'yes',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (formData.fullName && formData.phoneNumber && formData.email && formData.password) {
      onCreate(formData);
    }
  };

  const isDisabled =
    !formData.fullName || !formData.phoneNumber || !formData.email || !formData.password || !formData.email.includes('@');

  return (
    <div className="flex flex-col bg-gray-100 p-6 border border-gray-300 w-80 min-h-[95vh] mt-6 ">
      <h1 className="text-3xl font-bold text-black mb-5">Create  your  PopX account</h1>

      <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2 bg-gray-100 mb-4">
        <label className="absolute -top-2 left-3 bg-gray-100 text-purple-700 text-xs font-semibold px-1">
          Full Name*
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-xs"
        />
      </div>

      <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2 bg-gray-100 mb-4">
        <label className="absolute -top-2 left-3 bg-gray-100 text-purple-700 text-xs font-semibold px-1">Phone number*</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          required
          className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-xs"
        />
      </div>
      <div className="mb-4">
      <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2 bg-gray-100 ">
        <label className="absolute -top-2 left-3 bg-gray-100 text-purple-700 text-xs font-semibold px-1">Email address*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-xs"
        />
        </div>
        {formData.email && !formData.email.includes("@") && (
          <p className="text-xs text-red-600 mt-1">Please enter a valid email address.</p>
        )}
      </div>

      <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2 bg-gray-100 mb-4 relative">
        <label className="absolute -top-2 left-3 bg-gray-100 text-purple-700 text-xs font-semibold px-1">Password*</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter secure password"
          required
          className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-xs pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-2 top-[8px] p-1 text-gray-600 hover:text-purple-600 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? (
            // Eye closed icon (hide)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-9-7s4-7 9-7a9.956 9.956 0 015.707 1.806m1.688 1.688A9.959 9.959 0 0121 12c0 3.5-4 7-9 7a10.05 10.05 0 01-1.875-.175m3.75-3.75a3 3 0 10-4.243-4.243"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
            </svg>
          ) : (
            // Eye open icon (show)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2 bg-gray-100 mb-4">
        <label className="absolute -top-2 left-3 bg-gray-100 text-purple-700 text-xs font-semibold px-1">Company name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Your Company Inc."
          className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-xs"
        />
      </div>

      <div className="mb-6">
        <label className="block text-purple-800 mb-2 font-semibold text-sm">Are you an Agency?*</label>
        <div className="flex space-x-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="isAgency"
              value="yes"
              checked={formData.isAgency === 'yes'}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-700 text-sm">Yes</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="isAgency"
              value="no"
              checked={formData.isAgency === 'no'}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-700 text-sm">No</span>
          </label>
        </div>
      </div>

      <button
        className={`mt-auto w-full py-2 rounded-lg transition-colors ${isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        onClick={handleCreate}
        disabled={isDisabled}
      >
        Create Account
      </button>
    </div>
  );
}
