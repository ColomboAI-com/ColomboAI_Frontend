/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from "@/context/GlobalContext";
import { CrossIcon, VerifiedIcon } from "../Icons";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import ProfilePicture from "../elements/ProfilePicture";
import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "cookies-next";
import { FeedContext } from "@/context/FeedContext";

const SearchUsersListGeneral = () => {
  const { isNewMessageOpen, setIsNewMessageOpen, setIsSearchUserOpen } =
    useContext(GlobalContext);
  const { searchUsers, topUsers, topUsersDetails, searchUsersDetails } =
    useContext(FeedContext);

  const [query, setQuery] = useState("d");

  const { getFollowers, followersData, followingsData } =
    useContext(UserProfileContext);

  const { createConversation, DUMMY_TEXT, conversations } = useMessages();

  const [contactList, setContactList] = useState([]);

  let existingConversationUsers = new Set();

  useEffect(() => {
    getFollowers("followers");
    getFollowers("followings");
  }, []);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  useEffect(() => {
    const uniqueUserIds = new Set();

    let contact_list = [];
    for (let conv of conversations) {
      conv.participants.forEach((user) => {
        existingConversationUsers.add(user._id);
      });
    }

    if (followersData) {
      for (let user of followersData) {
        if (
          user._id &&
          !uniqueUserIds.has(user._id) &&
          !existingConversationUsers.has(user._id)
        ) {
          uniqueUserIds.add(user._id);
          contact_list.push(user);
        }
      }
    }

    if (followingsData) {
      for (let user of followingsData) {
        if (
          user._id &&
          !uniqueUserIds.has(user._id) &&
          !existingConversationUsers.has(user._id)
        ) {
          uniqueUserIds.add(user._id);
          contact_list.push(user);
        }
      }
    }

    setContactList(contact_list);
  }, [followersData, followingsData, conversations]);

  const handleCreateConversation = (user) => {
    let data = {
      participants: [getCookie("userid"), user._id],
      lastMessage: {
        img: "",
        seen: true,
        sender: getCookie("userid"),
        text: DUMMY_TEXT,
      },
    };
    createConversation(data);
    setIsNewMessageOpen(false);
  };

  console.log("searchUsers: ", searchUsersDetails);

  return (
    <div className=" max-h-[70dvh]">
      <div className=" flex justify-between px-8 py-6 border-b-2">
        <div></div>
        <p className="text-2xl">Search Users</p>
        <button
          className="outline-none focus:ring-offset-0 focus:ring-0"
          onClick={() => {
            setIsNewMessageOpen(false);
            setIsSearchUserOpen(false);
          }}
        >
          <CrossIcon w={20} h={20} fill={"#646464"} />
        </button>
      </div>
      <div className="relative mb-2 flex justify-center mt-4">
        {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
        <input
          type="text"
          placeholder="Search music and artists"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-[95%] self-center px-4 py-3 rounded-full text-black focus:outline-none border border-px border-brandprimary"
        />
      </div>
      <div className=" max-h-[60dvh] border- overflow-y-auto no-scrollbar py-4 px-6 ">
        {searchUsersDetails.length ? (
          searchUsersDetails.map((person) => {
            return (
              <div key={person._id}>
                <div
                  className={`flex w-full items-center border-b- justify-between p-2 hover:bg-gray-100 hover:text-brandprimary`}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <ProfilePicture
                          image={person.profile_picture}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="mx-3 text-left">
                        <p className="font-semibold flex">
                          @{person.user_name}
                          {/* {person.active && (
                          <span className="mx-1">
                            <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
                          </span>
                        )} */}
                        </p>
                        <p className="max-w-[160px] truncate text-xs text-gray-500">
                          {person.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="border-[1px] border-brandprimary text-brandprimary rounded-2xl px-6 py-1"
                    onClick={() => handleCreateConversation(person)}
                  >
                    Message
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SearchUsersListGeneral;
