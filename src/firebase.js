import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBu2u70wmf3WLG_T9NqEGMi2Yu4jP75fuo",
    authDomain: "heera-b7f16.firebaseapp.com",
    projectId: "heera-b7f16",
    storageBucket: "heera-b7f16.appspot.com",
    messagingSenderId: "968834525982",
    appId: "1:968834525982:web:3cf0f9696c28e63910f70f",
    measurementId: "G-MMQ9WKKHJP"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  export { auth, database };
