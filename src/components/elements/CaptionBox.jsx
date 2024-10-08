import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { SendIcon } from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import axios from "axios";
import {ROOT_URL_AUTH } from "@/utlils/rootURL"

const CaptionBox = ({ captionInput, setCaptionInput }) => {
  // const [captionInput, setCaptionInput] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const { generatePost, loadings } = useContext(FeedContext);
  const [isMagicPenInputVisible, setIsMagicPenInputVisible] = useState(true);
  const [textColor, setTextColor] = useState("#D1D1D1");
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 300;
  const [showUsers, setShowUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUsersDetails, setSearchUsersDetails] = useState([]);  
  const [loading, setLoading] = useState(false); 
  

  const handleCharCount = (text) => {
    const count = text.length;
    setCharCount(count);
    // const remainingChars = maxCharCount - count;
    // setCharCount(remainingChars);
    // setTextColor(remainingChars < 0 ? "#FF0000" : "#D1D1D1");
  };

  // const allUsers = ["@Alice", "@Bob", "@Charlie", "@David", "@Eve"];
  // useEffect(() => {
  //   // Filter users based on search input
  //   setFilteredUsers(
  //     allUsers.filter((user) =>
  //       user.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search]);

  // const handleClick = () => {
  //   setShowUsers((prevShowUsers) => !prevShowUsers);
  // };
  const searchUsers = async () => {
    setLoading(true);  // Set loading to true when starting the request
    try {
      const res = await axios.get(`${ROOT_URL_AUTH}/user/search?limit=5`);  // Adjust the query if needed
      setSearchUsersDetails(res?.data?.results);  // Store fetched users
      setShowUsers(true);  // Show users once they are fetched
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);  // Set loading to false after the request finishes
    }
  };

  // Handle the button click to fetch and display users
  const handleTagUsers = () => {
    if (selectedUsers.length === 0) {
      searchUsers();  // Fetch users if no users are tagged
    } else {
      setSelectedUsers([]);  // Clear selected users (untagging)
      setShowUsers(false);   // Hide users
    }
  };

  // Handle user selection
  const handleUserClick = (user) => {
    // Add/remove users from the selectedUsers state (your existing logic)
  };

  // const handleUserClick = (user) => {
  //   setSelectedUsers((prevSelectedUsers) => {
  //     if (prevSelectedUsers.includes(user)) {
  //       // Remove user if already selected
  //       return prevSelectedUsers.filter(
  //         (selectedUser) => selectedUser !== user
  //       );
  //     } else {
  //       // Add user if not selected
  //       return [...prevSelectedUsers, user];
  //     }
  //   });
  // };

  const handlePostInputChange = (e) => {
    const newText = e.target.value;
    setCaptionInput(newText);
    handleCharCount(newText);
  };

  const handleGenerateVibe = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type !== "text") {
      setMediaUrl(result?.text);
      setPostType(result?.response_type);
    } else if (result?.response_type === "text") {
      setCaptionInput(result?.text);
      handleCharCount(result?.text);
    }
    setIsMagicPenInputVisible(false);
  };

  const buttonClass = `flex text-white w-[105px] h-[22px] items-center mb-2 ${
    selectedUsers.length > 0 ? "bg-blue-500" : "bg-gray-500"
  }`;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Needed to comment out the below (related to selecting a user) in order for the program to run; it was causing issues */}

      <div className={buttonClass} style={{ position: 'absolute', top: '700px', left: '250px' }}>
  <button onClick={handleTagUsers}>
    {selectedUsers.length > 0 ? "Tagged" : "Tag People"}
  </button>
</div>

      {showUsers && (
        <div className="absolute top-[710px] left-[365px] w-[470px] bg-gray-200 text-black p-4 rounded-md shadow-lg max-h-[300px] overflow-y-auto z-50 border-[1px] border-blue-500">
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
                    selectedUsers.includes(user) ? "bg-gray-300" : ""
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
            value={captionInput}
            placeholder="Write your caption here"
            onChange={handlePostInputChange}
            className="w-full p-3 rounded-md text-gray-700 bg-white placeholder-gray-400 text-sm resize-none outline-none mb-1"
            rows={3}
          />
          <div
            className="absolute bottom-2 right-2 text-xs"
            style={{ color: textColor }}
          >
            {charCount}/{maxCharCount}
          </div>
        </div>

        {isMagicPenInputVisible && (
          <div className="relative mt-4">
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
                    height="24"
                    width="24"
                    color="#3B82F6"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  <SendIcon
                    w={24}
                    h={24}
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
