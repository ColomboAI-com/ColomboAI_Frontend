'use client'
import { FeedContext } from "@/context/FeedContext";
import { formatTimeAgo } from "@/utlils/commonFunctions";
import { getCookie } from "@/utlils/cookies";
import { useContext, useState, useRef, useEffect } from "react";

const CommentSection = ({specificPostId, posts}) => {
  const magicBoxInputRef = useRef();
  const commentBoxInputRef = useRef();
  const { setIsCommentOpen, addComment: addCommentContext, deleteComment: deleteCommentContext, generateComment: generateCommentContext, getComments } = useContext(FeedContext);
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

  const userid = getCookie('userid');
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(specificPostId, page);
        setComments((prevComments) => [...prevComments,...res.comments]);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [specificPostId, page]);

  const myCommentLength = comments.length;
  useEffect(() => {
      const handleScroll = () => {
      
      if (containerRef.current) {
        const scrollPosition =
          containerRef.current.scrollHeight -
          containerRef.current.scrollTop -
          containerRef.current.clientHeight;

          if (scrollPosition < 300 && hasMore &&!isIntersecting) {
            setPage((prevPage) => prevPage + 1);
            setIsIntersecting(true);
          } 
          if (scrollPosition > 300 && hasMore && isIntersecting) {
            if(myCommentLength>0)
              {
                const reminder = myCommentLength % 10
                if(reminder == 0){
                  setIsIntersecting(false);
                }
                else{
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
      if(commentData || generatedComment){
      setLoading(true);
      try {
        await addCommentContext({ postId: id, content: (commentData || generatedComment) });
        const updatedComments = await getComments(specificPostId, 1);
        setComments(updatedComments.comments);
        setCommentData("");
        setGeneratedComment("");
        setGenerateCommentData("");
        commentBoxInputRef.current.focus();
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
      await deleteCommentContext({postId, commentId});
      setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  useEffect(() => {
    if (isClick) {
      magicBoxInputRef.current.focus();
    }
    else{
      commentBoxInputRef.current.focus();
    }
  }, [isClick]);           

  const handleInputGenerateComment = (e) => {
    if (e.target.value.trim() === '') {
      setIsInputFocused(false);
    } else {
      setIsInputFocused(true);
    }
    setGenerateCommentData(e.target.value)
  }

  const handleMegicPen = () => {
    setIsClick(!isClick);
  }
  
  const handleGenerateComment = async (e) => {
    setIsAILoading(true);
    try {
        const postContent = encodeURIComponent(posts?.content);
        const { generatedComment } = await generateCommentContext({ prompt: generateCommentData, post: postContent });
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
  }

  return (
    <div className="xl:flex w-full max-h-[calc((100vh-192.28px)-155px)] overflow-hidden lg:flex-row lg:h-full md:max-h-[calc(100vh-88px)] md:flex-col md:overflow-auto md:border-[0.2px] md:border[#1E71F2] md:my-[30px] md:mx-[17px] md:rounded-tl-[10px] md:rounded-tr-[10px] sm:flex-col sm:overflow-auto">
      <div className="xl:block w-[60%] xl:w-[70%] lg:h-[84vh] md:w-full sm:w-full sm:hidden">
        <div className="h-full  flex items-center relative">
          <button onClick={() => setIsCommentOpen(false)} className="bg-white w-9 h-9 rounded-full absolute top-[0] mt-[25px] ml-[14px]">
            <img src="/images/icons/cross-icon.svg" className="p-[12px]" />
          </button>
          <img src="/images/comment/commenimg.png" className=" w-full h-full aspect-video h-[-webkit-fill-available]" />
        </div>
      </div>
      <div className="w-[40%] bg-white px-4 xl:w-[30%] xl:sm:z-[0] xl:relative xl:h-auto md:w-full md:left-[0] sm:w-full sm:absolute sm:z-[99] sm:left-0 sm:top-auto sm:bottom-0 md:h-[70vh] md:top-auto md:bottom-0">
        <div class="flex items-center justify-between px-[16px] py-[12px]">
          <a class="flex items-center" target="_blank" href="/profile/prince02">
            <img src="https://ui-avatars.com/api/?name=prince patel" alt="avatar" class="rounded-full" height="42" width="42" />
            <p class="text-[18px] font-sans font-[700] text-[#242424] pl-[17px]">prince02</p>
          </a>
          <div class="flex items-center gap-4">
            <p class="font-sans text-sidebarlabel tex-[12px] text-[#8B8B8B]">13 h ago</p>
            <button>
              <svg width="30" height="30" viewBox="0 0 22 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.00065 5.66634C2.26732 5.66634 1.63954 5.40523 1.11732 4.88301C0.595095 4.36079 0.333984 3.73301 0.333984 2.99967C0.333984 2.26634 0.595095 1.63856 1.11732 1.11634C1.63954 0.594119 2.26732 0.333008 3.00065 0.333008C3.73398 0.333008 4.36176 0.594119 4.88398 1.11634C5.40621 1.63856 5.66732 2.26634 5.66732 2.99967C5.66732 3.73301 5.40621 4.36079 4.88398 4.88301C4.36176 5.40523 3.73398 5.66634 3.00065 5.66634ZM11.0007 5.66634C10.2673 5.66634 9.63954 5.40523 9.11732 4.88301C8.59509 4.36079 8.33398 3.73301 8.33398 2.99967C8.33398 2.26634 8.59509 1.63856 9.11732 1.11634C9.63954 0.594119 10.2673 0.333008 11.0007 0.333008C11.734 0.333008 12.3618 0.594119 12.884 1.11634C13.4062 1.63856 13.6673 2.26634 13.6673 2.99967C13.6673 3.73301 13.4062 4.36079 12.884 4.88301C12.3618 5.40523 11.734 5.66634 11.0007 5.66634ZM19.0007 5.66634C18.2673 5.66634 17.6395 5.40523 17.1173 4.88301C16.5951 4.36079 16.334 3.73301 16.334 2.99967C16.334 2.26634 16.5951 1.63856 17.1173 1.11634C17.6395 0.594119 18.2673 0.333008 19.0007 0.333008C19.734 0.333008 20.3618 0.594119 20.884 1.11634C21.4062 1.63856 21.6673 2.26634 21.6673 2.99967C21.6673 3.73301 21.4062 4.36079 20.884 4.88301C20.3618 5.40523 19.734 5.66634 19.0007 5.66634Z" fill="#A7A7A7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="border-b-[1px] border-[#E3E3E3]">
          <p className="text-[#515151] text-[16px] font-sans text-left">Squad goals achieved! Explored [Place], soaked up the sun, and made memories that'll last a lifetime. Already counting down the days for our next adventure together. ✨</p>
        </div>
        <div className="flex h-[10%] items-center justify-center">
          {/* <img src="/images/icons/back-arrow.svg" className="w-[20px] h-[20px]" /> */}
          <h4 className="text-[21px] color-[#333333] font-sans font-[700]">Comments</h4>
          <div></div>
        </div>
        <div ref={containerRef} className="comment-section no-scrollbar h-[82%] content-start overflow-y-auto py-1 xl:h-[45vh] lg:h-[61vh] md:h-[44vh]">
        {comments.length === 0 && <div className="flex items-center justify-center h-full">
          <p className="text-[#515151] text-[16px] font-sans text-center">No Comments Found</p>
        </div>}
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
                  <div className="flex items-center gap-[20px] right-0">
                    {comment.creator._id === userid ?
                    <div className="text-[#212121] text-[14px] font-sans font-[450] leading-[21px] cursor-pointer right-0" onClick={()=>handleDeleteComment(specificPostId, comment._id)}>
                      Delete
                    </div>
                    : ""}
                  </div>
                </div>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">{comment.content}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">
                    {formatTimeAgo(comment?.createdAt)}
                  </div>
                  <div className="flex items-center gap-[20px]">
                    <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                    <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                    <img src="/images/icons/wishlist-icon.svg" />
                  </div>
                </div>
            </div>
          </div>
          <hr className="mt-2 mb-2"/>
        </div>
        ))}
        </div>
        <div className="py-[5px]">
        <div className="relative ">
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
            <button type="button" class="text-white w-[53px] bg-blue-500 hover:bg-blue-400 absolute right-3 top-[0px] h-[50px p-[3px] rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[50px] rounded-br-[50px]"
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
        </div>
        {isClick && ( 
        <div className="relative mt-2">
          <div className="absolute w-[30px] top-[11px] left-[15px]">
            <img src="/images/comment/aicommenticon.svg" />
          </div>
          
          <input
            ref={magicBoxInputRef}
            type="text"
            className="w-full border-[1px] border-[#1E71F2] h-[50px] round-[50px] rounded-[20px] pl-[55px] outline-none focus:ring-offset-0 focus:ring-0"
            placeholder="Ask or create anything..."
            autoComplete="off"
            value={generateCommentData}
            onChange={handleInputGenerateComment}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (isClick) {
                  handleGenerateComment();
                } else {
                  postComment(specificPostId);
                }
              }
            }}
          />
            <div className="w-[53px] blue-400 absolute right-0 top-[10px] h-[50px p-[3px] object-scale-down cursor-pointer" onClick={handleGenerateComment}>
            {isAILoading ? (
            <div className="w-5 h-5 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        ) : (
            <svg width="20" height="20" fill="#8E8E93" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg"><path d="M0.90918 13.3222V0.677803C0.90918 0.432578 1.0083 0.244828 1.20655 0.114553C1.4048 -0.0157229 1.61406 -0.0348811 1.83434 0.0570781L16.1963 6.35629C16.4606 6.4789 16.5928 6.69347 16.5928 7C16.5928 7.30653 16.4606 7.5211 16.1963 7.64371L1.83434 13.9429C1.61406 14.0349 1.4048 14.0157 1.20655 13.8854C1.0083 13.7552 0.90918 13.5674 0.90918 13.3222ZM2.23083 12.2187L14.2138 7L2.23083 1.71234V5.57463L7.5615 7L2.23083 8.37939V12.2187ZM2.23083 7V1.71234V12.2187V7Z" fill={isInputFocused === true ? '#1E71F2' : '#8E8E93'}></path></svg>
          )}
            </div>
        </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default CommentSection