// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1aS3ZADX5fD1A2kaYZZY06x7gSjSoWDw",
  authDomain: "reactt-1dca8.firebaseapp.com",
  projectId: "reactt-1dca8",
  storageBucket: "reactt-1dca8.firebasestorage.app",
  messagingSenderId: "366038872574",
  appId: "1:366038872574:web:b52282d042703928f090af",
  measurementId: "G-CFLY79NEPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
export { auth, db, realtimeDb };