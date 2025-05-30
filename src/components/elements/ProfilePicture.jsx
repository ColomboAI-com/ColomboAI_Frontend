import React from 'react';
import Image from 'next/image';

export default function ProfilePicture({ image = '/images/profile/defalut_user.svg', size, className }) {
  // The 'size' prop is expected to provide Tailwind classes for width and height (e.g., "w-10 h-10")
  // The 'className' prop can be used for additional custom styling if needed.
  return (
    <div className={`relative overflow-hidden rounded-full${className ? ` ${className}` : ''} ${size}`}>
      <Image
        src={image}
        alt="avatar"
        layout="fill"
        objectFit="cover" // Ensures the image covers the area, might crop if aspect ratio mismatches
        // If you want to ensure the entire image is visible without cropping, and it might leave empty space, use "contain"
        // objectFit="contain"
      />
    </div>
  );
}
