import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";

export default function EditTask() {
  const { id } = useParams(); // Task ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
  });
  const [error, setError] = useState(null);

  // Fetch existing task details
  useEffect(() => {
    api.get(`tasks/${id}/`)
      .then((res) => {
        setFormData({
          title: res.data.title,
          description: res.data.description || "",
          due_date: res.data.due_date ? res.data.due_date.split("T")[0] : "",
          priority: res.data.priority || "Medium",
        });
      })
      .catch(() => {
        setError("Failed to load task data.");
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    api.put(`tasks/${id}/`, formData)
      .then(() => {
        navigate("/tasks");
      })
      .catch(() => {
        setError("Failed to update task. Please try again.");
      });
  };

  return (
    <div>
      <h2>Edit Task</h2>
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}
