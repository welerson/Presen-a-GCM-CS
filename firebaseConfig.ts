// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFuvfgeW0Ais2jd0FS1OuCXDpy4iMd4kI",
  authDomain: "aniversariantes-e7e64.firebaseapp.com",
  databaseURL: "https://aniversariantes-e7e64-default-rtdb.firebaseio.com",
  projectId: "aniversariantes-e7e64",
  storageBucket: "aniversariantes-e7e64.appspot.com",
  messagingSenderId: "749548439509",
  appId: "1:749548439509:web:09d9d2ce50b16599a49f5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);