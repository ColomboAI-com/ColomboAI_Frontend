"use client";
import { createContext, useState } from "react";

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  let [isShareOpen, setIsShareOpen] = useState(false);
  let [isRepostOpen, setIsRepostOpen] = useState(false);
  let [isCommentOpen, setIsCommentOpen] = useState(false);
  let [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  let [isSearchUserOpen, setIsSearchUserOpen] = useState(false);
  let [isSearchConversationOpen, setIsSearchConversationOpen] = useState(false);
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
  // let [popupImage, setPopupImage] = useState(""); // Replaced by mediaViewerState
  // let [popupVideo, setPopupVideo] = useState(""); // Replaced by mediaViewerState
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const initialMediaViewerState = {
    open: false,
    slides: [], // Array of { src, type, width?, height?, poster? }
    currentIndex: 0,
  };
  const [mediaViewerState, setMediaViewerState] = useState(initialMediaViewerState);

  const openMediaViewer = (slides, startIndex = 0) => {
    setMediaViewerState({
      open: true,
      slides: slides,
      currentIndex: startIndex,
    });
  };

  const closeMediaViewer = () => {
    setMediaViewerState(initialMediaViewerState);
  };


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
        // popupImage, // Replaced
        // setPopupImage, // Replaced
        // popupVideo, // Replaced
        // setPopupVideo, // Replaced
        mediaViewerState,
        openMediaViewer,
        closeMediaViewer,
        isNotificationOpen,
        setIsNotificationOpen,
        isSearchUserOpen,
        setIsSearchUserOpen,
        isSearchConversationOpen,
        setIsSearchConversationOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContextProvider, GlobalContext };
