import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import DashboardPage from "./Pages/DashboardPage";
import TeamsPage from "./Pages/TeamsPage";
import TasksPage from "./Pages/TasksPage";
import FilesPage from "./Pages/FilesPage";
import SettingsPage from "./Pages/SettingsPage";

function App() {
  useEffect(() => {
    axios.get("http://localhost:2026/test")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <RootLayout>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </DashboardLayout>
    </RootLayout>
  );
}

export default App;
