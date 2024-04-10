/* eslint-disable @next/next/no-img-element */
const AuthLayout = ({children}) => {
    return (
        <div className="grid grid-cols-2 gap- h-screen font-sans">
            <div className="bg-brandprimary flex items-center justify-center">
                <div>
                    <img src="../images/auth_mockup.png" alt="mockup_image" className="object-cover mx-auto w-[85%]" />
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;