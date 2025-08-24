// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA44H_74YXwfal8_2MzIuoEbj-AjnPrzlk",
  authDomain: "amcsge-31fed.firebaseapp.com",
  databaseURL: "https://amcsge-31fed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "amcsge-31fed",
  storageBucket: "amcsge-31fed.firebasestorage.app",
  messagingSenderId: "177545403406",
  appId: "1:177545403406:web:48e12d458ecabfe80cb05f",
  measurementId: "G-W2Z58BZ29C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };