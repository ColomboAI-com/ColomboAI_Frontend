'use client'
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { EmailValidation } from "@/components/Validations"
import { auth } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setSessionStorage } from "@/utlils/utils"
import { isValidEmail } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SignIn = () => {

  const { inputs, validations, setValidations, handleInputs, loadings, getOTP, resetAuthValues } = auth()
  const router = useRouter()

  useEffect(() => {
    return () => resetAuthValues()
  }, [])

  const onSignIn = async () => {
    if (!isValidEmail(inputs.email)) {
      setValidations(prev => ({ ...prev, email: true }))
      return
    }
    const res = await getOTP()
    if (res) {
      setSessionStorage('otp-page', 'sign-in')
      setSessionStorage('auth-details', JSON.stringify(inputs))
      router.push('/otp-verification')
    }
  }

  return (
    <div className="lg:h-screen lg:overflow-auto bg-[url('/images/home/star-bg.png')] bg-[length:89%_96%] bg-no-repeat bg-center sm:h-auto">
      <div className='min-h-screen flex justify-center lg:items-center sm:px-[20px]'>
        <div className="md:max-w-[380px] xxl:px-[0] lg:px-[0] w-full mx-auto sm:max-w-full sm:w-full md:max-w-full md:w-full">
          <div className='xl:block sm:hidden md:hidden lg:block'>
            <img src="/images/auth/Star.svg" className="mb-[12px] object-cover mx-auto sm:hidden md:hidden" alt="welcome_to_colomboai" />
            <h5 className="text-[24px] font-sans text-center font-[450]">Hello, <span className="text-[#1E71F2]">Welcome back</span></h5>
          </div>
          <div>
            <input
              type="email"
              className="mt-[24px] w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Email address"
              autoComplete="off"
              name={"email"}
              value={inputs.email}
              onChange={handleInputs}
            />
            {validations.email && <EmailValidation value={inputs.email} />}
            <Button
              title={'GET OTP'}
              className={'mt-[17px] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in'}
              loading={loadings.otp}
              onClick={onSignIn}
            />
          </div>
          <div className="text-center text-[16px] text-[#1E6DE9] font-sans py-[34px]">OR</div>
          <SocialAuthentication />
          <RedirectLink
            title={'Don’t have an account?'}
            href={'/sign-up'}
            linkName={'Sign Up'}
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn