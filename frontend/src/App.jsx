import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import SigninForm from "./pages/SignInForm";
import LogInForm from "./pages/LogInForm";
import Todo from './Todo'

function App() {
  return (
       <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/signup" element={<SigninForm />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
