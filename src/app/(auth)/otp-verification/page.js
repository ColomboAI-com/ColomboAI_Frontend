'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import ResendOTP from "@/components/auth/ResendOTP"
import { OTPValidation } from "@/components/Validations"
import { auth } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setUserCookies } from "@/utlils/commonFunctions"
import { clearSessionStorage, getSessionStorage } from "@/utlils/utils"
import { isValidOTP } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const OTPVerification = () => {

  const { inputs, setInputs, validations, setValidations, handleInputs, loadings, signUp, signIn, resetAuthValues } = auth()
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
      setUserCookies(res.data)
      router.replace('/')
    }
  }

  return (
    <div className='h-full flex flex-col justify-around'>
      <div className='h-full flex flex-col justify-center'>
        <div>
          <div className='border- w-[55%] mx-auto pt-[75px] xl:block sm:hidden md:hidden lg:block'>
            <img src="/images/auth/Star.svg" className="object-cover mx-auto" alt="welcome_to_colomboai" />
            <h5 className="text-[24px] font-sans text-center">Enter OTP from <span className="text-[#1E71F2]">Email</span></h5>
            <p className="text-[#737373] text-[16px] font-sans text-center">Enter the OTP you received on <span className="text-[#1E71F2]">cr****@gmail.com</span></p>
          </div>
        
          <div className="w-[60%] sm:w-[70%] lg:w-[60%] md:w-[50%] mx-auto mt-[90px]">
          <input
              type="tel"
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-[20px] py-[12px] text-center text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Type verification code"
              autoComplete="off"
              autoFocus
              maxLength={6}
              name={"otp"}
              value={inputs.otp}
              onChange={handleInputs}
            />
            {validations.otp && <OTPValidation value={inputs.otp} />}
            
             <Button
               title={'VERIFY'}
               className="mt-6 block w-full rounded-[40px] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in "
               loading={loadings.auth}
               onClick={onVerify}
            />
            <ResendOTP />
            {/* <p className="text-[16px] text-[#333333] font-sans tracking-[3px] text-center">RE-SEND THE OTP</p> */}
          </div>
        </div>
      </div>
      {/* <AgreeTermAndConditions /> */}
    </div>

  )
}

export default OTPVerification