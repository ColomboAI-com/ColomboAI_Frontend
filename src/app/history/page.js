"use client";


import React, { useState } from 'react';

function PersonalAISearch() {
  // State to store user search input
  const [searchInput, setSearchInput] = useState('');
  // State to store search history (grouped by dates)
  const [searchHistory, setSearchHistory] = useState({});
  // State to track checked items
  const [checkedItems, setCheckedItems] = useState({});
  // State to toggle the visibility of search history
  const [showHistory, setShowHistory] = useState(false);

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchInput.trim() === '') return;

    // Capture current date in a readable format
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Update the search history by date
    setSearchHistory((prevHistory) => ({
      ...prevHistory,
      [currentDate]: [...(prevHistory[currentDate] || []), searchInput],
    }));

    // Clear the input field after search
    setSearchInput('');
  };

  // Function to handle deleting selected search queries from history
  const handleDeleteSelected = () => {
    const updatedHistory = { ...searchHistory };

    // Remove checked items
    Object.keys(checkedItems).forEach((date) => {
      if (checkedItems[date]) {
        updatedHistory[date] = updatedHistory[date].filter((_, index) => !checkedItems[date][index]);
        if (updatedHistory[date].length === 0) delete updatedHistory[date];
      }
    });

    setSearchHistory(updatedHistory);
    setCheckedItems({});
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (date, index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [date]: {
        ...prevCheckedItems[date],
        [index]: !prevCheckedItems[date]?.[index]
      }
    }));
  };

  // Function to render history groups by date
  const renderSearchHistory = () => {
    return Object.keys(searchHistory).map((date) => (
      <div key={date} className="mb-8 bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">{date}</h2>
        <div className="space-y-2">
          {searchHistory[date].map((query, queryIndex) => (
            <div key={queryIndex} className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={checkedItems[date]?.[queryIndex] || false}
                  onChange={() => handleCheckboxChange(date, queryIndex)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{query}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">GenAI Search</h1>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-8">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ask or create anything..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          *
        </button>
      </form>

      {/* Conditionally Render Search History */}
      {showHistory && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search History</h2>
          {Object.keys(searchHistory).length > 0 ? (
            <>
              {renderSearchHistory()}
              <button
                onClick={handleDeleteSelected}
                className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Selected
              </button>
            </>
          ) : (
            <p className="text-gray-500">No search history available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonalAISearch;