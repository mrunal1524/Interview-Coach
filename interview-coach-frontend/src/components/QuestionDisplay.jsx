import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../api";

const QuestionDisplay = ({ selectedQuestion, setSelectedQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getAllQuestions();
        setQuestions(res.data);
        if (res.data.length > 0 && !selectedQuestion) {
          setSelectedQuestion(res.data[0].id); // Default selection if no question is selected
        }
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [setSelectedQuestion]);  // Remove selectedQuestion from dependency array

  const handleChange = (e) => {
    setSelectedQuestion(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select a Question</h2>
      {loading ? (
        <p style={styles.loadingText}>Fetching questions...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : questions.length === 0 ? (
        <p style={styles.noQuestionsText}>No questions available</p>
      ) : (
        <select onChange={handleChange} value={selectedQuestion} style={styles.select}>
          {questions.map((q) => (
            <option key={q.id} value={q.id}>
              {q.questionText}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#111",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px cyan",
    width: "60%",
    margin: "auto",
    color: "#00FFFF",
    fontFamily: "Times New Roman",
  },
  title: {
    fontSize: "22px",
    textShadow: "0px 0px 10px cyan",
  },
  loadingText: {
    color: "yellow",
  },
  errorText: {
    color: "red",
  },
  noQuestionsText: {
    color: "yellow",
    fontSize: "18px",
  },
  select: {
    padding: "10px",
    width: "80%",
    fontFamily: "Times New Roman",
    fontSize: "16px",
    border: "1px solid cyan",
    backgroundColor: "#222",
    color: "white",
    borderRadius: "5px",
    outline: "none",
    boxShadow: "0px 0px 5px cyan",
  },
};

export default QuestionDisplay;
