'use client'
import { createContext, useContext, useState } from "react"
import { INT_NUMBER_REGEX, NAME_REGEX, USERNAME_REGEX } from "@/utlils/constant"
import axios from "axios"
import { ROOT_URL_AUTH } from "@/utlils/rootURL"
import { handleError } from "@/utlils/handleError"
import { MessageBox } from "@/components/MessageBox"

const AuthContext = createContext()

const defaultInputs = {
  username: '',
  name: '',
  email: '',
  phone: '',
  otp: ''
}

const defaultValidations = {
  username: false,
  name: false,
  email: false,
  phone: false,
  otp: false
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
      setLoadings(prev => ({ ...prev, otp: true }))
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
      setLoadings(prev => ({ ...prev, otp: false }))
    }
  }

  const signUp = async (type = 'email') => {
    try {
      setLoadings(prev => ({ ...prev, auth: true }))
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
      setLoadings(prev => ({ ...prev, auth: false }))
    }
  }

  const signIn = async (type = 'email') => {
    try {
      setLoadings(prev => ({ ...prev, auth: true }))
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
      handleInputs,
      getOTP, signUp, signIn,
      ssoAuthentication,
      resetAuthValues
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const auth = () => {
  return useContext(AuthContext)
}
