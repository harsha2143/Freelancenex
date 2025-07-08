import { useState } from 'react';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (email && password) {
            onLogin({ email });
        }
    };
    const isDisabled = !email || !password || !email.includes('@');

    return (
        <div className="bg-gray-100 p-6 min-h-[95vh] border border-gray-300 w-80 mt-6">
            <h1 className="text-3xl text-black font-bold mb-2">Sign in to your PopX account</h1>
            <p className="text-gray-600 mb-6 text-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mb-4">
                <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2">
                    <label className="absolute -top-2 left-3 bg-gray-100 text-xs font-semibold text-purple-700 px-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm"
                    />
                </div>
                {email && !email.includes("@") && (
                    <p className="text-xs text-red-600 mt-1">Please enter a valid email address.</p>
                )}
            </div>
            <div className="relative border border-gray-300 rounded-lg px-3 pt-2 pb-2 bg-gray-100 mb-3">
                <label className="absolute -top-2 left-3 bg-gray-100 text-purple-700 text-xs font-semibold px-1">
                    Password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm pr-10"
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

            <button
                className={`w-full py-2 rounded-lg transition-colors ${isDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                onClick={handleLogin}
                disabled={isDisabled}
            >
                Login
            </button>
        </div>
    );
}
