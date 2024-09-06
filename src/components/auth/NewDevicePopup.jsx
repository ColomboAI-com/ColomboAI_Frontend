// export default function NewDevicePopup({ onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
//         <p className="text-lg font-bold mb-4">
//           Do you want to register this device with ColomboAI?
//         </p>
//         <p className="text-gray-600 mb-6">
//           It will help us remember your device!
//         </p>
//         <button
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 w-full"
//           onClick={onConfirm}
//         >
//           ✅ YES, REGISTER THIS DEVICE!
//         </button>
//         <button
//           className="bg-gray-400 text-white py-2 px-4 rounded-lg w-full"
//           onClick={onCancel}
//         >
//           ❌ NO, USE THIS ONCE OR TEMPORARILY.
//         </button>
//         <p className="text-xs text-gray-500 mt-4">
//           Thanks for being awesome! 😊
//         </p>
//       </div>
//     </div>
//   );
// }

// import React from "react";

// const NewDevicePopup = ({ onConfirm, onCancel }) => {
//   return (
//     <div style={overlayStyle}>
//       <div style={popupStyle}>
//         <p style={titleStyle}>
//           Do you want to register this device with ColomboAI?
//         </p>
//         <p style={subtitleStyle}>It will help us remember your device!</p>
//         <button style={confirmButtonStyle} onClick={onConfirm}>
//           ✅ YES, REGISTER THIS DEVICE!
//         </button>
//         <button style={cancelButtonStyle} onClick={onCancel}>
//           ❌ NO, USE THIS ONCE OR TEMPORARILY.
//         </button>
//         <p style={footerStyle}>Thanks for being awesome! 😊</p>
//       </div>
//     </div>
//   );
// };

// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 50,
// };

// const popupStyle = {
//   width: "539px", // Updated width
//   height: "229px", // Updated height
//   backgroundColor: "white",
//   borderRadius: "10px",
//   padding: "20px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   alignItems: "center",
//   border: "0.5px solid",
//   borderImage: "linear-gradient(to right, #6237FF, #258EFF) 1",
// };

// const titleStyle = {
//   fontSize: "18px", // Updated font size
//   fontWeight: "bold",
//   marginBottom: "10px",
//   textAlign: "center",
//   width: "100%", // Adjusted to fill the width
// };

// const subtitleStyle = {
//   fontSize: "14px", // Updated font size
//   color: "#666",
//   textAlign: "center",
//   marginBottom: "20px",
//   width: "100%", // Adjusted to fill the width
// };

// const confirmButtonStyle = {
//   backgroundColor: "#1E71F2", // Color from Figma
//   color: "white",
//   padding: "10px 20px",
//   borderRadius: "20px", // Radius from Figma
//   border: "none",
//   fontSize: "14px", // Updated font size
//   cursor: "pointer",
//   marginBottom: "10px",
//   width: "380px", // Updated width
//   height: "40px", // Updated height
// };

// const cancelButtonStyle = {
//   backgroundColor: "#888888", // Color from Figma
//   color: "white",
//   padding: "10px 20px",
//   borderRadius: "20px", // Radius from Figma
//   border: "none",
//   fontSize: "14px", // Updated font size
//   cursor: "pointer",
//   width: "380px", // Updated width
//   height: "40px", // Updated height
// };

// const footerStyle = {
//   fontSize: "14px", // Typography size
//   color: "#88888B", // Color from Figma
//   textAlign: "center",
//   width: "191px", // Width as per the Figma design
//   height: "18px", // Height as per the Figma design
// };

// export default NewDevicePopup;

import React from "react";

const NewDevicePopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[539px] h-[229px] bg-white rounded-[10px] p-[20px] shadow-lg flex flex-col justify-between items-center border border-gradient-to-r from-[#6237FF] to-[#258EFF]">
        <p className="text-[18px] font-bold mb-[10px] text-center w-full">
          Do you want to register this device with ColomboAI?
        </p>
        <p className="text-[14px] text-gray-600 text-center mb-[20px] w-full">
          It will help us remember your device!
        </p>
        <button
          className="bg-[#1E71F2] text-white py-[10px] px-[20px] rounded-[20px] border-none text-[14px] cursor-pointer mb-[10px] w-[380px] h-[40px]"
          onClick={onConfirm}
        >
          ✅ YES, REGISTER THIS DEVICE!
        </button>
        <button
          className="bg-[#888888] text-white py-[10px] px-[20px] rounded-[20px] border-none text-[14px] cursor-pointer w-[380px] h-[40px]"
          onClick={onCancel}
        >
          ❌ NO, USE THIS ONCE OR TEMPORARILY.
        </button>
        <p className="text-[14px] text-[#88888B] text-center w-[191px] h-[18px]">
          Thanks for being awesome! 😊
        </p>
      </div>
    </div>
  );
};

export default NewDevicePopup;
