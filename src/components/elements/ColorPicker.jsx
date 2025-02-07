import React from "react";

const ColorPicker = ({ textColor, setTextColor }) => {
  const colors = [
    "#FFFFFF",
    "#D3D3D3",
    "#000000",
    "#FFFF00",
    "#FFA500",
    "#FF4500",
    "#FF0000",
    "#800080",
    "#0000FF",
    "#00FFFF",
    "#00FF00",
  ];
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white rounded-full px-2 py-1">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-6 h-6 rounded-full border-[0.5px] border-[#ACACAC] ${
            color === textColor ? "!border-2" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => setTextColor(color)}
        ></button>
      ))}
    </div>
  );
};

export default ColorPicker;
