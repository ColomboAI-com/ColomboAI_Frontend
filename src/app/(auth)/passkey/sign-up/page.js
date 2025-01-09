"use client";
import { AgeValidation, NameValidation, UsernameValidation } from "@/components/Validations";
import { useAuth } from "@/context/AuthContext";
import Button from "@/elements/Button";
import { isValidName, isValidUserName, isValidAge } from "@/utlils/validate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { startRegistration } from "@simplewebauthn/browser";
import RedirectLink from "@/components/auth/RedirectLink";
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions";
import { setUserCookies } from "@/utlils/commonFunctions";
import { getCookie } from "cookies-next";

const SignUp = () => {
  const {
    inputs,
    validations,
    setValidations,
    handleInputs,
    loadings,
    resetAuthValues,
    passKeySignUpStart,
    passKeySignUpFinish,
    setInputData,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/sign-in");
    }
    const dispName = getCookie("name") ? getCookie("name").split(" ").join("_") : "";
    setInputData(getCookie("username"), dispName);
    return () => resetAuthValues();
  }, []);

  // const validateUserInputs = () => {
  //   // Username regex
  //   const usernameRegex = /^(?!.*(?:admin|Colombo|ColomboAI))[a-zA-Z0-9_]{5,30}$/;

  //   // Display name regex
  //   const displayNameRegex = /^(?!.*(?:admin|Colombo|ColomboAI)).{1,50}$/;

  //   // Check username
  //   if (!usernameRegex.test(inputs.username)) {
  //     return {
  //       isValid: false,
  //       error:
  //         "Username must be 5-30 characters long, contain only letters, numbers, and underscores, and cannot contain 'admin', 'Colombo', or 'ColomboAI'.",
  //     };
  //   }

  //   // Check display name
  //   if (!displayNameRegex.test(inputs.name)) {
  //     return {
  //       isValid: false,
  //       error:
  //         "Display name must be 1-50 characters long and cannot contain 'admin', 'Colombo', or 'ColomboAI'.",
  //     };
  //   }

  //   return {
  //     isValid: true,
  //     error: null,
  //   };
  // };

  const onSignUp = async () => {
    // if (!isValidUserName(inputs.username)) {
    //   setValidations((prev) => ({ ...prev, username: true }));
    //   return;
    // }
    // if (!isValidName(inputs.name)) {
    //   setValidations((prev) => ({ ...prev, name: true }));
    //   return;
    // }
    if (!isValidAge(inputs.age)) {
      setValidations((prev) => ({ ...prev, age: true }));
      return;
    }

    // let check = validateUserInputs();
    // if (!check.isValid) {
    //   alert(check.error);
    //   return;
    // }

    try {
      const optionsJSON = await passKeySignUpStart();

      if (!optionsJSON) {
        return;
      }

      let attResp;
      // Pass the options to the authenticator and wait for a response
      attResp = await startRegistration({ optionsJSON });
      let verif = await passKeySignUpFinish({ data: attResp });
      if (verif) {
        setUserCookies(verif.data);
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      }
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
              Register your passkey for <span className="text-[#1E71F2]">secure acesss</span>
            </h5>
          </div>
          <div>
            <div className="w-[85%] mx-auto">
              <input
                type="text"
                className="mt-2 w-full rounded-[40px] border-[1px] px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none bg-gray-400"
                placeholder="Enter a UserName for your profile"
                autoComplete="off"
                maxLength={30}
                name={"username"}
                value={`UserName: ${inputs.username}`}
                // onChange={handleInputs}
                disabled={true}
              />
              {validations.username && <UsernameValidation value={inputs.username} />}
              {/* <input
                type="text"
                className="mt-2 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[0.5rem] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
                placeholder="Email"
                autoComplete="off"
                maxLength={50}
                name={"email"}
                value={inputs.email}
                // onChange={handleInputs}
                disabled={true}
              /> */}
              {/* {validations.email && <NameValidation value={inputs.email} />} */}
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
              <Button
                title={"CONTINUE"}
                className={
                  "mt-[0.8rem] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[0.5rem] text-white focus:bg-brandprimary transition duration-300 ease-in"
                }
                // loading={loadings.otp}
                onClick={onSignUp}
              />
            </div>
          </div>

          <br />

          <div className="text-center text-[16px]  font-sans ">
            you"ll be prompted to use biometrics or your devices PIN
          </div>

          <RedirectLink
            title={"Already have an account?"}
            href={"/passkey/sign-in"}
            linkName={"LOG IN WITH PASSKEY"}
          />
          <AgreeTermAndConditions />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
