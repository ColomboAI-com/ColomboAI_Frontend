"use client"
import React, { useContext, useEffect } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import UserProfileSection from "@/components/messages/UserProfileSection"
import Conversations from "@/components/messages/Conversations"
import BlankChatWindow from "@/components/messages/BlankChatWindow"
import { useMessages } from "@/context/MessagesContext"
import ChatWindowHeader from "@/components/messages/ChatWindowHeader"
import ChatHistory from "@/components/messages/ChatHistory"
import MessageInput from "@/components/messages/MessageInput"
import { ROOT_URL_MESSAGES } from "@/utlils/rootURL"
import { getCookie } from "cookies-next"
import { io } from "socket.io-client"

const ComponentsAppsChat = () => {

  const { selectedChat } = useMessages()
  const { isUserProfileOpen, setIsUserProfileOpen } = useContext(GlobalContext)
  const { setOnlineUsers, setDisconnectedUser, setNewMessage } = useMessages()

  useEffect(() => {
    const connectSocket = io(`${ROOT_URL_MESSAGES}`, {
      auth: {
        token: getCookie('token')
      }
    })

    connectSocket.on('connect', () => {
      // console.log('Connected to socket.io server')
    })

    connectSocket.on('getOnlineUsers', (data) => {
      setOnlineUsers(data)
    })

    connectSocket.on('userDisconnected', (data) => {
      setDisconnectedUser(data)
    })

    connectSocket.on('newMessage', (data) => {
      setNewMessage(data)
    })

    return () => {
    connectSocket.disconnect()
    }
  }, [])


  return (
    <div className="font-sans">
      <div className="relative flex h-[calc(100vh_-_155px)] md:h-[calc(100vh_-_140px)] sm:min-h-0 max-h-[calc(100vh_-_240px)] md:max-h-[calc(100vh_-_140px)]">
        <Conversations />
        <div className="Chat-window bg-white shadow flex-1 p-0">
          {
            selectedChat && !isUserProfileOpen ?
              <div className="relative h-full">
                <ChatWindowHeader />
                <ChatHistory />
                <MessageInput />
              </div>
              : isUserProfileOpen ?
                <UserProfileSection data={selectedChat} />
                : <BlankChatWindow />
          }
        </div>
      </div>
    </div>
  )
}

export default ComponentsAppsChat
