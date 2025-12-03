// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- importar Auth

const firebaseConfig = {
  apiKey: "AIzaSyBXuKTUJ9uKAsabMZ_hjFRrcplxd46Mdrs",
  authDomain: "proba-eebc2.firebaseapp.com",
  projectId: "proba-eebc2",
  storageBucket: "proba-eebc2.firebasestorage.app",
  messagingSenderId: "232607231953",
  appId: "1:232607231953:web:3cd4505651722f702b3af0"
};

// Inicializar Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exportar Firestore
export const db = getFirestore(app);

// Exportar Auth
export const auth = getAuth(app);
