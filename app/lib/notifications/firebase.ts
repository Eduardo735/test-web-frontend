// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "0000000000000000000",
    authDomain: "turtles-internauta-capital.firebaseapp.com",
    projectId: "turtles-internauta-capital",
    storageBucket: "turtles-internauta-capital.firebasestorage.app",
    messagingSenderId: "0000000000",
    appId: "0000",
    measurementId: "000000"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { getToken, messaging, onMessage };
