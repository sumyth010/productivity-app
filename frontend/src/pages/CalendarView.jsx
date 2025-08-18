import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../services/axiosInstance";
import { Link } from "react-router-dom";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [journals, setJournals] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    Promise.all([api.get("tasks/"), api.get("journals/")])
      .then(([tasksRes, journalsRes]) => {
        const tasksData = tasksRes.data.map((task) => ({
          date: task.due_date.split("T")[0],
          type: "Task",
          title: task.title,
          id: task.id,
        }));

        const journalsData = journalsRes.data.map((journal) => ({
          date: journal.created_at.split("T")[0],
          type: "Journal",
          title: journal.title,
          id: journal.id,
        }));

        setAllEntries([...tasksData, ...journalsData]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setTasks(allEntries.filter((item) => item.type === "Task" && item.date === formattedDate));
    setJournals(allEntries.filter((item) => item.type === "Journal" && item.date === formattedDate));
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const hasTask = allEntries.some((item) => item.type === "Task" && item.date === formattedDate);
    const hasJournal = allEntries.some((item) => item.type === "Journal" && item.date === formattedDate);

    if (hasTask && hasJournal) return "highlight-both";
    if (hasTask) return "highlight-task";
    if (hasJournal) return "highlight-journal";
    return null;
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-black relative p-6 overflow-hidden">
      {/* Galaxy background */}
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

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg bg-gradient-to-tr from-[#1B1B1B]/40 via-[#1F1F1F]/30 to-[#1B1B1B]/40 animate-cardGlow">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          📅 Calendar
        </h2>

        {/* Calendar */}
        <div className="bg-gray-900/30 p-4 rounded-xl shadow-sm mb-6 backdrop-blur-sm">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={tileClassName}
          />
        </div>

        {/* Entries Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Entries for {date.toDateString()}:
          </h3>

          {/* Tasks */}
          <div className="mb-4">
            <h4 className="text-blue-400 font-medium mb-2">✅ Tasks</h4>
            {tasks.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-white/80">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      to={`/tasks/edit/${task.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {task.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No tasks for this date.</p>
            )}
          </div>

          {/* Journals */}
          <div>
            <h4 className="text-green-400 font-medium mb-2">📝 Journals</h4>
            {journals.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-white/80">
                {journals.map((journal) => (
                  <li key={journal.id}>
                    <Link
                      to={`/journals/edit/${journal.id}`}
                      className="text-green-400 hover:underline"
                    >
                      {journal.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No journals for this date.</p>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          .highlight-task {
            background: #3b82f6 !important;
            border-radius: 50%;
          }
          .highlight-journal {
            background: #10b981 !important;
            border-radius: 50%;
          }
          .highlight-both {
            background: linear-gradient(135deg, #3b82f6 50%, #10b981 50%) !important;
            border-radius: 50%;
          }

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
