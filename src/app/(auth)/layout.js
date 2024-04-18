import { AuthContextProvider } from "@/context/AuthContext"
import { SocialAuthContextProvider } from "@/context/SocialAuthContext"

const AuthLayout = ({ children }) => {
  return (
    <AuthContextProvider>
      <SocialAuthContextProvider>
        <div className="grid grid-cols-2 gap- h-screen font-sans">
          <div className="bg-brandprimary flex items-center justify-center">
            <div>
              <img src="/images/auth/auth_mockup.png" className="object-cover mx-auto w-[85%]" alt="mockup_image" />
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