import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReviewAnswers from "./pages/ReviewAnswers";
import PerformanceChart from "./components/PerformanceChart";
import Dashboard from "./components/Dashboard";
import AnswerList from "./components/AnswerList";
import Profile from "./components/Profile";
import SubmitAnswer from "./components/SubmitAnswer";

// Custom Route for Protected Routes
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Ensure loading state is set to false once user data check is complete
  }, []);

  const handleLogin = (userData) => {
    setUser({ id: userData.id, name: userData.name, email: userData.email });
    localStorage.setItem("user", JSON.stringify({ id: userData.id, name: userData.name, email: userData.email }));
    navigate("/dashboard"); // Redirect to the dashboard after successful login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>; // Show a loading message until user data is fetched

  return (
    <div>
      {user && <Navbar user={user.name} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<PrivateRoute user={user}><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
        <Route path="/home" element={<PrivateRoute user={user}><Home user={user} /></PrivateRoute>} />
        <Route path="/review" element={<PrivateRoute user={user}><ReviewAnswers /></PrivateRoute>} />
        <Route path="/performance" element={<PrivateRoute user={user}><PerformanceChart /></PrivateRoute>} />
        <Route path="/answers" element={<PrivateRoute user={user}><AnswerList /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute user={user}><Profile user={user} /></PrivateRoute>} />
        <Route path="/submit-answer" element={<PrivateRoute user={user}><SubmitAnswer /></PrivateRoute>} />
        <Route path="/view-answers" element={<PrivateRoute user={user}><AnswerList /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute user={user}><Dashboard user={user} /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default App;
