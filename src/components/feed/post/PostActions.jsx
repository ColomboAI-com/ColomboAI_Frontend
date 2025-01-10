import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import LikePost from "./LikePost";
import RePost from "./RePost";
import SavePost from "./SavePost";
import { MagicPenIcon } from "@/components/Icons";
import post_comment from "../../../../public/images/icons/post_comment.svg";
import post_stats from "../../../../public/images/icons/post_stats.svg";
import reply_icon from "../../../../public/images/icons/reply_icon.svg";
import wallet_icon from "../../../../public/images/icons/wallet_icon.svg";
import Image from "next/image";
import { FeedContext } from "@/context/FeedContext";
import VerificationPopup from "@/components/elements/VerificationPopup";
import Modal from "@/components/elements/Modal";

export default function PostActions({ post }) {
  const {
    setIsShareOpen,
    setIsCommentOpen,
    setSpecificPostId,
    setPosts,
    setIsRepostOpen,
    setOpenMagicPenWithIcon,
  } = useContext(GlobalContext);

  const { getPostImpressions, getPostWallet } = useContext(FeedContext);

  const [impressions, setImpressions] = useState(0);
  const [wallet, setWallet] = useState(0);

  const [userNotVerifiedModal, setUserNotVerifiedModal] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const handleShare = (postId) => {
    setIsShareOpen(true);
    setSpecificPostId(postId);
    setPosts(post);
  };
  const handleRepost = (postId) => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }
    setIsRepostOpen(true);
    setSpecificPostId(postId);
    setPosts(post);
  };
  const handleComments = (postId) => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }
    setSpecificPostId(postId);
    setPosts(post);
    setIsCommentOpen(true);
  };

  const handleMagicPen = (postId) => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }
    setOpenMagicPenWithIcon(true);
    handleComments(postId);
  };

  const handleFetchImpressions = async () => {
    const response = await getPostImpressions(post._id);
    if (response.success) {
      setImpressions(response.impression.views);
    }
  };

  const handleFetchWallet = async () => {
    const response = await getPostWallet(post._id);

    if (response?.success) {
      setWallet(response.data.amount);
    }
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
    handleFetchImpressions();
    handleFetchWallet();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        {userNotVerifiedModal && (
          <Modal
            isOpen={userNotVerifiedModal}
            setIsOpen={setUserNotVerifiedModal}
            className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
          >
            <VerificationPopup setIsOpen={setUserNotVerifiedModal} />
          </Modal>
        )}
        <div className="flex items-center gap-[10px] lg:gap-[19px] md:gap-[19px] xl:gap-[19px]">
          <LikePost post={post} setUserNotVerifiedModal={setUserNotVerifiedModal} />
          <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
            <button onClick={() => handleComments(post._id)}>
              <Image src={post_comment} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
            </button>
            <p className="text-sidebarlabel font-sans text-[14px]">{post?.counts?.comments || 0}</p>
          </div>
          <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
            <Image src={post_stats} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
            <p className="text-sidebarlabel font-sans text-[14px]">{impressions}</p>
          </div>
          <button
            onClick={() => handleShare(post._id)}
            className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1"
          >
            <Image src={reply_icon} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
          </button>
          <button onClick={() => handleRepost(post._id)} className="">
            {/* <RePostIcon fill={'#646464'}/> */}
            <RePost post={post} setUserNotVerifiedModal={setUserNotVerifiedModal} />
          </button>
        </div>
        <div className="flex items-center lg:gap-[19px] md:gap-[19px] gap-[10px]">
          <div
            className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1"
            onClick={() => handleMagicPen(post._id)}
          >
            <MagicPenIcon />
          </div>
          <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
            <Image src={wallet_icon} alt="colombo" width={28} height={27} />
            <p className="text-sidebarlabel font-sans text-[14px]">${wallet.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
