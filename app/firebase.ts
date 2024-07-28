// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs} from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD82DQGk4rx1oR4s2-rCT6A1XEZ0HO5TRs",
  authDomain: "ezintern-977c3.firebaseapp.com",
  projectId: "ezintern-977c3",
  storageBucket: "ezintern-977c3.appspot.com",
  messagingSenderId: "111295048752",
  appId: "1:111295048752:web:5c4b70f0af6a5163a9d1f5",
  measurementId: "G-ZG07NMWTHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
