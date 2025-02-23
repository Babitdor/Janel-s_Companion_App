// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVg5d_SlAMWPkdcNTWMe4LJEzE7FQBxeE",
  authDomain: "janella-s-companion-app.firebaseapp.com",
  projectId: "janella-s-companion-app",
  storageBucket: "janella-s-companion-app.firebasestorage.app",
  messagingSenderId: "263938990521",
  appId: "1:263938990521:web:8acd5466b45d70f1185668",
  measurementId: "G-ZY5FXE3H8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };
