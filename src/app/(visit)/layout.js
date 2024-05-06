"use client"
import Sidebar from "@/components/layouts/Sidebar"
import Bottombar from "@/components/layouts/Bottombar";
import UserProfileContextProvider from "@/context/UserProfileContext";

const VisitLayout = ({ children }) => {
  return (
    <UserProfileContextProvider>
      <div className="min-w-screen border- border-yellow-400">
        <header className="sticky top-0 z-50 xl:border-b-[1px] lg:border-b-[1px] border-[#E3E3E3] bg-white sm:border-0">
          <div className="py-[14px]">
            <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[174px] h-[50px]" />
          </div>
        </header>
        <div className="flex border- border-green-400">
          <div className="min-w-[10%] xl:min-w-[5%] h-[calc(100vh-56.28px)] sticky top-14 z-50 hidden md:block border-r-2 border-brandprimary">
            <Sidebar />
          </div>
          <div className="flex justify-center flex-1 border- border-purple-400">
            <div className="w-[100%] lg:w-[70%]">
              {children}
            </div>
          </div>
        </div>
        <Bottombar />
      </div>
    </UserProfileContextProvider>
  )
}

export default VisitLayout
