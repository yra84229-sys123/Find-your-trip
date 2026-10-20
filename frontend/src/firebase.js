import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYHlqxdxPS7wYWvFNvWh4qqbZcYmQ0h6s",
  authDomain: "find-your-trip-fcd69.firebaseapp.com",
  projectId: "find-your-trip-fcd69",
  storageBucket: "find-your-trip-fcd69.firebasestorage.app",
  messagingSenderId: "134544912671",
  appId: "1:134544912671:web:0e0864db863233ad9e802a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
