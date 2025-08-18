import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api.get("tasks/")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      api.delete(`tasks/${id}/`)
        .then(() => setTasks(tasks.filter(task => task.id !== id)))
        .catch(() => alert("Failed to delete task."));
    }
  };

  return (
    <div className="min-h-screen bg-black relative p-8 overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0B0C10] via-[#121212] to-[#0B0C10] z-0"></div>

      {/* Floating Stars */}
      {[...Array(40)].map((_, i) => (
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

      {/* Tasks Section */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">📋 Task List</h2>
          <Link
            to="/tasks/add"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md transition"
          >
            + Add Task
          </Link>
        </div>

        <div className="grid gap-6">
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks found. Add your first task!</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="p-6 rounded-xl backdrop-blur-lg border border-white/10 bg-gradient-to-tr from-[#1B1B1B]/40 via-[#1F1F1F]/30 to-[#1B1B1B]/40 shadow-md hover:shadow-lg transition animate-cardGlow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-blue-400">{task.title}</h3>
                  <span className="text-gray-300">{task.priority}</span>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/tasks/edit/${task.id}`}
                    className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.7; }
            100% { opacity: 0.2; }
          }

          @keyframes cardGlow {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }

          .animate-cardGlow {
            animation: cardGlow 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
