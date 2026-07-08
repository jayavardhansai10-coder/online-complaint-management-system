# Online Complaint Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing complaints efficiently. The system provides secure authentication, role-based access control, complaint tracking, analytics, and real-time updates.

---

## Live Demo

**Frontend (Vercel):**
https://your-vercel-url.vercel.app

**Backend (Render):**
https://online-complaint-management-system-1-6vd8.onrender.com

---

## Features

### User
- User Registration
- Secure Login
- JWT Authentication
- Create Complaint
- View Complaints
- Update Complaint
- Delete Complaint
- Search Complaints
- Profile Management

### Admin
- Admin Dashboard
- User Management
- Complaint Management
- Complaint Assignment
- Complaint Status Updates
- Analytics Dashboard

### Security
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization

### Real-Time
- Socket.IO Integration
- Live Notifications (if implemented)

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Socket.IO

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```
online-complaint-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
```

---

## Main Modules

- Authentication
- User Dashboard
- Admin Dashboard
- Complaint Management
- User Management
- Analytics
- Real-Time Communication

---

## Future Enhancements

- Email Notifications
- Complaint Attachments
- PDF Reports
- Advanced Analytics
- Mobile Application

---

