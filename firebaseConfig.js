// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Sustituye los valores por los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBV3xvZUo38hwe5UmHhWZ8DYGRGpPkfw_M",
  authDomain: "restaurantreviews-22c98.firebaseapp.com",
  databaseURL: "https://restaurantreviews-22c98-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "restaurantreviews-22c98",
  storageBucket: "restaurantreviews-22c98.firebasestorage.app",
  messagingSenderId: "955464880157",
  appId: "1:955464880157:web:2181163e1b56ff3e7af6f4",
  measurementId: "G-XG678PJD1J"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás
export const auth = getAuth(app);
export const db = getFirestore(app);