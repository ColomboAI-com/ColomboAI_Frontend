"use client";

import RedirectLink from "@/components/auth/RedirectLink";
import { useAuth } from "@/context/AuthContext";
import Button from "@/elements/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { startAuthentication } from "@simplewebauthn/browser";
import { isValidUserName } from "@/utlils/validate";

const SignIn = () => {
  const {
    inputs,
    validations,
    setValidations,
    handleInputs,
    resetAuthValues,
    passKeySignInStart,
    passKeySignInFinish,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    return () => resetAuthValues();
  }, []);

  const onSignUp = async () => {
    if (!isValidUserName(inputs.username)) {
      setValidations((prev) => ({ ...prev, username: true }));
      return;
    }

    try {
      console.log("SIGN IN START");
      const optionsJSON = await passKeySignInStart();
      console.log(optionsJSON);
      if (!optionsJSON) {
        return;
      }

      let asseResp;
      // Pass the options to the authenticator and wait for a response
      asseResp = await startAuthentication({ optionsJSON });
      console.log("AUTHENTICATION RESP");
      console.log(asseResp);
      console.log("VERIFICATION START");
      let verif = await passKeySignInFinish({ data: asseResp });
      console.log("SIGN IN FINISH\nVERIF:");
      console.log(verif);
    } catch (error) {
      // Some basic error handling
      if (error.name === "InvalidStateError") {
        console.log("Error: Authenticator was probably already registered by user");
      } else {
        console.log(error);
      }
    }
  };
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
                Enter your <span className="text-[#1E71F2]">Username</span>
              </h5>
            </div>
            <div>
              <input
                type="text"
                className="mt-2 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="your name"
                autoComplete="off"
                maxLength={30}
                name={"username"}
                value={inputs.username}
                onChange={handleInputs}
              />
              {validations.username && <UsernameValidation value={inputs.username} />}
              <Button
                title={"LOGIN"}
                className={
                  "mt-[17px] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in"
                }
                onClick={onSignUp}
              />
            </div>

            {/* <p>resend the OTP</p>
            <div className="text-center text-[16px] text-[#1E6DE9] font-sans py-[34px]">OR</div>
            <SocialAuthentication /> */}
            <RedirectLink title={"Don't have an account?"} href={"/passkey/sign-up"} linkName={"SIGN UP"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
