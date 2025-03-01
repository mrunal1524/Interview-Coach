import { useState, useEffect } from "react";
import { getAllQuestions, submitAnswer } from "../api";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch questions on page load
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllQuestions();
        if (response.data.length > 0) {
          setQuestions(response.data);
          setCurrentIndex(0); // ✅ Ensure first question is selected
        } else {
          setMessage("No questions available.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setMessage("Failed to load questions.");
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !answer || questions.length === 0) {
      setMessage("All fields are required.");
      return;
    }

    const answerData = {
      userEmail: email,
      answerText: answer,
      question: { id: questions[currentIndex].id },
    };

    try {
      await submitAnswer(answerData);
      setMessage("Answer submitted successfully!");

      // ✅ Move to next question (if available)
      setAnswer("");
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setMessage("All questions answered!");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessage("Failed to submit answer.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Interview Coach</h2>

      {questions.length > 0 ? (
        <div style={styles.questionBox}>
          <h3 style={styles.questionText}>
            {questions[currentIndex]?.questionText}
          </h3>
          <p>Question {currentIndex + 1} of {questions.length}</p>
        </div>
      ) : (
        <p style={styles.loadingText}>{message || "Loading questions..."}</p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          {currentIndex < questions.length - 1 ? "Next Question" : "Submit Answer"}
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    backgroundColor: "#111",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px cyan",
    width: "60%",
    margin: "auto",
    color: "#00FFFF",
    fontFamily: "Times New Roman",
  },
  header: {
    fontSize: "24px",
    textShadow: "0px 0px 10px cyan",
  },
  questionBox: {
    padding: "20px",
    backgroundColor: "#222",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px cyan",
    marginBottom: "20px",
  },
  questionText: {
    fontSize: "20px",
    color: "cyan",
  },
  form: {
    width: "80%",
    margin: "auto",
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
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid cyan",
    backgroundColor: "#222",
    color: "white",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#00FFFF",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  },
  message: {
    marginTop: "10px",
    color: "yellow",
  },
  loadingText: {
    color: "yellow",
  },
};

export default Home;
