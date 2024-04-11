'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { EmailValidation, NameValidation, PhoneValidation, UsernameValidation } from "@/components/Validations"
import { AuthContext } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setSessionStorage } from "@/utlils/utils"
import { isValidEmail, isValidName, isValidPhone, isValidUserName } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const SignUp = () => {

  const { inputs, validations, setValidations, handleInputs, loadings, getOTP, resetAuthValues } = useContext(AuthContext)
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
    <div className='h-full flex flex-col justify-around'>
      <div className='h-full flex flex-col justify-center'>
        <div>
          <div className='border- w-[50%] mx-auto my-2'>
            <img src="/images/auth/welcome_colomboai.png" className="object-cover" alt="welcome_to_colomboai" />
          </div>
          <div className="w-[60%] mx-auto">
            <input
              type="text"
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
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
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
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
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Email address"
              autoComplete="off"
              name={"email"}
              value={inputs.email}
              onChange={handleInputs}
            />
            {validations.email && <EmailValidation value={inputs.email} />}
            <input
              type="tel"
              className="mt-4 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Phone number (optional)"
              autoComplete="off"
              maxLength={10}
              name={"phone"}
              value={inputs.phone}
              onChange={handleInputs}
            />
            {validations.phone && <PhoneValidation value={inputs.phone} />}
            <Button
              title={'Sign up'}
              className={'mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in'}
              loading={loadings.otp}
              onClick={onSignUp}
            />
          </div>
          <SocialAuthentication />
          <RedirectLink
            title={'Already have an account?'}
            href={'/sign-in'}
            linkName={'Sign in'}
          />
        </div>
      </div>
      <AgreeTermAndConditions />
    </div>
  )
}

export default SignUp