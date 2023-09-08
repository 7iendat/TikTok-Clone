import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOONVptHRl8U26JAuvlDuN8LIk8w0FXFA",
  authDomain: "tiktok-c2ab9.firebaseapp.com",
  projectId: "tiktok-c2ab9",
  storageBucket: "tiktok-c2ab9.appspot.com",
  messagingSenderId: "888307872686",
  appId: "1:888307872686:web:6f0e718065595178100e3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

export {auth,db};