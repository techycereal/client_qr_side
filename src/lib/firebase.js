// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: "qr-product-line.firebaseapp.com",
  projectId: "qr-product-line",
  storageBucket: "qr-product-line.firebasestorage.app",
  messagingSenderId: import.meta.env.MESSAGE_SENDER,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };