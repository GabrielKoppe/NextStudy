// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDoFinl9XjbnbpXoQQDEdRE9ur5IO0Pl4E',
	authDomain: 'taskboard-9581c.firebaseapp.com',
	projectId: 'taskboard-9581c',
	storageBucket: 'taskboard-9581c.appspot.com',
	messagingSenderId: '693190792444',
	appId: '1:693190792444:web:466f12e1b2f92b2271f379',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
