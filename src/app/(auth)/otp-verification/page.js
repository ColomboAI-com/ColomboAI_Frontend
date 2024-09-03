'use client'
import ResendOTP from "@/components/auth/ResendOTP"
import { OTPValidation } from "@/components/Validations"
import { useAuth } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { getShortEmail, getShortPhone, setUserCookies } from "@/utlils/commonFunctions"
import { clearSessionStorage, getSessionStorage } from "@/utlils/utils"
import { isValidOTP } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const OTPVerification = () => {

  const { inputs, setInputs, validations, setValidations, handleInputs, loadings, signUp, signIn, resetAuthValues, newdevice } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const userDetails = getSessionStorage('auth-details')
    if (userDetails)
      setInputs(prev => ({ ...prev, ...JSON.parse(userDetails) }))
    return () => {
      clearSessionStorage()
      resetAuthValues()
    }
  }, [])

  const onVerify = async () => {
    if (!isValidOTP(inputs.otp)) {
      setValidations(prev => ({ ...prev, otp: true }))
      return
    }
    let res
    if (getSessionStorage('otp-page') === 'sign-up') res = await signUp()
    else res = await signIn()
    if (res) {
      console.log(res.data);
      setUserCookies(res.data)
      setTimeout(() => router.replace('/'), 2000);
    }
  }

  return (
    <div className="lg:h-screen lg:overflow-auto bg-[url('/images/home/star-bg.png')] bg-[length:89%_96%] bg-no-repeat bg-center sm:h-auto">
      <div className='min-h-screen flex justify-center lg:items-center sm:px-[20px]'>
        <div className="md:max-w-[380px] xxl:px-[0] lg:px-[0] w-full mx-auto sm:max-w-full sm:w-full md:w-full">
          <div>
            <img src="/images/auth/Star.svg" className="mb-[12px] object-cover mx-auto sm:hidden md:block" alt="welcome_to_colomboai" />
            <h5 className="text-[24px] font-sans text-center mb-[0px] text-[#656565]">Enter OTP 
              {/* from <span className="text-[#1E71F2]">Email</span> */}
            </h5>
            <p className="text-[#737373] text-[16px] font-sans text-center lg:mt-[10px] lg:block sm:grid sm:mt-[35px]">
              Enter the OTP you received on 
              <br/>
              <span className="text-[#1E71F2]"> {getShortEmail(inputs.email)}</span> {inputs.phone == "" ? null : '&'} {inputs.phone == "" ? null : <span className="text-[#1E71F2]"> {getShortPhone(inputs.phone)}</span>}
            </p>
          </div>
          <div>
            <input
              type="tel"
              className="mt-4 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-left text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Enter OTP from Email"
              autoComplete="off"
              autoFocus
              maxLength={6}
              name={"otp"}
              value={inputs.otp}
              onChange={handleInputs}
            />
            {inputs.phone == "" ? null : <input
              type="tel"
              className="mt-4 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-left text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Enter OTP from Phone"
              autoComplete="off"
              autoFocus
              maxLength={6}
              name={"otp"}
              value={inputs.otp}
              onChange={handleInputs}
            />}
            {validations.otp && <OTPValidation value={inputs.otp} />}
            <Button
              title={'VERIFY'}
              className="mt-[17px] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in"
              loading={loadings.auth}
              onClick={onVerify}
            />
            <ResendOTP />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification