import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { CreateIcon, CreateMagicPenIcon, CreatePostIcon, CreateStoryIcon, CreateThoughtIcon, CreateVibeIcon } from '../Icons';
import { GlobalContext } from '@/context/GlobalContext';
import Modal from "./Modal";
import UploadStoryModal from '../story/UploadStoryModal';

export default function CreateDropdown({ w, h, fill }) {

  const { setIsCreatePostOpen } = useContext(GlobalContext);

  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);

  const handleOpen = (e) => {
    setIsCreateStoryOpen(!isCreateStoryOpen)
  }

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left z-50">
        {({ open }) => (
          <>
            <div>
              <Menu.Button >
                {/* Optiouns
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              /> */}
                <CreateIcon w={30} h={30} fill={open ? '#1E71F2' : '#646464'} />
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
              <Menu.Items className="absolute right-0 mt-2 w-[340px] origin-top-right divide-y divide-brandprimary rounded-lg border-[1px] border-brandprimary bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsCreatePostOpen(true)}
                        className={`${active ? 'bg-brandprimary text-white' : 'text-brandprimary'
                          } group flex w-full items-center justify-between rounded-t-md p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Post
                        <CreatePostIcon w={25} h={25} fill={active ? '#fff' : '#1E71F2'} />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsCreateStoryOpen(true)}
                        className={`${active ? 'bg-brandprimary text-white' : 'text-brandprimary'
                          } group flex w-full items-center justify-between p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Story
                        <CreateStoryIcon w={25} h={25} fill={active ? '#fff' : '#1E71F2'} />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-brandprimary text-white' : 'text-brandprimary'
                          } group flex w-full items-center justify-between p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Vibe
                        <CreateVibeIcon w={25} h={25} fill={active ? '#fff' : '#1E71F2'} />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsCreatePostOpen(true)}
                        className={`${active ? 'bg-brandprimary text-white' : 'text-brandprimary'
                          } group flex w-full items-center justify-between p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        Thought
                        <CreateThoughtIcon w={25} h={25} fill={active ? '#fff' : '#1E71F2'} />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsCreatePostOpen(true)}
                        className={`${active ? 'bg-brandprimary text-white' : 'text-brandprimary'
                          } group flex w-full items-center justify-between rounded-b-md p-3 text-lg text-[21px] font-sans font-[500]`}
                      >
                        <p>Magic Pen <span className='text-xs'>(Generative AI)</span></p>
                        <CreateMagicPenIcon w={25} h={25}
                          fill1={active ? '#fff' : '#FF0049'}
                          fill2={active ? '#fff' : '#FFBE3B'}
                          fill3={active ? '#fff' : '#00BB5C'}
                          fill4={active ? '#fff' : '#187DC4'}
                          fill5={active ? '#fff' : '#58268B'}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>

            {
              isCreateStoryOpen &&
              <Modal isOpen={isCreateStoryOpen} setIsOpen={setIsCreateStoryOpen} className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all">
                <UploadStoryModal setIsCreateStoryOpen={setIsCreateStoryOpen} />
              </Modal>
            }
          </>
        )}

      </Menu>
    </div>
  )
}