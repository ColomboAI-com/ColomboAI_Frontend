import { handleError } from "@/utlils/handleError"
import { ROOT_URL_MESSAGES } from "@/utlils/rootURL"
import axios from "axios"
import { getCookie } from "cookies-next"
import { createContext, useContext, useEffect, useState } from "react"

const MessagesContext = createContext()

export const MessagesContextProvider = ({ children }) => {

  const [conversations, setConversations] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [disconnectedUser, setDisconnectedUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [isShowChatMenu, setIsShowChatMenu] = useState(false)
  const [loadings, setLoadings] = useState({
    conversations: false,
    history: false
  })

  useEffect(() => {
    if (disconnectedUser) {
      let allChats = [...conversations]
      let findChat = allChats.find(e => e.participants?.[0]?._id == disconnectedUser.userId)
      if (findChat?.participants?.[0]?.lastActiveTime) {
        const index = allChats.indexOf(findChat)
        findChat.participants[0].lastActiveTime = disconnectedUser.time
        allChats[index] = findChat
      }
      setConversations(allChats)
    }
  }, [disconnectedUser])

  const setLastMessage = (userId, message) => {
    let allChats = [...conversations]
    let findChat = allChats.find(e => e.participants?.[0]?._id == userId)
    const index = allChats.indexOf(findChat)
    if (findChat?.lastMessage) {
      findChat.lastMessage.text = (message || '')
      allChats[index] = findChat
    }
    setConversations(allChats)
  }

  const getConversations = async (postId, page = 1, count = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, conversations: true }))
      const res = await axios.get(`${ROOT_URL_MESSAGES}/messages/conversations`,
        {
          headers: {
            Authorization: getCookie("token"),
          },
        })
      setConversations(res.data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings((prev) => ({ ...prev, conversations: false }))
    }
  }

  const getChatHistory = async (postId, page = 1, count = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, history: true }))
      const res = await axios.get(`${ROOT_URL_MESSAGES}/messages/${selectedChat?._id}`,
        {
          headers: {
            Authorization: getCookie("token"),
          },
        })
      setChatHistory(res.data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings((prev) => ({ ...prev, history: false }))
    }
  }

  return (
    <MessagesContext.Provider value={{
      conversations, setConversations,
      selectedChat, setSelectedChat,
      onlineUsers, setOnlineUsers,
      newMessage, setNewMessage,
      setDisconnectedUser, setLastMessage,
      getConversations, loadings,
      isShowChatMenu, setIsShowChatMenu,
      getChatHistory, chatHistory, setChatHistory
    }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(MessagesContext)
}