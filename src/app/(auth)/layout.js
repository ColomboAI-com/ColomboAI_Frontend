import { AuthContextProvider } from "@/context/AuthContext";

const AuthLayout = ({ children }) => {
  return (
    <AuthContextProvider >
      <div className="grid grid-cols-2 gap- h-screen font-sans">
        <div className="bg-brandprimary flex items-center justify-center">
          <div>
            <img src="/images/auth/auth_mockup.png" alt="mockup_image" className="object-cover mx-auto w-[85%]" />
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default AuthLayout;