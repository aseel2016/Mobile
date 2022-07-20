// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTLIEYpiPMzTqBb8vSK4ErC4Pp0MCKJN0",
    authDomain: "hr-notifications-bff1d.firebaseapp.com",
    projectId: "hr-notifications-bff1d",
    storageBucket: "hr-notifications-bff1d.appspot.com",
    messagingSenderId: "494393581410",
    appId: "1:494393581410:web:9fc5ba45cc411baa3b563b",
    measurementId: "G-C9JWXYHLWV"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
export default getFirestore();