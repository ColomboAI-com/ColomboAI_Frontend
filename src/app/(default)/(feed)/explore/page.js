'use client'
import SearchProfile from "@/components/explorer/SearchProfile";
import Suggetions from "@/components/explorer/Suggetions"

const Explore = () => {
    return (
        <div className="sm:mx-[1rem] md:mx-[2.5rem] xl:mx-[0rem]">
            <SearchProfile />
            <Suggetions />
        </div>
    );
}

export default Explore;