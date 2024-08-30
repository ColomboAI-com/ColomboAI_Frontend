import React from "react";
import { useState } from "react";

const ThreeDotMenu = ({ setIsCreateVibeOpen }) => {
  const [isMemuOpen, setIsMenuOpen] = useState(false);

  // Handlers for 3-dots menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMemuOpen);
  };

  const handleSaveToDrafts = () => {
    console.log("Saving to drafts");
    setIsMenuOpen(false);
  };

  const handleDiscard = () => {
    console.log("Discarding");
    setIsMenuOpen(false);
    setIsCreateVibeOpen(false);
  };

  return (
    <div>
      <button onClick={toggleMenu}>3-dot menu placeholder</button>
      {isMemuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={handleSaveToDrafts}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Save to Drafts
            </button>
            <button
              onClick={handleDiscard}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
