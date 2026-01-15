// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl1q_6Ce4cmLbD-7gjIVX0tFdtjkwOdPo",
  authDomain: "bookhive-21fe3.firebaseapp.com",
  projectId: "bookhive-21fe3",
  storageBucket: "bookhive-21fe3.firebasestorage.app",
  messagingSenderId: "66454304670",
  appId: "1:66454304670:web:ea937936c9c03f09cd488f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)