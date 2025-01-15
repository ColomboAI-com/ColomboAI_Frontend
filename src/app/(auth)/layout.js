import { AuthContextProvider } from "@/context/AuthContext";
import { SocialAuthContextProvider } from "@/context/SocialAuthContext";
import UserProfileContextProvider from "@/context/UserProfileContext";

const AuthLayout = ({ children }) => {
  return (
    <AuthContextProvider>
      <SocialAuthContextProvider>
        <UserProfileContextProvider>
          <div className="grid grid-cols-2 h-screen font-sans sm:hidden md:hidden lg:grid">
            <div className="bg-brandprimary flex justify-center h-screen">
              <div className="max-w-[350px] w-full mt-[144px] mb-[100px] mx-auto flex items-center">
                <img src="/images/auth/auth-mobile-phone.svg" className="w-full" alt="mockup_image" />
              </div>
            </div>
            <div>{children}</div>
          </div>
          <div className="2xl:hidden xl:hidden h-screen font-sans sm:block md:block sm2:block lg:hidden">
            <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[235px] sm:shrink-0 sm2:md:shrink-0 sm2:h-[450px] md:h-[450px] flex items-center justify-center">
              <div>
                <h5 className="text-[32px] font-sans text-[#fff] text-center">Welcome to</h5>
                <img
                  src="/images/auth/ColomboAI-logo.png"
                  className="object-cover mx-auto"
                  alt="mockup_image"
                />
              </div>
            </div>
            <div>{children}</div>
          </div>
          <div id="recaptcha-container"></div>
        </UserProfileContextProvider>
      </SocialAuthContextProvider>
    </AuthContextProvider>
  );
};

export default AuthLayout;

// import { AuthContextProvider } from "@/context/AuthContext";
// import { SocialAuthContextProvider } from "@/context/SocialAuthContext";

// const AuthLayout = ({ children }) => {
//   return (
//     <AuthContextProvider>
//       <SocialAuthContextProvider>
//         {/* Main grid layout for desktop */}
//         <div className="grid grid-cols-2 h-screen font-sans sm:hidden md:hidden lg:grid">
//           {/* Left side: Mobile phone image */}
//           <div className="bg-brandprimary flex justify-center h-screen">
//             <div className="max-w-[350px] w-full mt-[144px] mb-[100px] mx-auto flex items-center">
//               <img
//                 src="/images/auth/auth-mobile-phone.svg"
//                 className="w-full"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>

//           {/* Right side: Form and children */}
//           <div className="flex flex-col justify-center items-center">
//             <div className="text-center">
//               <img
//                 src="/images/star.svg" // Ensure this path is correct
//                 alt="star"
//                 className="w-[43px] h-[45px] mx-auto"
//               />
//               <h1 className="text-[28px] font-bold text-[#000]">
//                 Create an account for{" "}
//                 <span className="text-brandprimary">Free</span>
//               </h1>
//             </div>

//             {/* Form elements */}
//             <div className="w-[380px] mt-8 space-y-6">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <input
//                 type="text"
//                 placeholder="Display Name"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   className="w-full h-[50px] border border-[#1E71F2] rounded-[30px] pl-14 pr-4"
//                 />
//                 {/* Flag icon for phone input */}
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                   <img src="/images/flag-india.svg" alt="India Flag" />
//                 </div>
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <input
//                 type="number"
//                 placeholder="Age"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <button className="w-full h-[48px] bg-[#1E71F2] text-white rounded-[30px]">
//                 GET OTP
//               </button>
//             </div>

//             {/* OR divider */}
//             <div className="text-center text-gray-500 my-4">OR</div>

//             {/* Social sign-in buttons */}
//             <div className="space-y-4">
//               <button className="flex items-center justify-center w-[380px] h-[48px] border border-gray-300 rounded-[30px]">
//                 <img
//                   src="/images/google-icon.svg"
//                   alt="Google"
//                   className="mr-2"
//                 />
//                 Continue with Google
//               </button>
//               <button className="flex items-center justify-center w-[380px] h-[48px] border border-gray-300 rounded-[30px]">
//                 <img src="/images/meta-icon.svg" alt="Meta" className="mr-2" />
//                 Continue with Meta
//               </button>
//               <button className="flex items-center justify-center w-[380px] h-[48px] border border-gray-300 rounded-[30px]">
//                 <img
//                   src="/images/microsoft-icon.svg"
//                   alt="Microsoft"
//                   className="mr-2"
//                 />
//                 Continue with Microsoft
//               </button>
//             </div>

//             {/* Sign-in link */}
//             <div className="text-center mt-4">
//               <p>
//                 Already have an account?{" "}
//                 <a href="#" className="text-brandprimary">
//                   Sign In
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile view */}
//         <div className="2xl:hidden xl:hidden h-screen font-sans sm:block md:block sm2:block lg:hidden">
//           <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[322px] sm2:h-[450px] md:h-[450px] flex items-center justify-center">
//             <div>
//               <h5 className="text-[32px] font-sans text-[#fff] text-center">
//                 Welcome to
//               </h5>
//               <img
//                 src="/images/auth/ColomboAI-logo.png"
//                 className="object-cover mx-auto"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>
//           <div>{children}</div>
//         </div>

//         {/* Recaptcha container */}
//         <div id="recaptcha-container"></div>
//       </SocialAuthContextProvider>
//     </AuthContextProvider>
//   );
// };

// export default AuthLayout;

// import { AuthContextProvider } from "@/context/AuthContext";
// import { SocialAuthContextProvider } from "@/context/SocialAuthContext";

// const AuthLayout = ({ children }) => {
//   return (
//     <AuthContextProvider>
//       <SocialAuthContextProvider>
//         {/* Main grid layout for desktop */}
//         <div className="grid grid-cols-2 h-screen font-sans sm:hidden md:hidden lg:grid">
//           {/* Left side: Mobile phone image */}
//           <div className="bg-brandprimary flex justify-center h-screen">
//             <div className="max-w-[350px] w-full mt-[144px] mb-[100px] mx-auto flex items-center">
//               <img
//                 src="/images/auth/auth-mobile-phone.svg" // Correct path for the mobile image
//                 className="w-full"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>

//           {/* Right side: Form and children */}
//           <div className="flex flex-col justify-center items-center">
//             <div className="text-center">
//               <img
//                 src="/images/auth/ColomboAI-logo.png" // Correct path for the star icon
//                 alt="star"
//                 className="w-[43px] h-[45px] mx-auto"
//               />
//               <h1 className="text-[28px] font-bold text-[#000]">
//                 Create an account for{" "}
//                 <span className="text-brandprimary">Free</span>
//               </h1>
//             </div>

//             {/* Form elements */}
//             <div className="w-[380px] mt-8 space-y-6">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <input
//                 type="text"
//                 placeholder="Display Name"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   className="w-full h-[50px] border border-[#1E71F2] rounded-[30px] pl-14 pr-4"
//                 />
//                 {/* Flag icon for phone input */}
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                   {/* <img src="/images/flag-india.svg" alt="India Flag" /> */}
//                   <img src="/images/flag-india.svg" alt="India Flag" />{" "}
//                   {/* Correct path for the India flag */}
//                 </div>
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <input
//                 type="number"
//                 placeholder="Age"
//                 className="w-full h-[48px] border border-[#1E71F2] rounded-[30px] px-4"
//               />
//               <button className="w-full h-[48px] bg-[#1E71F2] text-white rounded-[30px]">
//                 GET OTP
//               </button>
//             </div>

//             {/* OR divider */}
//             <div className="text-center text-gray-500 my-4">OR</div>

//             {/* Social sign-in buttons */}
//             <div className="space-y-4">
//               <button className="flex items-center justify-center w-[380px] h-[48px] border border-gray-300 rounded-[30px]">
//                 <img src="/images/google.svg" alt="Google" className="mr-2" />{" "}
//                 {/* Ensure this path works */}
//                 Continue with Google
//               </button>
//               <button className="flex items-center justify-center w-[380px] h-[48px] border border-gray-300 rounded-[30px]">
//                 <img src="/images/meta.svg" alt="Meta" className="mr-2" />{" "}
//                 {/* Ensure this path works */}
//                 Continue with Meta
//               </button>
//               <button className="flex items-center justify-center w-[380px] h-[48px] border border-gray-300 rounded-[30px]">
//                 <img
//                   src="/images/microsoft.svg"
//                   alt="Microsoft"
//                   className="mr-2"
//                 />{" "}
//                 {/* Ensure this path works */}
//                 Continue with Microsoft
//               </button>
//             </div>

//             {/* Sign-in link */}
//             <div className="text-center mt-4">
//               <p>
//                 Already have an account?{" "}
//                 <a href="#" className="text-brandprimary">
//                   Sign In
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile view */}
//         <div className="2xl:hidden xl:hidden h-screen font-sans sm:block md:block sm2:block lg:hidden">
//           <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[322px] sm2:h-[450px] md:h-[450px] flex items-center justify-center">
//             <div>
//               <h5 className="text-[32px] font-sans text-[#fff] text-center">
//                 Welcome to
//               </h5>
//               <img
//                 src="/images/auth/ColomboAI-logo.png"
//                 className="object-cover mx-auto"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>
//           <div>{children}</div>
//         </div>

//         {/* Recaptcha container */}
//         <div id="recaptcha-container"></div>
//       </SocialAuthContextProvider>
//     </AuthContextProvider>
//   );
// };

// export default AuthLayout;

// import { AuthContextProvider } from "@/context/AuthContext";
// import { SocialAuthContextProvider } from "@/context/SocialAuthContext";

// const AuthLayout = ({ children }) => {
//   return (
//     <AuthContextProvider>
//       <SocialAuthContextProvider>
//         {/* Desktop Layout */}
//         <div className="grid grid-cols-2 h-screen font-sans lg:grid">
//           {/* Left Side (Mobile Mockup) */}
//           <div className="bg-brandprimary flex justify-center h-screen">
//             <div className="max-w-[350px] w-full mt-[144px] mb-[100px] mx-auto flex items-center">
//               <img
//                 src="/images/auth/auth-mobile-phone.svg"
//                 className="w-full"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>

//           {/* Right Side (Form and Content) */}
//           <div className="flex items-center justify-center h-screen bg-white px-8">
//             <div className="max-w-md w-full">{children}</div>
//           </div>
//         </div>

//         {/* Mobile Layout */}
//         <div className="2xl:hidden xl:hidden h-screen font-sans sm:block md:block sm2:block lg:hidden">
//           {/* Background Image and Logo on Mobile */}
//           <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[322px] sm2:h-[450px] md:h-[450px] flex items-center justify-center">
//             <div>
//               <h5 className="text-[32px] font-sans text-[#fff] text-center">
//                 Welcome to
//               </h5>
//               <img
//                 src="/images/auth/ColomboAI-logo.png"
//                 className="object-cover mx-auto"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>

//           {/* Mobile Form */}
//           <div className="flex items-center justify-center px-4 py-8">
//             <div className="max-w-md w-full">{children}</div>
//           </div>
//         </div>

//         {/* Recaptcha Container */}
//         <div id="recaptcha-container"></div>
//       </SocialAuthContextProvider>
//     </AuthContextProvider>
//   );
// };

// export default AuthLayout;

// import { AuthContextProvider } from "@/context/AuthContext";
// import { SocialAuthContextProvider } from "@/context/SocialAuthContext";

// const AuthLayout = ({ children }) => {
//   return (
//     <AuthContextProvider>
//       <SocialAuthContextProvider>
//         {/* Desktop Layout */}
//         <div className="grid grid-cols-2 h-screen font-sans">
//           {/* Left Side (Mobile Mockup) */}
//           <div className="bg-brandprimary flex justify-center h-screen">
//             <div className="max-w-[350px] w-full mt-[144px] mb-[100px] mx-auto flex items-center">
//               <img
//                 src="/images/auth/auth-mobile-phone.svg"
//                 className="w-full"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>

//           {/* Right Side (Form and Content) */}
//           <div className="flex items-center justify-center h-screen bg-white px-8">
//             {/* Content on the right side is set to fit the screen */}
//             <div className="w-full max-w-lg">{children}</div>
//           </div>
//         </div>

//         {/* Mobile Layout */}
//         <div className="2xl:hidden xl:hidden h-screen font-sans sm:block md:block lg:hidden">
//           {/* Background Image and Logo on Mobile */}
//           <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[322px] sm2:h-[450px] md:h-[450px] flex items-center justify-center">
//             <div>
//               <h5 className="text-[32px] font-sans text-[#fff] text-center">
//                 Welcome to
//               </h5>
//               <img
//                 src="/images/auth/ColomboAI-logo.png"
//                 className="object-cover mx-auto"
//                 alt="mockup_image"
//               />
//             </div>
//           </div>

//           {/* Mobile Form */}
//           <div className="flex items-center justify-center px-4 py-8">
//             <div className="w-full max-w-md">{children}</div>
//           </div>
//         </div>

//         {/* Recaptcha Container */}
//         <div id="recaptcha-container"></div>
//       </SocialAuthContextProvider>
//     </AuthContextProvider>
//   );
// };

// export default AuthLayout;
