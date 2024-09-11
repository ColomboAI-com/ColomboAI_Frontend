"use client"

export default function UserPolicyComponent(){
   
    return(
        <>
       
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
          <div className="bg-white    
 rounded-[20px]  h-[589px] w-[633px]  mx-auto ">
    <div className="flex justify-center mt-[72px]">
                <div className="h-[40px] w-[492px] text-[32px] font-[700] text-[#1E71F2]">
                We’ve Updated Our User Policy!
                </div>
                </div>
                <div className="w-[500px] h-[92px] mx-auto flex justify-center mt-[35px] ">
                <div className="text-[18px] text-[#646464] font-[600] text-center">
              <p>  Hey there! We’ve made some important updates to enhance your experience.</p>
               
               <p> To continue using your account, please verify your mobile number and let us know your age.</p>
                </div>
                </div>
              



                <div className="flex justify-center mt-[70px]">
                <input

              className="mt-4 w-[381px] h-[50px] rounded-[30px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Enter your phone number"
              
            />
                </div>
                
                <div className="flex justify-center mt-[18px]">
                <input

              className="mt-4 w-[380px] h-[48px] rounded-[30px] border-[1px] border-brandprimary bg-white px-[20px] py-[12px] text-black placeholder:text-brandplaceholder focus:border-brandprimary focus:bg-white focus:outline-none"
              placeholder="Enter your age"
              
            />
                </div>
                <div className="flex justify-center mt-[48px]">
                    <button className="w-[380px] h-[48px]  rounded-[30px] bg-[#1E71F2] text-white text-[16px] font-[700]" style={{padding:'14px, 24px, 14px, 24px'}}>
                        GET OTP
                        </button>
                </div>
          </div>
        </div>
        
        </>




    )

}