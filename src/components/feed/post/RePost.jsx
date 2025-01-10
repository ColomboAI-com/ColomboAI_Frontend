import { RePostIcon } from "@/components/Icons";
import { FeedContext } from "@/context/FeedContext";
import { useState, useContext, useEffect } from "react";
import Modal from "@/components/elements/Modal";
import RepostModal from "@/components/RepostModal";
import { MessageBox } from "@/components/MessageBox";
import { useMediaQuery } from "react-responsive";

export default function RePost({ post }) {
  const [repostCounts, setRepostCounts] = useState(post?.counts?.reposts || 0);
  const [isReposted, setIsReposted] = useState(post?.interactions?.isReposted || false);
  const { rePost } = useContext(FeedContext);
  const [isRepostOpen, setIsRepostOpen] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const onRepost = async () => {
    const res = await rePost(post?._id);
    if (res) {
      setIsReposted(true);
      setRepostCounts((prev) => prev + 1);
      setIsRepostOpen(false);
      MessageBox("success", res.message);
    }
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1025px)" });

  let iconWidth;
  if (isSmallScreen) {
    iconWidth = 20;
  } else if (isMediumScreen) {
    iconWidth = 50;
  } else if (isLargeScreen) {
    iconWidth = 50;
  }

  const handleClickOpen = () => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }
    setIsRepostOpen(true);
  };

  const updateUserVerifiedInfo = async () => {
    let userVerified = await localStorage.getItem("userVerified");
    let boolValue;

    if (typeof userVerified === "string") {
      boolValue = userVerified === "true";
    } else if (typeof userVerified === "boolean") {
      boolValue = userVerified;
    } else {
      boolValue = false;
    }

    setIsUserVerified(boolValue);
  };

  useEffect(() => {
    updateUserVerifiedInfo();
  }, []);
  return (
    <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
      <div
        onClick={() => {
          if (isReposted) return;
          handleClickOpen();
        }}
      >
        <RePostIcon fill={"#646464"} w={iconWidth} />
      </div>
      <p className={`font-sans text-[14px] ${isReposted ? "text-brandprimary" : "text-sidebarlabel"}`}>
        {repostCounts}
      </p>
      <Modal
        isOpen={isRepostOpen}
        setIsOpen={setIsRepostOpen}
        className="w-full absolute bottom-0 sm2:w-auto md:w-auto sm2:relative md:relative max-w-4xl transform overflow-hidden align-middle shadow-xl transition-all md:shadow-none"
      >
        <RepostModal post={post} onRepost={onRepost} setIsRepostOpen={setIsRepostOpen} />
      </Modal>
    </div>
  );
}
