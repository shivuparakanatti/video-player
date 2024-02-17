import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA2kkYwh4s6PpYnaMYTt0-zJjnQ4GlQ8VE",
  authDomain: "video-player-1d374.firebaseapp.com",
  projectId: "video-player-1d374",
  storageBucket: "video-player-1d374.appspot.com",
  messagingSenderId: "962437050097",
  appId: "1:962437050097:web:90a1e1f369633a0604c350",
  measurementId: "G-H99V64RHDS"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const  db = getFirestore(app)