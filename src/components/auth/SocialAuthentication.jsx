

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
    <div className="sm:flex sm:items-center sm:justify-center sm:gap-[16px]">
      <div className='flex align-middle bg-opacity-45 rounded-full border-[1px] border-brandprimary sm:bg-[#E2F2FF]  p-3 2xl:px-[24px] xl:px-[24px] mb-[15px] cursor-pointer' onClick={() => handleSocialAuthentication('google')}>
        <img src="/images/auth/google.svg" alt="google_logo" className="w-[20.25px] object-cover" />
        {
          loadings.google ? <Loader /> :
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans sm:hidden'>Continue with Google</h6>
        }
      </div>
      <div className='flex align-middle bg-opacity-45 rounded-full border-[1px] border-brandprimary sm:bg-[#E2F2FF] p-3 2xl:px-[24px] xl:px-[24px] mb-[15px] cursor-pointer' onClick={() => handleSocialAuthentication('meta')}>
        <img src="/images/auth/meta.svg" alt="meta_logo" className="w-[20.25px] object-cover" />
        {
          loadings.meta ? <Loader /> :
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans 2xl:block xl:block sm:hidden'>Continue with Meta</h6>
        }
      </div>
      <div className='flex align-middle bg-opacity-45 rounded-full border-[1px] border-brandprimary sm:bg-[#E2F2FF] p-3 2xl:px-[24px] xl:px-[24px] mb-[15px] cursor-pointer' onClick={() => handleSocialAuthentication('microsoft')}>
        <img src="/images/auth/microsoft.svg" alt="microsoft_logo" className="w-[20.25px] object-cover" />
        {
          loadings.microsoft ? <Loader /> :
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans 2xl:block xl:block sm:hidden'>Continue with Microsoft</h6>
        }
      </div>
    </div>
  )
}
