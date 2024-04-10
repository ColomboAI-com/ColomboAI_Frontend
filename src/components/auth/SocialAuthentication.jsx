import React from 'react'

export default function SocialAuthentication() {
  return (
    <div className="flex justify-between w-[25%] mx-auto">
      <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
        <img src="/images/auth/google.png" alt="google_logo" className="w-8 object-cover" />
      </button>
      <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
        <img src="/images/auth/meta.png" alt="meta_logo" className="w-8 object-cover" />
      </button>
      <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
        <img src="/images/auth/microsoft.png" alt="microsoft_logo" className="w-8 object-cover" />
      </button>
    </div>
  )
}
