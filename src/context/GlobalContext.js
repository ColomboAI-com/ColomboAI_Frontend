'use client'
import { createContext, useState } from "react"

const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {

  let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  let [isShareOpen, setIsShareOpen] = useState(false);
  let [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isCreatePostOpen,
        setIsCreatePostOpen,
        isShareOpen,
        setIsShareOpen,
        isCommentOpen,
        setIsCommentOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContextProvider, GlobalContext };