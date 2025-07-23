'use client';

import { copyValue } from '@/utlils/commonFunctions';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Assuming comment_x_button is available or a similar one

// It's good practice to have a generic close icon if possible
// For now, assuming a generic icon path or using a simple text 'X'
// import closeIcon from '../../../public/images/icons/comment_x_button.svg'; // Adjust path as needed

const GenericShareModal = ({ shareUrl, title, isOpen, onClose }) => {
  const dialogRef = useRef(null); // Moved hook to top level

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

  const handleCopy = () => {
    copyValue(shareUrl);
    // Optionally, add feedback to the user that copy was successful
  };

  const socialPlatforms = [
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
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div ref={dialogRef} className="w-full max-w-md flex flex-col items-center bg-[#1E71F2] border-[1px] border-[#fff] rounded-[20px] p-[14px] relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl" aria-label="Close share modal">
          {/* Using a simple X for now, replace with an Image component if an SVG is available */}
          {/* <Image src={closeIcon} alt="Close" width={24} height={24} /> */}
          &times;
        </button>

        {/* Modal Handle */}
        <div className="before:content-[''] before:bg-white before:block before:w-[40px] before:h-[3px] before:mx-auto before:rounded-[20px] before:mt-[8.98px] mb-2">
          <h5 className="text-[18.51px] font-sans text-white text-center">{title}</h5>
        </div>

        <hr className="w-full color-white my-[18px]" />

        {/* Social Media Icons */}
        <div className="flex items-center flex-wrap gap-y-[15px] gap-x-[10px] px-[12px] justify-center max-h-[200px] overflow-y-auto">
          {socialPlatforms.map((platform) => (
            <Link key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center w-[70px]">
              {/* Using next/image for social icons */}
              <div className="relative w-[48px] h-[48px] rounded-full bg-white p-1 overflow-hidden">
                <Image src={platform.icon} alt={platform.name} layout="fill" objectFit="contain" />
              </div>
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">{platform.name}</p>
            </Link>
          ))}
        </div>

        <hr className="w-full my-[18px] color-white" />

        {/* Copy Link Section */}
        <div className="flex items-center gap-[6px] mb-[14px] w-full px-2">
          <input
            className="text-[#1E71F2] w-full flex-grow bg-white rounded-[50px] px-[11.1px] py-[5.33px] h-[35px] text-[12.3px] font-sans focus:outline-none"
            type="text"
            value={shareUrl}
            readOnly
            placeholder="Share link"
          />
          <button
            className="w-auto text-[#1E71F2] text-[12.3px] font-sans font-[400] bg-white rounded-[50px] px-[15.69px] py-[5.33px] h-[35px]"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericShareModal;
