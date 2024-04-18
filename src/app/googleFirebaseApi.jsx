import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3hCQQaHRNjDfGqpbsKuFipMV3B8wrquU",
  authDomain: "auth-a3bd4.firebaseapp.com",
  projectId: "auth-a3bd4",
  storageBucket: "auth-a3bd4.appspot.com",
  messagingSenderId: "292969720398",
  appId: "1:292969720398:web:b1414397a30fe83de1b11f"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDkKqZu2BgFI2LWRN3uSdDIpHhNz3aSrDc",
//     authDomain: "auth-eacad.firebaseapp.com",
//     projectId: "auth-eacad",
//     storageBucket: "auth-eacad.appspot.com",
//     messagingSenderId: "359999912261",
//     appId: "1:359999912261:web:99d94167b50e3013cce62c"
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);