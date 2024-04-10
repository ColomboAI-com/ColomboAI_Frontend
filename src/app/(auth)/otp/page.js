'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { PiWarningOctagonBold } from "react-icons/pi";

const OTP = () => {

    const [inputOtp, setInputOtp] = useState('');
    const [status, setStatus] = useState('');

    const inputRef = useRef();
    
    const testOtp = '123456'

    const CheckTestOtp = () => {
        if (inputOtp === testOtp) {
            setTimeout(() => {
                setStatus('valid')
            }, 2000);
        } else {
            setTimeout(() => {
                setStatus('not-valid')
            }, 2000);
        }
    } 
    const handleCheckOtp = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
            CheckTestOtp();
        }
      };

      useEffect(() => {
        if (inputOtp === '') {
            setStatus('')
        }
      }, [inputOtp])
      

    return (
      <div className="h-full flex flex-col justify-around">
        <div className="h-full flex flex-col justify-center">
          <div className="h-[80%]">
            <div className="border- w-[50%] mx-auto my-2">
              <img
                src="../images/colomboai.png"
                alt="colomboai"
                className="object-cover"
              />
            </div>
            <div className="my-2 text-center">
              <p className="text-3xl my-2 tracking-wide text-brandprimary">
                Verification
              </p>
              <p className="text-lg">
                A message with verification code <br /> was sent to your
                registered E-mail ID
              </p>
            </div>
            <div className="w-[60%] mt-8 mx-auto" onSubmit={CheckTestOtp}>
              <div className=" inline-flex w-full items-center">
                <input
                  type="password"
                  name="code"
                  ref={inputRef}
                  onChange={(e) => setInputOtp(e.target.value)}
                  onKeyUp={handleCheckOtp}
                  placeholder="Type verification code"
                  className={`my-2 w-full rounded-[40px]  
                  text-center placeholder:text-2xl placeholder:text-left border-2 border-brandprimary bg-white text-black placeholder:text-brandplaceholder  focus:bg-white focus:outline-none 
                  ${inputOtp === "" ? "text-[40px]" : "text-[60px]"} 
                  ${inputOtp === "" ? "px-7 py-4" : "py-1"}
                  ${status === "not-valid"
                    ? "border-red-400"
                    : status === "valid"
                    ? "border-green-400"
                    : "border-brandprimary"
                  }`}
                  required
                />
                {status === "not-valid" && (
                  <PiWarningOctagonBold className=" -m-14 text-red-400 w-6 h-6" />
                )}
              </div>

              {status !== "valid" && (
                <>
                    <div className="my-7 text-center">
                        <button className="text-lg text-brandprimary">
                        Re-send verification code
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => CheckTestOtp()}
                        className="mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in "
                    >
                        Verify
                    </button>
                </>
                )}
            </div>
          </div>
        </div>
        <div className="my-2 text-center">
          <p className="text-lg text-[#A7A7A7]">
            By using our service you are agreeing <br /> to our Term and
            Conditions
          </p>
        </div>
      </div>
    );
}

export default OTP;