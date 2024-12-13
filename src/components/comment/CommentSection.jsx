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

const CommentSection = ({ specificPostId, posts }) => {
  const magicBoxInputRef = useRef();
  const commentBoxInputRef = useRef();
  const {
    addComment: addCommentContext,
    deleteComment: deleteCommentContext,
    generateComment: generateCommentContext,
    getComments,
  } = useContext(FeedContext);
  const { setIsCommentOpen, openMagicPenWithIcon, setOpenMagicPenWithIcon } = useContext(GlobalContext);
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
    const fetchComments = async () => {
      try {
        const res = await getComments(specificPostId, page);
        if (res && res.comments) {
          setComments((prevComments) => [...prevComments, ...res.comments]);
          setHasMore(res.currentPage < res.totalPages);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
    return () => {
      setOpenMagicPenWithIcon(false);
    };
  }, [specificPostId, page]);

  const myCommentLength = comments.length;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition =
          containerRef.current.scrollHeight -
          containerRef.current.scrollTop -
          containerRef.current.clientHeight;

        if (scrollPosition < 300 && hasMore && !isIntersecting) {
          setPage((prevPage) => prevPage + 1);
          setIsIntersecting(true);
        }
        if (scrollPosition > 300 && hasMore && isIntersecting) {
          if (myCommentLength > 0) {
            const reminder = myCommentLength % 10;
            if (reminder == 0) {
              setIsIntersecting(false);
            } else {
              setIsIntersecting(true);
            }
          }
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, isIntersecting]);

  const postComment = async (id) => {
    if (commentData || generatedComment) {
      setLoading(true);
      try {
        await addCommentContext({
          postId: id,
          content: commentData || generatedComment,
        });
        const updatedComments = await getComments(specificPostId, 1);
        setComments(updatedComments?.comments || []);
        setCommentData("");
        setGeneratedComment("");
        setGenerateCommentData("");
        commentBoxInputRef.current.focus();
        setPage(1);
        setLoading(false);
        setIsClick(false);
      } catch (error) {
        console.error("Error posting comment:", error);
        setLoading(false);
      }
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteCommentContext({ postId, commentId });
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (isClick) {
      magicBoxInputRef.current.focus();
    } else {
      commentBoxInputRef.current.focus();
    }
  }, [isClick]);

  const handleInputGenerateComment = (e) => {
    if (e.target.value.trim() === "") {
      setIsInputFocused(false);
    } else {
      setIsInputFocused(true);
    }
    setGenerateCommentData(e.target.value);
  };

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

  return (
    <div className="flex flex-row justify-center relative">
      <Image
        src={comment_x_button}
        alt="colombo"
        onClick={(e) => setIsCommentOpen(false)}
        className="absolute xl:top-2 xl:left-2 sm:top-10 right-3 cursor-pointer"
      />
      <div className="bg-[black] sm:h-[0rem] xl:h-[40rem] xl:flex sm:w-[0rem] xl:w-full xl:overflow-hidden ">
        <div className="h-full w-full">
          {posts?.type === "image" && (
            <img src={posts?.media[0]} className="w-full h-full aspect-video object-contain" />
          )}
          {posts?.type === "video" && (
            <ReactPlayer className="inset-0 w-full h-full aspect-video" url={posts?.media[0]} controls={true} />
          )}
          {posts?.type === "" && (
            <img src="/images/home/feed-banner-img.png" className="w-full h-full aspect-video" />
          )}
        </div>
        {/* <div className="xl:block w-[60%] xl:w-[70%] xl:h-[85vh] lg:h-screen md:w-full sm:w-full sm:hidden">
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
      <div className="xl:w-[40%] md:w-[40rem] sm:w-[20rem] overflow-y-scroll sm:h-[30rem] md:h-[40rem] bg-white px-4">
        <div className="flex items-center justify-between px-[16px] py-[12px]">
          <a className="flex items-center" target="_blank" href={`/profile/${posts?.creator?.user_name}`}>
            <ProfilePicture image={posts?.creator?.profile_picture} size={"w-[2rem]"} />
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
        <div className="border-b-[1px] border-[#E3E3E3]">
          <p className="text-[#515151] text-[16px] font-sans text-left">{posts?.content}</p>
        </div>
        <div className="flex mt-2 items-center justify-center">
          <h4 className="text-[15px] color-[#333333] font-sans font-[700]">Comments</h4>
          <div></div>
        </div>
        <div
          ref={containerRef}
          className="comment-section no-scrollbar h-[82%] max-xl:height: calc(100% - 318px); content-start overflow-y-auto py-1 max-xl:h-[54vh] lg:h-[61vh] md:h-[44vh]"
        >
          {comments.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#515151] text-[16px] font-sans text-center">No Comments Found</p>
            </div>
          )}
          {comments.map((comment) => (
            <div key={comment._id}>
              <div className="flex items-start justify-start gap-2 my-4">
                <div className="w-[36px] h-[36px]">
                  <img src={comment.creator.profile_picture} className="w-[36px] h-[36px] rounded-[50%]" />
                </div>
                <div className="w-[85%] text-left">
                  <div className="flex items-center justify-between">
                    <div className="text-[#212121] font-sans font-[400] leading-[21px]">
                      {comment.creator.user_name}
                    </div>
                    {comment.creator._id === userid && (
                      <div className="flex items-center gap-[20px] right-0">
                        <div
                          className="text-[#212121] text-[14px] font-sans font-[450] leading-[21px] cursor-pointer right-0"
                          onClick={() => handleDeleteComment(specificPostId, comment._id)}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">
                    {comment.content}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">
                      {formatTimeAgo(comment?.createdAt)}
                    </div>
                    {/* <div className="flex items-center gap-[20px]">
                      <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                      <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                      <img src="/images/icons/wishlist-icon.svg" />
                    </div> */}
                  </div>
                </div>
              </div>
              <hr className="mt-2 mb-2" />
            </div>
          ))}
        </div>
        <div ref={pickerRef} className="py-[5px] flex flex-col">
          <div className="relative right-0 left-0 bottom-0 top-auto mb-[20px]">
            <div
              className="absolute top-[11px] left-[15px] cursor-pointer"
              onClick={() => setShowPicker((val) => !val)}
            >
              <img src="/images/icons/smile-icon.svg" />
            </div>
            <input
              ref={commentBoxInputRef}
              type="text"
              className="w-full border-[1px] border-[#1E71F2] h-[50px] rounded-[50px] pl-[55px] outline-none focus:ring-offset-0 focus:ring-0 font-sans"
              placeholder="Write comments..."
              autoComplete="off"
              value={commentData || generatedComment}
              onChange={(e) => {
                setCommentData(e.target.value);
                setGeneratedComment("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  postComment(specificPostId);
                }
              }}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitScrollbar: "none",
              }}
            />
            {showPicker && <Picker width="100%" onEmojiClick={onEmojiClick} />}
            <div className="absolute top-[16px] right-[60px]">
              <button
                type="button"
                classNa="text-white absolute w-auto right-[0] top-[0px] h-[50px p-[3px] rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[50px] rounded-br-[50px]"
                onClick={() => {
                  postComment(specificPostId);
                }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 mt-1 mb-1 ml-3 rounded-full border-t-2 border-b-2 border-white-500 animate-spin"></div>
                ) : (
                  <>
                    {" "}
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
                    </svg>{" "}
                  </>
                )}
              </button>
            </div>
            <button
              onClick={handleMegicPen}
              className="w-[53px] bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] absolute right-0 top-[0px] h-[50px p-[3px] object-scale-down rounded-tr-[50px] rounded-bl-[0px] rounded-tl-[0px] rounded-br-[50px]"
            >
              <img src="/images/icons/Magic-pen.svg" />
            </button>
          </div>

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
          {isClick && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
