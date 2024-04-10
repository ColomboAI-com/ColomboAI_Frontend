'use client'
import SocialAuthentication from '@/components/auth/SocialAuthentication'
import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/elements/Button'
import { EmailValidation, NameValidation, PhoneValidation, UsernameValidation } from '@/components/Validations'
import { AuthContext } from '@/context/AuthContext'
import { isValidEmail, isValidName, isValidPhone, isValidUserName } from '@/utlils/validate'
import { setSessionStorage } from '@/utlils/utils'

const SignUp = () => {

  const { inputs, validations, setValidations, handleInputs, loading, getOTP } = useContext(AuthContext)
  const router = useRouter()

  const onSignUp = async () => {
    if (!isValidUserName(inputs.username)) {
      setValidations({ ...validations, username: true })
      return
    }
    if (!isValidName(inputs.name)) {
      setValidations({ ...validations, name: true })
      return
    }
    if (inputs.phone && !isValidPhone(inputs.phone)) {
      setValidations({ ...validations, phone: true })
      return
    }
    if (!isValidEmail(inputs.email)) {
      setValidations({ ...validations, email: true })
      return
    }
    const res = await getOTP('/otp')
    if (res) {
      setSessionStorage('sign-up-details', JSON.stringify(inputs))
      router.push('/otp')
    }
  }

  return (
    <div className='h-full flex flex-col justify-around'>
      <div className='h-full flex flex-col justify-center'>
        <div>
          <div className='border- w-[50%] mx-auto my-2'>
            <img src="/images/auth/welcome_colomboai.png" alt="welcome_to_colomboai" className="object-cover" />
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
              type="text"
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
              loading={loading}
              onClick={onSignUp}
            />
          </div>
          <div className="my-7 text-center">
            <p className="text-lg text-brandprimary">
              Or Signup with
            </p>
          </div>
          <SocialAuthentication />
          <div className="my-3 text-center">
            <p className="text-lg">
              Already have an account?
              <Link href='/login' className='text-brandprimary focus:text-brandprimary'>
                &nbsp;Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="my-2 text-center">
        <p className="text-lg text-[#A7A7A7]">
          By using our service you are agreeing <br /> to our Term and Conditions
        </p>
      </div>
    </div>
  )
}

export default SignUp