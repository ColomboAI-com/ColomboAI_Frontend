"use client"
export default function SponsoredAdComponent(){

    return(
        <div className='relative left-[18px] w-[320px] h-[119px] rounded-[10px] flex justify-center items-center'>
        <div className="absolute top-0 left-0 w-full h-full rounded-[10px]" style={{ background: 'linear-gradient(180deg, #6237FF 30.5%, #258EFF 100%)', opacity: 0.4 }}></div>
        <div className='relative w-[295px] h-[96px] text-white'>
          <div className='h-[24px] w-[82px] text-[16px]' style={{ fontWeight: '700' }}>
            MG Hector
          </div>
          <div className='h-[36px] w-[295px] text-[12px] mt-2' style={{ fontWeight: '450' }}>
            Drive the extraordinary with MG Hector. Bold design, cutting-edge technology.
          </div>
          <div className='w-[90px] h-[26px] mt-1'>
            <button className='w-[90px] h-[26px] rounded-[30px] bg-white text-[#1E71F2] text-[12px]' style={{ fontWeight: '700', padding: '5px 10px 6px 10px' }}>
              Shop Now
            </button>
          </div>
        </div>
      </div>

    )

}