import React from 'react'

export default function ProfilePicture({ image = '/images/profile/defalut_user.svg', size , className }) {
  return (
    <img
      src={image}
      alt="avatar"
      className={`rounded-full${className ? ` ${className}` : ''} ${size}`}
      // style={{ height: size, width: size }}
    />
  )
}
