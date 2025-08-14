import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { Link } from "react-router-dom";

export default function JournalList() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = () => {
    api.get("journals/")
      .then((res) => setJournals(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      api.delete(`journals/${id}/`)
        .then(() => {
          setJournals(journals.filter((journal) => journal.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Journals</h2>
      <Link to="/journals/add">Add Journal</Link>
      <ul>
        {journals.map((journal) => (
          <li key={journal.id}>
            <strong>{journal.title}</strong>
            <p>{journal.content}</p>
            <Link to={`/journals/edit/${journal.id}`}>Edit</Link>{" "}
            <button onClick={() => handleDelete(journal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
