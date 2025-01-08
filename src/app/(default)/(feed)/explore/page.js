'use client'
import SearchProfile from "@/components/explorer/SearchProfile";
import Suggetions from "@/components/explorer/Suggetions"

const Explore = () => {
    return (
        <div className="flex justify-center">
            <div className="sm:mx-[1rem] md:mx-[2.5rem] xl:mx-[0rem] sm:w-[375px] md:w-[680px] lg:w-[680px]">
                <SearchProfile />
                <Suggetions />
            </div>
        </div>
    );
}

export default Explore;