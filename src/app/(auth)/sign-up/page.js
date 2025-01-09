"use client";
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions";
import RedirectLink from "@/components/auth/RedirectLink";
import SocialAuthentication from "@/components/auth/SocialAuthentication";
import { AgeValidation, EmailValidation, NameValidation, UsernameValidation } from "@/components/Validations";
import { useAuth } from "@/context/AuthContext";
import Button from "@/elements/Button";
import { setSessionStorage } from "@/utlils/utils";
import { isValidEmail, isValidName, isValidUserName, isValidAge } from "@/utlils/validate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUp = () => {
  const { inputs, validations, setValidations, handleInputs, loadings, getOTP, resetAuthValues } = useAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("isComingFromSignIn", "SIGN-UP");
    return () => resetAuthValues();
  }, []);

  const onSignUp = async () => {
    if (!isValidUserName(inputs.username)) {
      setValidations((prev) => ({ ...prev, username: true }));
      return;
    }
    if (!isValidName(inputs.name)) {
      setValidations((prev) => ({ ...prev, name: true }));
      return;
    }
    if (!isValidEmail(inputs.email)) {
      setValidations((prev) => ({ ...prev, email: true }));
      return;
    }
    if (!isValidAge(inputs.age)) {
      setValidations((prev) => ({ ...prev, age: true }));
      return;
    }
    localStorage.setItem("userAge", inputs.age);
    const res = await getOTP("sign-up");
    if (res) {
      setSessionStorage("otp-page", "sign-up");
      setSessionStorage("auth-details", JSON.stringify(inputs));
      router.push("/otp-verification");
    }
  };

  return (
    <div className="lg:h-screen lg:overflow-hidden bg-[url('/images/home/star-bg.png')] bg-[length:89%_96%] bg-no-repeat bg-center sm:h-auto">
      <div className="min-h-screen flex justify-center lg:items-center lg:my-[18px] sm:px-[20px]">
        <div className="md:max-w-[380px] xxl:px-[0] lg:px-[0] w-full mx-auto sm:max-w-full sm:w-full md:w-full">
          <div className="">
            <img
              src="/images/auth/Star.svg"
              className="lg:mb-[5px] lg:mx-auto lg:block w-[9.5%] h-[9.5%] sm:hidden md:hidden"
              alt="welcome_to_colomboai"
            />
            <h5 className="text-[1.25rem] font-sans text-center py-[0.08rem]">
              Create an account for <span className="text-[#1E71F2]">Free</span>
            </h5>
          </div>
          <div>
            <div className="w-[85%] mx-auto">
              <input
                type="text"
                className="mt-2 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="Username"
                autoComplete="off"
                maxLength={30}
                name={"username"}
                value={inputs.username}
                onChange={handleInputs}
              />
              {validations.username && <UsernameValidation value={inputs.username} />}
              <input
                type="text"
                className="mt-2 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="Display name"
                autoComplete="off"
                maxLength={50}
                name={"name"}
                value={inputs.name}
                onChange={handleInputs}
              />
              {validations.name && <NameValidation value={inputs.name} />}
              <input
                type="number"
                className="mt-2 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="Age"
                autoComplete="off"
                maxLength={3}
                name={"age"}
                value={inputs.age}
                onChange={handleInputs}
              />
              {validations.age && <AgeValidation value={inputs.age} />}
              <input
                type="email"
                className="mt-2 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="Email address"
                autoComplete="off"
                name={"email"}
                value={inputs.email}
                onChange={handleInputs}
              />
              {validations.email && <EmailValidation value={inputs.email} />}
              <Button
                title={"GET OTP"}
                className={
                  "mt-[0.8rem] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[0.5rem] text-white focus:bg-brandprimary transition duration-300 ease-in"
                }
                loading={loadings.otp}
                onClick={onSignUp}
              />
            </div>
          </div>
          <div className="text-center text-[16px] text-[#1E6DE9] font-sans py-[0.85rem]">OR</div>
          <div className="w-[85%] mx-auto">
            <SocialAuthentication />
          </div>
          <RedirectLink title={"Already have an account?"} href={"/sign-in"} linkName={"LOG IN"} />
          <AgreeTermAndConditions />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
