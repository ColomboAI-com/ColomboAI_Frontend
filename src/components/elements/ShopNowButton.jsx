import React from 'react';

const ShopNowButton = ({ title, description, ctaText }) => {
  return (
    <div className="absolute left-4 bottom-20 w-[320px] rounded-xl overflow-hidden bg-gradient-to-br from-indigo-400 to-blue-300 shadow-lg">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-white mt-1">{description}</p>
        </div>
        <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold self-start hover:bg-blue-50 transition-colors">
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default ShopNowButton;