'use client'
import { createContext, useState } from "react"
import { INT_NUMBER_REGEX, NAME_REGEX, USERNAME_REGEX } from "@/utlils/constant"
import axios from "axios"
import { ROOT_URL_AUTH } from "@/utlils/rootURL"
import { handleError } from "@/utlils/handleError"
import { MessageBox } from "@/components/MessageBox"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    otp: ''
  })
  const [validations, setValidations] = useState({
    username: false,
    name: false,
    email: false,
    phone: false,
    otp: false
  })
  const [loadingGetOTP, setLoadingGetOTP] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loadingSSO, setLoadingSSO] = useState(false)

  const handleInputs = (event) => {
    const { name, value } = event.target
    if (name === "username" && !USERNAME_REGEX.test(value)) return
    if (name === "name" && !NAME_REGEX.test(value)) return
    if ((name === "phone" || name === "otp") && !INT_NUMBER_REGEX.test(value)) return
    setInputs(prev => ({ ...prev, [name]: value }))
    setValidations(prev => ({ ...prev, [name]: false }))
  }

  const getOTP = async (action, type = 'email') => {
    try {
      setLoadingGetOTP(true)
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/get-otp`,
        {
          type,
          action: action || 'sign-in',
          email: inputs.email,
          user_name: inputs.username
        }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadingGetOTP(false)
    }
  }

  const signUp = async (type = 'email') => {
    try {
      setLoadingAuth(true)
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sign-up`,
        {
          type,
          user_name: inputs.username,
          name: inputs.name,
          email: inputs.email,
          contact_number: inputs.phone,
          otp: inputs.otp
        }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadingAuth(false)
    }
  }

  const signIn = async (type = 'email') => {
    try {
      setLoadingAuth(true)
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sign-in`,
        {
          type,
          email: inputs.email,
          otp: inputs.otp
        }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadingAuth(false)
    }
  }

  const ssoAuthentication = async ({ provider, token, userid }) => {
    try {
      setLoadingSSO(true)
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/ssoAuthentication`,
        { provider, token, userid }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadingSSO(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      inputs, setInputs,
      validations, setValidations,
      handleInputs,
      loadingGetOTP, setLoadingGetOTP,
      loadingAuth, setLoadingAuth,
      loadingSSO, setLoadingSSO,
      getOTP, signUp, signIn,
      ssoAuthentication
    }}>
      {children}
    </AuthContext.Provider>
  )
}
