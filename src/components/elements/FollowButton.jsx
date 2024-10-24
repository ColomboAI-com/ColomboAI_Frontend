"use client";
import React, { useState } from "react";

const FollowButton = () => {
  const [toggled, setIsToggled] = useState(false);


  return (
    <button
      onClick={() => setIsToggled(!toggled)}
      className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
        toggled
          ? "bg-blue-500 text-white hover:bg-blue-600" 
          : "bg-white text-blue-500 hover:bg-blue-50"
      }`}
    >
        Follow
    </button>
  );
};

export default FollowButton;
