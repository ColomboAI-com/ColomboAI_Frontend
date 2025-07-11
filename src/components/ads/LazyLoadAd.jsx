// src/components/ads/LazyLoadAd.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import LargeAdComponent from './LargeAd.jsx';
import VideoAd from './VideoAd.js';
import PostSkeleton from '../skeletons/PostSkeleton.jsx'; // Optional: for a more detailed placeholder

const AdComponents = {
  LargeAd: LargeAdComponent,
  VideoAd: VideoAd,
};

const LazyLoadAd = ({ componentToLoad, placeholderHeight = '250px', adProps = {} }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when the ad comes into view
    threshold: 0.1,    // Trigger when 10% of the ad is visible
    // rootMargin: '200px 0px', // Optional: Load when 200px away from viewport
  });

  const [shouldRenderAd, setShouldRenderAd] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldRenderAd(true);
    }
  }, [inView]);

  const AdComponent = AdComponents[componentToLoad];

  if (!AdComponent) {
    console.error(`LazyLoadAd: Unknown componentToLoad - ${componentToLoad}`);
    return <div ref={ref} style={{ height: placeholderHeight, border: '1px dashed red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Error: Ad type not found.</div>;
  }

  return (
    <div ref={ref} className="lazy-ad-placeholder w-full" style={!shouldRenderAd ? { minHeight: placeholderHeight } : {}}>
      {shouldRenderAd ? (
        <AdComponent {...adProps} />
      ) : (
        // Optional: More detailed skeleton or just a div with minHeight
        // For simplicity, using a div. A PostSkeleton could also be adapted.
        <div style={{
          width: '100%',
          minHeight: placeholderHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#f0f0f0', // Light background for placeholder
          // border: '1px solid #e0e0e0'
        }}>
          {/* Intentionally empty or a very light "Loading Ad..." text if desired */}
        </div>
      )}
    </div>
  );
};

export default LazyLoadAd;
