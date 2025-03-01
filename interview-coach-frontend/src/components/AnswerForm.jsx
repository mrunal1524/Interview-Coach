import React, { useState, useEffect } from "react";
import { submitAnswer, getAllQuestions } from "../api";

const AnswerForm = () => {
  const [answerText, setAnswerText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  // ✅ Fetch questions dynamically
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllQuestions();
        if (response.data.length > 0) {
          setQuestions(response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setMessage("Please enter your Email.");
      return;
    }
    if (questions.length === 0) {
      setMessage("No questions available.");
      return;
    }

    setIsSubmitting(true); // Disable button while submitting

    try {
      await submitAnswer({
        question: { id: questions[currentQuestionIndex].id },
        userEmail,
        answerText,
      });

      setMessage("Answer submitted successfully!");
      setAnswerText("");

      // ✅ Move to the next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setMessage("All questions answered!");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessage("Error submitting answer.");
    } finally {
      setIsSubmitting(false); // Re-enable button after submission
    }
  };

  const handleInputChange = (e) => {
    setMessage(""); // Clear message when user starts typing again
    if (e.target.name === "email") {
      setUserEmail(e.target.value);
    } else if (e.target.name === "answerText") {
      setAnswerText(e.target.value);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Interview Coach</h1>
      <h2>Answer the Question</h2>

      {loading ? (
        <p style={styles.loadingText}>Loading questions...</p>
      ) : questions.length > 0 ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.questionText}>
            {questions[currentQuestionIndex]?.questionText}
          </h3>

          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={userEmail}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <textarea
            name="answerText"
            placeholder="Enter your answer..."
            value={answerText}
            onChange={handleInputChange}
            required
            style={styles.textarea}
          />

          <button type="submit" style={styles.button} disabled={isSubmitting}>
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Answer"}
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </form>
      ) : (
        <p style={styles.noQuestionsText}>No questions available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
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
  form: {
    maxWidth: "500px",
    margin: "auto",
  },
  questionText: {
    color: "#00eaff",
    fontSize: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid cyan",
    backgroundColor: "#222",
    color: "#fff",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid cyan",
    backgroundColor: "#222",
    color: "#fff",
    minHeight: "80px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#00eaff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  message: {
    marginTop: "10px",
    color: "yellow",
  },
  noQuestionsText: {
    color: "yellow",
    fontSize: "18px",
  },
  loadingText: {
    color: "yellow",
  },
};

export default AnswerForm;
