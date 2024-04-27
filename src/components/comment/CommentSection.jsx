/* eslint-disable jsx-a11y/alt-text */

import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

/* eslint-disable @next/next/no-img-element */
const CommentSection = () => {

  const { setIsCommentOpen } = useContext(GlobalContext);

  return (
    <div className="xl:flex w-full max-h-[calc((100vh-192.28px)-155px)] lg:flex-row lg:h-full md:max-h-[calc(100vh-193px)] md:flex-col md:overflow-auto md:border-[0.2px] md:border[#1E71F2] md:my-[30px] md:mx-[17px] md:rounded-tl-[10px] md:rounded-tr-[10px] sm:flex-col sm:overflow-auto">
        <div className="xl:block w-[70%] xl:w-[70%] md:w-full sm:w-full sm:hidden">
            <div className="bg-[#333333] h-full  flex items-center relative">
              <button onClick={() => setIsCommentOpen(false)} className="bg-white w-9 h-9 rounded-full absolute top-[0] mt-[25px] ml-[14px]">
                <img src="/images/icons/cross-icon.svg" className="p-[12px]"/>
              </button>
              <img src="/images/comment/commenimg.png" className=" w-full aspect-video object-contain h-[-webkit-fill-available]"/>
            </div>
        </div>
        <div className="w-[30%] bg-white px-4 xl:w-[30%] xl:sm:z-[0] xl:relative md:w-full sm:w-full sm:absolute sm:z-[99] sm:h-[70vh]">
          <div className="flex h-[10%] items-center justify-between">
            <img src="/images/icons/back-arrow.svg" className="w-[20px] h-[20px]"/>
            <h4 className="text-[21px] color-[#333333] font-sans font-[700]">Comments</h4>
            <div></div>
          </div>
          <div className="h-[82%] no-scrollbar overflow-y-auto py-1 xl:h-[59vh] lg:h-[61vh] md:h-[44vh]">

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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

            <div className="flex items-start justify-center gap-2 my-4">
              <div className="w-[36px] h-[36px]">
                <img src="/images/comment/user-profile-pic.png" className="w-[36px] h-[36px] rounded-[50%]"/>
              </div>
              <div className="w-[85%]">
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