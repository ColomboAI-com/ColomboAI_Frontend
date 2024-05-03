/* eslint-disable jsx-a11y/alt-text */
'use client'
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

/* eslint-disable @next/next/no-img-element */
const CommentSection = () => {

  const { setIsCommentOpen } = useContext(GlobalContext);

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
        <div className="no-scrollbar overflow-y-auto py-1 2xl:h-[46vh] lg:h-[37vh] md:h-[44vh]">

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[14px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[20px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-start text-center gap-2 my-4">
            <div className="w-[36px] h-[36px]">
              <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]" />
            </div>
            <div className="w-[85%] text-left">
              <h5 className="text-[#212121] text-[16px] font-sans font-[400] leading-[19.2px]">Bruno Pham</h5>
              <h3 className="text-[#212121] text-[20px] font-sans font-[400] leading-[30px] my-[4px]">Great shot! I love it</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#828282] text-[14px] font-sans font-[400] leading-[21px]">2 mins ago</span>
                  <a className="text-[#242424] text-[14px] font-sans font-[400] leading-[21px]">Reply</a>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[#828282] text-[12px] font-sans font-[450] leading-[18px]">02</span>
                  <img src="/images/icons/wishlist-icon.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[5px]">
          <div className="relative ">
            <div className="absolute top-[11px] left-[15px]">
              <img src="/images/icons/smile-icon.svg" />
            </div>
            <input
              type="text"
              className="w-full border-[1px] border-[#1E71F2] h-[50px] roun-[50px] rounded-[50px] pl-[55px] outline-none focus:ring-offset-0 focus:ring-0"
              placeholder="Type something"
              autoComplete="off"
            />
            <button className="w-[53px] bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] absolute right-0 top-[0px] h-[50px p-[3px] object-scale-down rounded-tr-[50px] rounded-bl-[0px] rounded-tl-[0px] rounded-br-[50px]">
              <img src="/images/icons/Magic-pen.svg" />
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSection