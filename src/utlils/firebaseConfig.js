import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyD8lZjjh1dfbvURIzTF9LS7jwdd9BttEb0",
//   authDomain: "colomboai-97e08.firebaseapp.com",
//   projectId: "colomboai-97e08",
//   storageBucket: "colomboai-97e08.appspot.com",
//   messagingSenderId: "462941437494",
//   appId: "1:462941437494:web:e0e74557910fba5c8ba297",
//   measurementId: "G-X34XVSEPY5"
// }

const firebaseConfig = {
  apiKey: "AIzaSyA5t2XnnCMsCg7SE-odHhX1o5gHIxX2kBQ",
  authDomain: "fair-myth-398920.firebaseapp.com",
  projectId: "fair-myth-398920",
  storageBucket: "fair-myth-398920.appspot.com",
  messagingSenderId: "337112930405",
  appId: "1:337112930405:web:17eacc2b7bcb726f40ce8c",
  measurementId: "G-0E3CP5TCHK"
};

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
firebaseAuth.tenantId = "colomboai";

// export const messaging = getMessaging(app)

let messaging;

if (typeof window !== 'undefined') {
  // Initialize Firebase app only in the client-side environment
  messaging = getMessaging(app);
}

export { messaging };