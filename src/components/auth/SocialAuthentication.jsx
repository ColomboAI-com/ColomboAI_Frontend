import React from 'react'

export default function SocialAuthentication() {
  return (
    <div>
      <div className="my-7 text-center">
        <p className="text-lg text-brandprimary">
          Or continue with
        </p>
      </div>
      <div className="flex justify-between w-[25%] mx-auto">
        <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
          <img src="/images/auth/google.png" className="w-8 object-cover" alt="google_logo" />
        </button>
        <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
          <img src="/images/auth/meta.png" className="w-8 object-cover" alt="meta_logo" />
        </button>
        <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
          <img src="/images/auth/microsoft.png" className="w-8 object-cover" alt="microsoft_logo" />
        </button>
      </div>
    </div>
  )
}
