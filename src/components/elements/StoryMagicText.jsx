import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { SendIcon } from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import "../../app/globals.css"
import { Montserrat } from "@next/font/google";
import Draggable from "react-draggable";
import { GlobalContext } from "@/context/GlobalContext";

const font = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const StoryMagicText = ({ captionInput, setCaptionInput, width }) => {
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
  const {
    setStoryCaptionBool
} = useContext(GlobalContext);

  const handleCharCount = (text) => {
    const count = text.length;
    setCharCount(count);
    // const remainingChars = maxCharCount - count;
    // setCharCount(remainingChars);
    // setTextColor(remainingChars < 0 ? "#FF0000" : "#D1D1D1");
  };

  const allUsers = ["@Alice", "@Bob", "@Charlie", "@David", "@Eve"];
  useEffect(() => {
    // Filter users based on search input
    setFilteredUsers(
      allUsers.filter((user) =>
        user.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleClick = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        // Remove user if already selected
        return prevSelectedUsers.filter(
          (selectedUser) => selectedUser !== user
        );
      } else {
        // Add user if not selected
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handlePostInputChange = (e) => {
    const newText = e.target.value;
    setCaptionInput(newText);
    handleCharCount(newText);
  };

  const handleGenerateVibe = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type !== "text") {
      // setMediaUrl(result?.text);
      // setPostType(result?.response_type);
    } else if (result?.response_type === "text") {
      setCaptionInput(result?.text);
      handleCharCount(result?.text);
      setStoryCaptionBool(true)
    }
    setIsMagicPenInputVisible(false);
  };


  return (
    <div className={`mx-auto h-full flex flex-col ${font.className}`} style={{width: width ? `${width}px` : `auto`}}>
      {/* Needed to comment out the below (related to selecting a user) in order for the program to run; it was causing issues */}

      {/* <div className={`flex text-white w-[105px] rounded-tr-lg h-[22px] items-center ${selectedUsers.length > 0 ? "bg-blue-500" : "bg-gray-500"
        }`}>
        <button onClick={handleClick}>
          <div className="flex flex-row items-center gap-1">
            <Image src={tag} alt="colombo" />
            <p>{selectedUsers.length > 0 ? "Tagged" : "Tag People"}</p>
          </div>
        </button>
      </div> */}
      <div className={`rounded-b-lg p-4`}>
            {!isMagicPenInputVisible && <div className="relative">
              <textarea
                value={captionInput}
                placeholder="Write your caption here"
                onChange={handlePostInputChange}
                className="w-full p-3 rounded-md text-gray-700 overflow-visible hide-scrollbar bg-transparent text-wrap placeholder-gray-400 text-sm resize-none outline-none h-auto"
                rows={5}
              />
            </div>}

            {isMagicPenInputVisible && (
              <div className="relative mt-4">
                <div className=" rounded-md">
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

export default StoryMagicText;
