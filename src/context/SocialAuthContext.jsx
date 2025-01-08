"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { firebaseAuth } from "@/utlils/firebaseConfig";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { setUserCookies } from "@/utlils/commonFunctions";
import { handleSsoError } from "@/utlils/handleError";

const SocialAuth = createContext();

export const SocialAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState("");
  const { ssoAuthentication } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const res = await ssoAuthentication({ provider: selectedProvider, token: user.accessToken });
        if (res) {
          setUserCookies(res.data);
          router.push("/passkey/sign-up/");
        }
      }
    })();
    return () => signOutSocialAuth();
  }, [user]);

  const continueWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (err) {
      handleSsoError(err);
    }
  };

  const continueWithMeta = async () => {
    try {
      const metaProvider = new FacebookAuthProvider();
      await signInWithPopup(firebaseAuth, metaProvider);
    } catch (err) {
      handleSsoError(err);
    }
  };

  const continueWithMicrosoft = async () => {
    try {
      const microsoftProvider = new OAuthProvider("microsoft.com");
      await signInWithPopup(firebaseAuth, microsoftProvider);
    } catch (err) {
      handleSsoError(err);
    }
  };

  const signOutSocialAuth = () => {
    try {
      signOut(firebaseAuth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SocialAuth.Provider
      value={{
        continueWithGoogle,
        continueWithMeta,
        continueWithMicrosoft,
        signOutSocialAuth,
        setSelectedProvider,
      }}
    >
      {children}
    </SocialAuth.Provider>
  );
};

export const useSocialAuth = () => {
  return useContext(SocialAuth);
};
