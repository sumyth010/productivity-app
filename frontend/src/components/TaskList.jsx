import { useEffect, useState } from "react";
import api from "../services/axiosInstance"; // your axios instance with auth

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("tasks/")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load tasks");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.priority} - Due: {new Date(task.due_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
