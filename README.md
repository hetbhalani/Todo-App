# 📝 MERN Todo App with JWT Authentication

A simple To-Do application built with the MERN (MongoDB, Express, React, Node.js) stack, featuring full authentication using JWT and cookies. This project was created to brush up on my MERN skills and for fun!😉



## 📌 Features
- ✅ User authentication (Signup,Login)
- 🔑 JWT-based authentication with secure HTTP-only cookies
- 🛡️ Protected routes for authenticated users
- 📝 Add, edit, delete, and mark tasks as complete
- 🎨 Clean and responsive UI with React
- ⚡ Fast API using Express and MongoDB

## ✅ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## ⚙️ Installation

1. Clone the repository
```bash
git clone https://github.com/hetbhalani/Todo-App.git
cd mern-todo-app
```

2. Install server dependencies
```bash
cd backend
npm install
```

3. Install client dependencies
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```


## 🚀 Running the Application

1. Start the backend server
```bash
cd backend
node index.js
```

2. Start the frontend application
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`


## 🔗 API Endpoints

### Auth Routes
- POST /auth/signup - Signup user
- POST /auth/login - Login user

### Todo Routes
- GET /todo - Get all todos
- POST /todo - Create a new todo
- PUT /todo/:id - Update a todo
- DELETE /todo/:id - Delete a todo

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show your support
- Give a ⭐️ if you like this project!😉
