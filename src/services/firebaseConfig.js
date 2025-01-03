import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// in a real world project, these need to be stored in an env file for security purposes, these are here for demonstration purposes
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
const messaging = getMessaging(app);

export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'BEgBNK4z-G_B2SHVEcfrrZwdfsJS4d8_3_1RfaAfN0hVb8BDqMWOwzvgq-AwL8_y6ycGRL5l9ahPZFr3hLS9vVw'
    });
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });