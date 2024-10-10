"use client"; // Add this line

import React, { useState } from "react";
import NewDevicePopup from "@/components/auth/NewDevicePopup";

const TestPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleConfirm = () => {
    // Handle confirm action
    setShowPopup(false);
  };

  const handleCancel = () => {
    // Handle cancel action
    setShowPopup(false);
  };

  return (
    <div>
      <h1>Test Popup</h1>
      {showPopup && (
        <NewDevicePopup onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default TestPopup;
