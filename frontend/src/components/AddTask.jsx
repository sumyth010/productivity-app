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

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    api.post("tasks/", formData)
      .then(() => {
        navigate("/tasks");  // Redirect to task list after success
      })
      .catch(() => {
        setError("Failed to create task. Please try again.");
      });
  };

  return (
    <div>
      <h2>Add New Task</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title: <br />
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description: <br />
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Due Date: <br />
          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Priority: <br />
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br /><br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
