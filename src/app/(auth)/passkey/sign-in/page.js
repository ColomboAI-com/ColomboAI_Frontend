"use client";

import RedirectLink from "@/components/auth/RedirectLink";
import SocialAuthentication from "@/components/auth/SocialAuthentication";
import UserPolicyComponent from "@/components/auth/UserPolicyPopup";
import Button from "@/elements/Button";

const SignIn = () => {
  return (
    <>
      <div className="lg:h-screen lg:overflow-auto bg-[url('/images/home/star-bg.png')] bg-[length:89%_96%] bg-no-repeat bg-center sm:h-auto">
        <div className="min-h-screen flex justify-center lg:items-center sm:px-[20px]">
          <div className="md:max-w-[380px] xxl:px-[0] lg:px-[0] w-full mx-auto sm:max-w-full sm:w-full md:w-full">
            <div className="xl:block sm:hidden md:hidden lg:block">
              <img
                src="/images/auth/Star.svg"
                className="mb-[12px] object-cover mx-auto sm:hidden md:hidden"
                alt="welcome_to_colomboai"
              />
              <h5 className="text-[24px] font-sans text-center font-[450]">
                Verify with an, <span className="text-[#1E71F2]">OTP</span>
              </h5>
            </div>
            <div>
              <input
                type="email"
                className="mt-[24px] w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="Email address"
                autoComplete="off"
              />
              <Button
                title={"SUBMIT OTP"}
                className={
                  "mt-[17px] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in"
                }
              />
            </div>

            <p>resend the OTP</p>
            <div className="text-center text-[16px] text-[#1E6DE9] font-sans py-[34px]">OR</div>
            <SocialAuthentication />
            <RedirectLink title={"Don't have an account?"} href={"/sign-up"} linkName={"SIGN UP"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
