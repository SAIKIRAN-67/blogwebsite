import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBL9bMMRN3_Wwg3FPiLg08v-0v5csdeffo",
  authDomain: "blog-d6e9d.firebaseapp.com",
  projectId: "blog-d6e9d",
  storageBucket: "blog-d6e9d.appspot.com",
  messagingSenderId: "755986440807",
  appId: "1:755986440807:web:6c527b180891a81fc8aac2",
  measurementId: "G-5ZMZMPE3WS"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();