/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from "@/context/GlobalContext";
import { CrossIcon, VerifiedIcon } from "../Icons";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import ProfilePicture from "../elements/ProfilePicture";
import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "cookies-next";

const SearchUsersList = () => {
  const { isNewMessageOpen, setIsNewMessageOpen } = useContext(GlobalContext);

  const { getFollowers, followersData, followingsData } =
    useContext(UserProfileContext);

  const { createConversation, DUMMY_TEXT } = useMessages();

  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    getFollowers("followers");
    getFollowers("followings");
  }, []);

  useEffect(() => {
    const uniqueUserIds = new Set();

    let contact_list = [];

    if (followersData) {
      for (let user of followersData) {
        if (user._id && !uniqueUserIds.has(user._id)) {
          uniqueUserIds.add(user._id);
          contact_list.push(user);
        }
      }
    }

    if (followingsData) {
      for (let user of followingsData) {
        if (user._id && !uniqueUserIds.has(user._id)) {
          uniqueUserIds.add(user._id);
          contact_list.push(user);
        }
      }
    }

    setContactList(contact_list);
  }, [followersData, followingsData]);

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

  return (
    <div className=" max-h-[70vh]">
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
      <div className=" max-h-[60vh] border- overflow-y-auto no-scrollbar py-4 px-6 ">
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
          <div className="text-center">
            {" "}
            You do not follow any people. <br /> Follow users for them to show
            up here
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsersList;
