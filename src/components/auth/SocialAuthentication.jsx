

import React from 'react'
import { socialAuth } from '@/context/SocialAuthContext'
import Loader from '../Loader'
import { auth } from '@/context/AuthContext'

export default function SocialAuthentication() {

  const { continueWithGoogle, continueWithMeta, continueWithMicrosoft, setSelectedProvider } = socialAuth()
  const { loadings } = auth()

  const handleSocialAuthentication = (provider) => {
    setSelectedProvider(provider)
    if (provider === 'google') continueWithGoogle()
    if (provider === 'meta') continueWithMeta()
    if (provider === 'microsoft') continueWithMicrosoft()
  }

  return (
    <div className="md:block sm:flex sm:items-center sm:justify-center sm:gap-[16px] lg:block">
      <div className='flex items-center bg-opacity-45 rounded-full border-[1px] border-brandprimary md:w-full md:h-auto md:bg-transparent md:px-[24px] md:py-[13px] sm:bg-[#E2F2FF] sm:w-[40px] sm:h-[40px] sm:px-[10px] sm:py-[10px] 2xl:px-[24px] px-[24px] py-[13px] mb-[15px] cursor-pointer lg:bg-transparent' onClick={continueWithGoogle}>
        {
          loadings.google ? <Loader /> :
            <img src="/images/auth/google.svg" alt="google_logo" className="w-[20.25px] sm:w-[20px] sm:h-[20px] object-cover" /> }
        <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans 2xl:block xl:block sm:hidden md:block lg:block lg:font-[500]'>Continue with Google</h6>
      </div>
      <div className='flex items-center bg-opacity-45 rounded-full border-[1px] border-brandprimary md:w-full md:h-auto md:bg-transparent md:px-[24px] md:py-[13px] sm:bg-[#E2F2FF] sm:w-[40px] sm:h-[40px] sm:px-[10px] sm:py-[10px]  2xl:px-[24px] px-[24px] py-[13px] mb-[15px] cursor-pointer lg:bg-transparent' onClick={continueWithMeta}>
        {
          loadings.meta ? <Loader /> :
            <img src="/images/auth/meta.svg" alt="meta_logo" className="w-[20.25px] sm:w-[20px] sm:h-[20px] object-cover" />}
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans 2xl:block xl:block sm:hidden md:block lg:block lg:font-[500]'>Continue with Meta</h6>
      </div>
      <div className='flex items-center bg-opacity-45 rounded-full border-[1px] border-brandprimary md:w-full md:h-auto md:bg-transparent md:px-[24px] md:py-[13px] sm:bg-[#E2F2FF] sm:w-[40px] sm:h-[40px] sm:px-[10px] sm:py-[10px] 2xl:px-[24px] px-[24px] py-[13px] mb-[12px] cursor-pointer lg:bg-transparent' onClick={continueWithMicrosoft}>
        {
          loadings.microsoft ? <Loader /> :
            <img src="/images/auth/microsoft.svg" alt="microsoft_logo" className="w-[20.25px] sm:w-[20px] sm:h-[20px] object-cover" />}
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans 2xl:block xl:block sm:hidden md:block lg:block lg:font-[500]'>Continue with Microsoft</h6>
      </div>
    </div>
  )
}
