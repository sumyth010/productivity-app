import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    api.get("hello/", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage("Unauthorized"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}
