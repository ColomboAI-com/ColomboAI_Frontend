import { useAuth } from "@/context/AuthContext"
import { RESEND_TIME } from "@/utlils/constant"
import { getSessionStorage } from "@/utlils/utils"
import { useEffect, useState } from "react"

export default function ResendOTP() {

  const [count, setCount] = useState(RESEND_TIME)
  const [isStart, setIsStart] = useState(true)
  const { getOTP } = useAuth()

  useEffect(() => {
    let interval = null
    if (isStart) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev === 1) {
            clearInterval(interval)
            setIsStart(false)
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isStart])

  const onResendOTP = () => {
    setIsStart(true)
    setCount(RESEND_TIME)
    getOTP(getSessionStorage('otp-page'))
  }

  return (
    <div className='mt-[25px] text-center sm: mt-[33px] mb-[24px]'>
      {
        count > 0 ?
          <p className='text-[16px] text-[#333333] font-sans tracking-[3px] text-center cursor-pointer'>
            RE-SEND THE OTP IN <span className='text-brandprimary'>{count > 9 ? count : '0' + count}s</span>
          </p>
          :
          <p className="text-[16px] text-[#333333] font-sans tracking-[3px] text-center cursor-pointer" onClick={onResendOTP}>
            RE-SEND THE OTP
          </p>
      }
    </div>
  )
}