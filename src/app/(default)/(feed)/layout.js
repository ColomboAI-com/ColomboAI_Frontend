import FeedFilter from "@/components/layouts/FeedFilter";
import InputBar from "@/components/layouts/InputBar";

const FeedLayout = ({ children }) => {
    return (
        <div className="  border- border-green-500 ">
            <FeedFilter className="bg-white sticky top-0 z-10 sm2:py-3 flex flex-wrap items-center justify-evenly border- px-6 lg:px-16 gap-2 shadow-[0px_2px_0px_0px_#0000001A]"/>
            <div className="w-[100%] overflow-y-auto px-6 md:px-10 lg:px-20">
                {children}
            </div>
        </div>
    );
}

export default FeedLayout;