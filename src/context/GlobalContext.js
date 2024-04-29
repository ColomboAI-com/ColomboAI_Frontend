'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {

    let [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    let [isShareOpen, setIsShareOpen] = useState(false);
    let [isCommentOpen, setIsCommentOpen] = useState(false);
    let [isRepostOpen, setIsRepostOpen] = useState(false);

    return (
        <GlobalContext.Provider
          value={{
            isCreatePostOpen,
            setIsCreatePostOpen,
            isShareOpen, 
            setIsShareOpen,
            isCommentOpen, 
            setIsCommentOpen,
            isRepostOpen,
            setIsRepostOpen
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}

export { GlobalContextProvider, GlobalContext };