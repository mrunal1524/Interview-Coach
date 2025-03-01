import axios from "axios";

// ✅ Define API base URL
const API_URL = "http://localhost:8080/api";

// ✅ Register a new user
export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/users/register`, userData);
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch next question (one at a time)
export const getNextQuestion = async (currentQuestionId) => {
  try {
    return await axios.get(`${API_URL}/questions/next?currentId=${currentQuestionId}`);
  } catch (error) {
    console.error("Error fetching next question:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Submit an answer
export const submitAnswer = async (answerData) => {
  try {
    return await axios.post(`${API_URL}/answers`, answerData);
  } catch (error) {
    console.error("Error submitting answer:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get all answers by user
export const getAnswersByUser = async (email) => {
  try {
    return await axios.get(`${API_URL}/answers/user?email=${email}`);
  } catch (error) {
    console.error("Error fetching user answers:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get user performance trend
export const getUserPerformanceTrend = async (email) => {
  try {
    return await axios.get(`${API_URL}/answers/user/performance-trend?email=${email}`);
  } catch (error) {
    console.error("Error fetching performance trend:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get answer performance statistics
export const getAnswerStatistics = async () => {
  try {
    return await axios.get(`${API_URL}/answers/statistics/performance`);
  } catch (error) {
    console.error("Error fetching answer statistics:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get pending answers by review status
export const getAnswersByReviewStatus = async (status) => {
  try {
    return await axios.get(`${API_URL}/answers/review-status?status=${status}`);
  } catch (error) {
    console.error("Error fetching review status answers:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Review an answer (Approve/Reject)
export const reviewAnswer = async (id, status) => {
  try {
    return await axios.put(`${API_URL}/answers/${id}/review?status=${status}`);
  } catch (error) {
    console.error("Error reviewing answer:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch all questions
export const getAllQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch all answers
export const getAllAnswers = async () => {
  try {
    const response = await axios.get(`${API_URL}/answers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all answers:", error.response?.data || error.message);
    throw error;
  }
};
