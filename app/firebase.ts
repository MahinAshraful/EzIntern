// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhg8na3rAIgA9yjcQ53lGldyLRrjpSDn4",
  authDomain: "ezintern-d5f75.firebaseapp.com",
  projectId: "ezintern-d5f75",
  storageBucket: "ezintern-d5f75.appspot.com",
  messagingSenderId: "764182832889",
  appId: "1:764182832889:web:7bfda4c6aea11901656428"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
