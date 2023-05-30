
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCRE-v87Tjm4aS9H_y5rKh9ezMUv3eo1M4",
  authDomain: "pasiuchat.firebaseapp.com",
  projectId: "pasiuchat",
  storageBucket: "pasiuchat.appspot.com",
  messagingSenderId: "121791045578",
  appId: "1:121791045578:web:247e8540c6c51ec7a4b933"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();