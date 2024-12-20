import { getCookie } from "@/utlils/cookies";
import React, { useEffect, useRef } from "react";

const Message = ({ message }) => {
  const messageRef = useRef();

  let userId = getCookie("userid");

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={messageRef}
      className={`flex items-start gap-3 ${userId === message.sender ? "justify-end" : ""}`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {message.content && (
            <div
              className={`rounded-full bg-[#E3E3E3] p-4 py-2 
              ${
                message.sender === userId ? "!bg-brandprimary text-white rounded-tr-none" : "rounded-tl-none"
              }`}
            >
              {message.content}
            </div>
          )}
          {message.img && (
            <div
              className={`rounded-2xl bg-[#E3E3E3] p-2 py-2 w-[40%] 
              ${
                message.sender === userId ? "!bg-brandprimary text-white rounded-tr-none" : "rounded-tl-none"
              }`}
            >
              <img src={message.img} className=" aspect-video object-cover rounded-2xl" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
