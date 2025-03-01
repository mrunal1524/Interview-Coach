import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");  // Email state
  const [password, setPassword] = useState("");  // Password state
  const [showPassword, setShowPassword] = useState(false);  // Show password toggle
  const [error, setError] = useState("");  // Error state

  const navigate = useNavigate();  // React Router's useNavigate for navigation

  // ✅ Reset form fields when the page is loaded or component is mounted
  useEffect(() => {
    // Clear email and password if not logged in (ensuring they're reset after page reload)
    if (!localStorage.getItem("user")) {
      setEmail("");  // Clear email
      setPassword("");  // Clear password
    }
  }, []); // The empty dependency array ensures it runs only once when the page is loaded.

  // ✅ Handle login functionality
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // ✅ Validate input (check if fields are empty)
    if (!email || !password) {
      setError("⚠ Email and Password are required!");
      return;
    }

    try {
      // ✅ Send login request to backend API
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      // ✅ Store user details in localStorage after successful login
      localStorage.setItem("user", JSON.stringify(response.data));  // Save response data (user info) to localStorage

      // Clear form state
      setEmail("");  // Ensure email is cleared after login
      setPassword("");  // Ensure password is cleared after login

      navigate("/dashboard");  // Redirect to dashboard after login
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);  // Show specific error message from the backend if available
      } else {
        setError("Invalid email or password.");  // Display error message if login fails
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Interview Coach</h1>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {/* ✅ Display error message if login fails */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="off"  // Prevent browser from auto-filling the input
        />

        {/* Password Input */}
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="off"  // Prevent browser from auto-filling the input
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "👁" : "👁‍🗨"}
          </button>
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        {/* Switch to Signup */}
        <p style={styles.switchText}>
          New user?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
    backgroundColor: "#000",
    color: "#00FFFF",
    fontFamily: "Times New Roman",
  },
  header: {
    fontSize: "28px",
    textShadow: "0px 0px 10px cyan",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#111",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px cyan",
    width: "320px",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid cyan",
    backgroundColor: "#222",
    color: "white",
    fontSize: "16px",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    color: "cyan",
    fontSize: "18px",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#00FFFF",
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  switchText: {
    marginTop: "15px",
    color: "white",
  },
  link: {
    color: "#00FFFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default Login;
