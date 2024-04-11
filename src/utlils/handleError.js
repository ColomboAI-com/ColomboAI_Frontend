import { MessageBox } from "@/components/MessageBox"
import { clearCookie } from "./cookies"

export const handleError = (err) => {
  if (err?.response) {
    console.error(err)
    if (err.response.status === 400 || err.response.status === 429 || err.response.status === 500) {
      MessageBox('error', err?.response?.data?.message || 'Somethig went wrong, Please try again.')
      return
    }
    if (err.response.status === 422) {
      MessageBox('error', 'Somethig went wrong, Please try again.')
      return
    }
    if (err.response.status === 401) {
      MessageBox('error', err.response?.data?.message)
      setTimeout(() => {
        clearCookie()
        window.location.pathname = '/sign-up'
      }, 1500)
      return
    }
  }
}