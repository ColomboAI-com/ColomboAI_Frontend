import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect, useState, useCallback } from "react";
import GenericShareModal from "@/components/elements/GenericShareModal";
import LikePost from "./LikePost"; // Uses Heroicons internally now
import RePost from "./RePost";   // Uses Heroicons internally now
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUpOnSquareIcon,
  ChartBarIcon,
  SparklesIcon, // Replacing custom MagicPenIcon
  WalletIcon
} from "@heroicons/react/24/outline";
import Image from "next/image"; // Keep for wallet_icon if it's not replaced by Heroicon component directly
import { FeedContext } from "@/context/FeedContext";
import VerificationPopup from "@/components/elements/VerificationPopup";
import Modal from "@/components/elements/Modal";
import CommentSection from "@/components/comment/CommentSection";

export default function PostActions({ post }) {
  const {
    isShareOpen,
    setIsShareOpen,
    isCommentOpen, // Added for managing Comment Modal state
    setIsCommentOpen,
    specificPostId,
    setSpecificPostId,
    setShareModalPostContent, // Corrected name
    // setIsRepostOpen, // Repost modal is local to RePost.jsx
    setOpenMagicPenWithIcon,
  } = useContext(GlobalContext);

  const { getPostImpressions, getPostWallet } = useContext(FeedContext);

  const [impressions, setImpressions] = useState(post?.counts?.impressions || 0);
  const [wallet, setWallet] = useState(0);
  const [animateShareIcon, setAnimateShareIcon] = useState(false);
  const [userNotVerifiedModal, setUserNotVerifiedModal] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const handleShare = (postId) => {
    setIsShareOpen(true);
    setSpecificPostId(postId);
    setShareModalPostContent(post); // Pass the post object
    setAnimateShareIcon(true);
    setTimeout(() => setAnimateShareIcon(false), 300);
  };

  // handleRepost is now primarily managed within RePost.jsx
  // If PostActions needs to open a global repost modal, this would be different.
  // For now, RePost.jsx handles its own modal.

  const handleComments = (postId) => {
    if (!isUserVerified) {
      setUserNotVerifiedModal(true);
      return;
    }
    setSpecificPostId(postId);
    setShareModalPostContent(post); // Pass post for context in CommentSection
    setIsCommentOpen(true);
  };

  const handleMagicPen = (postId) => {
    if (!isUserVerified) {
      setUserNotVerifiedModal(true);
      return;
    }
    setOpenMagicPenWithIcon(true); // This might trigger something in GlobalContext or another component
    // If it's meant to open comments with AI, ensure handleComments is also called or logic combined.
    handleComments(postId); // Assuming MagicPen is related to commenting
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
    setIsUserVerified(userVerified === "true");
  };

  useEffect(() => {
    updateUserVerifiedInfo();
    handleFetchImpressions();
    handleFetchWallet();
  }, [handleFetchImpressions, handleFetchWallet]);

  useEffect(() => {
    if (post?.counts?.impressions !== undefined) {
      setImpressions(post.counts.impressions);
    }
  }, [post?.counts?.impressions]);

  return (
    <>
      {isShareOpen && specificPostId === post._id && (
        <Modal
          isOpen={isShareOpen}
          setIsOpen={setIsShareOpen}
          className="xl:w-[450px] lg:w-[450px] sm:w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-0 text-left align-middle shadow-xl transition-all"
        >
          <GenericShareModal onClose={() => setIsShareOpen(false)} />
        </Modal>
      )}

      {isCommentOpen && specificPostId === post._id && (
        <Modal
          isOpen={isCommentOpen}
          setIsOpen={setIsCommentOpen}
          className="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:h-full sm:w-[450px] md:w-[500px] lg:w-[550px]
                     bg-white dark:bg-gray-900 shadow-xl transition-transform transform sm:translate-x-0
                     flex flex-col"
        >
          <CommentSection
            specificPostId={specificPostId}
            posts={post}
            onClose={() => setIsCommentOpen(false)}
          />
        </Modal>
      )}

      {userNotVerifiedModal && (
        <Modal
          isOpen={userNotVerifiedModal}
          setIsOpen={setUserNotVerifiedModal}
          className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
        >
          <VerificationPopup setIsOpen={setUserNotVerifiedModal} />
        </Modal>
      )}

      <div className="flex items-center gap-x-4 sm:gap-x-3 py-2">
        {/* 1. Like */}
        <LikePost post={post} setUserNotVerifiedModal={setUserNotVerifiedModal} />

        {/* Comment Icon & Count */}
        <div className="flex items-center gap-1 group">
          <button onClick={() => handleComments(post._id)} className="flex items-center text-gray-600 dark:text-gray-400 group-hover:text-brandprimary dark:group-hover:text-blue-400">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
          </button>
          <p className="font-sans text-sm text-gray-600 dark:text-gray-400">{post?.counts?.comments || 0}</p>
        </div>

        {/* 2. Share (original order was 2nd) */}
        <button
          onClick={() => handleShare(post._id)}
          className={`flex items-center text-gray-600 dark:text-gray-400 hover:text-brandprimary dark:hover:text-blue-400 transition-transform duration-150 ease-in-out ${
            animateShareIcon ? "transform scale-125" : "transform scale-100"
          }`}
        >
          <ArrowUpOnSquareIcon className="w-6 h-6" />
        </button>

        {/* 3. Repost */}
        <RePost post={post} setUserNotVerifiedModal={setUserNotVerifiedModal} />

        {/* 4. Impressions */}
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <ChartBarIcon className="w-6 h-6" />
          <p className="font-sans text-sm">{impressions}</p>
        </div>

        {/* 5. MagicPen */}
        <button
          onClick={() => handleMagicPen(post._id)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-brandprimary dark:hover:text-blue-400"
        >
          <SparklesIcon className="w-6 h-6" />
        </button>

        {/* 6. Post Wallet */}
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <WalletIcon className="w-6 h-6" />
          <p className="font-sans text-sm">${wallet.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}
