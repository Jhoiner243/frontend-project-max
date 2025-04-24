// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWaxx6GBFJwx_qHwhZG8tVIzlTo6unlGE",
  authDomain: "maxpollo2.firebaseapp.com",
  projectId: "maxpollo2",
  storageBucket: "maxpollo2.firebasestorage.app",
  messagingSenderId: "535527853914",
  appId: "1:535527853914:web:2daf7718e9ac8b19942d63",
  measurementId: "G-JK983VKY3S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export { getToken, messaging };
