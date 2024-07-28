// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs} from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpdNJVx0SMNKnFwT5_-fTM3vD9H5psHf8",
  authDomain: "ezintern-d4cd9.firebaseapp.com",
  projectId: "ezintern-d4cd9",
  storageBucket: "ezintern-d4cd9.appspot.com",
  messagingSenderId: "127429825221",
  appId: "1:127429825221:web:3caf9e08dc659952fc16ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
