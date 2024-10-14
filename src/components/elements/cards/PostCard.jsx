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
import {
  ExclamationIcon,
  PostMoreOptionsIcon,
  ReportIcon,
  RestrictUserIcon,
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

const PostCard = ({ post }) => {
  const { deletePost } = useContext(FeedContext);

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
      <div className={`overflow-x-hidden border-[0.5px] md:w-[700px] sm:w-[375px] xl:w-[700px] lg:w-[700px] border-brandprimary sm:rounded-none md:rounded-[10px] mt-5`}>
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
              btnClassName="flex justify-center items-center rounded-full hover:text-brandprimary cursor-pointer"
              button={<PostMoreOptionsIcon w={30} h={30} fill={"#A7A7A7"} />}
            >
              {userDetails?.user_name === post?.creator?.user_name ? (
                <ul className="rounded bg-white shadow-md text-center">
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

        {post?.type === "image" && <ImageBlock image={post.media} />}
        {post?.type === "video" && <VideoBlock video={post.media} />}
        {post?.content && <ContentBlock content={post.content} />}
        <div className="px-[12px] py-[2px]">
          {post && (
            <>
              <PostActions post={post} />
              <RecentComments comments={post.comments} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
