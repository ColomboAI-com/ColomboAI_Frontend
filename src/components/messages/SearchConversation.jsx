/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from "@/context/GlobalContext";
import { CrossIcon } from "../Icons";
import { useContext, useMemo, useState } from "react";
import ProfilePicture from "../elements/ProfilePicture";
import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "cookies-next";

const SearchConversation = ({ setIsOpen }) => {
  const { setIsNewMessageOpen, setIsSearchUserOpen } =
    useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const { createConversation, DUMMY_TEXT, conversations } = useMessages();

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

  const fileteredData = useMemo(() => {
    if (!query) {
      return conversations;
    } else {
      return conversations?.filter(
        (conversation) =>
          conversation?.participants?.[0]?.user_name?.includes(query) ||
          conversation?.participants?.[0]?.name?.includes(query)
      );
    }
  }, [query]);

  return (
    <div className="max-h-[70vh]">
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
        {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
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
      <div className="max-h-[60vh] border- overflow-y-auto no-scrollbar py-4 px-6 min-h-[100px]">
        {fileteredData?.length === 0 && (
          <div className="flex font-sans items-center justify-center text-center h-full">
            No data found
          </div>
        )}
        {conversations?.length ? (
          fileteredData?.map((conversation) => {
            let user = conversation?.participants?.[0];
            return (
              <div key={user?._id}>
                <div
                  className={`flex w-full items-center border-b- justify-between p-2 hover:bg-gray-100 hover:text-brandprimary`}
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
                        <p className="font-semibold flex">
                          @{user?.user_name}
                          {/* {user.active && (
                          <span className="mx-1">
                            <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
                          </span>
                        )} */}
                        </p>
                        <p className="max-w-[160px] truncate text-xs text-gray-500">
                          {user?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="border-[1px] border-brandprimary text-brandprimary rounded-2xl px-6 py-1"
                    onClick={() => handleCreateConversation(user)}
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

export default SearchConversation;
