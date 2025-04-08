/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from "@/context/GlobalContext";
import { CrossIcon, VerifiedIcon } from "../Icons";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import ProfilePicture from "../elements/ProfilePicture";
import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "cookies-next";
import { FeedContext } from "@/context/FeedContext";

const SearchUsersList = () => {
  const { isNewMessageOpen, setIsNewMessageOpen } = useContext(GlobalContext);
  const { searchUsers } = useContext(FeedContext);

  const { getFollowers, followersData, followingsData } = useContext(UserProfileContext);

  const { createConversation, DUMMY_TEXT, conversations } = useMessages();

  const [contactList, setContactList] = useState([]);

  let existingConversationUsers = new Set();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getFollowers("followers");
    getFollowers("followings");
  }, []);

  // useEffect(() => {
  //   const uniqueUserIds = new Set();

  //   let contact_list = [];
  //   for (let conv of conversations) {
  //     conv.participants.forEach((user) => {
  //       existingConversationUsers.add(user._id);
  //     });
  //   }

  //   if (followersData) {
  //     for (let user of followersData) {
  //       if (user._id && !uniqueUserIds.has(user._id) && !existingConversationUsers.has(user._id)) {
  //         uniqueUserIds.add(user._id);
  //         contact_list.push(user);
  //       }
  //     }
  //   }

  //   if (followingsData) {
  //     for (let user of followingsData) {
  //       if (user._id && !uniqueUserIds.has(user._id) && !existingConversationUsers.has(user._id)) {
  //         uniqueUserIds.add(user._id);
  //         contact_list.push(user);
  //       }
  //     }
  //   }

  //   setContactList(contact_list);
  // }, [followersData, followingsData, conversations]);

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

  const handleSearch = async (inputText) => {
    try {
      setSearchQuery(inputText);
      // if (inputText.length > 2) {
      let contact_list = [];
      const uniqueUserIds = new Set();
      const resp = await searchUsers(inputText);
      const userList = resp?.data?.results;
      if (!Array.isArray(userList)) return;

      for (let conversation of conversations) {
        conversation.participants.forEach((user) => {
          existingConversationUsers.add(user._id);
        });
      }

      for (let user of userList) {
        if (user._id && !uniqueUserIds.has(user._id) && !existingConversationUsers.has(user._id)) {
          uniqueUserIds.add(user._id);
          contact_list.push(user);
        }
      }

      setContactList(contact_list);
      // }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className=" max-h-[70dvh]">
      <div className=" flex justify-between px-8 py-6 border-b-2">
        <div></div>
        <p className="text-2xl">New Message</p>
        <button
          className="outline-none focus:ring-offset-0 focus:ring-0"
          onClick={() => setIsNewMessageOpen(false)}
        >
          <CrossIcon w={20} h={20} fill={"#646464"} />
        </button>
      </div>
      <div className=" max-h-[60dvh] border- overflow-y-auto no-scrollbar py-4 px-6 ">
        <div className="relative flex items-center w-full">
          <svg
            className="absolute ml-4 fill-brandprimary"
            width="24"
            height="24"
            viewBox="0 0 44 44"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.2878 3.6665C11.5559 3.6665 3.66669 11.3815 3.66669 20.8985C3.66669 30.4154 11.5559 38.1305 21.2878 38.1305C25.4501 38.1305 29.2754 36.7192 32.2905 34.3593L38.0179 39.9457L38.1703 40.074C38.7021 40.4588 39.456 40.415 39.9371 39.9432C40.4664 39.4243 40.4653 38.584 39.9346 38.0665L34.2745 32.5457C37.1524 29.4787 38.909 25.3892 38.909 20.8985C38.909 11.3815 31.0197 3.6665 21.2878 3.6665ZM21.2878 6.32069C29.5208 6.32069 36.1949 12.8474 36.1949 20.8985C36.1949 28.9496 29.5208 35.4763 21.2878 35.4763C13.0549 35.4763 6.38081 28.9496 6.38081 20.8985C6.38081 12.8474 13.0549 6.32069 21.2878 6.32069Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Profile"
            aria-label="Search Profile"
            className="pl-12 pr-4 py-2 w-full border-[1px] border-brandprimary rounded-[50px] text-[#ACACAC] text-[18px] tracking-[4px] font-sans focus:outline-none"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            // onFocus={handleFocus}
          />
        </div>
        {contactList.length ? (
          contactList.map((person) => {
            return (
              <div key={person._id}>
                <div
                  className={`flex w-full items-center border-b- justify-between p-2 hover:bg-gray-100 hover:text-brandprimary`}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <ProfilePicture
                          image={`${person.profile_picture}`}
                          className="h-12 w-12 rounded-full object-cover"
                        ></ProfilePicture>
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
                        <p className="max-w-[160px] truncate text-xs text-gray-500">{person.name}</p>
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
          <div className="text-center">
            {" "}
            <br />
            Search for people to chat with them
            {/* You do not follow any people. <br /> Follow users for them to show up here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsersList;
