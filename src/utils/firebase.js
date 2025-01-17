// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAqXo0wM_DmizsVjTyCuW4R20pZoF-JO98',
    authDomain: 'netflixgpt-3fb76.firebaseapp.com',
    projectId: 'netflixgpt-3fb76',
    storageBucket: 'netflixgpt-3fb76.firebasestorage.app',
    messagingSenderId: '885654902363',
    appId: '1:885654902363:web:46bcb077824608bc9cd17e',
    measurementId: 'G-YXML0PLBKT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export { auth };
