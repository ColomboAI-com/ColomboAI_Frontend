import { auth } from "@/context/AuthContext"
import { RESEND_TIME } from "@/utlils/constant"
import { getSessionStorage } from "@/utlils/utils"
import { useEffect, useState } from "react"

export default function ResendOTP() {

  const [count, setCount] = useState(RESEND_TIME)
  const [isStart, setIsStart] = useState(true)
  const { getOTP } = auth()

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
    <div className='my-7 text-center'>
      {
        count > 0 ?
          <p className='text-lg'>
            Resend OTP in <span className='text-brandprimary'>{count > 9 ? count : '0' + count} sec.</span>
          </p>
          :
          <p className="text-lg text-brandprimary" onClick={onResendOTP}>
            Re-send OTP
          </p>
      }
    </div>
  )
}