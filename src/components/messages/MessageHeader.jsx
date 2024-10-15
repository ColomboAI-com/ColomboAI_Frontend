import { useState, useContext } from "react";
import Link from "next/link";
import { ChatBubbleIcon, NewChatIcon, NotificationIcon, SearchIcon } from "../Icons";
import CreateDropdown from "../elements/CreateDropdown";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/context/GlobalContext";
//import SearchAll from './searchall'; // Import your SearchAll component

const MessageHeader = () => {
  const { setIsNewMessageOpen } = useContext(GlobalContext);
  const pathname = usePathname();
  const [showSearchPage, setShowSearchPage] = useState(false); // State to toggle SearchAll visibility

  const handleSearchClick = () => {
    setShowSearchPage(true); // Show the SearchAll component when SearchIcon is clicked
  };

  return (
    <div className=" border-y-[2px] py-[14px] z-50 bg-white ">
      <div className="hidde flex items-center justify-between mx-2 lg:mx-4">
        <div className="flex w-[30%] md:w-[305px] justify-between">
          <p className='hidden lg:block text-2xl font-semibold'>Messages</p>
          <button onClick={() => setIsNewMessageOpen(true)} className="text-[#646464] hover:text-brandprimary">
            <NewChatIcon w={31} h={31} fill={'currentcolor'} />
          </button>
        </div>
        <div className="flex gap-2 lg:gap-4 xl:gap-6 mr-4 justify-evenly items-baseline">
          <button className="text-[#646464] hover:text-brandprimary" onClick={handleSearchClick}>
            <SearchIcon w={30} h={30} fill={'currentcolor'} />
          </button>
          <div className="text-[#646464] hover:text-brandprimary">
            <CreateDropdown w={30} h={30} fill={'currentcolor'} />
          </div>
          <button className="text-[#646464] hover:text-brandprimary">
            <NotificationIcon w={30} h={30} fill={'currentcolor'} />
          </button>
          <button className={`text-[#646464] hover:text-brandprimary ${pathname.includes('/messages') && 'text-brandprimary'}`}>
            <Link href="/messages">
              <ChatBubbleIcon w={30} h={30} fill={'currentcolor'} />
            </Link>
          </button>
        </div>
      </div>

      {/* Conditionally render the SearchAll component based on the showSearchPage state */}
      {showSearchPage && (
        <div className="mt-4">
          {
            //<SearchAll />
          }
        </div>
      )}
    </div>
  );
};

export default MessageHeader;
