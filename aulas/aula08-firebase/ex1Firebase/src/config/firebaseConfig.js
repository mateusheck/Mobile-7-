import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAI6Dvzpj6EDyxjKgkXxSiWl0J9UpMORxo",
  authDomain: "mateusheck-app.firebaseapp.com",
  projectId: "mateusheck-app",
  storageBucket: "mateusheck-app.firebasestorage.app",
  messagingSenderId: "362773791962",
  appId: "1:362773791962:web:36199aaea88641c87a51e3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);