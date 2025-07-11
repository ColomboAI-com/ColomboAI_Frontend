import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect, useState, useCallback } from "react"; // Added useCallback
import GenericShareModal from "@/components/elements/GenericShareModal"; // Import the new modal
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
    isShareOpen, // Need this to control GenericShareModal
    setIsShareOpen,
    setIsCommentOpen,
    specificPostId, // Need this for the shareUrl
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

  const handleFetchImpressions = useCallback(async () => {
    if (post?._id) {
      const response = await getPostImpressions(post._id);
      if (response.success) {
        setImpressions(response.impression.views);
      }
    }
  }, [getPostImpressions, post?._id]);

  const handleFetchWallet = useCallback(async () => {
    if (post?._id) {
      const response = await getPostWallet(post._id);
      if (response?.success) {
        setWallet(response.data.amount);
      }
    }
  }, [getPostWallet, post?._id]);

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
    updateUserVerifiedInfo(); // This function doesn't depend on post or its derivatives directly
    handleFetchImpressions();
    handleFetchWallet();
  }, [handleFetchImpressions, handleFetchWallet]); // Added dependencies

  return (
    <>
      {isShareOpen && specificPostId && (
        <GenericShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          shareUrl={`${window.location.origin}/post/${specificPostId}`}
          title="Share Post"
        />
      )}
      {/* Main container for all action icons, changed from justify-between to start or allow natural flow */}
      <div className="flex items-center gap-x-4 sm:gap-x-3 py-2"> {/* Adjust gap as needed */}
        {userNotVerifiedModal && (
          <Modal
            isOpen={userNotVerifiedModal}
            setIsOpen={setUserNotVerifiedModal}
            className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
          >
            <VerificationPopup setIsOpen={setUserNotVerifiedModal} />
          </Modal>
        )}

        {/* 1. Like */}
        <LikePost post={post} setUserNotVerifiedModal={setUserNotVerifiedModal} />

        {/* 2. Share */}
        <button
          onClick={() => handleShare(post._id)}
          className="flex items-center" // Simplified classes, icon size handled by Image
        >
          <Image src={reply_icon} alt="Share" width={24} height={24} /> {/* Standardized icon size */}
        </button>

        {/* 3. Repost */}
        {/* The RePost component itself might render an icon, or we wrap it if it's just logic */}
        <RePost post={post} setUserNotVerifiedModal={setUserNotVerifiedModal} />

        {/* 4. Impressions */}
        <div className="flex items-center gap-1"> {/* Group icon and text */}
          <Image src={post_stats} alt="Impressions" width={24} height={24} />
          <p className="text-sidebarlabel font-sans text-sm">{impressions}</p>
        </div>

        {/* 5. MagicPen */}
        <button
          onClick={() => handleMagicPen(post._id)}
          className="flex items-center"
        >
          <MagicPenIcon width={24} height={24} /> {/* Ensure consistent icon sizing */}
        </button>

        {/* 6. Post Wallet */}
        <div className="flex items-center gap-1"> {/* Group icon and text */}
          <Image src={wallet_icon} alt="Post Wallet" width={24} height={24} />
          <p className="text-sidebarlabel font-sans text-sm">${wallet.toFixed(2)}</p>
        </div>

        {/* Comment button - Omitted for now as per strict interpretation of the list.
            If needed, it would be added here or based on further clarification.
        <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
          <button onClick={() => handleComments(post._id)}>
            <Image src={post_comment} alt="Comment" width={24} height={24} />
          </button>
          <p className="text-sidebarlabel font-sans text-sm">{post?.counts?.comments || 0}</p>
        </div>
        */}
      </div>
    </>
  );
}
