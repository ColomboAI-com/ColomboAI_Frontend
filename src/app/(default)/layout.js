import Header from "@/components/layouts/Header"
import Sidebar from "@/components/layouts/Sidebar"
import FeedContextProvider from "@/context/FeedContext"

const DefaultLayout = ({ children }) => {
  return (
    <FeedContextProvider>
      <header className="shadow-[0px_2px_4px_0px_#0000001A]">
        <div className="">
          <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[250px]" />
        </div>
      </header>
      <div className="flex">
        <Sidebar />
        <div className="w-[93%]">
          <Header />
          <div className="border- border-red-400 max-h-[82.8vh] overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </FeedContextProvider>
  )
}

export default DefaultLayout
