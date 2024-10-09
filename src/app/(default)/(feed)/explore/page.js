'use client'
import SearchProfile from "@/components/explorer/SearchProfile";
import Suggetions from "@/components/explorer/Suggetions"

const Explore = () => {
    return (
        <div className="sm:px-2 md:px-0">
            <SearchProfile />
            <Suggetions />
        </div>
    );
}

export default Explore;