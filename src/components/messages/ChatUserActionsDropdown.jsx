import React, { useContext } from 'react'
import Dropdown from './Dropdown'
import { HiDotsHorizontal } from 'react-icons/hi'
import { BlockIcon, MuteIcon, TrashIcon, UserProfileIcon } from '../Icons'
import { GlobalContext } from '@/context/GlobalContext'

export default function ChatUserActionsDropdown() {

  const { setIsUserProfileOpen } = useContext(GlobalContext)

  return (
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
  )
}
