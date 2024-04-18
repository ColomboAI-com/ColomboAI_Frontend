

import React from 'react'
import { UserAuth } from '@/AuthfireBaseContext/fireAuthContext';

export default function SocialAuthentication() {

  const { googleSignIn,user,signInWithMicrosoft ,signInWithFacebook} = UserAuth();
  console.log('user', user)

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      await signInWithMicrosoft();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="flex justify-between w-[25%] mx-auto">
      <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3' onClick={handleGoogleSignIn}>
        <img src="/images/auth/google.png" alt="google_logo" className="w-8 object-cover" />
      </button>
      <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3' onClick={handleFacebookSignIn}>
        <img src="/images/auth/meta.png" alt="meta_logo" className="w-8 object-cover" />
      </button>
      <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3' onClick={handleMicrosoftSignIn}>
        <img src="/images/auth/microsoft.png" alt="microsoft_logo" className="w-8 object-cover" />
      </button>
    </div>
  )
}
