"use client";
import { createContext, useState } from "react";

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  let [isShareOpen, setIsShareOpen] = useState(false);
  let [isCommentOpen, setIsCommentOpen] = useState(false);
  let [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  let [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  let [specificPostId, setSpecificPostId] = useState();
  let [posts, setPosts] = useState();
  let [isCreateVibeOpen, setIsCreateVibeOpen] = useState(false);
  let [isSelectedFromComputer, setIsSelectedFromComputer] = useState(false);
  let [storyMediaURL, setStoryMediaURL] = useState("");
  let [storyMediaType, setStoryMediaType] = useState("");
  let [storyCaptionBool, setStoryCaptionBool] = useState(false);
  let [openMagicPenWithIcon, setOpenMagicPenWithIcon] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        setIsCreatePostOpen,
        isCreatePostOpen,
        isShareOpen,
        setIsShareOpen,
        isCommentOpen,
        setIsCommentOpen,
        isNewMessageOpen,
        setIsNewMessageOpen,
        isUserProfileOpen,
        setIsUserProfileOpen,
        specificPostId,
        setSpecificPostId,
        posts,
        setPosts,
        setIsCreateVibeOpen,
        isCreateVibeOpen,
        isSelectedFromComputer,
        setIsSelectedFromComputer,
        setStoryMediaURL,
        storyMediaURL,
        setStoryMediaType,
        storyMediaType,
        storyCaptionBool,
        setStoryCaptionBool,
        openMagicPenWithIcon,
        setOpenMagicPenWithIcon,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContextProvider, GlobalContext };
