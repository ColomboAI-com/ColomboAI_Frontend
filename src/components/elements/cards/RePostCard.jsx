import { useContext } from "react";
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
    ExclamationIcon, // Assuming custom or to be replaced if used
    // PostMoreOptionsIcon, // Replaced
    ReportIcon, // Assuming custom or to be replaced if used
    RestrictUserIcon, // Assuming custom or to be replaced if used
    UserProfileIcon,
} from "@/components/Icons";
import Dropdown from "@/components/messages/Dropdown";
import { FeedContext } from "@/context/FeedContext";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies";
import ThreeDotMenu from "../ThreeDotMenu";
import { useEffect, useState } from "react";
import { InfoIcon, SaveIcon } from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const RePostCard = ({ post, index }) => {
    const { deletePost, likePost: likePostFromContext } = useContext(FeedContext); // Get likePost

    const { userDetails } = useContext(UserProfileContext);

    const handleDeletePost = async () => {
        try {
            const response = await deletePost(post._id);
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <>
            {/* <div className="flex items-center">
        <ProfilePicture image={post?.creator?.profile_picture} className="w-[20px] h-[20px]" />
        <Username username={post?.creator?.user_name} className="text-[12px] pl-[7px]" /><span className="text-[#b3b3b3] font-sans"> reposted this</span>
      </div> */}
            {/* Outer container: New styling */}
            <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg mt-5 p-3">
                <div className="flex flex-row justify-between px-[16px] pb-[16px]"> {/* Adjusted padding here if p-3 on parent is enough, or remove p-3 and keep px/pb here */}
                    <div className="flex flex-row items-center gap-1">
                        <ProfilePicture image={post?.repostBy?.profile_picture} size={"w-[2rem]"} />
                        <Username username={post?.repostBy?.user_name} className="text-[12px]" />
                        <p className="text-[#333333]/[0.7] dark:text-gray-300 font-[450] ml-1 md:text-[14px] sm:text-[10px] lg:text-[14px]">reposted this</p>
                    </div>
                    <div className="flex flex-row items-center gap-4 sm:gap-2 md:gap-4 lg:gap-4 ">
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400"> {/* Adjusted timestamp styling */}
                        {formatTimeAgo(post?.createdAt)}
                    </p>
                    <Dropdown
                        offset={[0, 10]}
                        placement="bottom-start"
                        btnClassName="flex justify-center items-center rounded-full text-gray-500 hover:text-brandprimary dark:text-gray-400 dark:hover:text-blue-400 cursor-pointer"
                        button={<EllipsisHorizontalIcon className="w-6 h-6" />} // Replaced for the repost itself
                    ></Dropdown>
                    </div>
                </div>
                {/* Inner card for original post: Keep subtle border, adjust rounding */}
                <div className={`overflow-x-hidden border border-gray-200 dark:border-gray-600 rounded-lg`}>
                    <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between px-[16px] py-[10px]">
                        <Link
                            className="flex items-center justify-start w-full md:w-fit lg:w-fit"
                            href={`/profile/${post?.creator?.user_name || ""}`}
                            target="_blank"
                        >
                            <ProfilePicture image={post?.creator?.profile_picture} size={"w-[2rem]"} />
                            <Username username={post?.creator?.user_name} className="text-[12px]" />
                        </Link>
                        <div className="flex items-center gap-4 justify-between pl-2 lg:w-fit md:w-fit w-full">
                            <p className="font-sans text-sidebarlabel text-[12px] text-[#8B8B8B]">
                                {formatTimeAgo(post?.createdAt)}
                            </p>

                            <Dropdown
                                offset={[0, 10]}
                                placement="bottom-start"
                                btnClassName="flex justify-center items-center rounded-full text-gray-500 hover:text-brandprimary dark:text-gray-400 dark:hover:text-blue-400 cursor-pointer"
                                button={<EllipsisHorizontalIcon className="w-6 h-6" />} // Replaced for the original post within repost
                            >
                                {userDetails?.user_name === post?.creator?.user_name ? (
                                    <ul className="rounded bg-white dark:bg-gray-800 shadow-md text-center ring-1 ring-black ring-opacity-5 text-sm">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Archive</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hide Like Counts</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Turn Off Commenting</li>
                                        <li
                                            className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleDeletePost}
                                        >
                                            Delete
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="rounded bg-white shadow-md">
                                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
                                        <li className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                                            <ReportIcon w={25} h={25} fill={"currentcolor"} />
                                            <span className="ml-2">Report</span>
                                        </li>
                                    </ul>
                                )}
                            </Dropdown>
                        </div>
                    </div>

                    {/* Media Block, Actions, Stats, Caption, Comments for the original post content */}
                    {(() => {
                      const gallerySlides = Array.isArray(post?.media)
                        ? post.media.map(item => ({
                            src: item.url,
                            type: item.type,
                            width: item.width,
                            height: item.height,
                            poster: item.type === 'video' ? item.poster : undefined,
                          }))
                        : post?.media?.url
                        ? [{
                            src: post.media.url,
                            type: post.type, // Assuming original post's type
                            width: post.media.width,
                            height: post.media.height,
                            poster: post.type === 'video' ? post.media.poster : undefined,
                          }]
                        : [];

                      const currentMediaItemForDisplay = gallerySlides.length > 0 ? gallerySlides[0] : null;

                      return (
                        <>
                          {currentMediaItemForDisplay && currentMediaItemForDisplay.type === "image" && (
                            <ImageBlock
                              mediaItem={currentMediaItemForDisplay}
                              allMediaItems={gallerySlides}
                              currentIndexInPost={0}
                              postId={post._id} // Assuming original post's ID for like
                              onMediaLike={likePostFromContext}
                            />
                          )}
                          {currentMediaItemForDisplay && currentMediaItemForDisplay.type === "video" && (
                            <VideoBlock
                              mediaItem={currentMediaItemForDisplay}
                              allMediaItems={gallerySlides}
                              currentIndexInPost={0}
                              postId={post._id} // Assuming original post's ID for like
                              onMediaLike={likePostFromContext}
                            />
                          )}
                        </>
                      );
                    })()}

                    {/* PostActions: Horizontal padding px-4 (16px), margin-top mt-2 (8px) */}
                    <div className="px-4 mt-2">
                        {post && <PostActions post={post} />}
                    </div>

                    {/* Engagement Stats Row - Placeholder */}
                    {/* e.g., <div className="px-4 py-2 text-sm font-semibold"> {post?.likesCount} likes </div> */}

                    {/* ContentBlock (caption): Horizontal padding px-4, top padding pt-2, bottom padding pb-1 */}
                    {post?.content && <div className="px-4 pt-2 pb-1"><ContentBlock content={post.content} /></div>}

                    {/* RecentComments: Horizontal padding px-4, vertical padding py-2 */}
                    <div className="px-4 py-2">
                        {post && <RecentComments comments={post.comments} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RePostCard;
