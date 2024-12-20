import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDd67Wv0wGHooObCC4KhEoPfxcGD6lNGyA",
  authDomain: "campaign-management-be675.firebaseapp.com",
  projectId: "campaign-management-be675",
  storageBucket: "campaign-management-be675.firebasestorage.app",
  messagingSenderId: "180060791602",
  appId: "1:180060791602:web:127b1313472ee500792d2b",
  measurementId: "G-7744MGW2R6"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);