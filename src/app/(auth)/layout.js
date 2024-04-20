import { AuthContextProvider } from "@/context/AuthContext"
import { SocialAuthContextProvider } from "@/context/SocialAuthContext"

const AuthLayout = ({ children }) => {
  return (
    <AuthContextProvider>
      <SocialAuthContextProvider>
        <div className="xl:grid grid-cols-2 gap- h-screen font-sans sm:hidden md:hidden lg:grid">
          <div className="bg-brandprimary flex justify-center py-[120px]">
            <div>
              <img src="/images/auth/auth_mockup.png" className="object-cover mx-auto w-[60%]" alt="mockup_image" />
            </div>
          </div>
          <div>
            {children}
          </div>
        </div>
        <div className="xl:hidden h-screen font-sans sm:block md:block lg:hidden">
          <div className="bg-[url('/images/auth/mobile-verification.png')] bg-no-repeat bg-[length:100%_100%] bg-top sm:h-[322px] md:h-[450px] lg:h-[450px] flex items-center justify-center">
            <div >
              <h5 className="text-[32px] font-sans text-[#fff] text-center">Welcome to</h5>
              <img src="/images/auth/ColomboAI-logo.png" className="object-cover mx-auto" alt="mockup_image" />
            </div>
          </div>
          <div>
            {children}
          </div>
        </div>
      </SocialAuthContextProvider>
    </AuthContextProvider>
  )
}

export default AuthLayout