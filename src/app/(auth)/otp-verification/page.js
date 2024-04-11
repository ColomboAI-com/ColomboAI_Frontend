'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import ResendOTP from "@/components/auth/ResendOTP"
import { OTPValidation } from "@/components/Validations"
import { AuthContext } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setUserCookies } from "@/utlils/commonFunctions"
import { clearSessionStorage, getSessionStorage } from "@/utlils/utils"
import { isValidOTP } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

const OTPVerification = () => {

  const { inputs, setInputs, validations, setValidations, handleInputs, loadingAuth, signUp, signIn } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const userDetails = getSessionStorage('auth-details')
    if (userDetails)
      setInputs(prev => ({ ...prev, ...JSON.parse(userDetails) }))
    return () => clearSessionStorage()
  }, [])

  const onVerify = async () => {
    if (!isValidOTP(inputs.otp)) {
      setValidations(prev => ({ ...prev, otp: true }))
      return
    }
    let res
    if (getSessionStorage('otp-page') === 'SIGNUP') res = await signUp()
    else res = await signIn()
    if (res) {
      setUserCookies(res.data)
      router.push('/')
    }
  }

  return (
    <div className="h-full flex flex-col justify-around">
      <div className="h-full flex flex-col justify-center">
        <div className="h-[80%]">
          <div className="border- w-[50%] mx-auto my-2">
            <img src="/images/auth/colomboai.png" className="object-cover" alt="colomboai" />
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
          <div className="w-[60%] mt-8 mx-auto">
            <input
              type="tel"
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-center text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Enter OTP"
              autoComplete="off"
              maxLength={6}
              name={"otp"}
              value={inputs.otp}
              onChange={handleInputs}
            />
            {validations.otp && <OTPValidation value={inputs.otp} />}
            <ResendOTP />
            <Button
              title={'Verify'}
              className="mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in "
              loading={loadingAuth}
              onClick={onVerify}
            />
          </div>
        </div>
      </div>
      <AgreeTermAndConditions />
    </div>
  )
}

export default OTPVerification