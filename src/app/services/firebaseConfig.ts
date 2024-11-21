import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: "AIzaSyDRt9uQoNSEFLpN8v1M_hWTBZZoFIHMuqQ",
  authDomain: "dse-site.firebaseapp.com",
  databaseURL: "https://dse-site-default-rtdb.firebaseio.com/",
  projectId: "dse-site",
  storageBucket: "dse-site.firebasestorage.app",
  messagingSenderId: "1028376381636",
  appId: "1:1028376381636:web:c11ac7a93c946517c8e191"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);                         