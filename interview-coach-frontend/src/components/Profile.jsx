import React from "react";

const Profile = ({ user }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Profile</h1>
      <div style={styles.profileContainer}>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Refresh Profile
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    marginTop: "50px",
    backgroundColor: "#222",
    padding: "30px",
    borderRadius: "10px",
    width: "60%",
    margin: "auto",
  },
  header: {
    fontSize: "28px",
    textShadow: "0px 0px 10px cyan",
    marginBottom: "20px",
  },
  profileContainer: {
    marginTop: "20px",
    fontSize: "20px",
  },
  buttonContainer: {
    marginTop: "30px",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#00FFFF",
    color: "#000",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  // Hover effect for button
  buttonHover: {
    backgroundColor: "#00bcd4",
  },
};

// Apply button hover effect
styles.button[":hover"] = styles.buttonHover;

export default Profile;
