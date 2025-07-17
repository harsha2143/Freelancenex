# Freelancenex – Frontend

This is the frontend application for **Freelance Nex**, a freelance marketplace platform where clients can post projects and freelancers can submit proposals. The frontend is built using **React.js**, and communicates with the backend via RESTful APIs.

---

## 📁 Project Structure

freelance-nex-frontend/
├── public/ # Static files (index.html, favicon, etc.)
├── src/
│ ├── assets/ # Images and static assets
│ ├── components/ # Reusable components (e.g., Navbar, Buttons)
│ ├── pages/ # Route-level pages (e.g., Login, Dashboard)
│ ├── routes/ # Route definitions and protection logic
│ ├── services/ # Axios-based API service functions
│ ├── context/ # Global state and Auth context
│ ├── utils/ # Utility functions/helpers
│ ├── App.jsx # Main App component with routing
│ └── main.jsx # Entry point to render the app


---

## 📦 Libraries Used

| Library             | Purpose                              |
|---------------------|---------------------------------------|
| React.js            | Core UI library                       |
| React Router DOM    | Routing and navigation                |
| Axios               | API requests                          |
| Tailwind CSS        | Utility-first CSS framework           |
| React Icons         | Icon support                          |
| Zustand / Context   | State management (as applicable)      |
| Vite                | Build tool for fast development       |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/freelance-nex-frontend.git
cd freelance-nex-frontend
2. Install dependencies

npm install
3. Create an environment file

VITE_API_URL=http://localhost:3000/api

4. Run the development server

npm run dev
The app will run at: http://localhost:5173

📝 Notes
Ensure the backend is running on the port and URL you define in the .env file.

This project uses Vite for faster development and hot reloads.

Make sure CORS is enabled in your backend for local development.
```