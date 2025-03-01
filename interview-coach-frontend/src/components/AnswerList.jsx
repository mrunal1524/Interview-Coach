import React, { useState, useEffect } from "react";
import { getAnswersByUser } from "../api"; // Make sure the correct API function is imported

const AnswerList = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Ensure you have user in localStorage
    if (user) {
      const fetchAnswers = async () => {
        try {
          const response = await getAnswersByUser(user.email);  // Make sure to fetch by the logged-in user email
          if (response && response.data && response.data.length > 0) {
            setAnswers(response.data);
          } else {
            setError("No answers found.");
          }
        } catch (error) {
          console.error("Error fetching answers:", error);
          setError("Failed to load answers.");
        } finally {
          setLoading(false);
        }
      };
      fetchAnswers();
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Interview Coach</h1>
      <h2>All Submitted Answers</h2>

      {loading ? (
        <p style={styles.loadingText}>Loading answers...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : answers.length === 0 ? (
        <p style={styles.noAnswers}>No answers available.</p>
      ) : (
        <div style={styles.answerContainer}>
          {answers.map((answer) => (
            <div
              key={answer.id}
              style={{
                ...styles.answerBox,
                ...(hoveredId === answer.id ? styles.hoverEffect : {}),
              }}
              onMouseEnter={() => setHoveredId(answer.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <p>
                <b style={{ color: "cyan" }}>User:</b> {answer.userEmail}
              </p>
              <p>
                <b style={{ color: "cyan" }}>Question:</b> {answer.question.questionText}
              </p>
              <p>
                <b style={{ color: "cyan" }}>Answer:</b> {answer.answerText}
              </p>
              <p>
                <b style={{ color: "lime" }}>Feedback:</b> {answer.feedback || "No feedback provided yet."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Times New Roman",
    color: "#ffffff",
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
  answerContainer: {
    maxWidth: "800px",
    margin: "auto",
  },
  answerBox: {
    border: "1px solid cyan",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#222",
    boxShadow: "0px 0px 12px cyan",
    transition: "all 0.3s ease-in-out",
  },
  hoverEffect: {
    transform: "scale(1.02)",
    boxShadow: "0px 0px 18px cyan",
  },
  loadingText: {
    color: "yellow",
  },
  errorText: {
    color: "red",
  },
  noAnswers: {
    color: "yellow",
    fontSize: "18px",
  },
};

export default AnswerList;
