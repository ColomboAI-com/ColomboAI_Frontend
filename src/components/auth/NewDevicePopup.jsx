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

// import React from "react";

// const NewDevicePopup = ({ onConfirm, onCancel }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="w-[539px] h-[229px] bg-white rounded-[10px] p-[20px] shadow-lg flex flex-col justify-between items-center border border-gradient-to-r from-[#6237FF] to-[#258EFF]">
//         <p className="text-[18px] font-bold mb-[10px] text-center w-full">
//           Do you want to register this device with ColomboAI?
//         </p>
//         <p className="text-[14px] text-gray-600 text-center mb-[20px] w-full">
//           It will help us remember your device!
//         </p>
//         <button
//           className="bg-[#1E71F2] text-white py-[10px] px-[20px] rounded-[20px] border-none text-[14px] cursor-pointer mb-[10px] w-[380px] h-[40px]"
//           onClick={onConfirm}
//         >
//           ✅ YES, REGISTER THIS DEVICE!
//         </button>
//         <button
//           className="bg-[#888888] text-white py-[10px] px-[20px] rounded-[20px] border-none text-[14px] cursor-pointer w-[380px] h-[40px]"
//           onClick={onCancel}
//         >
//           ❌ NO, USE THIS ONCE OR TEMPORARILY.
//         </button>
//         <p className="text-[14px] text-[#88888B] text-center w-[191px] h-[18px]">
//           Thanks for being awesome! 😊
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NewDevicePopup;

import React from "react";

const NewDevicePopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[700px] h-[274px] xl:w-[700px] xl:h-[274px] lg:w-[700px] lg:h-[274px] md:w-[700px] md:h-[274px] sm:w-[400px] sm:h-[250px]  bg-white rounded-[25px] p-[20px] shadow-lg flex flex-col justify-center items-center border border-gradient-to-r from-[#6237FF] to-[#258EFF] space-y-[30px]">
        <div className="w-[539px] h-[229px] xl:w-[539px] xl:h-[229px] lg:w-[539px] lg:h-[229px] md:w-[539px] md:h-[229px] sm:w-[308px] sm:h-[209.36px] items-center">
          <p className="w-[539px] h-[56px] xl:w-[539px] xl:h-[56px] lg:w-[539px] lg:h-[56px] md:w-[539px] md:h-[56px] sm:w-[308px] sm:h-[51.09px] sm:text-[18px]  text-center text-[22px] font-[600] text-[#646464]">
          Do you want to register this device with ColomboAI? (It’ll help us remember your device!)
          </p>
          <div className="mt-[30px]  flex justify-center mx-auto xl:w-[380px] md:w-[380px] md:h-[40px] xl:h-[40px] lg:w-[380px] lg:h-[40px] w-[380px] h-[40px] sm:h-[38px] sm:w-[310px]">
          <button
            className="bg-[#1E71F2] uppercase text-white sm:text-[14px] py-[10px] px-[20px] rounded-[20px] text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] cursor-pointer w-[380px] h-[40px] font-[450] leading-[20px]"
            onClick={onConfirm}
          >
            ✅ Yes, register this device!
          </button>
          </div>
          <div className="flex mt-[18px]  justify-center mx-auto md:w-[380px] md:h-[40px] w-[380px] h-[40px] lg:w-[380px] lg:h-[40px] xl:w-[380px] xl:h-[40px] sm:h-[38px] sm:w-[310px]">
          <button
            className="bg-[#888888] uppercase text-white py-[10px] px-[20px] rounded-[20px] sm:text-[14px] text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] cursor-pointer w-[380px] h-[40px] font-[450] leading-[20px]"
            onClick={onCancel}
          >
           ❌ No, use this once or temporarily.
          </button>
            </div>
            <p className="w-[192px] mt-[27px] xl:mt-[27px] lg:mt-[27px] md:mt-[27px] sm:mt-[20px] font-[450] h-[18px] flex justify-center mx-auto text-[14px] text-[#88888B] text-center">
            Thanks for being awesome!😊
            </p>
        </div>
        {/* <p className="text-[22px] font-bold text-center w-full leading-[27px]">
          Do you want to register this device with ColomboAI?
        </p>
        <p className="text-[14px] text-gray-600 text-center leading-[17px]">
          <p className="text-[14px] text-gray-600 text-center leading-[17px]">
            It&apos;ll help us remember your device!
          </p>
        </p>
        <div className="flex flex-col space-y-[10px] w-full items-center">
          <button
            className="bg-[#1E71F2] text-white py-[10px] px-[20px] rounded-[20px] text-[16px] cursor-pointer w-[237px] h-[40px] font-medium leading-[20px]"
            onClick={onConfirm}
          >
            YES, REGISTER THIS DEVICE!
          </button>
          <button
            className="bg-[#888888] text-white py-[10px] px-[20px] rounded-[20px] text-[16px] cursor-pointer w-[315px] h-[40px] font-medium leading-[20px]"
            onClick={onCancel}
          >
            NO, USE THIS ONCE OR TEMPORARILY.
          </button>
        </div>
        <p className="text-[14px] text-[#88888B] text-center w-full font-medium">
          Thanks for being awesome! 😊
        </p> */}
      </div>
    </div>
  );
};

export default NewDevicePopup;
