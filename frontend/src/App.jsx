import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "./Pages/LoginPage";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";

import RootLayout from "./Layout/RootLayout";
import DashboardLayout from "./Layout/DashboardLayout";

import DashboardPage from "./Pages/DashboardPage";
import TeamsPage from "./Pages/TeamsPage";
import TasksPage from "./Pages/TasksPage";
import FilesPage from "./Pages/FilesPage";
import SettingsPage from "./Pages/SettingsPage";

function App() {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    axios
      .get("http://localhost:2026/test")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Redirect based on authentication */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;