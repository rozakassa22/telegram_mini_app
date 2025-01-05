import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBHUECeSKE6KGZdb8NXIzBMap95byPRCMw",
    authDomain: "telegram-mini-app-64365.firebaseapp.com",
    projectId: "telegram-mini-app-64365",
    storageBucket: "telegram-mini-app-64365.firebasestorage.app",
    messagingSenderId: "635416978187",
    appId: "1:635416978187:web:7311dd258ea8b9a323b80e",
    measurementId: "G-Q34WFMJQ8J"
  };
  
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  
  export { db };  