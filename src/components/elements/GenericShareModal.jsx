'use client';

import { copyValue } from '@/utlils/commonFunctions';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Assuming comment_x_button is available or a similar one

import { XMarkIcon, LinkIcon, ShareIcon as ShareOutlineIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { GlobalContext } from "@/context/GlobalContext"; // To get post content for preview
import { useContext } from "react"; // To use GlobalContext

// Updated props: isOpen, onClose. shareUrl and title can be derived from context or post.
const GenericShareModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const { shareModalPostContent: post, specificPostId } = useContext(GlobalContext);

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/post/${specificPostId}`;
  const postTitle = post?.content?.substring(0, 50) + "..." || "Check out this post!"; // Example title from post content
  const postTextSnippet = post?.content?.substring(0, 100) + "..." || "See this interesting post."; // Example text snippet

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dialog
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // No need for an else block to remove listener here,
    // as the cleanup function handles it when isOpen changes or component unmounts.

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]); // Dependencies: isOpen, onClose

  if (!isOpen) { // Conditional rendering after hooks
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show "Copied!" for 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Optionally, show an error message to the user
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          text: postTextSnippet,
          url: shareUrl,
        });
        // console.log('Successfully shared');
        onClose(); // Close modal after successful native share
      } catch (error) {
        // console.error('Error sharing:', error);
        // Handle error (e.g., user cancelled share dialog) - often, no explicit user message is needed
      }
    } else {
      // Web Share API not supported - this case should ideally not show the button
      // or the button should trigger fallback. For now, button won't be shown.
      // console.log('Web Share API not supported');
    }
  };

  const canShareNatively = typeof navigator !== 'undefined' && !!navigator.share;

  // Reduced list for primary display if Web Share API is not used, or as always-visible quick shares
  const primarySocialPlatforms = [
    { name: 'WhatsApp', icon: '/images/shareicon/whatsapp.svg', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + " " + shareUrl)}` },
    { name: 'X', icon: '/images/shareicon/twitter.svg', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}` },
    { name: 'Facebook', icon: '/images/shareicon/facebook.svg', href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Email', icon: '/images/shareicon/email.svg', href: `mailto:?subject=${encodeURIComponent(postTitle)}&body=Check out this post: ${encodeURIComponent(shareUrl)}` },
  ];

  // Full list for a "more options" scenario if needed, or if Web Share is not available and we want to show all
  const allSocialPlatforms = [
    { name: 'Instagram', icon: '/images/shareicon/instagram.svg', href: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}` },
    { name: 'Messenger', icon: '/images/shareicon/fb-messenger.svg', href: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'FB_APP_ID_PLACEHOLDER'}&redirect_uri=${encodeURIComponent(shareUrl)}` },
    { name: 'Facebook', icon: '/images/shareicon/facebook.svg', href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'WhatsApp', icon: '/images/shareicon/whatsapp.svg', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}` },
    { name: 'X', icon: '/images/shareicon/twitter.svg', href: `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}` },
    { name: 'Reddit', icon: '/images/shareicon/reddit.svg', href: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}` },
    { name: 'Pinterest', icon: '/images/shareicon/pintrest.svg', href: `https://pinterest.com/pin/create/bookmarklet/?url=${encodeURIComponent(shareUrl)}` },
    { name: 'Telegram', icon: '/images/shareicon/telegram.svg', href: `https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}` },
    { name: 'Tumblr', icon: '/images/shareicon/tumblr.svg', href: `https://www.tumblr.com/share/link?url=${encodeURIComponent(shareUrl)}` },
    { name: 'LinkedIn', icon: '/images/shareicon/linkedin.svg', href: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}` },
    { name: 'Email', icon: '/images/shareicon/email.svg', href: `mailto:?body=Check out this: ${encodeURIComponent(shareUrl)}` },
    { name: 'SMS', icon: '/images/shareicon/sms.svg', href: `sms:?body=Check out this: ${encodeURIComponent(shareUrl)}` },
    { name: 'LinkedIn', icon: '/images/shareicon/linkedin.svg', href: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(postTitle)}` }, // Added title to LinkedIn
    { name: 'Email', icon: '/images/shareicon/email.svg', href: `mailto:?subject=${encodeURIComponent(postTitle)}&body=Check out this post: ${encodeURIComponent(shareUrl)}` },
    { name: 'SMS', icon: '/images/shareicon/sms.svg', href: `sms:?body=Check out this post: ${encodeURIComponent(postTitle)} ${encodeURIComponent(shareUrl)}` }, // Added title to SMS
  ];

  // Determine which platforms to show (either primary or all if no native share)
  const platformsToShow = canShareNatively ? primarySocialPlatforms : allSocialPlatforms;

  // The main component will now return only the content for the modal,
  // assuming the Modal wrapper handles the dialog panel, backdrop, and open/close state.
  // The isOpen prop is now managed by the parent Modal component.
  // The onClose prop is still essential for the close button.

  // Optional: Small Post Preview
  const PostPreview = () => {
    if (!post) return null;
    const mediaUrl = Array.isArray(post.media) && post.media.length > 0 ? post.media[0].url : (typeof post.media === 'object' && post.media?.url ? post.media.url : null);
    const mediaType = post.type;

    return (
      <div className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center space-x-3 w-full bg-gray-50 dark:bg-gray-800">
        {mediaUrl && (mediaType === 'image' || mediaType === 'video') && (
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded overflow-hidden relative">
            <Image src={mediaUrl} alt="Post preview" layout="fill" objectFit="cover" />
            {mediaType === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              </div>
            )}
          </div>
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 flex-1">
          {post.content || postTitle}
        </p>
      </div>
    );
  };


  // Removed the outer fixed div and dialogRef, as these will be handled by the parent Modal component.
  // The component now returns the direct content for the modal panel.
  return (
    // The className that was on dialogRef can be passed to Modal's panel prop or styled there.
    // For now, assuming Modal handles its own panel styling.
    // Keeping essential padding and structure.
    <div className="p-1 sm:p-2 w-full"> {/* Simplified padding, can be adjusted in Modal call */}
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Share Post</h5>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Close share modal">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <PostPreview />

      <div className="space-y-3">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandprimary dark:focus:ring-offset-gray-900"
        >
          {copied ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
          <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
        </button>

        {canShareNatively && (
          <button
            onClick={handleWebShare}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-brandprimary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandprimary dark:focus:ring-offset-gray-900"
          >
            <ShareOutlineIcon className="w-5 h-5" />
            <span>Share via...</span>
          </button>
        )}
      </div>

      {(!canShareNatively || primarySocialPlatforms.length > 0) && <hr className="my-4 border-gray-200 dark:border-gray-700" />}

      <div className={`grid ${canShareNatively ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-4'} gap-x-2 gap-y-3 justify-items-center max-h-[180px] overflow-y-auto no-scrollbar`}>
        {platformsToShow.map((platform) => (
          <Link key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center w-[60px] sm:w-[70px] text-center group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 p-1 flex items-center justify-center overflow-hidden transition-colors">
              <Image src={platform.icon} alt={platform.name} width={28} height={28} objectFit="contain" />
            </div>
            <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-brandprimary dark:group-hover:text-blue-400 mt-1 truncate w-full">{platform.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenericShareModal;
