import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import SigninForm from "./pages/SignInForm";
import LogInForm from "./pages/LogInForm";
import Todo from './Todo'
import { Navigate } from 'react-router-dom';

function App() {
  return (
       <Router>
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/signup" element={<SigninForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
