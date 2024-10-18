import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { SendIcon } from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import tag from "../../../public/images/icons/tag.svg";
import Search from "../../../public/images/icons/Search.svg";
import blue_x from "../../../public/images/icons/blue_x.svg";
import Image from "next/image";
import "../../app/globals.css";
import { Montserrat } from "@next/font/google";
import axios from "axios"; 
import { debounce } from "lodash";
import { ROOT_URL_FEED, ROOT_URL_AUTH } from "@/utlils/rootURL";
import { getCookie } from "@/utlils/cookies";
const font = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const CaptionBox = ({ captionInput, setCaptionInput, width, handleCreateVibe }) => {
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
  const [loading, setLoading] = useState(false);

  const handleCharCount = (text) => {
    const count = text.length;
    setCharCount(count);
  };
  const searchUsers = async (query) => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(`${ROOT_URL_AUTH}/user/search?q=${query}`,{
        headers: {
          Authorization: getCookie('token')
        }
      });
      setFilteredUsers(res?.data?.results || []); // Store fetched users
      setShowUsers(true); // Show users
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleTagUsers = () => {
    setShowUsers((prevState) => !prevState); 
  };

  const handleUserClick = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user)); // Remove user if already selected
    } else {
      setSelectedUsers([...selectedUsers, user]); // Add user to selected list
    }
  };

  const handlePostInputChange = (e) => {
    const newText = e.target.value;
    setCaptionInput(newText);
    handleCharCount(newText);
  };

  const handleGenerateVibe = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type === "text") {
      setCaptionInput(result?.text);
      handleCharCount(result?.text);
    }
    setIsMagicPenInputVisible(false);
  };
  const handleSearchChange = debounce((e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      searchUsers(query); // Fetch users with debounced query
    } else {
      setFilteredUsers([]); // Clear results when input is empty
    }
  }, 300); 
  return (
    <div
      className={`mx-auto flex flex-col ${font.className} p-6 rounded-xl bg-gray-100 shadow-lg`}
      style={{ width: width ? `${width}px` : "auto" }}
    >
      {/* Tag Users Button */}
      <div
        className={`flex text-white w-[160px] rounded-tr-lg h-[30px] items-center transition-shadow duration-3000 ease-in-out ${
          selectedUsers.length > 0
            ? "bg-blue-500 hover:shadow-[0_0_15px_5px_rgba(0,150,255,0.5)]"
            : "bg-gray-500 hover:shadow-[0_0_15px_5px_rgba(100,100,100,0.5)]"
        }`}
      >
        <button onClick={handleTagUsers}>
          <div className="flex flex-row items-center gap-1">
            <Image src={tag} alt="colombo" />
            <p>
              {selectedUsers.length > 0 ? `Tagged ${selectedUsers.length}` : "Tag People"}
            </p>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className={`bg-white rounded-b-lg shadow-md ${!showUsers ? `p-0 h-18` : `pt-0`}`}>

        {showUsers ? (
          <div className="bg-brandprimary text-black p-4 rounded-lg shadow-lg flex flex-col items-center max-h-[197px] hide-scrollbar overflow-y-auto">
            <hr className="border-t-[3px] rounded-full w-[2rem] border-white mb-1" />
            <p className="mb-4 flex justify-center text-white text-sm font-[600]">
              Tag People
            </p>
            <div className="flex flex-col bg-white rounded-lg w-full">
              <div className="flex flex-row justify-between items-center border-b-[1px] border-gray-300 p-2">
                <div className="flex flex-row items-center gap-1">
                  <Image src={Search} alt="colombo" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=>handleSearchChange(e)}
                    className="w-full rounded-t-lg focus:outline-none"
                  />
                </div>
                <Image
                  src={blue_x}
                  onClick={() => setSearch("")}
                  className="cursor-pointer"
                  alt="colombo"
                />
              </div>

              {/* User List */}
              <ul>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => handleUserClick(user)}
                      className={`py-2 border-b border-gray-300 px-2 last:border-b-0 cursor-pointer ${
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
          </div>
        ) : (
          <div>
            <div className="relative">
              <textarea
                value={captionInput}
                placeholder="Write your caption here"
                onChange={handlePostInputChange}
                className="w-full p-4 rounded-md text-gray-700 bg-white placeholder-gray-400 text-sm resize-none outline-none mb-2"
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
                    className="w-full p-4 pr-12 rounded-md text-gray-700 bg-gray-50 placeholder-gray-400 text-sm resize-none outline-none"
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
        )}
      </div>

      {/* Share Vibe Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-brandprimary text-white font-semibold py-2 px-8 rounded-full shadow-lg hover:bg-green-500 transition duration-300"
          onClick={handleCreateVibe}
        >
          Share Vibe
        </button>
      </div>
    </div>
  );
};

export default CaptionBox;
