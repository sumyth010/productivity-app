import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import CalendarView from "./pages/CalendarView";
import JournalsList from "./components/JournalList";
import AddJournal from "./components/AddJournal";
import EditJournal from "./components/EditJournal";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<AddTask />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/journals" element={<JournalsList />} />
        <Route path="/journals/add" element={<AddJournal />} />
        <Route path="/journals/edit/:id" element={<EditJournal />} />
      </Routes>
    </Router>
  );
}

export default App;
