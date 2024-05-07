'use client'
import { createContext, useState } from "react"

const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {

  let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  let [isShareOpen, setIsShareOpen] = useState(false);
  let [isCommentOpen, setIsCommentOpen] = useState(false);

  let [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  let [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  let [specificPostId, setSpecificPostId] = useState()
  let [posts, setPosts] = useState()

  return (
    <GlobalContext.Provider
      value={{
        isCreatePostOpen,
        setIsCreatePostOpen,
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
        setPosts
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContextProvider, GlobalContext };