import React from 'react'

export default function ProfilePicture({ image = '/images/profile/defalut_user.svg', size = 42, className }) {
  return (
    <img
      src={image}
      alt="avatar"
      className={`rounded-full${className ? ` ${className}` : ''}`}
      height={size}
      width={size}
    />
  )
}
