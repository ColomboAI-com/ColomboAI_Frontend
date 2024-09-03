'use client'
import { createContext, useContext, useState } from "react"
import { INT_NUMBER_REGEX, NAME_REGEX, USERNAME_REGEX } from "@/utlils/constant"
import axios from "axios"
import { ROOT_URL_AUTH } from "@/utlils/rootURL"
import { handleError } from "@/utlils/handleError"
import { MessageBox } from "@/components/MessageBox"
import { getCookie } from "@/utlils/cookies"

const AuthContext = createContext()

const defaultInputs = {
  username: '',
  name: '',
  age: '',
  email: '',
  country_code: '',
  phone: '',
  otp: '',
  phone_otp: ''
}

const defaultValidations = {
  username: false,
  name: false,
  age: false,
  email: false,
  country_code: false,
  phone: false,
  otp: false,
  phone_otp: false
}

const defaultLoadings = {
  otp: false,
  auth: false,
  google: false,
  meta: false,
  microsoft: false
}

export const AuthContextProvider = ({ children }) => {

  const [inputs, setInputs] = useState(defaultInputs)
  const [validations, setValidations] = useState(defaultValidations)
  const [loadings, setLoadings] = useState(defaultLoadings)
  const [verifier, setVerifier] = useState()
  const [new_device, setNew_device] = useState(false)

  const handleInputs = (event) => {
    const { name, value } = event.target
    if (name === "username" && !USERNAME_REGEX.test(value)) return
    if (name === "name" && !NAME_REGEX.test(value)) return
    if ((name === "phone" || name === "otp" || name === "age" || name === "country_code" || name === "phone_otp") && !INT_NUMBER_REGEX.test(value)) return
    setInputs(prev => ({ ...prev, [name]: value }))
    setValidations(prev => ({ ...prev, [name]: false }))
  }

  const getOTP = async (action = 'sign-in') => {
    try {      
      setLoadings(prev => ({ ...prev, otp: true }))
      const data = (action === 'sign-in') ? {
        action,
        email: inputs.email,
      } :
      {
        action,
        email: inputs.email,
        user_name: inputs.username,
        name: inputs.name,
        age: inputs.age,
        email: inputs.email,
        contact_number: inputs.phone,
      }

      const res = await axios.post(`${ROOT_URL_AUTH}/auth/get-otp`, data)
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, otp: false }))
    }
  }

  const signUp = async () => {
    try {
      setLoadings(prev => ({ ...prev, auth: true }))
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sign-up`,
        {
          action: 'sign-up',
          user_name: inputs.username,
          name: inputs.name,
          age: inputs.age,
          email: inputs.email,
          contact_number: inputs.phone,
          otp: inputs.otp,
          phone_otp: inputs.phone_otp
        }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, auth: false }))
    }
  }

  const signIn = async () => {
    try {
      setLoadings(prev => ({ ...prev, auth: true }))

      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sign-in`,
        {
          action: 'sign-in',
          email: inputs.email,
          otp: inputs.otp,
          phone_otp: inputs.phone_otp 
        }
      )
      
      setNew_device(res.data.new_device);

      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, auth: false }))
    }
  }

  const ssoAuthentication = async ({ provider, token }) => {
    try {
      setLoadings(prev => ({ ...prev, [provider]: true }))
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sso-authentication`,
        { provider, token }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, [provider]: false }))
    }
  }

  const addnewdevice = async (email) => {
    try {
      const res = await axios.post(`${ROOT_URL_AUTH}/user/addnewdevice`,
        { email },
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (error) {
      handleError(err)
    } 
  }

  const resetAuthValues = () => {
    setInputs(prev => ({ ...prev, ...defaultInputs }))
    setValidations(prev => ({ ...prev, ...defaultValidations }))
    setLoadings(prev => ({ ...prev, ...defaultLoadings }))
  }

  return (
    <AuthContext.Provider value={{
      inputs, setInputs,
      validations, setValidations,
      loadings, setLoadings,
      new_device, setNew_device,
      handleInputs,
      getOTP, signUp, signIn,
      ssoAuthentication,
      addnewdevice,
      resetAuthValues
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
