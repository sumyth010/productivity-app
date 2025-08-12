import { useEffect, useState } from "react";
import api from "../services/axiosInstance"; // your axiosInstance
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

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
        logout(navigate);  // Use logout here to clear tokens and redirect
      });
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <Link to="/tasks/new">Add New Task</Link>
      <p>{message}</p>
      <button onClick={() => logout(navigate)}>Logout</button> {/* Logout button */}
    </div>
  );
}
