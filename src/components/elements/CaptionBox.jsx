import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { SendIcon } from "../Icons";
import { FeedContext } from "@/context/FeedContext";

const CaptionBox = () => {
  const [postInput, setPostInput] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const { generatePost, loadings } =
    useContext(FeedContext);
  const [isMagicPenInputVisible, setIsMagicPenInputVisible] = useState(true);
  const wordCount = postInput.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className=" flex absolute top-[702px] bg-gray-500 text-white w-[105px] h-[22px] items-center ">
      <button onClick={handleClick}>{selectedUsers.length > 0 ? 'Tagged' : 'Tag People'}</button>
       </div>
       {showUsers && (
        <div className="absolute top-[726px] w-[470px] bg-gray-200 text-black p-4 rounded-md shadow-lg w-[250px] max-h-[300px] overflow-y-auto z-50">
          
            <p className="mb-4 flex justify-center">Tag people</p>
          
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              mb-2
              p-2
              border border-gray-300
              rounded-md
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
            "
          />
          {/* User List */}
          <ul>
          {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <li
                  key={index}
                  onClick={() => handleUserClick(user)}
                  className={`py-2 border-b border-gray-300 last:border-b-0 cursor-pointer ${
                    selectedUsers.includes(user) ? 'bg-gray-300' : ''
                  }`}
                >
                  {user}
                </li>
              ))
            ) : (
              <li className="py-2">No users found</li>
            )}
          </ul>
        </div>
      )} 
      <div className="bg-white rounded-lg shadow-md p-4">
        
        <div className="relative">
          <textarea
            value={postInput}
            placeholder="Write your caption here"
            onChange={(e) => setPostInput(e.target.value)}
            className="w-full p-3 rounded-md text-gray-700 bg-white placeholder-gray-400 text-sm resize-none outline-none mb-1"
            rows={3}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {wordCount}/300
          </div>
        </div>

        {isMagicPenInputVisible && (
          <div className="relative">
            <div className="border border-blue-300 rounded-md">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask or create anything"
                className="w-full p-3 pr-12 rounded-md text-gray-700 bg-gray-50 placeholder-gray-400 text-sm resize-none outline-none"
                rows={2}
              />
              <button
                className="absolute right-2 bottom-2"
                onClick={handleGenerateVibe}
              >
                {loadings.generatePost ? (
                  <ThreeDots
                    visible={true}
                    height="85"
                    width="20"
                    color="#3B82F6"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  <SendIcon
                    w={20}
                    h={85}
                    fill={promptInput !== "" ? "#3B82F6" : "#E5E7EB"}
                  />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionBox;
