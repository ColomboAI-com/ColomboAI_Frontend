"use client";
import { createContext, useState } from "react";

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  let [isShareOpen, setIsShareOpen] = useState(false);
  let [isRepostOpen, setIsRepostOpen] = useState(false);
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
  let [storyFile, setStoryFile] = useState(null);
  let [openMagicPenWithIcon, setOpenMagicPenWithIcon] = useState(false);
  let [popupImage, setPopupImage] = useState("");
  let [popupVideo, setPopupVideo] = useState("")

  return (
    <GlobalContext.Provider
      value={{
        setIsCreatePostOpen,
        isCreatePostOpen,
        isShareOpen,
        setIsShareOpen,
        isRepostOpen,
        setIsRepostOpen,
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
        storyFile,
        setStoryFile,
        openMagicPenWithIcon,
        setOpenMagicPenWithIcon,
        popupImage,
        setPopupImage,
        popupVideo,
        setPopupVideo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContextProvider, GlobalContext };
