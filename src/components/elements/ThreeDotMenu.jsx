import React, { useContext } from "react";
import { useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { VibeContext } from "@/context/VibeContext";

const ThreeDotMenu = ({ setIsCreateVibeOpen }) => {
  const { deleteVibe, archiveVibe } = useContext(VibeContext);
  const [isMemuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMemuOpen);
  };

  const handleSaveToDrafts = () => {
    console.log("Saving to drafts");
    setIsMenuOpen(false);
  };

  const handleDiscard = () => {
    archiveVibe();
    setIsMenuOpen(false);
    setIsCreateVibeOpen(false);
  };

  // TODO: render the buttons related to these only after a vibe has been created
  const handleArchive = () => {
    console.log("Archiving");
    handleArchive();
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    console.log("Editing");
    setIsMenuOpen(false);
  };

  const handleHideLikeCounts = () => {
    console.log("Hiding like counts");
    setIsMenuOpen(false);
  };

  const handleTurnOffCommenting = () => {
    console.log("Turning off commenting");
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    deleteVibe();
    setIsMenuOpen(false);
    setIsCreateVibeOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        <DotsVerticalIcon className="h-10 w-10 text-white" />
      </button>
      {isMemuOpen && (
        <div className="absolute left-3 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
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
            {/* <button
              onClick={handleArchive}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Archive 
            </button>
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={handleHideLikeCounts}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Hide like counts
            </button>
            <button
              onClick={handleTurnOffCommenting}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Turn Off Commenting
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button> */}        
            
                       {/* this can be used when we are using this three dot menu for watching others vibes  */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
