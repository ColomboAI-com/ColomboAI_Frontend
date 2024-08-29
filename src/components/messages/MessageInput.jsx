import React from 'react'
import { EmojiIcon, ImageIcon, SendIcon } from '../Icons'
import { useMessages } from '@/context/MessagesContext'
import { ThreeDots } from 'react-loader-spinner'
import Modal from '../elements/Modal'
import SelectPicture from './SelectPicture'

export default function MessageInput() {

  const { messageInput, setMessageInput, messageFile, sendMessage, loadings, isFileMessageModalOpen, setIsFileMessageModalOpen } = useMessages()

  const checkValidation = () => {
    if (!messageInput.trim() && !messageFile) {
      return
    }
    sendMessage()
  }

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      checkValidation()
    }
  }

  return (
    <div className="absolut bottom-0 left-0 w-full px-4 pt-4">
      <div className="w-full items-center space-x-3 sm:flex">
        <div className="relative flex-1">
          <input
            className="w-full text-sm font-semibold text-black !outline-none border-[1px] border-brandprimary focus:ring-transparent rounded-full px-12 py-2 focus:outline-none"
            placeholder="Type a message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyUp={handleSendMessage}
          />
          <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary left-4">
            <EmojiIcon w={20} h={20} fill={"currentcolor"} />
          </button>
          {/* <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-32">
            <CamerIcon w={20} h={20} fill={"currentcolor"} />
          </button> */}
          {/* <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-24">
            <MicIcon w={20} h={20} fill={"currentcolor"} />
          </button> */}
          <button
            className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-16"
            onClick={() => setIsFileMessageModalOpen(true)}
          >
            <ImageIcon w={20} h={20} fill={"currentcolor"} />
          </button>
          {/* <button className="absolute top-1/2 -translate-y-1/2 text-white right-0 bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] py-[8px] px-[10px] pr-[15px] rounded-r-full">
            <GenAiIcon w={20} h={20} fill={"currentcolor"} />
          </button> */}
          <button className="absolute top-1/2 -translate-y-1/2 text-white right-0 py-[8px] px-[10px] pr-[15px] rounded-r-full">
            {
              loadings?.sendMsg ?
                <ThreeDots
                  visible={true}
                  height="25"
                  width="25"
                  color="#1E71F2"
                  radius="9"
                />
                :
                <div onClick={checkValidation}>
                  <SendIcon w={24} h={24} fill={messageInput !== '' ? "#1E71F2" : "#E3E3E3"} />
                </div>
            }
          </button>
        </div>
      </div>
      {
        isFileMessageModalOpen &&
        <Modal isOpen={isFileMessageModalOpen} setIsOpen={setIsFileMessageModalOpen} className="w-full font-sans max-w-xl md:max-w-2xl lg:max-w-3xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all">
          <SelectPicture />
        </Modal>
      }
    </div>
  )
}
