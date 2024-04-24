import React from 'react'

export default function PostActions() {
  return (
    <div className="flex items-center justify-between">
          <div className="flex items-center gap-[19px]">
            <div className="flex items-center gap-4">
              <img src="/images/home/wishlist.png" alt="like_button_image" />
              <p className="text-sidebarlabel font-sans text-[14px]">121</p>
            </div>
            <div className="flex items-center gap-4">
              <img src="/images/home/Chat.png" alt="comment_image" />
              <p className="text-sidebarlabel font-sans text-[14px]">88</p>
            </div>
            <div className="flex items-center gap-4">
              <img src="/images/home/refresh.png" alt="repost_button_image" />
              <p className="text-sidebarlabel font-sans text-[14px]">23</p>
            </div>
            <div className="flex items-center">
              <img src="/images/home/Magic-pen.png" alt="magic_pen_button_image" />
            </div>
          </div>
          <div className="flex items-center gap-[19px]">
            <div className="flex items-center gap-4">
              <img src="/images/home/Arrow.png" alt="share_button_image" />
              <p className="text-sidebarlabel font-sans text-[14px]">10</p>
            </div>
            <div className="flex items-center gap-4">
              <img src="/images/home/bookmark.png" alt="save_button_image" />
              <p className="text-sidebarlabel font-sans text-[14px]">40</p>
            </div>
          </div>
        </div>
  )
}
