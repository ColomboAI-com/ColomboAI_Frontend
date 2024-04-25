'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { EmailValidation, NameValidation, PhoneValidation, UsernameValidation } from "@/components/Validations"
import { auth } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setSessionStorage } from "@/utlils/utils"
import { isValidEmail, isValidName, isValidPhone, isValidUserName } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SignUp = () => {

  const { inputs, validations, setValidations, handleInputs, loadings, getOTP, resetAuthValues } = auth()
  const router = useRouter()

  useEffect(() => {
    return () => resetAuthValues()
  }, [])

  const onSignUp = async () => {
    if (!isValidUserName(inputs.username)) {
      setValidations(prev => ({ ...prev, username: true }))
      return
    }
    if (!isValidName(inputs.name)) {
      setValidations(prev => ({ ...prev, name: true }))
      return
    }
    if (inputs.phone && !isValidPhone(inputs.phone)) {
      setValidations(prev => ({ ...prev, phone: true }))
      return
    }
    if (!isValidEmail(inputs.email)) {
      setValidations(prev => ({ ...prev, email: true }))
      return
    }
    const res = await getOTP('sign-up')
    if (res) {
      setSessionStorage('otp-page', 'sign-up')
      setSessionStorage('auth-details', JSON.stringify(inputs))
      router.push('/otp-verification')
    }
  }

  return (
    <div className="lg:h-screen lg:overflow-auto bg-[url('/images/home/star-bg.png')] bg-[length:89%_96%] bg-no-repeat bg-center sm:h-auto">
      <div className=''>
        <div className="max-w-[380px] w-full my-[40px] mx-auto xl:px-[150px] sm:max-w-full sm:w-full sm:px-[25px] sm:mt-[30px] sm:mb-[0] sm:pb-[20px] md:max-w-full md:w-full md:px-[100px] md:mt-[30px] sm2:px-[50px]">
          <div className=''>
            <img src="/images/auth/Star.svg" className="lg:mb-[12px] lg:mx-auto lg:block sm:hidden md:hidden" alt="welcome_to_colomboai" />
            <h5 className="text-[24px] font-sans text-center">Create an account for <span className="text-[#1E71F2]">Free</span></h5>
          </div>

          <div className="">
            <input
              type="text"
              className="mt-4 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
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
              className="mt-4 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Display name"
              autoComplete="off"
              maxLength={50}
              name={"name"}
              value={inputs.name}
              onChange={handleInputs}
            />
            {validations.name && <NameValidation value={inputs.name} />}
            <input
              type="email"
              className="mt-4 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Email address"
              autoComplete="off"
              name={"email"}
              value={inputs.email}
              onChange={handleInputs}
            />
            {validations.email && <EmailValidation value={inputs.email} />}
            <input
              type="tel"
              className="mt-4 w-full rounded-[40px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Phone number (optional)"
              autoComplete="off"
              maxLength={10}
              name={"phone"}
              value={inputs.phone}
              onChange={handleInputs}
            />
            {validations.phone && <PhoneValidation value={inputs.phone} />}
            <Button
              title={'GET OTP'}
              className={'mt-[17px] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in'}
              loading={loadings.otp}
              onClick={onSignUp}
            />
          </div>
          <div className="text-center text-[16px] text-[#1E6DE9] font-sans py-[34px]">OR</div>
          <SocialAuthentication />
          <RedirectLink
            title={'Already have an account?'}
            href={'/sign-in'}
            linkName={'LOG IN'}
          />
          <AgreeTermAndConditions />
        </div>
      </div>

    </div>
  )
}

export default SignUp