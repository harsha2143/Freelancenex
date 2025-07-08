export default function WelcomePage({ goToCreate, goToLogin }) {
  return (
      <div className="bg-gray-100 p-6 border border-gray-300 w-80 min-h-[95vh] flex flex-col justify-end mt-6">
        <div>
          <h1 className="text-2xl text-black font-bold mb-2">Welcome to PopX</h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button
            className="w-full bg-purple-600 text-white py-2 rounded-lg mb-3 hover:bg-purple-700 transition-colors"
            onClick={goToCreate}
          >
            Create Account
          </button>
          <button
            className="w-full bg-purple-200 text-purple-800 py-2 rounded-lg hover:bg-purple-300 transition-colors"
            onClick={goToLogin}
          >
            Already Registered? Login
          </button>
        </div>
      </div>

  );
}
