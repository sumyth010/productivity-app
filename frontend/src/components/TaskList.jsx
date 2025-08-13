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
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(() => {
          alert("Failed to delete task.");
        });
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/tasks/add">Add New Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.priority}
            {" | "}
            <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
            {" | "}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
