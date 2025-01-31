import React, { useState } from "react";
import { EmojiIcon, ImageIcon, SendIcon } from "../Icons";
import { useMessages } from "@/context/MessagesContext";
import { ThreeDots } from "react-loader-spinner";
import Modal from "../elements/Modal";
import SelectPicture from "./SelectPicture";
import EmojiPicker from "../EmojiPicker";
import AIMessageGenerator from "./AIMessageGenerator";

export default function MessageInput() {
  const {
    messageInput,
    setMessageInput,
    messageFile,
    sendMessage,
    loadings,
    isFileMessageModalOpen,
    setIsFileMessageModalOpen,
    MESSAGE_MAX_LENGTH,
  } = useMessages();

  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [showAIPromptModal, setShowAIPromptModal] = useState(false);

  const checkValidation = () => {
    if (!messageInput.trim() && !messageFile) {
      return;
    }
    sendMessage();
  };

  const handleSendMessage = (event) => {
    // Trigger on "Shift + Enter"
    if (event.key === "Enter" && event.shiftKey) {
      checkValidation();
    }
  };

  const handleMessageInput = (message) => {
    if (message.length <= MESSAGE_MAX_LENGTH) {
      setMessageInput(message);
      setMaxLimitReached(false);
    } else {
      setMaxLimitReached(true);
    }
  };

  const onSelectEmoji = (e) => {
    const emoji = e.emoji;
    const textArea = document.querySelector("textarea");
    const cursorPosition = textArea.selectionStart;
    const text = textArea.value;
    const newText =
      text.slice(0, cursorPosition) + emoji + text.slice(cursorPosition);
    setMessageInput(newText);
    textArea.selectionStart = cursorPosition + emoji.length;
    textArea.selectionEnd = cursorPosition + emoji.length;
  };

  const toggleAIPrompt = () => {
    setShowAIPromptModal(true);
  };

  const handleUseAIMessage = (msg) => {
    setShowAIPromptModal(false);
    setMessageInput(msg);
  };

  return (
    <div className="absolute bottom-10 left-0 w-full">
      <div className="w-full flex items-center justify-center space-x-3">
        <div className="relative pl-4 lg:w-[80%] w-[90%] flex items-center border-[1px] border-brandprimary rounded-[30px]">
          <EmojiPicker onSelect={onSelectEmoji}>
            <button className="text-brandprimary">
              <EmojiIcon w={20} h={20} fill={"currentcolor"} />
            </button>
          </EmojiPicker>
          <textarea
            className="flex-1 text-sm font-semibold text-black mx-2 px-2 py-2 focus:outline-none resize-none max-w-[90%]"
            style={{
              height: "48px",
              maxHeight: "80px",
              overflow: "auto",
              // border: "1px solid",
            }}
            placeholder="Type a message"
            value={messageInput}
            onChange={(e) => {
              handleMessageInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight - 8}px`;
            }}
            onKeyUp={handleSendMessage}
          />
          {/* Emoji Icon Button */}
          {/* Image Icon Button */}
          <div className="flex items-center gap-4">
            <button
              className="text-brandprimary"
              onClick={() => setIsFileMessageModalOpen(true)}
            >
              <ImageIcon w={20} h={20} fill={"currentcolor"} />
            </button>
            {/* Send Button */}
            <button className="text-white py-[8px] rounded-r-full">
              {loadings?.sendMsg ? (
                <ThreeDots
                  visible={true}
                  height="25"
                  width="25"
                  color="#1E71F2"
                  radius="9"
                />
              ) : (
                <div onClick={checkValidation}>
                  <SendIcon
                    w={24}
                    h={24}
                    fill={messageInput !== "" ? "#1E71F2" : "#E3E3E3"}
                  />
                </div>
              )}
            </button>

            <button
              onClick={toggleAIPrompt}
              className="w-[53px] bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] h-full p-[3px] object-scale-down rounded-tr-[50px] rounded-bl-[0px] rounded-tl-[0px] rounded-br-[50px]"
            >
              <img src="/images/icons/Magic-pen.svg" />
            </button>
          </div>
        </div>
      </div>
      {maxLimitReached && (
        <div className="mt-2 text-sm text-red-600">
          Max Character limit for message reached
        </div>
      )}
      {isFileMessageModalOpen && (
        <Modal
          isOpen={isFileMessageModalOpen}
          setIsOpen={setIsFileMessageModalOpen}
          className="w-full font-sans max-w-xl md:max-w-2xl lg:max-w-3xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all"
        >
          <SelectPicture />
        </Modal>
      )}
      {showAIPromptModal && (
        <Modal
          isOpen={showAIPromptModal}
          setIsOpen={setShowAIPromptModal}
          className="w-full font-sans max-w-lg md:max-w-lg lg:max-w-lg transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all"
        >
          <AIMessageGenerator onConfirm={handleUseAIMessage} />
        </Modal>
      )}
    </div>

    // <div className="absolut bottom-0 left-0 w-full px-4 pt-4">
    //   <div className="w-full items-center space-x-3 sm:flex">
    //     <div className="relative flex-1">
    //       <textarea
    //         // className="w-full text-sm font-semibold text-black !outline-none border-[1px] border-brandprimary focus:ring-transparent rounded-full px-12 py-2 focus:outline-none"
    //         className="w-full text-sm font-semibold text-black !outline-none border-[1px] border-brandprimary focus:ring-transparent rounded-full px-4 py-2 focus:outline-none resize-none overflow-hidden"
    //         placeholder="Type a message"
    //         value={messageInput}
    //         onChange={(e) => {
    //           handleMessageInput(e.target.value);
    //           e.target.style.height = "auto"; // Reset height to calculate scrollHeight
    //           e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
    //         }}
    //         onKeyUp={handleSendMessage}
    //       />
    //       <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary left-4">
    //         <EmojiIcon w={20} h={20} fill={"currentcolor"} />
    //       </button>
    //       {/* <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-32">
    //         <CamerIcon w={20} h={20} fill={"currentcolor"} />
    //       </button> */}
    //       {/* <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-24">
    //         <MicIcon w={20} h={20} fill={"currentcolor"} />
    //       </button> */}
    //       <button
    //         className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-16"
    //         onClick={() => setIsFileMessageModalOpen(true)}
    //       >
    //         <ImageIcon w={20} h={20} fill={"currentcolor"} />
    //       </button>
    //       {/* <button className="absolute top-1/2 -translate-y-1/2 text-white right-0 bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] py-[8px] px-[10px] pr-[15px] rounded-r-full">
    //         <GenAiIcon w={20} h={20} fill={"currentcolor"} />
    //       </button> */}
    //       <button className="absolute top-1/2 -translate-y-1/2 text-white right-0 py-[8px] px-[10px] pr-[15px] rounded-r-full">
    //         {loadings?.sendMsg ? (
    //           <ThreeDots visible={true} height="25" width="25" color="#1E71F2" radius="9" />
    //         ) : (
    //           <div onClick={checkValidation}>
    //             <SendIcon w={24} h={24} fill={messageInput !== "" ? "#1E71F2" : "#E3E3E3"} />
    //           </div>
    //         )}
    //       </button>
    //     </div>
    //   </div>
    //   {maxLimitReached && (
    //     <div className="mt-2 text-sm text-red-600">Max Character limit for message reached</div>
    //   )}
    //   {isFileMessageModalOpen && (
    //     <Modal
    //       isOpen={isFileMessageModalOpen}
    //       setIsOpen={setIsFileMessageModalOpen}
    //       className="w-full font-sans max-w-xl md:max-w-2xl lg:max-w-3xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all"
    //     >
    //       <SelectPicture />
    //     </Modal>
    //   )}
    // </div>
  );
}
