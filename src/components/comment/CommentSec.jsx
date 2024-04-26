'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { EmailValidation, NameValidation, PhoneValidation, UsernameValidation } from "@/components/Validations"
import { auth } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setSessionStorage } from "@/utlils/utils"
import { isValidEmail, isValidName, isValidPhone, isValidUserName } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const CommentSec = () => {

  return (
    <div className="flex absolute top-[0] left-[0] right-[0] mt-[138px] z-[99]">
        <div className="w-[70%]">
            <div className="bg-[#333333] py-[153px] relative">
              <div className="bg-white w-[36px] h-[36px] rounded-full absolute top-[0] mt-[25px] ml-[14px]">
                <img src="/images/icons/cross-icon.svg" className="p-[12px]"/>
              </div>
              <img src="/images/comment/commenimg.png" className="w-full h-[345px]"/>
            </div>
        </div>
        <div className="w-[30%] bg-white py-[18px] pl-[20px] pr-[12px]">
          <div className="flex items-center gap-[40%]">
            <img src="/images/icons/back-arrow.svg" className="w-[20px] h-[20px]"/>
            <h4 className="text-[21px] color-[#333333] font-sans font-[700]">Comments</h4>
          </div>
          <div className="mt-[24px] h-[calc(74vh+0px)] overflow-auto">
            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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

            <div className="flex items-start gap-[7.19px] mb-[8px]">
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
          <div className="fixed bottom-[0] w-[26%] pb-[20px]">
            <div className="relative">
              <div className="absolute top-[11px] left-[15px]">
                <img src="/images/icons/smile-icon.svg" />
              </div>
              <input
                type="text"
                className="w-full border-[1px] border-[#1E71F2] h-[50px] roun-[50px] rounded-[50px] pl-[55px]"
                placeholder="Type something"
                autoComplete="off"
              />
              <div className="w-[53px] bg-gradient-to-r from-purple-500 to-pink-500 absolute right-0 top-[0px] h-[50px] object-scale-down rounded-tr-[50px] rounded-bl-[0px] rounded-tl-[0px] rounded-br-[50px]">
                <img src="/images/icons/Magic-pen.svg" />
              </div>
                
            </div>
          </div>
        </div>
    </div>
  )
}

export default CommentSec