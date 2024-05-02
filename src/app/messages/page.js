/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  BlockIcon,
  CamerIcon,
  EmojiIcon,
  GenAiIcon,
  ImageIcon,
  MicIcon,
  MuteIcon,
  TrashIcon,
  UserProfileIcon,
} from "../../components/Icons";

import { GlobalContext } from "@/context/GlobalContext";
import UserProfileSection from "@/components/messages/UserProfileSection";
import Dropdown from "@/components/messages/Dropdown";

const contactList = [
  {
    userId: 1,
    name: "Nia Hillyer",
    path: "profile-16.jpeg",
    pending: 9,
    time: "2m",
    preview: "How do you do?",
    messages: [
      {
        fromUserId: 0,
        toUserId: 1,
        text: "Hi, I am back from vacation",
      },
      {
        fromUserId: 0,
        toUserId: 1,
        text: "How are you?",
      },
      {
        fromUserId: 1,
        toUserId: 0,
        text: "Welcom Back",
      },
      {
        fromUserId: 1,
        toUserId: 0,
        text: "I am all well",
      },
      {
        fromUserId: 0,
        toUserId: 1,
        text: "Coffee?",
      },
      {
        fromUserId: 0,
        toUserId: 1,
        image: "home/feed-banner-img.png",
      },
    ],
    active: true,
  },
  {
    userId: 2,
    name: "Sean Freeman",
    path: "profile-1.jpeg",
    pending: 0,
    time: "16h",
    preview: "I was wondering...",
    messages: [
      {
        fromUserId: 0,
        toUserId: 2,
        text: "Hello",
      },
      {
        fromUserId: 0,
        toUserId: 2,
        text: "It's me",
      },
      {
        fromUserId: 0,
        toUserId: 2,
        text: "I have a question regarding project.",
      },
    ],
    active: false,
  },
  {
    userId: 3,
    name: "Alma Clarke",
    path: "profile-2.jpeg",
    pending: 9,
    time: "2m",
    preview: "I’ve forgotten how it felt before",
    messages: [
      {
        fromUserId: 0,
        toUserId: 3,
        text: "Hey Buddy.",
      },
      {
        fromUserId: 0,
        toUserId: 3,
        text: "What's up",
      },
      {
        fromUserId: 3,
        toUserId: 0,
        text: "I am sick",
      },
      {
        fromUserId: 0,
        toUserId: 3,
        text: "Not comming to office today.",
      },
    ],
    active: true,
  },
  {
    userId: 4,
    name: "Alan Green",
    path: "profile-3.jpeg",
    pending: 0,
    time: "16h",
    preview: "But we’re probably gonna need a new carpet.",
    messages: [
      {
        fromUserId: 0,
        toUserId: 4,
        text: "Hi, collect your check",
      },
      {
        fromUserId: 4,
        toUserId: 0,
        text: "Ok, I will be there in 10 mins",
      },
    ],
    active: true,
  },
  {
    userId: 5,
    name: "Shaun Park",
    path: "profile-4.jpeg",
    pending: 9,
    time: "2m",
    preview: "It’s not that bad...",
    messages: [
      {
        fromUserId: 0,
        toUserId: 3,
        text: "Hi, I am back from vacation",
      },
      {
        fromUserId: 0,
        toUserId: 3,
        text: "How are you?",
      },
      {
        fromUserId: 0,
        toUserId: 5,
        text: "Welcom Back",
      },
      {
        fromUserId: 0,
        toUserId: 5,
        text: "I am all well",
      },
      {
        fromUserId: 5,
        toUserId: 0,
        text: "Coffee?",
      },
    ],
    active: false,
  },
  {
    userId: 6,
    name: "Roxanne",
    path: "profile-5.jpeg",
    pending: 9,
    time: "2m",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [
      {
        fromUserId: 0,
        toUserId: 6,
        text: "Hi",
      },
      {
        fromUserId: 0,
        toUserId: 6,
        text: "Uploaded files to server.",
      },
    ],
    active: false,
  },
  {
    userId: 7,
    name: "Ernest Reeves",
    path: "profile-6.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 8,
    name: "Laurie Fox",
    path: "profile-7.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 9,
    name: "Xavier",
    path: "profile-8.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: false,
  },
  {
    userId: 10,
    name: "Susan Phillips",
    path: "profile-9.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 11,
    name: "Dale Butler",
    path: "profile-10.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: false,
  },
  {
    userId: 12,
    name: "Grace Roberts",
    path: "user-profile.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 13,
    name: "Grace Roberts",
    path: "user-profile.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 14,
    name: "Grace Roberts",
    path: "user-profile.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 15,
    name: "Grace Roberts",
    path: "user-profile.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
  {
    userId: 16,
    name: "Grace Roberts",
    path: "user-profile.jpeg",
    pending: 0,
    time: "16h",
    preview: "Wasup for the third time like is you bling bitch",
    messages: [],
    active: true,
  },
];

const loginUser = {
  id: 0,
  name: "Alon Smith",
  path: "profile-34.jpeg",
  designation: "Software Developer",
};

const ComponentsAppsChat = () => {
  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const [isShowUserChat, setIsShowUserChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const [chatConversation, setChatConversation] = useState(contactList);

  const scrollToBottom = () => {
    if (isShowUserChat) {
      setTimeout(() => {
        const element = document.querySelector(".chat-conversation-box");
        element.behavior = "smooth";
        element.scrollTop = element.scrollHeight;
      });
    }
  };
  const selectUser = (user) => {
    setSelectedUser(user);
    setIsShowUserChat(true);
    scrollToBottom();
    setIsShowChatMenu(false);
    setIsUserProfileOpen(false);
  };
  const sendMessage = () => {
    if (textMessage.trim()) {
      let list = contactList;
      let user = list.find((d) => d.userId === selectedUser.userId);
      user.messages.push({
        fromUserId: selectedUser.userId,
        toUserId: 0,
        text: textMessage,
        time: "Just now",
      });
      setChatConversation(list);
      setTextMessage("");
      scrollToBottom();
    }
  };
  const sendMessageHandle = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const {
    isUserProfileOpen,
    setIsUserProfileOpen,
    setIsSelectPictureMessageOpen,
  } = useContext(GlobalContext);

  return (
    <div className="font-sans">
      {/* Chat list and Chat window */}
      <div
        className={`relative flex h-[calc(100vh_-_155px)] md:h-[calc(100vh_-_140px)] sm:min-h-0 max-h-[calc(100vh_-_240px)] md:max-h-[calc(100vh_-_140px)] ${
          isShowChatMenu ? "min-h-[999px]" : ""
        }`}
      >
        <div
          className={`bg-white shadow absolute z-10 border-r-[1px] border-brandprimary hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden p-1 lg:relative lg:block ${
            isShowChatMenu ? "!block" : ""
          }`}
        >
          {/* Chat list */}
          <div className="Chat-list">
            <div className="chat-users border- border-purple-400 overflow-y-auto no-scrollbar relative h-full min-h-[100px] mx-2 max-h-[calc(100vh_-_190px)] md:max-h-[calc(100vh_-_145px)]">
              {chatConversation.map((person) => {
                return (
                  <div key={person.userId}>
                    <button
                      className={`flex w-full items-center border-b-2 justify-between p-2 hover:bg-gray-100 hover:text-brandprimary ${
                        selectedUser && selectedUser.userId === person.userId
                          ? "bg-brandprimary/20 text-brandprimary"
                          : ""
                      }`}
                      onClick={() => selectUser(person)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="relative flex-shrink-0">
                            <img
                              src={`/images/profile2/${person.path}`}
                              className="h-12 w-12 rounded-full object-cover"
                              alt=""
                            />
                            {person.active && (
                              <div>
                                <div className="absolute bottom-0 right-0">
                                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mx-3 text-left">
                            <p className="mb-1 font-semibold">{person.name}</p>
                            <p className="max-w-[160px] truncate text-xs text-gray-500">
                              {person.preview}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {person.pending > 0 && (
                          <div className=" bg-red-400 min-w-[25px] p-1 mb-1 rounded-full text-white text-xs font-semibold">
                            <p>{person.pending}</p>
                          </div>
                        )}
                        <div className="whitespace-nowrap text-gray-500 text-xs font-extralight">
                          <p>{person.time}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`absolute z-[5] hidden h-full w-full bg-black/60 ${
            isShowChatMenu ? "!block xl:!hidden" : ""
          }`}
          onClick={() => setIsShowChatMenu(!isShowChatMenu)}
        ></div>

        <div className="Chat-window bg-white shadow flex-1 p-0">
          {/* Blank Chat window */}
          {!isShowUserChat && (
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
          )}

          {/* Chat window or User Profile Section */}
          {isShowUserChat && selectedUser && !isUserProfileOpen ? (
            <div className="relative h-full">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="hover:text-brandprimary xl:hidden"
                    onClick={() => setIsShowChatMenu(!isShowChatMenu)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  <div className="relative flex-none">
                    <img
                      src={`/images/profile2/${selectedUser.path}`}
                      className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                      alt=""
                    />
                    <div className="absolute bottom-0 right-0">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="mx-3">
                    <p className="font-semibold">{selectedUser.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedUser.active
                        ? "Active now"
                        : "Last seen at " + selectedUser.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-5">
                  <div className="relative">
                    <Dropdown
                      placement={"bottom-end"}
                      btnClassName="bg-[#f4f4f4] hover:bg-brandprimary/30 w-8 h-8 rounded-full !flex justify-center items-center"
                      button={
                        <HiDotsHorizontal className=" flex rotate-90 opacity-70 hover:text-brandprimary" />
                      }
                    >
                      <ul className="my-1 min-w-[200px] px-2 rounded-lg bg-white p-0 py-2 text-gray-600 shadow-[6px_6px_6px_6px_#0000001A] ">
                        <li>
                          <button
                            onClick={() => setIsUserProfileOpen(true)}
                            className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:bg-brandprimary/10 hover:text-brandprimary"
                          >
                            <UserProfileIcon
                              w={20}
                              h={20}
                              fill={"currentcolor"}
                            />
                            View Profile
                          </button>
                        </li>
                        <li>
                          <button className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:bg-brandprimary/10 hover:text-brandprimary">
                            <MuteIcon w={20} h={20} fill={"currentcolor"} />
                            Mute
                          </button>
                        </li>
                        <li>
                          <button className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:bg-brandprimary/10 hover:text-brandprimary">
                            <BlockIcon w={20} h={20} fill={"currentcolor"} />
                            Block
                          </button>
                        </li>
                        <li>
                          <button className="flex w-full items-center px-4 py-2 gap-5 hover:bg-brandprimary/10 hover:text-brandprimary">
                            <TrashIcon w={20} h={20} fill={"currentcolor"} />
                            Clear Chat
                          </button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="h-px w-full border-b border-white-light"></div>

              {/* Message window */}
              <div className="chat-conversation-box border- border-red-400 relative h-full max-h-[calc(100vh_-_325px)] md:max-h-[calc(100vh_-_280px)] overflow-y-auto no-scrollbar">
                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                  {selectedUser.messages && selectedUser.messages.length ? (
                    <>
                      <div className="m-6 mt-0 block">
                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs">
                          <span className="relative top-2 bg-white px-3">
                            {"Today"}
                          </span>
                        </h4>
                      </div>
                      {selectedUser.messages.map((message, index) => {
                        return (
                          <div key={index}>
                            <div
                              className={`flex items-start gap-3 ${
                                selectedUser.userId === message.fromUserId
                                  ? "justify-end"
                                  : ""
                              }`}
                            >
                              {/* Users image in conversation */}
                              
                              {/* <div className={`flex-none ${selectedUser.userId === message.fromUserId ? 'order-2' : ''}`}>
                                    {selectedUser.userId === message.fromUserId ? (
                                        <img src={`/images/profile2/${loginUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                    ) : (
                                        ''
                                    )}
                                    {selectedUser.userId !== message.fromUserId ? (
                                        <img src={`/images/profile2/${selectedUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                    ) : (
                                        ''
                                    )}
                                  </div> */}

                              {/* Conversation Messages */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  {message.text && (
                                    <div
                                      className={`rounded-full bg-[#E3E3E3] p-4 py-2 ${
                                        message.fromUserId ===
                                        selectedUser.userId
                                          ? "!bg-brandprimary text-white rounded-tr-none"
                                          : "rounded-tl-none"
                                      }`}
                                    >
                                      {message.text}
                                    </div>
                                  )}
                                  {message.image && (
                                    <div
                                      className={`rounded-2xl bg-[#E3E3E3] p-2 py-2 w-[40%] ${
                                        message.fromUserId ===
                                        selectedUser.userId
                                          ? "!bg-brandprimary text-white rounded-tr-none"
                                          : "rounded-tl-none"
                                      }`}
                                    >
                                      <img
                                        src={`/images/${message.image}`}
                                        className=" aspect-video object-cover rounded-2xl"
                                        alt=""
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className=" flex justify-center items-center -m-4 min-h-[calc(100vh_-_325px)] md:min-h-[calc(100vh_-_280px)] text-[#D1D1D1] text-xl text-center ">
                      Kickstart your conversation with <br /> Magic Pen!
                    </div>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="absolut bottom-0 left-0 w-full px-4 pt-4">
                <div className="w-full items-center space-x-3 sm:flex">
                  <div className="relative flex-1">
                    <input
                      className="w-full text-sm font-semibold text-black !outline-none border-[1px] border-brandprimary focus:ring-transparent rounded-full px-12 py-2 focus:outline-none"
                      placeholder="Type a message"
                      value={textMessage}
                      onChange={(e) => setTextMessage(e.target.value)}
                      onKeyUp={sendMessageHandle}
                    />
                    <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary left-4">
                      <EmojiIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-32">
                      <CamerIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-24">
                      <MicIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button
                      className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-16"
                      onClick={() => setIsSelectPictureMessageOpen(true)}
                    >
                      <ImageIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 text-white right-0 bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] py-[8px] px-[10px] pr-[15px] rounded-r-full">
                      <GenAiIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : setIsUserProfileOpen ? (
            <UserProfileSection data={selectedUser} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsChat;
