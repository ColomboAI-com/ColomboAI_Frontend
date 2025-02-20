import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import {
  CreateIcon,
  CreateMagicPenIcon,
  CreatePostIcon,
  CreateStoryIcon,
  CreateThoughtIcon,
  CreateVibeIcon,
} from "../Icons";
import { GlobalContext } from "@/context/GlobalContext";
import Modal from "./Modal";
import UploadStoryModal from "../story/UploadStoryModal";
import VerificationPopup from "./VerificationPopup";
import { UserProfileContext } from "@/context/UserProfileContext";

export default function CreateDropdown({ w, h, filyl, icon }) {
  const { setIsCreatePostOpen } = useContext(GlobalContext);
  const { setIsCreateVibeOpen } = useContext(GlobalContext);
  const { isCreateVibeOpen } = useContext(GlobalContext);

  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);

  // Set Magic pen to open in global context
  const { setOpenMagicPenWithIcon } = useContext(GlobalContext);

  // Check Screen Size
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [userNotVerifiedModal, setUserNotVerifiedModal] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  // const { userDetails } = useContext(UserProfileContext);

  const handleOpen = (postType) => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }
    if (postType == "post") setIsCreatePostOpen(true);
    if (postType == "story") setIsCreateStoryOpen(true);
    if (postType == "vibe") setIsCreateVibeOpen(true);
    if (postType == "magicP") {
      setIsCreatePostOpen(true);
      setOpenMagicPenWithIcon(true);
    }
  };

  const updateUserVerifiedInfo = async () => {
    let userVerified = await localStorage.getItem("userVerified");
    let boolValue;

    if (typeof userVerified === "string") {
      boolValue = userVerified === "true";
    } else if (typeof userVerified === "boolean") {
      boolValue = userVerified;
    } else {
      boolValue = false;
    }

    setIsUserVerified(boolValue);
  };

  useEffect(() => {
    // Directly check the screen size on initial load
    // console.log(userDetails);
    updateUserVerifiedInfo();
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 767) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Check the screen size when the component mounts
    checkScreenSize();

    // Optionally, you can add a resize listener if you want the component to adapt dynamically:
    window.addEventListener("resize", checkScreenSize);

    //  Cleanup the resize listener on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      {userNotVerifiedModal && (
        <Modal
          isOpen={userNotVerifiedModal}
          setIsOpen={setUserNotVerifiedModal}
          className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
        >
          <VerificationPopup setIsOpen={setUserNotVerifiedModal} />
        </Modal>
      )}

      <Menu
        as="div"
        className="relative inline-block text-left z-50 sm:pt-3 md:pt-0"
      >
        {({ open }) => (
          <>
            <div className="flex items-center justify-center">
              <Menu.Button>
                {/* Optiouns
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              /> */}
                {icon ? (
                  icon
                ) : (
                  <CreateIcon
                    w={30}
                    h={30}
                    fill={open ? "#1E71F2" : "#646464"}
                  />
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                style={{
                  left: isSmallScreen ? "0" : "auto",
                  right: "0", // Always align to the right
                }}
                className="absolute right-0 max-w-[767px]:left-0 mt-2 w-[340px] origin-top-right divide-y divide-brandprimary rounded-lg border-[1px] border-brandprimary bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleOpen("post")}
                        className={`${
                          active
                            ? "bg-brandprimary text-white"
                            : "text-brandprimary"
                        } group flex w-full items-center justify-between rounded-t-md p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Post
                        <CreatePostIcon
                          w={25}
                          h={25}
                          fill={active ? "#fff" : "#1E71F2"}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleOpen("story")}
                        className={`${
                          active
                            ? "bg-brandprimary text-white"
                            : "text-brandprimary"
                        } group flex w-full items-center justify-between p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Story
                        <CreateStoryIcon
                          w={25}
                          h={25}
                          fill={active ? "#fff" : "#1E71F2"}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          handleOpen("vibe");
                        }}
                        className={`${
                          active
                            ? "bg-brandprimary text-white"
                            : "text-brandprimary"
                        } group flex w-full items-center justify-between p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Vibe
                        <CreateVibeIcon
                          w={25}
                          h={25}
                          fill={active ? "#fff" : "#1E71F2"}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleOpen("post")}
                        className={`${
                          active
                            ? "bg-brandprimary text-white"
                            : "text-brandprimary"
                        } group flex w-full items-center justify-between p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Thought
                        <CreateThoughtIcon
                          w={25}
                          h={25}
                          fill={active ? "#fff" : "#1E71F2"}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          handleOpen("magicP");
                        }}
                        className={`${
                          active
                            ? "bg-brandprimary text-white"
                            : "text-brandprimary"
                        } group flex w-full items-center justify-between rounded-b-md p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        <p>
                          Magic Pen{" "}
                          <span className="text-xs">(Generative AI)</span>
                        </p>
                        <CreateMagicPenIcon
                          w={25}
                          h={25}
                          fill1={active ? "#fff" : "#FF0049"}
                          fill2={active ? "#fff" : "#FFBE3B"}
                          fill3={active ? "#fff" : "#00BB5C"}
                          fill4={active ? "#fff" : "#187DC4"}
                          fill5={active ? "#fff" : "#58268B"}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>

            {isCreateStoryOpen && (
              <Modal
                isOpen={isCreateStoryOpen}
                setIsOpen={setIsCreateStoryOpen}
                className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
              >
                <UploadStoryModal setIsCreateStoryOpen={setIsCreateStoryOpen} />
              </Modal>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
