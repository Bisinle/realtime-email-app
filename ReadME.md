# Realtime Email App

## Overview

A modern, feature-rich email application built with the MERN stack, featuring real-time communications, instant notifications, and read receipts. The application provides a seamless email experience with real-time updates and a clean, intuitive user interface.

## Key Features

- **Real-time Communication**
  - Instant email delivery and notifications
  - Live notification counter updates
  - Real-time read receipts
  - Immediate email status updates

- **Email Management**
  - Compose and send emails
  - View sent and received emails
  - Track email read status
  - Mark emails as read/unread in real-time
  - Email organization and filtering

- **User Experience**
  - Responsive design for all devices
  - Clean and modern UI with Tailwind CSS
  - Intuitive navigation
  - Real-time notification system
  - User dashboard with statistics

- **Security**
  - Full user authentication system
  - JWT-based authentication
  - Secure password handling
  - Protected routes

## Tech Stack

### Frontend
- React 18.3.1
- React Router DOM 6.26.1
- Axios 1.7.7
- Socket.io-client 4.8.1
- Tailwind CSS 3.4.13
- Lucide React 0.454.0
- React Icons 5.3.0

### Backend
- Node.js/Express
- MongoDB/Mongoose
- Socket.io
- JWT Authentication
- Bcrypt

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
APP_PORT=3001
MONGODB_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create `.env` file in client directory:
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_API_AUTH_URL=http://localhost:3001/auth
VITE_SOCKET_URL=http://localhost:3001
```

## Running the Application

### 1. Start MongoDB
```bash
mongod
```

### 2. Launch Backend Server
```bash
cd server
npm run dev
```

### 3. Start Frontend Development Server
```bash
cd client
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Verify JWT token

### Users
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch user by ID
- `PUT /users/:id` - Update user
- `GET /users/status` - Get online users

### Emails
- `GET /emails` - Fetch all emails
- `GET /emails/:id` - Fetch email by ID
- `POST /emails` - Create new email
- `PUT /emails/:id` - Update email
- `DELETE /emails/:id` - Delete email
- `PUT /emails/:id/read` - Mark email as read
- `GET /emails/unread/count` - Get unread email count

## WebSocket Events

### Client Events
- `connection` - Client connects to WebSocket server
- `send_email` - Send new email
- `read_email` - Mark email as read
- `user_online` - User comes online

### Server Events
- `receive_email` - New email received
- `notification_update` - Notification counter update
- `email_read` - Email read status update
- `user_status` - User online status update

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Email/
│   │   │   ├── Notification/
│   │   │   └── User/
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   ├── EmailContext.js
│   │   │   └── SocketContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Email/
│   │   │   └── Auth/
│   │   └── utils/
│   │       ├── axiosClient.js
│   │       └── socketClient.js
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── socket/
    └── server.js
```



### Troubleshooting

#### Common Issues
- **MongoDB Connection Fails**
  - Ensure MongoDB service is running
  - Verify correct MongoDB URL in `.env`
  - Check MongoDB port availability

- **WebSocket Connection Issues**
  - Confirm correct WebSocket URL in frontend `.env`
  - Check if port 3001 is available
  - Verify network firewall settings

- **Real-time Updates Not Working**
  - Clear browser cache
  - Check browser console for WebSocket errors
  - Verify Socket.io event listeners are properly set up

#### Development Tips
- Use Chrome DevTools for debugging WebSocket connections
- Monitor MongoDB performance with MongoDB Compass
- Implement error logging for WebSocket events
- Test real-time features across different browsers


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.