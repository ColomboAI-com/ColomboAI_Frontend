"use client";
import { FeedContext } from "@/context/FeedContext";
import { GlobalContext } from "@/context/GlobalContext";
import { formatTimeAgo } from "@/utlils/commonFunctions";
import { getCookie } from "@/utlils/cookies";
import { useContext, useState, useRef, useEffect } from "react";
import ProfilePicture from "../elements/ProfilePicture";
import ImageBlock from "../feed/post/ImageBlock";
import VideoBlock from "../feed/post/VideoBlock";
import Picker from "emoji-picker-react";
import Image from "next/image";
import comment_x_button from "../../../public/images/icons/comment_x_button.svg";
import ReactPlayer from "react-player";
import Modal from "../elements/Modal";
import React from "react";
import AIMessageGenerator from "../messages/AIMessageGenerator";
import CommentItem from "./CommentItem";
import { AnimatePresence } from 'framer-motion';
import { FaceSmileIcon } from '@heroicons/react/24/outline'; // Import FaceSmileIcon

const CommentSection = ({ specificPostId, posts, onClose }) => {
  const magicBoxInputRef = useRef();
  const commentBoxInputRef = useRef();
  const [showAIPromptModal, setShowAIPromptModal] = useState(false);

  const {
    addComment: addCommentContext,
    deleteComment: deleteCommentContext,
    generateComment: generateCommentContext,
    getComments,
    editComment: editCommentContext, // Get editComment from context
  } = useContext(FeedContext);
  const { setIsCommentOpen, openMagicPenWithIcon, setOpenMagicPenWithIcon } =
    useContext(GlobalContext);
  const [commentData, setCommentData] = useState("");
  const [generateCommentData, setGenerateCommentData] = useState();
  const [isClick, setIsClick] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [generatedComment, setGeneratedComment] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const userid = getCookie("userid");

  useEffect(() => {
    if (openMagicPenWithIcon) {
      handleMegicPen();
    }
    let active = true; // To prevent state updates if component unmounts during async op
    const fetchComments = async () => {
      setLoading(true); // Indicate loading for the page fetch
      try {
        const res = await getComments(specificPostId, page);
        if (active && res && res.comments) {
          setComments((prevComments) => {
            // Prevent duplicate comments if page is somehow re-fetched
            const existingCommentIds = new Set(prevComments.map(c => c._id));
            const newComments = res.comments.filter(c => !existingCommentIds.has(c._id));
            return [...prevComments, ...newComments];
          });
          setHasMore(res.currentPage < res.totalPages);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        if (active) setHasMore(false); // Stop trying if error
      } finally {
        if (active) {
          setLoading(false);
          setIsIntersecting(false); // Reset intersection lock here
        }
      }
    };

    if (specificPostId) { // Only fetch if specificPostId is available
        fetchComments();
    }

    return () => {
      active = false;
      setOpenMagicPenWithIcon(false);
    };
  }, [specificPostId, page]); // Removed getComments from deps as it's from context

  // const myCommentLength = comments.length; // No longer needed for scroll logic

  useEffect(() => {
    const currentRef = containerRef.current; // Capture ref value
    const handleScroll = () => {
      if (currentRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentRef;
        // Trigger when near bottom (e.g., 100px from bottom)
        if (scrollHeight - scrollTop - clientHeight < 100 && hasMore && !isIntersecting && !isLoading) {
          setIsIntersecting(true); // Set lock immediately
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    if (currentRef) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, isIntersecting]);

  const postComment = async () => { // Removed id parameter, uses specificPostId from scope
    const contentToPost = (generatedComment || commentData).trim();
    if (!contentToPost) return;

    setLoading(true);

    // Optimistic UI: Create a temporary comment object
    const tempCommentId = `temp-${Date.now()}`;
    const tempComment = {
      _id: tempCommentId,
      creator: { // Get current user info (ensure these are available, e.g. from cookies or another context)
        _id: getCookie("userid") || "temp-user-id",
        user_name: getCookie("username") || "You",
        profile_picture: getCookie("profilePic") || "/images/profile/defalut_user.svg",
      },
      content: contentToPost,
      createdAt: new Date().toISOString(), // Use current time for optimistic display
      isOptimistic: true, // Flag to identify optimistic comment
    };

    setComments(prevComments => [tempComment, ...prevComments]); // Add to top of list
    setCommentData("");
    setGeneratedComment("");
    // commentBoxInputRef.current.focus(); // Keep focus or not? Instagram often clears and loses focus.
    // Consider resetting textarea height here if auto-grow is implemented

    try {
      const result = await addCommentContext({ // addCommentContext should return the confirmed comment
        postId: specificPostId,
        content: contentToPost,
      });

      if (result && result.success && result.comment) {
        // Replace optimistic comment with confirmed one from backend
        setComments(prevComments =>
          prevComments.map(c => c._id === tempCommentId ? { ...result.comment, isOptimistic: false } : c)
        );
      } else {
        // API call didn't fail but didn't return expected comment, remove optimistic one
        console.error("Comment submission succeeded but no comment data returned, or not successful:", result);
        setComments(prevComments => prevComments.filter(c => c._id !== tempCommentId));
        // Optionally show an error message
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      // Remove optimistic comment on error
      setComments(prevComments => prevComments.filter(c => c._id !== tempCommentId));
      // Optionally show an error message to the user
      // Restore commentData if desired: setCommentData(contentToPost);
    } finally {
      setLoading(false);
      setIsClick(false); // Assuming this relates to AI comment mode
      // No need to call getComments(specificPostId, 1) if FeedContext handles global post update
    }
  };

  };

  const handleDeleteComment = async (passedPostId, commentId) => { // Renamed postId to avoid conflict with specificPostId from scope
    // Confirmation is now handled in CommentItem.jsx before this is called.
    // This function is now the result of confirming the deletion.
    const originalComments = [...comments]; // Save original comments for potential revert

    // Optimistic UI update
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );

    try {
      // Use specificPostId from component's scope for the API call
      const result = await deleteCommentContext({ postId: specificPostId, commentId });
      if (!result || !result.success) {
        // If backend indicates failure but didn't throw, revert.
        console.error("Failed to delete comment from backend:", result?.message);
        setComments(originalComments);
        // TODO: Show user error message (e.g., using MessageBox or an inline error)
      }
      // If successful, optimistic UI already reflects the change. FeedContext also updates global post count.
    } catch (error) {
      console.error("Error deleting comment:", error);
      setComments(originalComments); // Revert optimistic UI on caught error
      // TODO: Show user error message
    }
  };

  const handleEditCommentInList = async (commentId, newContent) => {
    // Optimistically update the comment in the local list
    const originalComments = [...comments];
    setComments(prevComments =>
      prevComments.map(c =>
        c._id === commentId ? { ...c, content: newContent, isOptimisticEdit: true } : c
      )
    );

    try {
      const result = await editCommentContext({ postId: specificPostId, commentId, content: newContent });
      if (result && result.success && result.comment) {
        // Replace with confirmed comment from backend
        setComments(prevComments =>
          prevComments.map(c => c._id === commentId ? { ...result.comment, isOptimisticEdit: false } : c)
        );
      } else {
        console.error("Edit comment failed or returned unexpected data:", result);
        setComments(originalComments); // Revert on failure
        // Show error to user
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      setComments(originalComments); // Revert on error
      // Show error to user
    }
  };

  useEffect(() => {
    if (isClick) {
      setShowAIPromptModal(true);
    }
  }, [isClick]);

  const handleMegicPen = () => {
    setIsClick(!isClick);
  };

  const handleGenerateComment = async (e) => {
    setIsAILoading(true);
    try {
      const postContent = encodeURIComponent(posts?.content);
      const { generatedComment } = await generateCommentContext({
        prompt: generateCommentData,
        post: postContent,
      });
      setTimeout(() => {
        setGeneratedComment(generatedComment);
        setIsAILoading(false);
        commentBoxInputRef.current.focus();
        setGenerateCommentData("");
      }, 500);
    } catch (error) {
      console.error("Error generating comment:", error);
      setIsAILoading(false);
    }
  };

  const onEmojiClick = (event) => {
    setCommentData((prev) => prev + event.emoji);
  };

  const handleUseAIMessage = (msg) => {
    setGeneratedComment(msg);
    setShowAIPromptModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  console.log(comments, "comments");

  return (
    <div className="flex flex-row justify-center relative">
      <Image
        src={comment_x_button}
        alt="colombo"
        onClick={(e) => {
          setIsCommentOpen(false);
          onClose?.();
        }}
        className="absolute xl:top-2 xl:left-2 sm:top-10 right-3 cursor-pointer"
      />
      <div className="bg-[black] sm:h-[0rem] xl:h-[40rem] xl:flex sm:w-[0rem] xl:w-full xl:overflow-hidden ">
        <div className="h-full w-full">
          {posts?.type === "image" && (
            <img
              src={posts?.media[0]}
              className="w-full h-full aspect-video object-contain"
            />
          )}
          {posts?.type === "video" && (
            <ReactPlayer
              className="inset-0 !w-full !h-auto !aspect-video"
              url={posts?.media[0]}
              controls={true}
            />
          )}
          {posts?.type === "" && (
            <img
              src="/images/home/feed-banner-img.png"
              className="w-full h-full aspect-video"
            />
          )}
        </div>
        {/* <div className="xl:block w-[60%] xl:w-[70%] xl:h-[85dvh] lg:h-screen md:w-full sm:w-full sm:hidden">
        <div className="h-full  flex items-center relative min-w-[651px] max-w-[1200px] xl:w-full lg-max:w-[651px]">
          <button
            onClick={() => setIsCommentOpen(false)}
            className="bg-white w-9 h-9 rounded-full relative top-[0] mt-[25px] ml-[14px] flex items-center"
          >
            <img src="/images/icons/cross-icon.svg" className="p-[12px]" />
          </button>
        </div>

      </div> */}
      </div>
      <div className="xl:w-[40%] md:w-[40rem] sm:w-[100vw] overflow-y-scroll sm:h-[100dvh] md:h-[40rem] bg-white px-4 flex flex-col">
        <div className="flex items-center justify-between py-[12px]">
          <a
            className="flex items-center"
            target="_blank"
            href={`/profile/${posts?.creator?.user_name}`}
          >
            <ProfilePicture
              image={posts?.creator?.profile_picture}
              size={"w-[2rem]"}
            />
            <p className="text-[18px] font-sans font-[700] text-[#242424] pl-[17px]">
              {posts?.creator?.user_name}
            </p>
          </a>
          <div className="flex items-center gap-4">
            <p className="font-sans text-sidebarlabel tex-[12px] text-[#8B8B8B]">
              {formatTimeAgo(posts?.createdAt)}
            </p>
          </div>
        </div>
        <div className="h-full w-full md:hidden max-h-[50dvh]">
          {posts?.type === "image" && (
            <img
              src={posts?.media[0]}
              className="w-full h-full aspect-video object-contain"
            />
          )}
          {posts?.type === "video" && (
            <ReactPlayer
              className="inset-0 !w-full !h-auto !aspect-video"
              url={posts?.media[0]}
              controls={true}
            />
          )}
          {posts?.type === "" && (
            <img
              src="/images/home/feed-banner-img.png"
              className="w-full h-full aspect-video"
            />
          )}
        </div>
        <div className="border-b-[1px] border-[#E3E3E3]">
          <p className="text-[#515151] text-[16px] font-sans text-left">
            {posts?.content}
          </p>
        </div>
        <div className="flex mt-2 items-center justify-center">
          <h4 className="text-[15px] color-[#333333] font-sans font-[700]">
            Comments
          </h4>
          <div></div>
        </div>
        <div
          ref={containerRef}
          className="comment-section flex-1 no-scrollbar h-[82%] max-xl:height: calc(100% - 318px); content-start overflow-y-auto py-1 max-xl:h-[54dvh] lg:h-[calc(100dvh-485px)] md:h-[44dvh]"
        >
          {isLoading && comments.length === 0 && page === 1 && ( // Show loader only on initial load
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading comments...</p>
            </div>
          )}
          {!isLoading && comments.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
          <AnimatePresence initial={false}> {/* initial={false} prevents all items animating on first load */}
            {comments.map((comment) => (
              // Use CommentItem, passing currentUserId for potential edit/delete later
              <CommentItem
                key={comment._id} // Key must be on the direct child of AnimatePresence
                comment={comment}
                currentUserId={userid}
                onEdit={handleEditCommentInList}
                onDelete={() => handleDeleteComment(specificPostId, comment._id)}
              />
            ))}
          </AnimatePresence>
          {/* Infinite scroll loader / "Load More" button can be added here if hasMore is true and not currently loading a new page */}
          {isIntersecting && hasMore && (
             <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">Loading more...</div>
          )}
          {!hasMore && comments.length > 0 && (
            <div className="text-center py-4 text-xs text-gray-400 dark:text-gray-500">End of comments.</div>
          )}
          {/* Infinite scroll loader / "Load More" button can be added here if hasMore is true and not currently loading a new page */}
          {isIntersecting && hasMore && (
             <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">Loading more...</div>
          )}
          {!hasMore && comments.length > 0 && (
            <div className="text-center py-4 text-xs text-gray-400 dark:text-gray-500">End of comments.</div>
          )}
        </div>

        {/* New Comment Input Area */}
        <div ref={pickerRef} className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-2 sm:p-3 flex items-start space-x-2">
          <ProfilePicture image={getCookie("profilePic")} size="w-8 h-8 sm:w-9 sm:h-9" />

          <div className="flex-grow relative">
            <textarea
              ref={commentBoxInputRef} // Keep ref for focus and potentially auto-grow
              value={commentData || generatedComment} // Retain AI comment integration for now
              onChange={(e) => {
                setCommentData(e.target.value);
                if (generatedComment) setGeneratedComment(""); // Clear AI comment if user types
                // Implement auto-grow logic here if desired
              }}
              placeholder="Add a comment..."
              className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl resize-none overflow-y-auto bg-gray-50 dark:bg-gray-800 text-sm focus:ring-brandprimary focus:border-brandprimary no-scrollbar"
              rows={1} // Start with 1 row
              // Removed onKeyDown: Enter key will now create newlines. Submission via "Post" button.
            />
            <button
              onClick={() => setShowPicker((val) => !val)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              title="Emoji"
            >
              <FaceSmileIcon className="w-5 h-5" />
            </button>
          </div>
          {showPicker && (
            <div className="absolute bottom-16 left-0 right-0 z-10 sm:left-12"> {/* Adjust positioning as needed */}
                <Picker width="100%" onEmojiClick={onEmojiClick} />
            </div>
           )}

          <button
            onClick={() => postComment()} // Changed from postComment(specificPostId)
            disabled={(!commentData.trim() && !generatedComment.trim()) || isLoading}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors
                        ${(!commentData.trim() && !generatedComment.trim()) || isLoading
                          ? 'bg-blue-300 dark:bg-blue-700 text-white opacity-60 cursor-not-allowed'
                          : 'bg-brandprimary hover:bg-blue-700 text-white'}`}
          >
            Post
          </button>

          {/* AI Magic Pen - positioned next to Post button */}
          <button
              onClick={() => setShowAIPromptModal(true)}
              className="p-2 text-gray-500 hover:text-brandprimary dark:text-gray-400 dark:hover:text-brandprimary"
              title="Generate with AI"
            >
              <Image src="/images/icons/Magic-pen.svg" width={22} height={22} alt="AI Generate" />
          </button>
        </div>
        {/* End New Comment Input Area */}

        {showAIPromptModal && (
            <Modal
              isOpen={showAIPromptModal}
              setIsOpen={setShowAIPromptModal}
              className="w-full font-sans max-w-lg md:max-w-lg lg:max-w-lg transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <AIMessageGenerator onConfirm={handleUseAIMessage} />
            </Modal>
          )}

          {/* <div className="relative ">
            <div className="absolute w-[40px] top-[11px] left-[15px]">
              <img src="/images/icons/smile-icon.svg" />
            </div>
            
            <textarea
            ref={commentBoxInputRef}
              type="text"
              className="w-full border-[1px] border-[#1E71F2] h-[70px] round-[50px] rounded-[20px] pl-[55px] pr-[110px] pt-[15px] outline-none focus:ring-offset-0 focus:ring-0 resize-none overflow-y-auto"
              placeholder="Write comments..."
              autoComplete="off"
              value={commentData || generatedComment}
              onChange={(e) => {
                setCommentData(e.target.value);
                setGeneratedComment('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  postComment(specificPostId); 
                }
              }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: 'none',
              }}
            />   

              <div onClick={handleMegicPen} className="w-[53px] absolute right-10 top-[10px] h-[50px p-[3px] object-scale-down rounded-tr-[50px] rounded-bl-[0px] rounded-tl-[0px] rounded-br-[50px] cursor-pointer">
                <svg width="16" height="25" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 14.0049V8.60624C1 7.58854 1 7.07972 1.13945 6.59989C1.2789 6.12004 1.54983 5.69666 2.09168 4.84991L3.81834 2.15161C4.30753 1.38712 4.55212 1.00488 4.9 1.00488C5.24788 1.00488 5.49247 1.38712 5.98166 2.15161L7.70832 4.84991C8.25016 5.69666 8.52108 6.12004 8.66057 6.59989C8.8 7.07972 8.8 7.58854 8.8 8.60624V14.0049" stroke={isClick ? '#1E71F2' : '#8E8E93'} stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.65039 6.85498C2.06088 7.065 2.61805 7.48756 3.13245 7.5044C3.79461 7.52604 4.24181 6.94416 4.90039 6.94416C5.55897 6.94416 6.00617 7.52604 6.66833 7.5044C7.18274 7.48756 7.73992 7.065 8.15039 6.85498" stroke={isClick ? '#1E71F2' : '#8E8E93'} stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.90039 7.50488V14.0049" stroke={isClick ? '#1E71F2' : '#8E8E93'} stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.59961 2.95508H6.19961" stroke={isClick ? '#1E71F2' : '#8E8E93'} stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            <div className="absolute top-[11px] right-0">
              <button type="button" className="text-white w-[53px] bg-blue-500 hover:bg-blue-400 absolute right-3 top-[0px] h-[50px p-[3px] rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[50px] rounded-br-[50px]"
              onClick={() => {
                postComment(specificPostId);
              }}>
                {isLoading ? (
              <div className="w-4 h-4 mt-1 mb-1 ml-3 rounded-full border-t-2 border-b-2 border-white-500 animate-spin"></div>
            ) : (
              <> Post </>
              )}
              </button>
            </div>
          </div> */}
          {/* {isClick && (
            <div className="relative right-0 left-0 bottom-0 top-auto mb-[10px]">
              <div className="absolute w-[30px] top-[11px] left-[15px]">
                <img src="/images/comment/aicommenticon.svg" />
              </div>

              <input
                ref={magicBoxInputRef}
                type="text"
                className="w-full border-[1px] border-[#1E71F2] h-[50px] rounded-[50px] pl-[55px] outline-none focus:ring-offset-0 focus:ring-0"
                placeholder="Ask or create anything..."
                autoComplete="off"
                value={generateCommentData}
                onChange={handleInputGenerateComment}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (isClick) {
                      handleGenerateComment();
                    } else {
                      postComment(specificPostId);
                    }
                  }
                }}
              />
              <div
                className="w-[53px] blue-400 absolute right-0 top-[10px] h-[50px p-[3px] object-scale-down cursor-pointer"
                onClick={handleGenerateComment}
              >
                {isAILoading ? (
                  <div className="w-5 h-5 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    fill="#8E8E93"
                    viewBox="0 0 17 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.90918 13.3222V0.677803C0.90918 0.432578 1.0083 0.244828 1.20655 0.114553C1.4048 -0.0157229 1.61406 -0.0348811 1.83434 0.0570781L16.1963 6.35629C16.4606 6.4789 16.5928 6.69347 16.5928 7C16.5928 7.30653 16.4606 7.5211 16.1963 7.64371L1.83434 13.9429C1.61406 14.0349 1.4048 14.0157 1.20655 13.8854C1.0083 13.7552 0.90918 13.5674 0.90918 13.3222ZM2.23083 12.2187L14.2138 7L2.23083 1.71234V5.57463L7.5615 7L2.23083 8.37939V12.2187ZM2.23083 7V1.71234V12.2187V7Z"
                      fill={isInputFocused === true ? "#1E71F2" : "#8E8E93"}
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
