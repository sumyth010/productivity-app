import { useState } from "react";
import api from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AddJournal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("journals/", { title, content })
      .then(() => {
        navigate("/journals");
      })
      .catch((err) => console.error(err));
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

      {/* Journal Form Card */}
      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg bg-gradient-to-tr from-[#1B1B1B]/40 via-[#1F1F1F]/30 to-[#1B1B1B]/40 animate-cardGlow">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">📖 Add Journal</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Journal Title"
            required
            className="p-3 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            required
            rows="6"
            className="p-3 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Save Journal
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.6; }
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
