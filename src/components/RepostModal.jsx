'use client'
import Button from "@/elements/Button"
import ProfilePicture from "./elements/ProfilePicture"
import { useContext } from "react"
import { FeedContext } from "@/context/FeedContext"
import { PostConstants } from "@/context/PostContext";

const RepostModal = ({ post, onRepost, setIsRepostOpen }) => {

  const { loadings } = useContext(FeedContext)
  // Determine the post type (Image, Video, etc.)
  const postTypeLabel = () => {
    switch (post?.type) {
      case PostConstants.TYPES.IMAGE:
        return 'image';
      case PostConstants.TYPES.VIDEO:
        return 'video';
      case PostConstants.TYPES.THOUGHT:
        return 'thought';
      case PostConstants.TYPES.VIBE:
        return 'vibe';
      default:
        return 'post'; 
    }
  };


  return (
    <div className="w-full flex flex-col items-center bg-white border-[#E3E3E3] sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] md:mx-auto sm2:rounded-[20px] md:rounded-[20px] px-[14px] pt-[40px] pb-[29px]">
      <div className="">
        <div className="w-[110px] mx-auto rounded-[50%]">
          <ProfilePicture size={110} image={post?.creator?.profile_picture} />
        </div>
        <div className="mt-[29px]">
          <p className="font-sans text-[#515151] text-[22.29px] font-[450] leading-[25.57px] text-center">Are you sure you want to repost <br />
            <span className="font-[700]">@{post?.creator?.user_name}</span>{"'s"} {postTypeLabel()} ?</p>
        </div>
        <div>
          <Button
            title={'REPOST'}
            className={'mt-[24px] text-[16.72px] block w-full rounded-[40px] font-sans font-[450] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in'}
            loading={loadings.rePost}
            onClick={onRepost}
          />
          <Button
            title={'CANCEL'}
            className={'mt-[17px] text-[16.72px] block w-full bg-[#E3E3E3] rounded-[40px] font-sans font-[450] px-[20px] py-[12px] text-[#333333] focus:bg-[#E3E3E3] transition duration-300 ease-in'}
            onClick={() => setIsRepostOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}

'use client'
import Button from "@/elements/Button";
import ProfilePicture from "./elements/ProfilePicture"; // Assuming this is correct path relative to current file
import { useContext, useState } from "react";
import { FeedContext } from "@/context/FeedContext";
import NextImage from "next/image"; // Using NextImage to avoid conflicts if any local 'Image' component exists

const RepostModal = ({ post, onRepost, setIsRepostOpen }) => {
  const { loadings } = useContext(FeedContext);
  const [caption, setCaption] = useState("");

  // Compact Post Preview Component (Internal to RepostModal)
  const PostPreview = ({ postToPreview }) => {
    if (!postToPreview) return null;

    const mediaType = postToPreview.type;
    const firstMediaUrl = Array.isArray(postToPreview.media) && postToPreview.media.length > 0
                          ? postToPreview.media[0].url
                          : typeof postToPreview.media === 'object' && postToPreview.media?.url
                          ? postToPreview.media.url
                          : null;
    const firstMediaPoster = Array.isArray(postToPreview.media) && postToPreview.media.length > 0
                          ? postToPreview.media[0].poster
                          : typeof postToPreview.media === 'object' && postToPreview.media?.poster
                          ? postToPreview.media.poster
                          : null;

    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 my-4 w-full max-w-md bg-gray-50 dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <ProfilePicture size={32} image={postToPreview.creator?.profile_picture} />
          <div>
            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
              {postToPreview.creator?.user_name || "Original Poster"}
            </p>
          </div>
        </div>
        {postToPreview.content && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-2">
            {postToPreview.content}
          </p>
        )}
        {firstMediaUrl && mediaType === 'image' && (
          <div className="relative aspect-square w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mt-1"> {/* Fixed size preview */}
            <NextImage
              src={firstMediaUrl}
              alt="Media preview"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        {firstMediaUrl && mediaType === 'video' && (
           <div className="relative aspect-video w-24 h-auto bg-gray-300 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center mt-1">
            {firstMediaPoster ? (
                <NextImage src={firstMediaPoster} alt="Video poster preview" layout="fill" objectFit="cover" />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            )}
          </div>
        )}
         {mediaType === 'thought' && !firstMediaUrl && !postToPreview.content && ( // Simplified thought preview
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">A thought by @{postToPreview.creator?.user_name}</p>
        )}
      </div>
    );
  };

  const handleRepostClick = () => {
    onRepost(caption.trim());
  };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-gray-900 sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] md:mx-auto sm2:rounded-[20px] md:rounded-[20px] px-4 pt-6 pb-6 md:px-6 shadow-xl">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
        Repost this?
      </h2>

      <PostPreview postToPreview={post} />

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a comment... (optional)"
        className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg mb-5 focus:ring-2 focus:ring-brandprimary focus:border-brandprimary resize-none bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        rows={3}
      />

      <div className="w-full space-y-2.5">
        <Button
          title={'REPOST'}
          className={'text-sm block w-full rounded-full font-sans font-semibold bg-brandprimary px-4 py-2.5 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out'}
          loading={loadings.rePost}
          onClick={handleRepostClick}
        />
        <Button
          title={'CANCEL'}
          className={'text-sm block w-full bg-gray-200 dark:bg-gray-700 rounded-full font-sans font-semibold px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out'}
          onClick={() => setIsRepostOpen(false)}
        />
      </div>
    </div>
  );
};

export default RepostModal;