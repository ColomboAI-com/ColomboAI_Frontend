'use client'
import { useContext, createContext, useState, useEffect } from "react"
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth"
import { firebaseAuth } from "@/utlils/firebaseConfig"
import { auth } from "./AuthContext"

const SocialAuth = createContext()

export const SocialAuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const { ssoAuthentication } = auth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      // console.log(authUser)
      setUser(authUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    signOutSocialAuth()
    if (user) {
      if (user.providerData?.[0]?.providerId === 'google.com')
        ssoAuthentication({ provider: 'google', token: user.accessToken })
    }
  }, [user])

  const continueWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      await signInWithPopup(firebaseAuth, googleProvider)
    } catch (err) {
      console.error(err)
    }
  }

  const continueWithMeta = async () => {
    try {
      const metaProvider = new FacebookAuthProvider()
      await signInWithPopup(firebaseAuth, metaProvider)
    } catch (err) {
      console.error(err)
    }
  }

  const continueWithMicrosoft = async () => {
    try {
      const microsoftProvider = new OAuthProvider('microsoft.com')
      await signInWithPopup(firebaseAuth, microsoftProvider)
    } catch (err) {
      console.error(err)
    }
  }

  const signOutSocialAuth = () => {
    try {
      signOut(firebaseAuth)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <SocialAuth.Provider value={{
      continueWithGoogle,
      continueWithMeta,
      continueWithMicrosoft,
      signOutSocialAuth,
    }}>
      {children}
    </SocialAuth.Provider>
  )
}

export const socialAuth = () => {
  return useContext(SocialAuth)
}