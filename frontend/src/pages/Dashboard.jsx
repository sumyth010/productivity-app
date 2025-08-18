import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    api
      .get("hello/")
      .then((res) => setMessage(res.data.message))
      .catch(() => {
        setMessage("Unauthorized");
        logout(navigate);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative p-6 overflow-hidden">
      {/* Galaxy background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-80 z-0"></div>

      {/* Floating stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-20 animate-pulse"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Main Card */}
      <div className="bg-gray-800/30 rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative z-10 flex flex-col items-center space-y-6 backdrop-blur-lg border border-white/10 shadow-white/20 ">
        <h2 className="text-3xl font-bold font-nunito text-white text-center">
          Dashboard
        </h2>

        <p className="text-gray-300 text-center text-lg">{message}</p>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link
            to="/tasks"
            className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-lg font-semibold text-center"
          >
            📋 View Tasks
          </Link>
          <Link
            to="/tasks/new"
            className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold text-center"
          >
            ➕ Add Task
          </Link>
          <Link
            to="/journals"
            className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-2 rounded-lg font-semibold text-center"
          >
            📓 View Journals
          </Link>
          <Link
            to="/journals/add"
            className="bg-pink-500 hover:bg-pink-400 text-white px-6 py-2 rounded-lg font-semibold text-center"
          >
            🖊️ Add Journal
          </Link>
        </div>

        {/* Calendar Link */}
        <div className="mt-6">
          <Link
            to="/calendar"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold text-center"
          >
            📅 Go to Calendar
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={() => logout(navigate)}
          className="bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
