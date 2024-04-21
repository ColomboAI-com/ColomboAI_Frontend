

import React from 'react'
import { socialAuth } from '@/context/SocialAuthContext'
import Loader from '../Loader'
import { auth } from '@/context/AuthContext'

export default function SocialAuthentication() {

  const { continueWithGoogle, continueWithMeta, continueWithMicrosoft } = socialAuth()
  const { loadings } = auth()

  return (
    <div className="xl:w-[60%] mx-auto sm:flex sm:items-center sm:justify-center sm:gap-[16px] md:flex md:items-center md:justify-center md:gap-[16px] lg:flex lg:items-center lg:justify-center lg:gap-[16px]">
      <div className='flex align-middle bg-opacity-45 rounded-full border-2 border-brandprimary sm:bg-[#E2F2FF] lg:bg-[#E2F2FF] md:bg-[#E2F2FF] p-3 xl:px-[24px] mb-[15px]' onClick={continueWithGoogle}>
        {
          loadings.google ? <Loader /> :
            <img src="/images/auth/google.png" alt="google_logo" className="w-[20.25px] object-cover" /> }
        <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans xl:block sm:hidden lg:hidden md:hidden'>Continue with Google</h6>
      </div>
      <div className='flex align-middle bg-opacity-45 rounded-full border-2 border-brandprimary sm:bg-[#E2F2FF] lg:bg-[#E2F2FF] md:bg-[#E2F2FF] p-3 xl:px-[24px] mb-[15px]' onClick={continueWithMeta}>
        {
          loadings.meta ? <Loader /> :
            <img src="/images/auth/meta.png" alt="meta_logo" className="w-[20.25px] object-cover" />}
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans xl:block sm:hidden lg:hidden md:hidden'>Continue with Meta</h6>
      </div>
      <div className='flex align-middle bg-opacity-45 rounded-full border-2 border-brandprimary sm:bg-[#E2F2FF] lg:bg-[#E2F2FF] md:bg-[#E2F2FF] p-3 xl:px-[24px] mb-[15px]' onClick={continueWithMicrosoft}>
        {
          loadings.microsoft ? <Loader /> :
            <img src="/images/auth/microsoft.png" alt="microsoft_logo" className="w-[20.25px] object-cover" />}
            <h6 className='mx-auto text-[16px] text-[#7A7A7A] font-sans xl:block sm:hidden lg:hidden md:hidden'>Continue with Microsoft</h6>
      </div>
    </div>
  )
}
