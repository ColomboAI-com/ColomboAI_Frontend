"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [history, setHistory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const chatResponse = await axios.get(
          "https://genaimlapi.colomboai.com/chats"
        );
        const queries = chatResponse.data.chats;

        // Group the queries by date
        const groupedByDate = groupQueriesByDate(queries);
        setHistory(groupedByDate);
        // setHistory(queries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchQueries();
  }, []);
  console.log(history);

  const groupQueriesByDate = (queries) => {
    // Helper function to extract just the date portion from createdAt timestamp
    const getDateFromTimestamp = (timestamp) =>
      new Date(timestamp).toLocaleDateString();

    const groupedData = queries.reduce((acc, query) => {
      const queryDate = getDateFromTimestamp(query.createdAt);
      const existingDay = acc.find((day) => day.date === queryDate);

      if (existingDay) {
        existingDay.queries.push({ ...query, checked: false });
      } else {
        acc.push({
          date: queryDate,
          queries: [{ ...query, checked: false }],
        });
      }
      return acc;
    }, []);

    return groupedData;
  };

  const toggleCheckbox = (dayIndex, queryId) => {
    const newHistory = [...history];
    const day = newHistory[dayIndex];
    day.queries = day.queries.map((query) =>
      query.id === queryId ? { ...query, checked: !query.checked } : query
    );
    setHistory(newHistory);
  };

  const handleDeleteChecked = (dayIndex) => {
    const newHistory = [...history];
    const day = newHistory[dayIndex];
    day.queries = day.queries.filter((query) => !query.checked);

    if (day.queries.length > 0) {
      newHistory[dayIndex] = day;
    } else {
      newHistory.splice(dayIndex, 1);
    }

    setHistory(newHistory);
    setShowDeleteModal(false);
  };

  const handleClearAll = () => {
    setHistory([]);
    setShowClearAllModal(false);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Add sidebar content here if needed */}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Title */}
        <h2 style={styles.heading}>GenAI Search History</h2>

        {/* History Section */}
        <div style={styles.historySection}>
          {history.map((day, dayIndex) => (
            <div key={dayIndex} style={styles.dateSection}>
              <h4 style={styles.dateTitle}>{day.date}</h4>
              <button
                style={styles.deleteBtnDay}
                onClick={() => {
                  setSelectedDayIndex(dayIndex);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
              {day.queries.map((query) => (
                <div key={query.id} style={styles.historyItem}>
                  <input
                    type="checkbox"
                    checked={query.checked}
                    onChange={() => toggleCheckbox(dayIndex, query.id)}
                    style={styles.checkbox}
                  />
                  <label style={styles.queryLabel}>{query.title}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          style={styles.clearAllBtn}
          onClick={() => setShowClearAllModal(true)}
        >
          Clear All History
        </button>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={styles.modalTitle}>Delete Queries</h2>
              <p>
                Are you sure you want to delete all checked queries for this
                day?
              </p>
              <div style={styles.modalActions}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteChecked(selectedDayIndex)}
                >
                  Delete
                </button>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear All Confirmation Modal */}
        {showClearAllModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={styles.modalTitle}>Clear All History</h2>
              <p>Are you sure you want to clear all search history?</p>
              <div style={styles.modalActions}>
                <button style={styles.deleteBtn} onClick={handleClearAll}>
                  Clear All
                </button>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowClearAllModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "15%",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRight: "1px solid #ddd",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  historySection: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  dateSection: {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  dateTitle: {
    marginBottom: "20px",
  },
  deleteBtnDay: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#ff4c4c",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  historyItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
  },
  checkbox: {
    marginRight: "10px",
  },
  queryLabel: {
    marginLeft: "5px", // Space between checkbox and label
    flex: 1, // Allow label to take remaining space
  },
  deleteBtn: {
    backgroundColor: "#ff4c4c",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  clearAllBtn: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: "10px",
  },
  modalActions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  cancelBtn: {
    backgroundColor: "#aaa",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
