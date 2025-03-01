import { useState, useEffect } from "react";
import { getAnswersByReviewStatus, reviewAnswer } from "../api";

const ReviewAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch pending answers on load
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await getAnswersByReviewStatus("Pending");
        setAnswers(response.data || []); // ✅ Ensure response is handled correctly
      } catch (error) {
        console.error("Error fetching answers:", error);
        setError("Failed to load answers.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnswers();
  }, []);

  const handleReview = async (id, status) => {
    try {
      await reviewAnswer(id, status);
      // Update the review status in the UI without filtering the array
      setAnswers((prevAnswers) =>
        prevAnswers.map((ans) =>
          ans.id === id ? { ...ans, reviewStatus: status } : ans
        )
      );
    } catch (error) {
      console.error("Error reviewing answer:", error);
      setError(`Failed to ${status.toLowerCase()} the answer.`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Review Answers</h2>

      {loading ? (
        <p style={styles.loadingText}>Loading answers...</p>
      ) : answers.length === 0 ? (
        <p style={styles.noAnswers}>No pending answers.</p>
      ) : (
        answers.map((answer) => (
          <div key={answer.id} style={styles.answerBox}>
            <p>
              <b>Question:</b> {answer?.question?.questionText || "No question text available"}
            </p>
            <p>
              <b>Answer:</b> {answer.answerText}
            </p>
            <div style={styles.buttonContainer}>
              <button
                onClick={() => handleReview(answer.id, "Approved")}
                style={styles.approveButton}
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleReview(answer.id, "Rejected")}
                style={styles.rejectButton}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Times New Roman",
    color: "#00FFFF",
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px cyan",
    width: "60%",
    margin: "auto",
  },
  header: {
    fontSize: "24px",
    textShadow: "0px 0px 10px cyan",
  },
  loadingText: {
    color: "yellow",
    fontSize: "18px",
  },
  noAnswers: {
    color: "yellow",
    fontSize: "18px",
  },
  answerBox: {
    border: "1px solid cyan",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px cyan",
    backgroundColor: "#222",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "10px",
  },
  approveButton: {
    padding: "10px 20px",
    backgroundColor: "#00FF00",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  },
  rejectButton: {
    padding: "10px 20px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default ReviewAnswers;
