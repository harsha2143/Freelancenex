import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientForm = () => {
  const [clients, setClients] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    username: '',
    email: '',
    company: '',
    mobile: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch clients from database
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients');
        setClients(response.data);
      } catch (err) {
        setError('Failed to fetch clients', err);
      }
    };
    fetchClients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/api/clients', formData);
      setClients([...clients, response.data]);
      setFormData({
        name: '',
        password: '',
        username: '',
        email: '',
        company: '',
        mobile: '',
        location: '',
      });
    } catch (err) {
      setError('Failed to create client: ' + err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<div className="min-h-screen items-center justify-center p-8 bg-gradient-to-b from-teal-50 to-orange-50">
    <div className="max-w-4xl mx-auto px-1 py-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Profile</h1>

      {/* Form */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 bg-gradient-to-b from-teal-50 to-orange-50 ">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="name" className="absolute -top-2 left-3 bg-teal-50 text-violet-800 text-sm font-semibold px-1">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
          </div>
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="username" className="absolute -top-2 left-3 bg-white text-purple-700 text-sm font-semibold px-1">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={20}
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
          </div>
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="email" className="absolute -top-2 left-3 bg-white text-purple-700 text-sm font-semibold px-1">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
          </div>
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="password" className="absolute -top-2 left-3 bg-white text-purple-700 text-sm font-semibold px-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter a Password'
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
            {/* Toggle password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-purple-600 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-9-7s4-7 9-7a9.956 9.956 0 015.707 1.806m1.688 1.688A9.959 9.959 0 0121 12c0 3.5-4 7-9 7-4.478 0-8.268-2.943-9.542-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="company" className="absolute -top-2 left-3 bg-white text-purple-700 text-sm font-semibold px-1">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder='Enter your company'
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
          </div>
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="mobile" className="absolute -top-2 left-3 bg-white text-purple-700 text-sm font-semibold px-1">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
               placeholder='Enter Mobile Number'
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
          </div>
          <div className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 bg-gray-100 mb-3">
            <label htmlFor="location" className="absolute -top-2 left-3 bg-white text-purple-700 text-sm font-semibold px-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
               placeholder='Enter Location'
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-md pr-10"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isSubmitting ? 'Submitting...' : 'Save '}
        </button>
      </div>
    </div>
    </div>
  );
};

export default ClientForm;