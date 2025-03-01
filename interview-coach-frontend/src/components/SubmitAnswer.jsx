import React, { useState, useEffect } from "react";
import { getAllQuestions, submitAnswer } from "../api"; // Assuming submitAnswer is your API call to send answer
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SubmitAnswer = () => {
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]); // Store questions
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // Index of the current question
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [userEmail, setUserEmail] = useState(""); // Store user's email
  const [message, setMessage] = useState(""); // Message to display after completion
  const navigate = useNavigate(); // useNavigate for redirection

  // Fetch questions from backend on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllQuestions(); // Fetch questions from the API
        setQuestions(response);
        if (response.length > 0) {
          setSelectedQuestionIndex(0); // Start with the first question
        }

        // Assuming you store the user email in localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUserEmail(storedUser.email); // Retrieve the email from localStorage
        }
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array to fetch only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic Validation
    if (!answer || !userEmail) {
      setError("Please provide an answer, and ensure you are logged in.");
      return;
    }

    try {
      const response = await submitAnswer({
        question: { id: questions[selectedQuestionIndex].id }, // Pass the question object
        answerText: answer,
        userEmail: userEmail, // Pass user email
      });
      if (response.status === 200) {
        // Handle success (e.g., clear form)
        setAnswer(""); // Clear the answer textarea

        // Move to the next question, if available
        if (selectedQuestionIndex < questions.length - 1) {
          setSelectedQuestionIndex(selectedQuestionIndex + 1);
        } else {
          // Set message when all questions are completed
          setMessage("You have completed all the questions. Click 'Finish' to see your performance.");
        }
      }
    } catch (err) {
      setError("Failed to submit the answer. Please try again.");
    }
  };

  // Finish button logic to redirect to the performance page
  const handleFinish = () => {
    navigate("/performance");
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const currentQuestion = questions[selectedQuestionIndex];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Submit Your Answer</h1>

      {/* Displaying current question */}
      <p style={styles.questionNumber}>
        Question {selectedQuestionIndex + 1}: {currentQuestion.questionText}
      </p>

      {/* Display message if all questions are completed */}
      {message && <p style={styles.successMessage}>{message}</p>}

      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        {/* Answer Textarea */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer here"
          style={styles.textarea}
        />

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Submit Answer
        </button>
      </form>

      {/* Finish Button */}
      <button onClick={handleFinish} style={styles.finishButton}>
        Finish and Go to Performance
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#ffffff",
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px cyan",
    width: "60%",
    margin: "auto",
  },
  header: {
    fontSize: "28px",
    color: "#00FFFF",
    marginBottom: "20px",
  },
  questionNumber: {
    fontSize: "20px",
    color: "#00FFFF",
    marginBottom: "20px",
  },
  successMessage: {
    color: "green",
    fontSize: "18px",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid cyan",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    backgroundColor: "#00FFFF",
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  finishButton: {
    backgroundColor: "#FF6347",
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default SubmitAnswer;
