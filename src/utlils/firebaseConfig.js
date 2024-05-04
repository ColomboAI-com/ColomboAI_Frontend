import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA5t2XnnCMsCg7SE-odHhX1o5gHIxX2kBQ",
  authDomain: "fair-myth-398920.firebaseapp.com",
  projectId: "fair-myth-398920",
  storageBucket: "fair-myth-398920.appspot.com",
  messagingSenderId: "337112930405",
  appId: "1:337112930405:web:17eacc2b7bcb726f40ce8c",
  measurementId: "G-0E3CP5TCHK"

}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
