import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSYDqMSQV0P0xmsG4legmuAmpj4z-qdhM",
    authDomain: "itd112---lab1.firebaseapp.com",
    projectId: "itd112---lab1",
    storageBucket: "itd112---lab1.appspot.com",
    messagingSenderId: "968859329071",
    appId: "1:968859329071:web:f853f3378d774128439cda",
    measurementId: "G-04M808R5W0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db };