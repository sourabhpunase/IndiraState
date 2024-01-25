// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mernstate-42315.firebaseapp.com",
  projectId: "mernstate-42315",
  storageBucket: "mernstate-42315.appspot.com",
  messagingSenderId: "672312264847",
  appId: "1:672312264847:web:07529c67bad342375288fa"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);