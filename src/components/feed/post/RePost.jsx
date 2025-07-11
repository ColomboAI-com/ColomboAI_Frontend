// import { RePostIcon } from "@/components/Icons"; // Remove custom icon
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline"; // Or ArrowUturnRightIcon
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

  // Sync with post prop changes from context/backend
  useEffect(() => {
    setRepostCounts(post?.counts?.reposts || 0);
    setIsReposted(post?.interactions?.isReposted || false);
  }, [post?.counts?.reposts, post?.interactions?.isReposted]);

  const onRepost = async (caption) => { // Updated to accept caption
    // Optimistic UI update (local to this instance)
    const originalIsReposted = isReposted;
    const originalRepostCounts = repostCounts;

    // For repost, usually it just increments and stays "reposted" by current user once.
    // The icon might not toggle back visually unless it's a "undo repost" action,
    // which is not standard for a simple repost count.
    // So, only update if not already reposted by this user on this instance.
    if (!isReposted) {
        setIsReposted(true); // Visually mark as action taken
        setRepostCounts((prev) => prev + 1); // Optimistically increment for this specific button press
    }
    setIsRepostOpen(false); // Close modal immediately

    try {
      const res = await rePost(post?._id, caption); // Pass caption to context
      if (res && res.success) {
        MessageBox("success", res.message || "Reposted successfully!");
        // No need to set isReposted/repostCounts here again if context update handles it via props
      } else {
        // Revert optimistic UI if backend indicates failure but didn't throw an error handled by catch
        if (!isReposted) { // only revert if we optimistically changed it
            setIsReposted(originalIsReposted);
            setRepostCounts(originalRepostCounts);
        }
        MessageBox("error", res?.message || "Failed to repost.");
      }
    } catch (error) {
        // Revert optimistic UI on caught error
        if (!isReposted) { // only revert if we optimistically changed it
            setIsReposted(originalIsReposted);
            setRepostCounts(originalRepostCounts);
        }
        MessageBox("error", "An error occurred while reposting.");
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
          if (isReposted) return; // User has already reposted this instance, or it's their own repost.
                                 // Future: could be an "Undo Repost" action here.
          handleClickOpen();
        }}
        className="cursor-pointer group"
      >
        <ArrowPathRoundedSquareIcon
            className={`w-6 h-6 ${isReposted ? "text-brandprimary dark:text-blue-400" : "text-gray-600 dark:text-gray-400 group-hover:text-brandprimary dark:group-hover:text-blue-400"}`}
        />
      </div>
      <p className={`font-sans text-sm ${isReposted ? "text-brandprimary dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}>
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
