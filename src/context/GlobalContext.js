'use client'
import { createContext, useState } from "react"

const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {

  let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  let [isShareOpen, setIsShareOpen] = useState(false);
  let [isCommentOpen, setIsCommentOpen] = useState(false);

  let [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  let [isSelectPictureMessageOpen, setIsSelectPictureMessageOpen] = useState(false);
  let [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

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
        isSelectPictureMessageOpen, 
        setIsSelectPictureMessageOpen,
        isUserProfileOpen, 
        setIsUserProfileOpen
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContextProvider, GlobalContext };