import { useContext, useRef } from "react";
import RecentComments from "@/components/feed/post/RecentComments";
import ImageBlock from "@/components/feed/post/ImageBlock";
import PostActions from "@/components/feed/post/PostActions";
import ProfilePicture from "../ProfilePicture";
import Username from "../Username";
import { formatTimeAgo } from "@/utlils/commonFunctions";
import ContentBlock from "@/components/feed/post/ContentBlock";
import VideoBlock from "@/components/feed/post/VideoBlock";
import Link from "next/link";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"; // For PostMoreOptionsIcon
import {
  ExclamationIcon,
  // PostMoreOptionsIcon, // Replaced by EllipsisHorizontalIcon
  ReportIcon, // Assuming these are custom or will be replaced if used
  RestrictUserIcon, // Assuming these are custom or will be replaced if used
  UserProfileIcon,
} from "@/components/Icons";
import Dropdown from "@/components/messages/Dropdown";
import { FeedContext } from "@/context/FeedContext";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies";
import ThreeDotMenu from "../ThreeDotMenu";
import { useEffect } from "react";
import { InfoIcon, SaveIcon } from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/navigation";

const PostCard = ({ post }) => {
  const { deletePost, incrementPostImpressions, likePost: likePostFromContext } = useContext(FeedContext); // Get likePost

  const { userDetails } = useContext(UserProfileContext);

  const postViewedRef = useRef(null);
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(post._id);
      if (response.message) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleIncreaseViewCount = async () => {
    try {
      await incrementPostImpressions(post._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Intersection Observer to automatically call handleLoadMore when the button is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          //  handleLoadMore();
          handleIncreaseViewCount();
        }
      },
      {
        root: null, // Uses the browser viewport as the default
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the button is visible
      }
    );

    if (postViewedRef.current) {
      observer.observe(postViewedRef.current);
    }

    // Cleanup the observer when the component unmounts or if button changes
    return () => {
      if (postViewedRef.current) {
        observer.unobserve(postViewedRef.current);
      }
    };
  }, []);

  const goToProfile = (urlPath) => {
    router.push(urlPath);
  };

  return (
    <>
      <div
        className={`overflow-x-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg mt-5 pb-4`} // New styling: subtle border, rounded-xl, shadow-lg. Removed border-[0.5px] in favor of standard border.
      >
        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between px-[16px] py-[10px]">
          <div className="flex items-center justify-start w-full">
            <div onClick={() => goToProfile(`/profile/${post?.creator?.user_name || ""}`)} className="cursor-pointer">
              <ProfilePicture image={post?.creator?.profile_picture} size={"w-[2rem] h-[2rem]"} />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex md:flex-row flex-col md:items-center flex-1">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => goToProfile(`/profile/${post?.creator?.user_name || ""}`)}
                >
                  <Username username={post?.creator?.user_name} className="text-sm" />
                </div>
                <p className="font-sans text-xs text-[#8B8B8B] mr-2 pl-[12px]">
                  {formatTimeAgo(post?.createdAt)}
                </p>
              </div>
              <Dropdown
                offset={[0, 10]}
                placement="bottom-end"
                btnClassName="flex justify-center items-center rounded-full text-gray-500 hover:text-brandprimary dark:text-gray-400 dark:hover:text-blue-400 cursor-pointer"
                button={<EllipsisHorizontalIcon className="w-6 h-6" />} {/* Replaced PostMoreOptionsIcon */}
              >
                {userDetails?.user_name === post?.creator?.user_name ? (
                  <ul className="rounded bg-white dark:bg-gray-800 shadow-md text-center ring-1 ring-black ring-opacity-5 text-sm">
                    <li className="rounded px-4 py-2 hover:bg-gray-100 cursor-pointer">Archive</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hide Like Counts</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Turn Off Commenting</li>
                    <li
                      className="rounded px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDeletePost}
                    >
                      Delete
                    </li>
                  </ul>
                ) : (
                  <ul className="rounded bg-white shadow-md ring-1 ring-gray-100 text-sm"> {/* Added text-sm */}
                    <li className="rounded flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <SaveIcon w={25} h={25} fill={"currentcolor"} />
                      <span className="ml-2">Save</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <RestrictUserIcon w={25} h={25} fill={"currentcolor"} />
                      <span className="ml-2">Unfollow</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <SaveIcon w={25} h={25} fill={"currentcolor"} />
                      <span className="ml-2">Hide</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <InfoIcon w={25} h={25} fill={"currentcolor"} />
                      <span className="ml-2">Why are you seeing this</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <UserProfileIcon w={25} h={25} fill={"currentcolor"} />
                      <span className="ml-2">About this account</span>
                    </li>
                    <li className="rounded flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                      <ReportIcon w={25} h={25} fill={"currentcolor"} />
                      <span className="ml-2">Report</span>
                    </li>
                  </ul>
                )}
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Prepare slides for gallery view. Assuming post.media is an array of media objects. */}
        {/* Each item in post.media should have: url, type, width, height, poster (for video) */}
        {(() => {
          const gallerySlides = Array.isArray(post?.media)
            ? post.media.map(item => ({
                src: item.url, // Ensure 'url' is the correct field name from your data
                type: item.type, // 'image' or 'video'
                width: item.width,
                height: item.height,
                poster: item.type === 'video' ? item.poster : undefined,
              }))
            : post?.media?.url // Handle case where post.media might be a single object
            ? [{
                src: post.media.url,
                type: post.type, // post.type should align with media.type
                width: post.media.width,
                height: post.media.height,
                poster: post.type === 'video' ? post.media.poster : undefined,
              }]
            : [];

          const currentMediaItemForDisplay = gallerySlides.length > 0 ? gallerySlides[0] : null;

          if (!currentMediaItemForDisplay) return null;

          return (
            <>
              {currentMediaItemForDisplay.type === "image" && (
                <ImageBlock
                  mediaItem={currentMediaItemForDisplay}
                  allMediaItems={gallerySlides}
                  currentIndexInPost={0}
                  postId={post._id}
                  onMediaLike={likePostFromContext} // Pass the like function
                />
              )}
              {currentMediaItemForDisplay.type === "video" && (
                <VideoBlock
                  mediaItem={currentMediaItemForDisplay}
                  allMediaItems={gallerySlides}
                  currentIndexInPost={0}
                  postId={post._id}
                  onMediaLike={likePostFromContext} // Pass the like function
                />
              )}
            </>
          );
        })()}

        {/* PostActions: Horizontal padding px-4 (16px), margin-top mt-2 (8px) */}
        <div className="px-4 mt-2">
          {post && <PostActions post={post} />}
        </div>

        {/* Engagement Stats Row - Placeholder for now. If implemented, would need its own spacing. */}
        {/* Example: <div className="px-4 py-2 text-sm font-semibold"> {post?.likesCount} likes </div> */}

        {/* ContentBlock (caption): Horizontal padding px-4, top padding pt-2, bottom padding pb-1 */}
        {post?.content && <div className="px-4 pt-2 pb-1"><ContentBlock content={post.content} /></div>}

        <div ref={postViewedRef} style={{ height: "1px" }}></div>

        {/* RecentComments: Horizontal padding px-4, vertical padding py-2 */}
        <div className="px-4 py-2">
          {post && <RecentComments comments={post.comments} />}
        </div>
      </div>
    </>
  );
};

export default PostCard;
