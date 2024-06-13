import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAt052Geb0r0ga0SDL4FfQ3CJnF_xi5ek4",
  authDomain: "discord-clone-practice.firebaseapp.com",
  projectId: "discord-clone-practice",
  storageBucket: "discord-clone-practice.appspot.com",
  messagingSenderId: "549198823671",
  appId: "1:549198823671:web:655bae1ae0ccba132793f2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider, db};