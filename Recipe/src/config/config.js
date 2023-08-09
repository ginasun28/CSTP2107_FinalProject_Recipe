// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZZQWBGBEukPk-opeZSnk7Ve1W_KqurG4",
    authDomain: "blogapp-27792.firebaseapp.com",
    projectId: "blogapp-27792",
    storageBucket: "blogapp-27792.appspot.com",
    messagingSenderId: "316556722651",
    appId: "1:316556722651:web:bf7d938e83b9b4f01427fe",
    measurementId: "G-KL1CWNP4H7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();

const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, googleProvider, emailProvider, db, storage };
