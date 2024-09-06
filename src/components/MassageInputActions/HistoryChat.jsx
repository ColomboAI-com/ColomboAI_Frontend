import React, { useState, useCallback } from 'react';
import { PlusCircle, History, Settings } from 'lucide-react';

const HistoryChat = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-blue-600 text-white transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-1 overflow-hidden'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4">
        <button className="flex items-center space-x-2 bg-white text-blue-600 rounded-full py-2 px-4 w-full">
          <PlusCircle size={20} />
          <span>New Chat</span>
        </button>
      </div>

      <div className="p-4">
        <h2 className="font-bold mb-2">Recent</h2>
        <ul className="space-y-2">
          <li>What is Video</li>
          <li>How to make a burger?</li>
        </ul>
      </div>

      <div className="absolute bottom-4 left-4 space-y-4">
        <button className="flex items-center space-x-2">
          <History size={20} />
          <span>History</span>
        </button>
        <button className="flex items-center space-x-2">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default HistoryChat;