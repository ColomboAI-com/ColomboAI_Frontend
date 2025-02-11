"use client";
import Button from "@/elements/Button";
import ProfilePicture from "../../elements/ProfilePicture";
import { useContext } from "react";
import { FeedContext } from "@/context/FeedContext";
import { UserProfileContext } from "@/context/UserProfileContext";

const UnfollowModal = () => {
  const {
    followUnfollowUser,
    setIsUnFollowModalOpen,
    unFollowModalData,
    setUnFollowModalData,
    setIsFollowingModalOpen,
  } = useContext(UserProfileContext);

  return (
    <div className="w-full flex flex-col items-center bg-white border-[#E3E3E3] sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] sm2:rounded-[20px] md:rounded-[20px] px-[14px] pt-[40px] pb-[29px]">
      <div className="">
        <div className="flex justify-center">
          <ProfilePicture
            size={110}
            image={`${unFollowModalData?.profile_picture}`}
          />
        </div>
        <div className="mt-[29px]">
          <p className="font-sans text-[#515151] text-base font-[450] leading-[25.57px] text-center">
            If you decide to follow{" "}
            <span className="font-[700]">@{unFollowModalData?.name}</span>{" "}
            again, you'll need to send a new follow request.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button
            title={"UNFOLLOW"}
            className={
              "mt-[24px] w-[240px] text-[14px] block rounded-[40px] font-sans font-[450] bg-[#E95050] px-[20px] py-[12px] text-white focus:bg-[#E95050] transition duration-300 ease-in"
            }
            onClick={() => {
              followUnfollowUser(unFollowModalData._id, true);
              setIsUnFollowModalOpen(false);
              setIsFollowingModalOpen(false);
              setUnFollowModalData();
            }}
          />
          <Button
            title={"CANCEL"}
            className={
              "w-[240px] text-[14px] block bg-[#E3E3E3] rounded-[40px] font-sans font-[450] px-[20px] py-[12px] text-[#333333] focus:bg-[#E3E3E3] transition duration-300 ease-in"
            }
            onClick={() => {
              setIsUnFollowModalOpen(false);
              setUnFollowModalData();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UnfollowModal;
