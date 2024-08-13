import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCSOLXug0ase9mkrkEOFpB7AfktQvRFJkM",
    authDomain: "catalyst-firebase-demo.firebaseapp.com",
    projectId: "catalyst-firebase-demo",
    storageBucket: "catalyst-firebase-demo.appspot.com",
    messagingSenderId: "2499367874",
    appId: "1:2499367874:web:d5b1b5c1ce52a1bccabc5b",
    measurementId: "G-4R3LW7GTXC"
  };

export const app = initializeApp(firebaseConfig);

