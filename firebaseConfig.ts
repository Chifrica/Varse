// app/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import analyticsModule from '@react-native-firebase/analytics'; // use analytics() factory
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXO-SUcGXQZtn-CTI3AKlktr8ja1I6q7A",
  authDomain: "varse-202b9.firebaseapp.com",
  projectId: "varse-202b9",
  // storageBucket: "varse-202b9.firebasestorage.app",
  storageBucket: "varse-202b9.appspot.com", // 🔧 fix: should end with .appspot.com
  messagingSenderId: "853543512665",
  appId: "1:853543512665:web:a199a7c8b89ac6a0429f48",
  measurementId: "G-XPHQJRXM1Q"
};

const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;