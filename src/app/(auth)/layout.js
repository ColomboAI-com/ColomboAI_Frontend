import { AuthContextProvider } from "@/context/AuthContext"
import { SocialAuthContextProvider } from "@/context/SocialAuthContext"

const AuthLayout = ({ children }) => {
  return (
    <AuthContextProvider>
      <SocialAuthContextProvider>
        <div className="grid grid-cols-2 h-screen font-sans sm:hidden md:hidden lg:grid">
          <div className="bg-brandprimary flex justify-center h-screen">
            <div className="max-w-[350px] w-full mt-[144px] mb-[100px] mx-auto flex items-center">
              <img src="/images/auth/auth-mobile-phone.svg" className="w-full" alt="mockup_image" />
            </div>
          </div>
          <div>
            {children}
          </div>
        </div>
        <div className="2xl:hidden xl:hidden h-screen font-sans sm:block md:block sm2:block lg:hidden">
          <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[322px] sm2:h-[450px] md:h-[450px] flex items-center justify-center">
            <div >
              <h5 className="text-[32px] font-sans text-[#fff] text-center">Welcome to</h5>
              <img src="/images/auth/ColomboAI-logo.png" className="object-cover mx-auto" alt="mockup_image" />
            </div>
          </div>
          <div>
            {children}
          </div>
        </div>
        <div id="recaptcha-container"></div>
      </SocialAuthContextProvider>
    </AuthContextProvider>
  )
}

export default AuthLayout