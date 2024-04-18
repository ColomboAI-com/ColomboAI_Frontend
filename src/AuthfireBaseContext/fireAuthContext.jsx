"use client"

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  OAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
// import { MicroAuth } from "@/app/microsoftfireapi";

import { auth } from "@/app/googleFirebaseApi";

const AuthContext = createContext();

export const AuthContextProvider2 = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
//   const signInWithMicrosoft = async () => {
//     try {
//       const provider = new firebase.auth.OAuthProvider('microsoft.com');
//       await firebase.auth().signInWithPopup(provider);
   
//     } catch (error) {
//       console.error('Microsoft Sign-In Error:', error.message);
//       // Handle error
//     }
//   };
  const signInWithMicrosoft = async () => {
    try {
      const provider = new OAuthProvider('microsoft.com');
      await signInWithPopup(auth,provider);
            
    } catch (error) {
      console.error('Microsoft Sign-In Error:', error.message);
      // Handle error
    }
  };
  const signInWithFacebook= async () => {
    try {
        const provider = new FacebookAuthProvider();
      await signInWithPopup(auth,provider);
            
    } catch (error) {
      console.error('facebook Sign-In Error:', error.message);
      // Handle error
    }
  };
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut,signInWithMicrosoft ,signInWithFacebook}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};