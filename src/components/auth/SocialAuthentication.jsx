

import React from 'react'
import { socialAuth } from '@/context/SocialAuthContext'
import Loader from '../Loader'
import { auth } from '@/context/AuthContext'

export default function SocialAuthentication() {

  const { continueWithGoogle, continueWithMeta, continueWithMicrosoft } = socialAuth()
  const { loadings } = auth()

  return (
    <div className="flex justify-between w-[25%] mx-auto">
      <div className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3' onClick={continueWithGoogle}>
        {
          loadings.google ? <Loader /> :
            <img src="/images/auth/google.png" alt="google_logo" className="w-8 object-cover" />}
      </div>
      <div className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3' onClick={continueWithMeta}>
        {
          loadings.meta ? <Loader /> :
            <img src="/images/auth/meta.png" alt="meta_logo" className="w-8 object-cover" />}
      </div>
      <div className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3' onClick={continueWithMicrosoft}>
        {
          loadings.microsoft ? <Loader /> :
            <img src="/images/auth/microsoft.png" alt="microsoft_logo" className="w-8 object-cover" />}
      </div>
    </div>
  )
}
