// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";


import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZq6u4hWfEpQnmAdUYwLl42NOgkoXfRtA",
  authDomain: "venkataseva-e2c33.firebaseapp.com",
  projectId: "venkataseva-e2c33",
  storageBucket: "venkataseva-e2c33.appspot.com",
  messagingSenderId: "883199548626",
  appId: "1:883199548626:web:f97548f98a57d61961e10b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
// Sign in user anonymously, catch error if any
signInAnonymously(getAuth(app)).catch(function(error) {
    console.log(error);
  });

const db = getFirestore(app)

const SEVA_ENDPOINT = 'sevas';
const EXPENSES_ENDPOINT = 'expenses';
const SEVA_TYPE_ENDPOINT = 'sevaType'

export { db, SEVA_ENDPOINT, EXPENSES_ENDPOINT, SEVA_TYPE_ENDPOINT }