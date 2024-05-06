import { useMessages } from '@/context/MessagesContext';
import React, { useEffect } from 'react'
import Message from './Message';

export default function ChatHistory() {

  const { selectedChat, getChatHistory, chatHistory, setChatHistory } = useMessages()

  useEffect(() => {
    if (selectedChat) {
      getChatHistory()
    }
    return () => setChatHistory([])
  }, [selectedChat])

  return (
    <div className="chat-conversation-box border- border-red-400 relative h-full max-h-[calc(100vh_-_325px)] md:max-h-[calc(100vh_-_280px)] overflow-y-auto no-scrollbar">
      <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
        {
          chatHistory?.length ?
            chatHistory.map((i, index) =>
              <Message message={i} key={index} />
            )
            :
            <div className=" flex justify-center items-center -m-4 min-h-[calc(100vh_-_325px)] md:min-h-[calc(100vh_-_280px)] text-[#D1D1D1] text-xl text-center ">
              Kickstart your conversation with <br /> Magic Pen!
            </div>
        }
      </div>
    </div>
  )
}
