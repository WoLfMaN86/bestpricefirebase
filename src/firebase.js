// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBeRwsl5dfh-haxOYdmt7N-1eQqj4CtbGU",
  authDomain: "bestpricefire.firebaseapp.com",
  projectId: "bestpricefire",
  storageBucket: "bestpricefire.appspot.com",
  messagingSenderId: "60677525154",
  appId: "1:60677525154:web:7d6cff8e190a58e94911fb"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };