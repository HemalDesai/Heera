import { useState, useEffect } from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';

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
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push('/HomePage');
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='boddy'>
      <style jsx>{`
        .boddy {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <button
        className='button-17'
        onClick={signInWithGoogle}
        style={{
          fontWeight: 'lighter',
          fontSize: '20px',
          border: '1px solid #ccc',
          padding: '2px 5px',
          borderRadius: '10px',
          backgroundColor: 'whitesmoke',
          boxShadow: '0 5px 5px rgba(0,0,0,0.1)',
          width: '200px',
          height: '50px'
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
