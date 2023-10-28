import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCRPzgvakbO2YZYE4aJ5U5J6q6FYdTVxIk",
  authDomain: "chatbox-c2d0b.firebaseapp.com",
  projectId: "chatbox-c2d0b",
  storageBucket: "chatbox-c2d0b.appspot.com",
  messagingSenderId: "516152112249",
  appId: "1:516152112249:web:5c18a59b49b69a670fd0a8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = GoogleAuthProvider();
