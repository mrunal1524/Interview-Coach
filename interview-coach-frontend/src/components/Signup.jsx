import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import { registerUser } from "../api"; // Ensure this imports the API function

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    rollNo: "",  // Renamed 'id' to 'rollNo'
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Used for navigation

  // Clear form state upon component mount (when the page is loaded)
  useEffect(() => {
    setFormData({
      rollNo: "",  // Renamed 'id' to 'rollNo'
      name: "",
      email: "",
      password: "",
    });
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.rollNo || !formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Enter a valid email.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      // Send the signup data to the backend
      const response = await registerUser(formData);

      if (response.status === 200) {
        onSignup(response.data); // Save user data
        setFormData({
          rollNo: "",  // Renamed 'id' to 'rollNo'
          name: "",
          email: "",
          password: "",
        }); // Reset form data after successful submission
        navigate("/login"); // Redirect to the login page
      }
    } catch (err) {
      console.error("Error in signup:", err);
      // Ensure error handling displays the message from the backend if available
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Interview Coach</h1>
      <div style={styles.card}>
        <h2>Signup</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          name="rollNo"  // Updated name attribute to rollNo
          placeholder="Enter your Roll Number"
          value={formData.rollNo}  // Updated formData to rollNo
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            {showPassword ? "👁" : "👁‍🗨"}
          </button>
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Signup
        </button>
        <p style={styles.switchText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>Login</span>
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
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000",
    color: "#00FFFF",
    fontFamily: "Times New Roman",
  },
  header: {
    fontSize: "28px",
    textShadow: "0px 0px 10px cyan",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px cyan",
    width: "320px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid cyan",
    backgroundColor: "#222",
    color: "white",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    marginLeft: "5px",
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
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  switchText: {
    marginTop: "10px",
    color: "white",
  },
  link: {
    color: "cyan",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Signup;
