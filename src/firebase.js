import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwiK3Q6wNnvSye78DXQz6K_L7XzzT_3QI",
  authDomain: "arcelevenarchitect-c7bb5.firebaseapp.com",
  projectId: "arcelevenarchitect-c7bb5",
  storageBucket: "arcelevenarchitect-c7bb5.firebasestorage.app",
  messagingSenderId: "571569405764",
  appId: "1:571569405764:web:0a51a8551aed479cc3a111",
  measurementId: "G-LBQ1M1VJ1M"
};

const app = initializeApp(firebaseConfig);

// Analytics only if supported
isSupported().then((yes) => {
  if (yes && process.env.NODE_ENV === "production") {
    getAnalytics(app);
  }
});

export default app;
