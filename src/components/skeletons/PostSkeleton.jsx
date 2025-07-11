// src/components/skeletons/PostSkeleton.jsx
import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="overflow-x-hidden border-[0.5px] border-brandprimary sm:rounded-[10px] md:rounded-[10px] mt-5 pb-4 animate-pulse">
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between px-[16px] py-[10px]">
        <div className="flex items-center justify-start w-full">
          {/* Profile Picture Skeleton */}
          <div className="w-[2rem] h-[2rem] bg-gray-300 rounded-full mr-3"></div>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex md:flex-row flex-col md:items-center flex-1">
              {/* Username Skeleton */}
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-1 md:mb-0 md:mr-2"></div>
            </div>
            {/* Timestamp Skeleton */}
            <div className="h-3 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
      </div>

      {/* Media Block Skeleton */}
      {/* Adjust height to match typical media height, e.g., md:h-[30rem] for images or md:h-[24rem] for videos */}
      <div className="bg-gray-300 md:h-[24rem] sm:h-[20rem] w-full"></div>

      <div className="px-[12px] py-[2px] mt-3">
        {/* Content Text Skeleton */}
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>

        {/* Post Actions Skeleton */}
        <div className="flex items-center justify-around mt-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
