"use client"
import Sidebar from "@/components/layouts/Sidebar"
import Navigation from "@/components/profile/Navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon } from "../../components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBar from "@/components/notifications/NotificationBar";
import Bottombar from "@/components/layouts/Bottombar";

import InputBar from "@/components/layouts/InputBar";


const GenSearch = ({ children }) => {
  const pathname = usePathname();

  const feedSections = ['/gen-search'];
  return (
    <div className="min-w-screen border- border-yellow-400">
      <div className="flex border- border-green-400">
        <div className="min-w-[10%] xl:min-w-[7%] max-h-[calc(100vh-0px)] fixed overflow-auto h-screen top-18 z-50 hidden md:block border-r-[1px] border-brandprimary ">
              <Sidebar />
        </div>
        <div className="xl:ml-[7%] lg:ml-[7%] w-full mx-auto sm:ml-0">
        <header className="sticky top-0 z-50 shadow-[0px_2px_4px_0px_#0000001A] bg-white">
        <div className="border-2 border-purple-50">
          <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[183px]" />
        </div>
      </header>
          <div className="w-full mx-auto">
            <div className="w-[100%] lg:w-[70%] px-5 lg:px-20 mx-auto">
              <InputBar />
            </div>
          </div> 
          <div className="flex">
            <div className="border-t-[1px] border-r-[1px] border-[#E3E3E3] w-full">
              <div className="xl:w-[812px] lg:w-[812px] mx-auto mt-[50px] sm:w-full sm:px-[15px]">
                <div>
                  <p className="text-[16px] font-sans text-[#ACACAC] text-center">Welcome to GenAI Search, your go-to tool for instant answers and web exploration! Simply type your question or topic of interest, and GenAI will provide you with accurate answers along with related links from the web. Whether you're seeking quick information or diving deeper into a topic, GenAI Search has you covered.</p>
                </div>
                <div className="xl:w-[642px] lg:w-[642px] mx-auto sm:w-full">
                  <div className="text-center mt-[50px]">
                    <Link href="#" className="text-[20px] font-sans text-[#1E71F2] font-[500] text-center block sm:break-all">http://withhanab2b.com%3Fgad_source%3D5</Link>
                    <p className="text-[18px] text-[#ACACAC] font-sans font-[500] leading-[22.77px] mt-[17px]">Only wholesalers can order. WITHHANA B2B is 100% Official K-pop wholesaler. We are Korea's No. 1 Hanteo Chart 100% Certified K-pop Wholesaler. 100% Certification. Lowest Price. 24/7 Response. Quick ...</p>
                  </div>  
                  <div className="mt-[61px] bg-gradient-to-b from-[#6237FF] via-[#6237FF] to-[#258EFF] px-[12px] py-[22px] rounded-[17px]">
                    <div className="flex items-center justify-between">
                      <h5 className="text-[16px] text-[#F7F7F7] font-sans font-[700]">What is a Video</h5>
                      <div className="flex items-center gap-[22px]">
                        <img src="/images/gen-search/share-icon.svg" />
                        <img src="/images/gen-search/copy-icon.svg" />
                      </div>
                    </div>
                    <p className="text-[14px] text-[#F7F7F7] font-sans leading-[17.71px] font-[500] mt-[12px]">A video is a series of still images that are played back in rapid succession to create the illusion of motion. These images are typically accompanied by sound and are stored in a digital format, such as MP4 or AVI. Videos can be recorded using a variety of devices, including cameras, smartphones, and webcams. They can be played back on a variety of devices, including televisions, computers, and mobile devices. Videos are used for a wide range of purposes, including entertainment, education, and communication. They can be used to share memories, tell stories, and convey information.</p>
                  </div>
                  <div className="pb-[50px]">
                    <p className="text-[14px] text-[#8B8B8B] font-sans font-[500] text-center my-[20px]">Related links:</p>
                    <div className="flex items-center gap-[12px] xl:flex-row lg;flex-row sm:flex-col">
                      <div className="bg-[#F7F7F7] border-[1px] border-[#ACACAC] px-[24px] py-[12px] rounded-[17px] sm:w-full">
                        <div>
                          <Link href="#" className="text-[13px] font-sans text-[#1E71F2] font-[500] text-center block">http://withhanab2b.com%3Fgad_source%3D5</Link>
                          <p className="text-[14px] text-[#ACACAC] font-sans font-[400] text-center mt-[10px]">What Is a​ Video? - Ultimate Marketing Dictionary</p>
                        </div>
                      </div>
                      <div className="bg-[#F7F7F7] border-[1px] border-[#ACACAC] px-[24px] py-[12px] rounded-[17px] sm:w-full">
                        <div>
                          <Link href="#" className="text-[13px] font-sans text-[#1E71F2] font-[500] text-center block">http://withhanab2b.com%3Fgad_source%3D5</Link>
                          <p className="text-[14px] text-[#ACACAC] font-sans font-[400] text-center mt-[10px]">What Is a​ Video? - Ultimate Marketing Dictionary</p>
                        </div>
                      </div>
                    </div>
                    <div className="xl:w-[330px] lg:w-[330px] mx-auto bg-[#F7F7F7] border-[1px] border-[#ACACAC] px-[24px] py-[12px] rounded-[17px] mt-[24px] sm:w-full">
                        <div>
                          <Link href="#" className="text-[13px] font-sans text-[#1E71F2] font-[500] text-center block">http://withhanab2b.com%3Fgad_source%3D5</Link>
                          <p className="text-[14px] text-[#ACACAC] font-sans font-[400] text-center mt-[10px]">What Is a​ Video? - Ultimate Marketing Dictionary</p>
                        </div>
                      </div>
                  </div>
                </div>  
              </div>
            </div> 
            <div className="w-[90px]">
            
                <img src="/images/gen-search/three-line.svg" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example"/>
              </div>
            <div className="w-[365px] py-[28px] px-[51px] fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" id="drawer-navigation" tabindex="-1" aria-labelledby="drawer-navigation-label">
              <div className="">
                <img src="/images/gen-search/three-line.svg"/>
              </div>
              <div className="flex items-center w-[145px] mt-[34px] py-[14px] px-[22px] rounded-[35px] gap-[10px] border-[1px] border-[#1E71F2]">
                  <img src="/images/gen-search/add-item.svg" />
                  <p className="text-[16px] font-sans font-[500] bg-gradient-to-r from-[#6237FF] to-[#258EFF] bg-clip-text text-transparent">New Chat</p>
              </div>
              <div>
                <p className="text-[18px] text-[#1E71F2] font-sans my-[26px]">Recent</p>
                <div>
                  <div className="flex items-center gap-[18px] mb-[20px]">
                    <img src="/images/gen-search/comment-icon.svg" />
                    <p className="text-[16px] text-[#9C9C9C] font-sans">What is a Video</p>
                  </div>
                  <div className="flex items-center gap-[18px] mb-[20px]">
                    <img src="/images/gen-search/comment-icon.svg" />
                    <p className="text-[16px] text-[#9C9C9C] font-sans">MCQ Answers Assistance </p>
                  </div>
                  <div className="flex items-center gap-[18px] mb-[20px]">
                    <img src="/images/gen-search/comment-icon.svg" />
                    <p className="text-[16px] text-[#9C9C9C] font-sans">Plan My Day</p>
                  </div>
                </div>
                <div className="h-[calc(80vh_-_108px)]">
                  <div className="flex items-center gap-[18px] mb-[20px]">
                    <img src="/images/gen-search/down-arrow.svg" />
                    <p className="text-[18px] text-[#1E71F2] font-sans font-[500]">Show more</p>
                  </div>
                </div>  
                <div>
                  <div className="flex items-center gap-[18px] mb-[20px]">
                    <img src="/images/gen-search/history.svg" />
                    <p className="text-[18px] text-[#1E71F2] font-sans font-[500]">History</p>
                  </div>
                  <div className="flex items-center gap-[18px] mb-[20px]">
                    <img src="/images/gen-search/setting.svg" />
                    <p className="text-[18px] text-[#1E71F2] font-sans font-[500]">Setting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
      <Bottombar />
    </div>
    
  )
}

export default GenSearch
