import Header from "@/components/layouts/Header"
import RightSidebar from "@/components/layouts/RightSidebar"
import Sidebar from "@/components/layouts/Sidebar"
import FeedContextProvider from "@/context/FeedContext"

const DefaultLayout = ({ children }) => {
  return (
    <FeedContextProvider>
      <header className="shadow-[0px_2px_4px_0px_#0000001A]">
        <div className="">
          <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[183px]" />
        </div>
      </header>
      <div className="flex">
        <Sidebar />
        <div className="w-[95%]">
          <Header />
          <div className="flex">
            <div className="overflow-x-hidden w-[70%] px-20">
              {children}
            </div>
            <div className="w-[30%] pt-10 px-2 shadow-[0px_2px_4px_0px_#0000001A]">
              <RightSidebar/>
            </div>
          </div>
        </div>
      </div>
    </FeedContextProvider>
  )
}

export default DefaultLayout
