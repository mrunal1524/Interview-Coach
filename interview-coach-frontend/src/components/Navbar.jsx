import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Toggles the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // ✅ Closes dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown); // ✅ Remove event listener on unmount
  }, []);

  return (
    <div style={styles.navbar}>
      <h2 style={styles.title} onClick={() => navigate("/")}>Interview Coach</h2>
      
      {user ? (
        <div style={styles.rightSection}>
          <div className="dropdown" style={styles.dropdown}>
            <button style={styles.profileButton} onClick={toggleDropdown}>
              {user} ⏷
            </button>
            {dropdownOpen && (
              <div style={styles.dropdownContent}>
                <button 
                  onClick={() => navigate("/profile")} 
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#00FFFF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#111'}
                >
                  Profile
                </button>
                <button 
                  onClick={onLogout} 
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#00FFFF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#111'}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button onClick={() => navigate("/login")} style={styles.button}>
          Login
        </button>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#111",
    color: "#00FFFF",
    fontFamily: "Times New Roman",
    boxShadow: "0px 0px 15px cyan",
    cursor: "pointer",
  },
  title: {
    fontSize: "24px",
    textShadow: "0px 0px 10px cyan",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  profileButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#00FFFF",
    fontSize: "16px",
    cursor: "pointer",
    padding: "8px",
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownContent: {
    position: "absolute",
    right: 0,
    backgroundColor: "#111",
    boxShadow: "0px 0px 10px cyan",
    minWidth: "130px",
    zIndex: 10,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  dropdownItem: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#111",
    border: "none",
    color: "#00FFFF",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  button: {
    backgroundColor: "#00FFFF",
    color: "#000",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
