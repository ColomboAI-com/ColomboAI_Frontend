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
    <>
      <div
        className="fixed top-0 left-16 xl:left-30 w-[20px] h-screen z-20"
        onMouseEnter={handleMouseEnter}
      />
      <div
        className={`fixed top-0 left-16 xl:left-20 h-screen transition-all w-[365px] duration-700 ease-in-out overflow-hidden ${
          isExpanded ? 'w-64 bg-[rgba(30,113,242,1)]' : 'w-0 bg-transparent'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`h-full flex flex-col text-white ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-4 relative top-[81px] ">
            <button className="flex items-center space-x-2 bg-white text-blue-600 rounded-full py-2 px-4  w-[138px] h-[49px]">
              <PlusCircle size={20} />
              <span className='bg-[linear-gradient(93deg,_#6237FF_33.16%,_#258EFF_99.75%)] bg-clip-text font-circularStd font-sans text-transparent'>New Chat</span>
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto top-[81px] relative">
            <h2 className="font-bold mb-2 font-circularStd font-sans text-[18px] leading-[22.77px] tracking-[-0.204px]">Recent</h2>
            <ul className="space-y-2 text-[rgba(238,238,238,1)] relative h-[20px] top-[43px] font-circularStd font-sans text-[16px] font-[450] leading-[20.24px] tracking-[0.1em]">
              <li>What is Video</li>
              <li>How to make a burger?</li>
            </ul>
          </div>
          <div className="p-4 mt-auto font-circularStd font-sans text-[18px]">
            <button className="flex items-center space-x-2 mb-4">
              <History size={20} />
              <span>History</span>
            </button>
            <button className="flex items-center space-x-2">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryChat;