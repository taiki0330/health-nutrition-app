// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBzWIX-1ldzVyfsnBXME_zSTvxmJGtPP8E',
	authDomain: 'healthreacttypescript.firebaseapp.com',
	projectId: 'healthreacttypescript',
	storageBucket: 'healthreacttypescript.firebasestorage.app',
	messagingSenderId: '417510183047',
	appId: '1:417510183047:web:d674460d8ea1c2ce6e6822',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }; 
