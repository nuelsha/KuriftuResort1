// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgvOCSGmQDnPLhlfnlEcp6PKLWzD5uIVY",
  authDomain: "kurifitufeedback.firebaseapp.com",
  projectId: "kurifitufeedback",
  storageBucket: "kurifitufeedback.firebasestorage.app",
  messagingSenderId: "665740006985",
  appId: "1:665740006985:web:b36de5112b9abaf8781198",
  measurementId: "G-46MZ0E60RC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
