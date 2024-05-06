import React from 'react'

export default function ProfilePicture({ image = '/images/profile/defalut_user.svg', size = 42, className }) {
  return (
    <img
      src={image}
      alt="avatar"
      className={`rounded-full${className ? ` ${className}` : ''}`}
      style={{ height: size, width: size }}
    />
  )
}
