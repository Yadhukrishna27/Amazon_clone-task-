// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV9a2w--AcH9dO9G7uehD9l5vbQ1XUOqk",
  authDomain: "clone-c47b4.firebaseapp.com",
  projectId: "clone-c47b4",
  storageBucket: "clone-c47b4.firebasestorage.app",
  messagingSenderId: "506245655327",
  appId: "1:506245655327:web:49f23d0a680b8acce79e2a",
  measurementId: "G-GJ1PE12LF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
