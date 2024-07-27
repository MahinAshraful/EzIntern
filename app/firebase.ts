// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTELtNogPvihW4ZDdywG2WPLBLemr4WSI",
  authDomain: "ezintern-headstarter.firebaseapp.com",
  projectId: "ezintern-headstarter",
  storageBucket: "ezintern-headstarter.appspot.com",
  messagingSenderId: "1037080179153",
  appId: "1:1037080179153:web:e3794a5ec2bce052ba70f0",
  measurementId: "G-JV0RDRGKZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)