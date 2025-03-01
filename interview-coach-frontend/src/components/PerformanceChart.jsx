import React, { useEffect, useState } from "react";
import { getUserPerformanceTrend } from "../api";  // Assuming you have a function to fetch performance data by email
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle redirects

const PerformanceChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // For redirecting to login if user is not logged in

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("User not logged in");
      navigate("/login");  // Redirect to login if user is not logged in
      return;
    }

    const fetchPerformance = async () => {
      try {
        const res = await getUserPerformanceTrend(user.email);  // Fetch data for the logged-in user by email
        if (res.data) {
          const formattedData = Object.keys(res.data).map((key) => ({
            category: key,
            count: res.data[key] || 0, // Ensures no null values
          }));
          setData(formattedData);
        }
      } catch (err) {
        setError("Failed to fetch performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Performance Summary</h2>
      {loading ? (
        <p style={styles.loadingText}>Loading performance data...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <ResponsiveContainer width="90%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="category" stroke="cyan" tick={{ fill: "cyan" }} />
            <YAxis stroke="cyan" tick={{ fill: "cyan" }} />
            <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid cyan", color: "white" }} />
            <Legend />
            <Bar dataKey="count" fill="#00FFFF" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#111",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px cyan",
    width: "80%",
    margin: "auto",
    color: "#00FFFF",
    fontFamily: "Times New Roman",
  },
  title: {
    fontSize: "24px",
    textShadow: "0px 0px 10px cyan",
  },
  loadingText: {
    color: "yellow",
  },
  errorText: {
    color: "red",
  },
};

export default PerformanceChart;
