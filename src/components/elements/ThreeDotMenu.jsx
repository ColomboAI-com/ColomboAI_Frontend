import React from "react";
import { useState, useContext } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { GlobalContext } from "@/context/GlobalContext";



const ThreeDotMenu = ({ setIsCreateVibeOpen }) => {
  const [isMemuOpen, setIsMenuOpen] = useState(false);
  const {
    isSelectedFromComputer,
  } = useContext(GlobalContext);

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
      <button onClick={toggleMenu}>
        <DotsVerticalIcon className={isSelectedFromComputer ? `text-white h-6 w-6` : `h-10 w-10  text-gray-600`} />
      </button>
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
