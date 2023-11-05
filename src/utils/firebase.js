// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBt2L1o12oGYu0VfK0KttzwpcghI0olqZk",
    authDomain: "gptflix-c4b32.firebaseapp.com",
    projectId: "gptflix-c4b32",
    storageBucket: "gptflix-c4b32.appspot.com",
    messagingSenderId: "247119641017",
    appId: "1:247119641017:web:b5df6b871bfb464071de68",
    measurementId: "G-SYENP3H7X8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
