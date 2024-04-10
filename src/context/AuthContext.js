'use client'
import { MessageBox } from "@/components/MessageBox";
import { INT_NUMBER_REGEX, NAME_REGEX, USERNAME_REGEX } from "@/utlils/constant";
import { handleError } from "@/utlils/handleError";
import { ROOT_URL_AUTH } from "@/utlils/rootURL";
import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    email: '',
    phone: ''
  })
  const [validations, setValidations] = useState({
    username: '',
    name: false,
    email: false,
    phone: false
  })
  const [loading, setLoading] = useState(false)

  const handleInputs = (event) => {
    const { name, value } = event.target
    if (name == "username" && !USERNAME_REGEX.test(value)) {
      return
    }
    if (name == "name" && !NAME_REGEX.test(value)) {
      return
    }
    if (name == "phone" && !INT_NUMBER_REGEX.test(value)) {
      return
    }
    setInputs({ ...inputs, [name]: value })
    setValidations({ ...validations, [name]: false })
  }

  const getOTP = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/get-otp`,
        {
          type: 'email',
          email: inputs.email
        }
      )
      MessageBox('success', res.data.message)
      return res
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      inputs, setInputs,
      validations, setValidations,
      loading, setLoading,
      handleInputs,
      getOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};
