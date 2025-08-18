import { useState } from "react";
import api from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    api.post("tasks/", formData)
      .then(() => navigate("/tasks"))
      .catch(() => setError("Failed to create task. Please try again."));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative p-6 overflow-hidden">
      {/* Galaxy background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0B0C10] via-[#121212] to-[#0B0C10] z-0"></div>

      {/* Floating stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${3 + Math.random() * 5}s infinite alternate`,
          }}
        />
      ))}

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg bg-gradient-to-tr from-[#1B1B1B]/40 via-[#1F1F1F]/30 to-[#1B1B1B]/40 animate-cardGlow">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">➕ Add New Task</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="p-2 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="p-2 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.5; }
            100% { opacity: 0.2; }
          }

          @keyframes cardGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-cardGlow {
            background-size: 200% 200%;
          }
        `}
      </style>
    </div>
  );
}
