import React, { useEffect, useState } from 'react';
// Trying alternative import path for Heroicons
import { HeartIcon } from '@heroicons/react/solid';

const MediaLikeAnimation = ({ onAnimationEnd }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount
    setVisible(true);
    const timer1 = setTimeout(() => {
      setAnimate(true); // Start scale-up and fade-in
    }, 50); // Short delay to ensure transition is applied

    // Animation sequence
    const timer2 = setTimeout(() => {
      // After scaling up, start scaling down and fading out
      setAnimate(false);
    }, 400); // Start fade out after 0.4s (total visible time around 0.8s-1s)

    const timer3 = setTimeout(() => {
      setVisible(false);
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    }, 800); // Completely hidden after 0.8s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAnimationEnd]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out pointer-events-none ${
        animate ? 'opacity-100 transform scale-110' : 'opacity-0 transform scale-125'
      }`}
      style={{ zIndex: 10 }} // Ensure it's above the media
    >
      <HeartIcon
        className={`w-20 h-20 sm:w-24 sm:h-24 text-white transition-opacity duration-500 ${
          animate ? 'opacity-80' : 'opacity-0' // Heart itself fades slightly slower than container for effect
        }`}
        // style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))' }} // Optional drop shadow
      />
    </div>
  );
};

export default MediaLikeAnimation;
