/* eslint-disable @next/next/no-img-element */
import SocialAuthentication from '@/components/auth/SocialAuthentication';
import Link from 'next/link';

const Login = () => {
  return (
    <div className='h-full flex flex-col justify-around'>
      <div className='h-full flex flex-col justify-center'>
        <div>
          <div className='border- w-[50%] mx-auto my-2'>
            <img src="/images/auth/welcome_back_colomboai.png" alt="welcome_back_to_colomboai" className="object-cover" />
          </div>
          <form className="w-[60%] mt-8 mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="my-2 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white  focus:outline-none "
              required
            />
            <button
              type="submit"
              className="mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in "
            >
              Get OTP
            </button>
          </form>
          <div className="my-7 text-center">
            <p className="text-lg text-brandprimary">
              Or Login with
            </p>
          </div>
          <SocialAuthentication />
          <div className="my-12 text-center">
            <p className="text-lg ">
              Don’t have an account?
              <Link href='/signup' className='text-brandprimary focus:text-brandprimary'>
                &nbsp;Signup
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
  );
}

export default Login;