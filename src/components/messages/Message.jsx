import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "@/utlils/cookies";
import React, { useEffect, useRef, useState } from "react";

const Message = ({ message }) => {
  const messageRef = useRef();

  const { editMessage } = useMessages();
  const [isEditing, setIsEditing] = useState(false);
  const [editMessageValue, setEditMessageValue] = useState(message.content);

  let userId = getCookie("userid");

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const toggelEdit = () => {
    setIsEditing((prev) => !prev);
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

  return (
    <div
      ref={messageRef}
      className={`flex items-start gap-3 ${userId === message.sender ? "justify-end" : ""}`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {message.content && (
            <React.Fragment>
              {!isEditing ? (
                <div
                  className={`rounded-full bg-[#E3E3E3] p-4 py-2 
              ${
                message.sender === userId ? "!bg-brandprimary text-white rounded-tr-none" : "rounded-tl-none"
              }`}
                >
                  {message.content}
                </div>
              ) : (
                <React.Fragment>
                  <textarea
                    className="rounded-full  p-4 py-2 !bg-brandprimary text-white rounded-tr-none"
                    value={editMessageValue}
                    onChange={(e) => handleEditMessage(e.target.value)}
                  ></textarea>
                  <br />

                  <button type="button" onClick={handleSubmitEditMessage} className="bg-green-400">
                    Submit Edit message
                  </button>
                  <br />
                </React.Fragment>
              )}
              {message.sender === userId && (
                <button onClick={toggelEdit} type="button" className="bg-blue-400 btn">
                  Edit
                </button>
              )}
            </React.Fragment>
          )}
          {message.messageType === "IMAGE" && (
            <div
              className={`rounded-2xl bg-[#E3E3E3] p-2 py-2 w-[40%] 
              ${
                message.sender === userId ? "!bg-brandprimary text-white rounded-tr-none" : "rounded-tl-none"
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
            // <div
            //   className={`rounded-2xl bg-[#E3E3E3] p-2 py-2
            //   ${message.sender === userId ? "!bg-brandprimary text-white rounded-tr-none" : "rounded-tl-none"}
            //   `}
            // >
            <div className={`rounded-2xl bg-[#E3E3E3] p-2 py-2`}>
              <video src={message.media} className="aspect-video object-cover rounded-2xl" controls>
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
