# Collabrix

**Collaborate. Organize. Achieve.**

Collabrix is a web-based student collaboration platform designed to help teams manage projects efficiently in a centralized workspace. It combines task management, team collaboration, file sharing, and role-based access into a clean and responsive interface tailored for academic and technical project teams.

---

## Features

* Secure user authentication using JWT
* Team creation and management
* Role-based access control (Admin / Member)
* Task management with status tracking
* Organize tasks into To Do, In Progress, and Done
* Assign tasks to team members
* File sharing within projects/teams
* Centralized dashboard for collaboration
* Responsive UI for desktop and mobile devices
* Activity tracking and project organization

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Tokens)

### Version Control

* Git & GitHub

---

## Project Structure

```bash
collabrix/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/collabrix.git
cd collabrix
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Run the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## Future Improvements

* Real-time chat using Socket.io
* Notifications system
* Advanced activity logs

---

## Team

Developed as a collaborative academic project using the MERN stack.
