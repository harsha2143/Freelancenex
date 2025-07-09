import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle, ChevronDown } from 'lucide-react';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userType, setUserType] = useState('freelancer');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Social login icons as SVG components
  const GoogleIcon = () => (
    <svg width="30" height="25" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="30" height="25" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="30" height="25" viewBox="0 0 24 24">
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  // Simulate API calls
  const simulateAPI = (endpoint, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (endpoint === 'login') {
          if (data.email === 'test@example.com' && data.password === 'password123') {
            resolve({ success: true, message: 'Login successful!', token: 'mock-jwt-token' });
          } else {
            reject({ success: false, message: 'Invalid credentials' });
          }
        } else if (endpoint === 'signup') {
          if (data.email === 'existing@example.com') {
            reject({ success: false, message: 'Email already exists' });
          } else {
            resolve({ success: true, message: 'Account created successfully!' });
          }
        }
      }, 1500);
    });
  };

  const handleSocialLogin = (provider) => {
    setMessage({ type: 'success', text: `${provider} login clicked!` });
    console.log(`${provider} login initiated`);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await simulateAPI('login', loginData);
      setMessage({ type: 'success', text: response.message });
      console.log('Login successful');
      
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await simulateAPI('signup', { ...signupData, userType });
      setMessage({ type: 'success', text: response.message });
      
      setTimeout(() => {
        setIsLogin(true);
        setMessage({ type: '', text: '' });
      }, 2000);
      
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, form) => {
    const { name, value } = e.target;
    if (form === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage({ type: '', text: '' });
    setShowPassword(false);
  };

  const SocialLoginButtons = () => (
    <div className="mb-2">
      <div className="flex gap-8 mb-2 ">
        <button
          onClick={() => handleSocialLogin('Google')}
          className="flex-1 border border-gray-300 rounded-full py-2 px-1 flex items-center justify-center  hover:bg-gray-50 transition-colors"
        >
          <GoogleIcon />
        </button>
        <button
          onClick={() => handleSocialLogin('Facebook')}
          className="flex-1 border border-gray-300 rounded-full py-2 px-1 flex items-center justify-center  hover:bg-gray-50 transition-colors"
        >
          <FacebookIcon />
        </button>
        <button
          onClick={() => handleSocialLogin('LinkedIn')}
          className="flex-1 border border-gray-300 rounded-full py-2 px-1 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <LinkedInIcon />
        </button>
      </div>
      <div className="flex items-center gap-8 mb-3">
        <div className="flex-1 h-px bg-gray-600"></div>
        <span className="text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>
    </div>
  );

  const UserTypeDropdown = () => (
    <div className="mb-3">
      <div className="text-white text-md font-medium">I am a</div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-lg py-2 px-0 pr-8 focus:border-gray-300 focus:outline-none transition-colors text-left flex items-center justify-between"
        >
          <span className="capitalize">{userType}</span>
          <ChevronDown size={18} className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-lg mt-1 z-50">
            <button
              type="button"
              onClick={() => {
                setUserType('freelancer');
                setShowDropdown(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
            >
              Freelancer
            </button>
            <button
              type="button"
              onClick={() => {
                setUserType('client');
                setShowDropdown(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
            >
              Client
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-5xl h-[550px] relative overflow-hidden bg-gray-900 rounded-lg border border-gray-700">
        
        {/* LOGIN CONTAINER */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
          isLogin ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex h-full">
            {/* LOGIN FORM - LEFT SIDE */}
            <div className="w-1/2 bg-gray-900  p-16 flex flex-col justify-center">
              <div className="w-full max-w-sm">
                <SocialLoginButtons />
                <UserTypeDropdown />
                
                <div className="mb-3">
                  <div className="text-white text-md font-medium">Email</div>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange(e, 'login')}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                    className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-md py-2 px-0 focus:border-gray-300 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="mb-8">
                  <div className="text-white text-md font-medium">Password</div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={(e) => handleInputChange(e, 'login')}
                      onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                      className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-md py-2 px-0 pr-8 focus:border-gray-300 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                {message.text && (
                  <div className={`mb-6 p-3 rounded text-sm flex items-center gap-2 ${
                    message.type === 'success' 
                      ? 'bg-green-900/40 text-green-400' 
                      : 'bg-red-900/40 text-red-400'
                  }`}>
                    {message.type === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {message.text}
                  </div>
                )}
                
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-gray-300 text-gray-900 py-3 rounded font-medium text-lg hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
                
              </div>
            </div>
            
            {/* LOGIN INFO - RIGHT SIDE */}
            <div className="w-1/2 relative">
              {/* Diagonal background */}
              <div className="absolute inset-0 bg-gray-200"></div>
              <div 
                className="absolute inset-0 bg-gray-900"
                style={{
                  clipPath: 'polygon(0 0, 20% 0, 0 100%)'
                }}
              ></div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-wider">LOGIN</h1>
                <p className="text-gray-600 text-lg mb-8">Do Not Have An Account</p>
                <button
                  onClick={toggleMode}
                  className="text-gray-700 hover:text-gray-900 font-medium text-lg underline transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNUP CONTAINER */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
          isLogin ? 'translate-x-full' : 'translate-x-0'
        }`}>
          <div className="flex h-full">
            {/* SIGNUP INFO - LEFT SIDE */}
            <div className="w-1/2 relative">
              {/* Diagonal background */}
              <div className="absolute inset-0 bg-gray-200"></div>
              <div 
                className="absolute inset-0 bg-gray-900"
                style={{
                  clipPath: 'polygon(80% 0, 100% 0, 100% 100%)'
                }}
              ></div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-wider">SIGNUP</h1>
                <p className="text-gray-600 text-lg mb-8">Already Have An Account</p>
                <button
                  onClick={toggleMode}
                  className="text-gray-700 hover:text-gray-900 font-medium text-lg underline transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
            
            {/* SIGNUP FORM - RIGHT SIDE */}
            <div className="w-1/2 bg-gray-900 px-16 flex flex-col justify-center">
              <div className="w-full max-w-xs">
                <SocialLoginButtons />
                
                <UserTypeDropdown />
                
                <div className="mb-3">
                  <div className="text-white text-md font-medium">Username</div>
                  <input
                    type="text"
                    name="username"
                    value={signupData.username}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-md py-2 px-0 focus:border-gray-300 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="mb-3">
                  <div className="text-white text-md font-medium">Email</div>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-md py-2 px-0 focus:border-gray-300 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="text-white text-md font-medium">Password</div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={signupData.password}
                      onChange={(e) => handleInputChange(e, 'signup')}
                      onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                      className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-md py-2 px-0 pr-8 focus:border-gray-300 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                {message.text && (
                  <div className={`mb-6 p-3 rounded text-sm flex items-center gap-2 ${
                    message.type === 'success' 
                      ? 'bg-green-900/40 text-green-400' 
                      : 'bg-red-900/40 text-red-400'
                  }`}>
                    {message.type === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {message.text}
                  </div>
                )}
                
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full bg-gray-300 text-gray-900 py-3 rounded font-medium text-lg hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;