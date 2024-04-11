'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { EmailValidation } from "@/components/Validations"
import { AuthContext } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setSessionStorage } from "@/utlils/utils"
import { isValidEmail } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

const SignIn = () => {

  const { inputs, validations, setValidations, handleInputs, loadings, getOTP, resetAuthValues } = useContext(AuthContext)
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
    <div className='h-full flex flex-col justify-around'>
      <div className='h-full flex flex-col justify-center'>
        <div>
          <div className='border- w-[50%] mx-auto my-2'>
            <img src="/images/auth/welcome_back_colomboai.png" className="object-cover" alt="welcome_back_to_colomboai" />
          </div>
          <div className="w-[60%] mt-8 mx-auto">
            <input
              type="email"
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Email address"
              autoComplete="off"
              name={"email"}
              value={inputs.email}
              onChange={handleInputs}
            />
            {validations.email && <EmailValidation value={inputs.email} />}
            <Button
              title={'Sign in'}
              className={'mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in'}
              loading={loadings.otp}
              onClick={onSignIn}
            />
          </div>
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
  )
}

export default SignIn