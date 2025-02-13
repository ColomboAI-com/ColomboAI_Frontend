import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "@/utlils/cookies";
import React, { useEffect, useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

const Message = ({ message }) => {
  const messageRef = useRef();

  const { editMessage, deleteMessage, editingState, setEditingState } =
    useMessages();
  const [isEditing, setIsEditing] = useState(false);
  const [editMessageValue, setEditMessageValue] = useState(message.content);

  let userId = getCookie("userid");

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const toggelEdit = () => {
    setIsEditing((prev) => !prev);
    setEditingState({
      message_id: editingState?.message_id ? null : message?._id,
    });
    setEditMessageValue(message.content);
  };

  const handleEditMessage = (val) => {
    setEditMessageValue(val);
  };

  const handleSubmitEditMessage = () => {
    let data = {
      ...message,
      content: editMessageValue,
    };
    editMessage(data);
  };
  const [pressTimer, setPressTimer] = useState(null);

  const handlePressStart = () => {
    const timer = setTimeout(() => {
      alert("sd");
    }, 1000);
    setPressTimer(timer);
  };

  // Handle the press end
  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer); // Clear the timer if the press ends before the delay
      setPressTimer(null);
    }
  };

  return (
    <div
      ref={messageRef}
      className={`flex items-start gap-3 ${
        userId === message.sender ? "justify-end" : ""
      }`}
    >
      <div className="space-y-2">
        <div
          className={`flex items-center gap-3 ${
            userId === message.sender ? "justify-end" : ""
          }`}
        >
          {message.content && (
            <React.Fragment>
              {editingState?.message_id != message?._id ? (
                <div className="relative group">
                  <div
                    className={`rounded-full bg-[#E3E3E3] p-4 py-2 cursor-pointer 
                     ${
                       message?.isDeleted
                         ? "text-[gray] italic text-base"
                         : message.sender == userId
                         ? "!bg-brandprimary text-white rounded-tr-none"
                         : "rounded-tl-none"
                     }`}
                  >
                    {message.content}
                  </div>
                  {message?.edited ? (
                    <div className="flex justify-end">
                      <span className="text-[10px] mt-1 mr-2 text-gray-500">
                        Edited
                      </span>
                    </div>
                  ) : null}
                  {!message?.isDeleted &&
                    editingState?.message_id != message?._id &&
                    message.sender === userId && (
                      <div className="hidden group-hover:visible group-hover:flex items-center gap-3 absolute top-0 -left-[80px] bottom-2 bg-[#dedede] px-4 py-2 rounded-lg">
                        <button
                          onClick={() => deleteMessage(message)}
                          type="button"
                          className="text-sm"
                        >
                          <BsFillTrash3Fill />
                        </button>
                        <div className="mb-1 text-gray-400">|</div>
                        <button
                          onClick={toggelEdit}
                          type="button"
                          className="text-sm"
                        >
                          <MdModeEdit />
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <textarea
                    className="rounded px-2 py-2 border border-px border-brandprimary md:w-[300px] w-[250px]"
                    value={editMessageValue}
                    onChange={(e) => handleEditMessage(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      type="button"
                      onClick={toggelEdit}
                      className="bg-[#dedede] px-3 py-2 rounded-full text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitEditMessage}
                      className="bg-brandprimary text-white px-3 py-2 rounded-full text-sm"
                    >
                      Submit
                    </button>
                  </div>
                  <br />
                </div>
              )}
            </React.Fragment>
          )}
          {message.messageType === "IMAGE" && (
            <div
              className={`rounded-2xl bg-[#E3E3E3] p-2 py-2 w-[40%] 
              ${
                message.sender === userId
                  ? "!bg-brandprimary text-white rounded-tr-none self-end"
                  : "rounded-tl-none"
              }`}
            >
              <img
                src={message.media}
                className=" aspect-video object-cover rounded-2xl"
                alt={"Broken Image :("}
              />
            </div>
          )}
          {message.messageType === "VIDEO" && (
            <div
              className={`rounded-2xl bg-[#E3E3E3] p-2 py-2 ${
                message.sender === userId
                  ? "!bg-brandprimary text-white rounded-tr-none self-end w-[40%]"
                  : "rounded-tl-none"
              }`}
            >
              <video
                src={message.media}
                className="aspect-video object-cover rounded-2xl"
                controls
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
