'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { MessageBox } from "@/components/MessageBox"
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
    <div className='xl:h-full xl:flex xl:flex-col xl:justify-around'>
      <div className='h-full flex flex-col justify-center'>
        <div>
          <div className='border- w-[50%] mx-auto mt-[44px] xl:block sm:hidden md:hidden lg:hidden'>
            <img src="/images/auth/Star.svg" className="object-cover mx-auto" alt="welcome_to_colomboai" />
            <h5 className="text-[24px] font-sans text-center">Create an account for <span className="text-[#1E71F2]">Free</span></h5>
          </div>
        
          <div className="xl:w-[60%] sm:w-[70%] lg:w-[70%] md:w-[50%] mx-auto">
          <input
              type="email"
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Email address"
              autoComplete="off"
              name={"email"}
              value={inputs.email}
              onChange={handleInputs}
            />
            
            {validations.email && <EmailValidation value={inputs.email} />}
            <Button
              title={'Sign in'}
              className={'mt-6 block w-full rounded-[40px] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in'}
              loading={loadings.otp}
              onClick={onSignIn}
            />
          </div>
          <div className="text-center text-[16px] text-[#1E6DE9] font-sans py-[34px]">OR</div>
          <SocialAuthentication />
          <RedirectLink
            title={'Don’t have an account?'}
            href={'/sign-up'}
            linkName={'Sign up'}
          />
        </div>
      </div>
      <AgreeTermAndConditions />
    </div>

    // <div className='h-full flex flex-col justify-around'>
    //   <div className='h-full flex flex-col justify-center'>
    //     <div>
    //       <div className='border- w-[50%] mx-auto my-2'>
    //         <img src="/images/auth/welcome_back_colomboai.png" className="object-cover" alt="welcome_back_to_colomboai" />
    //       </div>
    //       <div className="w-[60%] mt-8 mx-auto">
    //         <input
    //           type="email"
    //           className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
    //           placeholder="Email address"
    //           autoComplete="off"
    //           name={"email"}
    //           value={inputs.email}
    //           onChange={handleInputs}
    //         />
    //         {validations.email && <EmailValidation value={inputs.email} />}
    //         <Button
    //           title={'Sign in'}
    //           className={'mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in'}
    //           loading={loadings.otp}
    //           onClick={onSignIn}
    //         />
    //       </div>
    //       <SocialAuthentication />
    //       <RedirectLink
    //         title={'Don’t have an account?'}
    //         href={'/sign-up'}
    //         linkName={'Sign up'}
    //       />
    //     </div>
    //   </div>
    //   <AgreeTermAndConditions />
    // </div>
  )
}

export default SignIn