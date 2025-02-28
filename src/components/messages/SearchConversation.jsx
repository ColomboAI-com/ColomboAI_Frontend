/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from "@/context/GlobalContext";
import { CrossIcon } from "../Icons";
import { useContext, useEffect, useMemo, useState } from "react";
import ProfilePicture from "../elements/ProfilePicture";
import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "cookies-next";

const SearchConversation = ({ setIsOpen }) => {
  const { setIsNewMessageOpen, setIsSearchUserOpen, setIsUserProfileOpen } =
    useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const {
    conversations,
    setSelectedChat,
    updateCurrentConversation,
    setIsShowChatMenu,
  } = useMessages();
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  const openConversation = (user) => {
    for (const conversation of conversations) {
      if (conversation.participants.length === 2) {
        for (const participant of conversation.participants) {
          if (participant._id === user._id) {
            setSelectedChat(user);
            updateCurrentConversation(conversation);
            setIsShowChatMenu(false);
            setIsUserProfileOpen(false);
            setIsSearchUserOpen(false);
            setIsOpen(false);
            return;
          }
        }
      }
    }
  };

  useEffect(() => {
    let userIdSet = new Set();
    let initData = [];
    for (const conversation of conversations) {
      for (const participant of conversation.participants) {
        if (
          participant._id !== getCookie("userid") &&
          !userIdSet.has(participant._id)
        ) {
          userIdSet.add(participant._id);
          initData.push(participant);
        }
      }
    }
    setInitialData(initData);

    return () => {
      setInitialData([]);
    };
  }, [conversations]);

  useEffect(() => {
    setFilteredData(initialData);
    return () => {
      setFilteredData([]);
    };
  }, [initialData]);

  useEffect(() => {
    if (!query) {
      setFilteredData(initialData);
      return;
    }

    let users = [];

    conversations?.forEach((conversation) => {
      if (
        conversation?.participants?.[0].user_name != getCookie("username") &&
        (conversation?.participants?.[0]?.user_name
          ?.toLowerCase()
          .includes(query.toLowerCase()) ||
          conversation?.participants?.[0]?.name
            ?.toLowerCase()
            .includes(query.toLowerCase()))
      ) {
        users.push(conversation?.participants?.[0]);
      } else if (
        conversation?.participants?.[1].user_name != getCookie("username") &&
        (conversation?.participants?.[1]?.user_name
          ?.toLowerCase()
          .includes(query.toLowerCase()) ||
          conversation?.participants?.[1]?.name
            ?.toLowerCase()
            .includes(query.toLowerCase()))
      )
        users.push(conversation?.participants?.[1]);
    });

    setFilteredData(users);
  }, [query]);

  return (
    <div className="max-h-[70dvh]">
      <div className=" flex justify-between px-8 py-6 border-b-2">
        <div></div>
        <p className="text-2xl font-sans">Search conversation</p>
        <button
          className="outline-none focus:ring-offset-0 focus:ring-0"
          onClick={() => {
            setIsNewMessageOpen(false);
            setIsSearchUserOpen(false);
            setIsOpen(false);
          }}
        >
          <CrossIcon w={20} h={20} fill={"#646464"} />
        </button>
      </div>
      <div className="relative mb-2 flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search conversation"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-[95%] self-center px-4 py-3 rounded-full text-black focus:outline-none border border-px border-brandprimary"
        />
      </div>
      <div className="max-h-[60dvh] border- overflow-y-auto no-scrollbar py-4 px-6 min-h-[100px]">
        {fileteredData?.length === 0 && (
          <div className="flex font-sans items-center justify-center text-center h-full">
            No data found
          </div>
        )}
        {conversations?.length ? (
          filteredData?.map((user) => (
            <div key={user?._id}>
              <div
                className={`flex w-full items-center border-b justify-between p-2 hover:bg-gray-100 hover:text-brandprimary`}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0">
                      <ProfilePicture
                        image={user?.profile_picture}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="mx-3 text-left">
                      <p className="font-semibold flex">@{user?.user_name}</p>
                      <p className="max-w-[160px] truncate text-xs text-gray-500">
                        {user?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="border-[1px] border-brandprimary text-brandprimary rounded-2xl px-6 py-1"
                  onClick={() => openConversation(user)}
                >
                  Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SearchConversation;
