import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD8lZjjh1dfbvURIzTF9LS7jwdd9BttEb0",
  authDomain: "colomboai-97e08.firebaseapp.com",
  projectId: "colomboai-97e08",
  storageBucket: "colomboai-97e08.appspot.com",
  messagingSenderId: "462941437494",
  appId: "1:462941437494:web:ed842e957861b8558ba297",
  measurementId: "G-6C39N4PLTC"
}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
