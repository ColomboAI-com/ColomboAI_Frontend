import { VibesLikesIcon } from "@/components/Icons";
import React from "react";

const LikeVibe = () => {
  return (
    <div className="flex flex-col items-center gap-[2px] md:gap-1">
      <VibesLikesIcon w={25} h={25} fill={"#ffffff"} />
      <p className="text-[10px]">121.5k</p>
    </div>
  );
};

export default LikeVibe;
