import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC0GHzUWceQVFbReAsFqJFb2hqowUKH3fI",
    authDomain: "info-firebase-536b0.firebaseapp.com",
    projectId: "info-firebase-536b0",
    storageBucket: "info-firebase-536b0.appspot.com",
    messagingSenderId: "560212742328",
    appId: "1:560212742328:web:f9c46bcd2538eb8945244d"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

