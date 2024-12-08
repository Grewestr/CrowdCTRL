// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAj0-1YR0z8bccdZUlC10k0181wMSyj58",
  authDomain: "peoplecounter-8c4fd.firebaseapp.com",
  projectId: "peoplecounter-8c4fd",
  storageBucket: "peoplecounter-8c4fd.appspot.com",
  messagingSenderId: "508353821672",
  appId: "1:508353821672:web:e14f88760b605a0d50825d",
  measurementId: "G-DRBQX64EJH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
