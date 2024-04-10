/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Signup = () => {
    return (
        <div className='h-full flex flex-col justify-around'>
            <div className='h-full flex flex-col justify-center'>
                <div>
                    <div className='border- w-[50%] mx-auto my-2'>
                        <img src="../images/welcome_colomboai.png" alt="welcome_to_colomboai" className="object-cover" />
                    </div>
                    <form className="w-[60%] mx-auto">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Address"
                            className="my-2 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white  focus:outline-none "
                            required
                        />
                        <input
                            type="fullname"
                            name="fullname"
                            placeholder="Full Name"
                            className="my-2 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white  focus:outline-none "
                            required
                        />
                        <input
                            type="username"
                            name="username"
                            placeholder="Username"
                            className="my-2 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white  focus:outline-none "
                            required
                        />
                        <input
                            type="phonenumber"
                            name="phonenumber"
                            placeholder="Phone Number (optional)"
                            className="my-2 w-full rounded-[40px] border-2 border-brandprimary bg-white px-7 py-6 text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white  focus:outline-none "
                        />

                        <button
                            type="submit"
                            className="mt-6 block w-full rounded-[22px] bg-brandprimary py-6 text-white focus:bg-brandprimary transition duration-300 ease-in "
                        >
                            Sign up
                        </button>
                    </form>
                        <div className="my-7 text-center">
                            <p className="text-lg text-brandprimary">
                                Or Signup with
                            </p>
                        </div>
                        <div className="flex justify-between border- w-[25%] mx-auto">
                            <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
                                <img src="../images/google.png" alt="google_logo" className="w-8 object-cover" />
                            </button>
                            <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
                                <img src="../images/meta.png" alt="meta_logo" className="w-8 object-cover" />
                            </button>
                            <button className='bg-[#E2F2FF] bg-opacity-45 rounded-full border-2 border-brandprimary p-3'>
                                <img src="../images/microsoft.png" alt="microsoft_logo" className="w-8 object-cover" />
                            </button>
                        </div>
                        <div className="my-3 text-center">
                            <p className="text-lg ">
                                Already have an account? 
                                <Link href='/login' className='text-brandprimary focus:text-brandprimary'>
                                    &nbsp;Login
                                </Link>
                            </p>
                        </div>
                </div>
            </div>
            <div className="my-2 text-center">
                <p className="text-lg text-[#A7A7A7]">
                    By using our service you are agreeing <br/> to our Term and Conditions
                </p>
            </div>
        </div>
    );
}

export default Signup;