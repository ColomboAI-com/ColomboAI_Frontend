"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import leftArrow from "../../../public/images/icons/leftArrow.png";
import Image from 'next/image';


const History = () => {
  const router = useRouter()
  const [history, setHistory] = useState([
    {
      date: '11th May, 2024',
      queries: [
        { id: 1, query: 'What is a Video', checked: false },
        { id: 2, query: 'What is the capital of Sri Lanka?', checked: false },
        { id: 3, query: 'How does quantum computing work?', checked: false },
      ],
    },
    {
      date: '10th May, 2024',
      queries: [
        { id: 4, query: 'Will Gojo Sataru come back?', checked: false },
        { id: 5, query: 'Best ramyeon recipe?', checked: false },
        { id: 6, query: 'Who is the best vocalist in K-pop?', checked: false },
      ],
    },
    {
      date: '9th May, 2024',
      queries: [
        { id: 7, query: 'How to learn React quickly?', checked: false },
        { id: 8, query: 'Best practices for coding interviews?', checked: false },
      ],
    },
    {
      date: '8th May, 2024',
      queries: [
        { id: 9, query: 'What are the latest trends in AI?', checked: false },
        { id: 10, query: 'How to manage time effectively?', checked: false },
      ],
    },

    {
        date: '7th May, 2024',
        queries: [
          { id: 11, query: 'what to work effectively?', checked: false },
          { id: 12, query: 'How to complete work before deadline?', checked: false },
        ],
      },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const handleClearHistory = () => {
    setShowClearAllModal(true);
  }

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
    // router.push('/gen-search')
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Add sidebar content here if needed */}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <button onClick={e => router.push('/gen-search')}><Image src={leftArrow} alt="colombo" className="w-2" />
        </button>
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
          onClick={() => handleClearHistory()}
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

export default History;
