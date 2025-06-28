// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWj3a91s77d8vKJZbOMpamK6_4wxmVYjg",
  authDomain: "adils-portfolio.firebaseapp.com",
  projectId: "adils-portfolio",
  storageBucket: "adils-portfolio.firebasestorage.app",
  messagingSenderId: "1030717336417",
  appId: "1:1030717336417:web:665ad55f2072aea1a4f320",
  measurementId: "G-DV8T9V5BK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };