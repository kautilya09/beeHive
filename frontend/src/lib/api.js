import axios from "axios";

const API_BASE_URL = "http://localhost:2026/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses globally (auto-logout on expired token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
};

// ─── Profile ─────────────────────────────────────────────────────────────────
export const profileAPI = {
  getMe: () => api.get("/profile/me"),
  updateMe: (data) => api.put("/profile/me", data),
};

// ─── Projects ────────────────────────────────────────────────────────────────
export const projectsAPI = {
  create: (data) => api.post("/projects", data),
  getAll: () => api.get("/projects"),
  getById: (id) => api.get(`/projects/${id}`),
  joinRequest: (id) => api.post(`/projects/${id}/join`),
  manageApplicant: (projectId, userId, status) =>
    api.patch(`/projects/${projectId}/applicants/${userId}`, { status }),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const dashboardAPI = {
  getMe: () => api.get("/dashboard/me"),
};

export default api;
