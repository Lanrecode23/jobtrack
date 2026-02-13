// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// create google auth
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAx6Mvuqstlfi0Reg1HSwKp8q1dT1n0yI",
  authDomain: "jobtrack-d39b7.firebaseapp.com",
  projectId: "jobtrack-d39b7",
  storageBucket: "jobtrack-d39b7.firebasestorage.app",
  messagingSenderId: "132565275272",
  appId: "1:132565275272:web:c076350bec1f401c44853d",
  measurementId: "G-99LTT18917"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
