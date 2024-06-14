import { useMessages } from '@/context/MessagesContext'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function BlankChatWindow() {

  const { isShowChatMenu, setIsShowChatMenu } = useMessages()

  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <button
        onClick={() => setIsShowChatMenu(!isShowChatMenu)}
        className="absolute top-4 hover:text-brandprimary left-4 xl:hidden"
      >
        <BsThreeDotsVertical />
      </button>
      <div className="flex flex-col items-center justify-center text-[#333333] py-8">
        <h1 className=" text-2xl font-semibold">Your Messages</h1>
        <p className=" text-[16px] ">
          Send private photos and messages to a friend or a group
        </p>
      </div>
    </div>
  )
}
