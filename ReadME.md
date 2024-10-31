## Realtime Email App

- Description

  - A real-time email application built with MERN stack
  - Features instant notifications and real-time message delivery
  - Full user authentication system
  - Clean and modern UI with Tailwind CSS

- Tech Stack

  - Frontend:

    - React 18.3.1
    - React Router DOM 6.26.1
    - Axios 1.7.7
    - Socket.io-client 4.8.1
    - Tailwind CSS 3.4.13
    - Lucide React 0.454.0
    - React Icons 5.3.0

  - Backend:
    - Node.js/Express
    - MongoDB/Mongoose
    - Socket.io
    - JWT Authentication
    - Bcrypt

- Features

  - Real-time email notifications
  - User authentication (login/register)
  - Compose and send emails
  - View sent and received emails
  - Real-time updates using WebSocket
  - Email read status tracking
  - User dashboard with statistics

- Prerequisites

  - Node.js (v14 or higher)
  - MongoDB
  - npm or yarn
  - Git

- Installation Steps

1. Clone repository

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install Backend Dependencies

```bash
cd server
npm install
```

3. Configure Environment Variables
   Create .env file in server directory:

```
APP_PORT=3001
MONGODB_URL=mongodb://localhost:27017/your-database
```

4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

5. Create Frontend Environment Variables
   Create .env file in client directory:

```
VITE_API_BASE_URL=http://localhost:3001
VITE_API_AUTH_URL=http://localhost:3001/auth
```

- Running the Application

1. Start MongoDB

```bash
mongod
```

2. Start Backend Server

```bash
cd server
npm run dev
```

3. Start Frontend Development Server

```bash
cd client
npm run dev
```

- API Routes

* Authentication:

  - POST /auth/register - Register new user
  - POST /auth/login - User login
  - POST /auth/logout - User logout

* Users:

  - GET /users - Fetch all users
  - GET /users/:id - Fetch user by ID
  - PUT /users/:id - Update user

* Emails:
  - GET /emails - Fetch all emails
  - GET /emails/:id - Fetch email by ID
  - POST /emails - Create new email
  - PUT /emails/:id - Update email
  - DELETE /emails/:id - Delete email

- Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── axiosClient.js
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── config/
    └── server.js
```

- Additional Notes

* Ensure MongoDB is running before starting the application
* The application uses port 3000 for frontend and 3001 for backend
* WebSocket connection is established on http://localhost:3001
* All dates are stored in UTC format

- Troubleshooting

* If MongoDB connection fails, ensure MongoDB service is running
* Check if all environment variables are properly set
* Verify correct ports are available and not in use
* Clear browser cache if facing frontend issues
