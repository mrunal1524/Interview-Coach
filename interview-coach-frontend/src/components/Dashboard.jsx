// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// LinkButton Component to apply hover effects
const LinkButton = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        ...styles.linkButton,
        ...(isHovered ? linkButtonHoverStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

// LogoutButton Component to apply hover effects
const LogoutButton = ({ onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.logoutButton,
        ...(isHovered ? logoutButtonHoverStyle : {}),
      }}
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // On initial render, check if user is logged in (from localStorage)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);  // Set user data from localStorage
    } else {
      navigate("/login"); // If no user is found, redirect to login
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  if (!user) {
    return <p>Loading...</p>; // Optional: Show a loading message or redirect to login if no user
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Interview Coach</h1>
      <h2>Welcome, {user.name}</h2>

      {/* Button Container */}
      <div style={styles.buttonContainer}>
        <LinkButton to="/submit-answer">Submit Answer</LinkButton>
        <LinkButton to="/view-answers">View Answers</LinkButton>
        <LinkButton to="/performance">Performance</LinkButton>
      </div>

      {/* Logout Button */}
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Times New Roman",
    color: "#ffffff",
    marginTop: "50px",
    backgroundColor: "#111",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px cyan",
    width: "60%",
    margin: "auto",
  },
  header: {
    fontSize: "28px",
    textShadow: "0px 0px 10px cyan",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    color: "black",
  },
  linkButton: {
    padding: "15px 30px",
    textDecoration: "none",
    borderRadius: "5px",
    boxShadow: "0px 0px 8px cyan",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.3s ease-in-out",
    textAlign: "center",
    backgroundColor: "blue",  // Default background color
  },
  logoutButton: {
    marginTop: "40px",
    padding: "12px 25px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 0px 8px red",
    transition: "all 0.3s ease-in-out",
  },
};

const linkButtonHoverStyle = {
  backgroundColor: "darkblue",
  boxShadow: "0px 0px 15px blue",
};

const logoutButtonHoverStyle = {
  backgroundColor: "darkred",
  boxShadow: "0px 0px 15px red",
};

export default Dashboard;
