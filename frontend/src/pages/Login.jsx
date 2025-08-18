import { useState } from "react";
import api from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", formData);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-10 space-y-6 relative overflow-hidden">
        {/* Optional floating background gradient */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-tr from-blue-800 via-indigo-700 to-purple-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <h2 className="text-3xl font-bold text-white text-center font-nunito relative z-10">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-shadow duration-300 shadow-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-shadow duration-300 shadow-sm"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md"
          >
            Log In
          </button>
        </form>
        <p className="text-gray-400 text-center text-sm relative z-10">
          Don't have an account? <span className="text-gray-500 cursor-pointer hover:text-white">Sign up</span>
        </p>
      </div>
    </div>
  );
}
